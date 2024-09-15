from flask import Flask, request, jsonify
import cv2
import numpy as np
import face_recognition
from torch import nn
import torch
import torchvision.transforms as transforms
import os
import tempfile
from torchvision import models
import base64

app = Flask(__name__)

class Model(nn.Module):
    def __init__(self, num_classes):
        super(Model, self).__init__()
        self.model = nn.Sequential(*list(models.resnext50_32x4d(pretrained=True).children())[:-2])
        self.lstm = nn.LSTM(2048, 2048, 1, False)
        self.dp = nn.Dropout(0.4)
        self.linear1 = nn.Linear(2048, num_classes)

    def forward(self, x):
        batch_size, seq_length, c, h, w = x.shape
        x = x.view(batch_size * seq_length, c, h, w)
        features = self.model(x)
        gap = nn.AdaptiveAvgPool2d((1,1))
        pooled_features = gap(features)
        pooled_features = pooled_features.squeeze(-1).squeeze(-1)
        x = pooled_features.view(batch_size, seq_length, -1)
        x, _ = self.lstm(x)
        return self.dp(self.linear1(x[:, -1, :]))

class ModelWrapper:
    def __init__(self, model_path):
        self.model = Model(num_classes=2)
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model.load_state_dict(torch.load(model_path, map_location=device))
        self.model.to(device).eval()
        self.device = device

    def predict(self, video_frames):
        with torch.no_grad():
            video_frames = video_frames.to(self.device)
            logits = self.model(video_frames)
            sm = nn.Softmax(dim=1)
            logits = sm(logits)
            _, prediction = torch.max(logits, 1)
            confidence = logits[:, int(prediction.item())].item() * 100
        return [int(prediction.item()), confidence]

# Initialize the model wrapper
model_path = 'checkpoint_20_4.pt'
model_wrapper = ModelWrapper(model_path)

transform = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((112, 112)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

@app.route('/predict', methods=['POST'])
def predict_video():
    temp_file_path = None
    video_capture = None
    try:
        # Create a temporary file for the uploaded video
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
        temp_file.write(request.files['video'].read())
        temp_file_path = temp_file.name
        temp_file.close()
        
        # Open the video file
        video_capture = cv2.VideoCapture(temp_file_path)
        frames = []
        base64_rgb_image = None
        base64_image = None

        # Process the video frames
        while video_capture.isOpened():
            ret, frame = video_capture.read()
            if not ret:
                break

            # Detect faces in the frame
            faces = face_recognition.face_locations(frame)
            if faces:
                # Crop the frame to the face region
                top, right, bottom, left = faces[0]
                cropped_frame = frame[top:bottom, left:right]

                # Apply a colormap to generate an RGB image similar to thermal imaging
                thermal_like_image = cv2.applyColorMap(cropped_frame, cv2.COLORMAP_JET)
                
                # Save the thermal-like image as base64 for the response
                if base64_rgb_image is None:
                    _, buffer = cv2.imencode('.png', thermal_like_image)
                    base64_rgb_image = base64.b64encode(buffer).decode('utf-8')

                # Save the original image as base64 for the response but do not process it
                if base64_image is None:
                    _, buffer = cv2.imencode('.png', cropped_frame)
                    base64_image = base64.b64encode(buffer).decode('utf-8')

                # Transform the cropped frame for the model
                transformed_frame = transform(cropped_frame)
                frames.append(transformed_frame)
        
        # Make a prediction using the original frames
        video_tensor = torch.stack(frames).unsqueeze(0)
        prediction = model_wrapper.predict(video_tensor)
        result = "REAL" if prediction[0] == 1 else "FAKE"
        confidence = prediction[1]
        
        # Return the result and the thermal-like image
        return jsonify({"result": result, "confidence": confidence, "frame_base64": base64_image, "thermal_frame_base64": base64_rgb_image})
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        if video_capture:
            video_capture.release()
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=15000)
