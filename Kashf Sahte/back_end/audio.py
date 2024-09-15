

#------------------------ Importing Libraries -----------------------
import os
import uuid
from flask import Flask, request, jsonify
import numpy as np
import librosa
import librosa.display
import matplotlib
matplotlib.use('Agg')  # Configure Matplotlib to use the 'Agg' backend
import matplotlib.pyplot as plt
from PIL import Image
from keras.models import load_model
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS
import io
import base64



app = Flask(__name__)
#-------------- Declaration of CORS policy
CORS(app, resources={r"/detection": {"origins": "*"}})


#------------- Loading the deepfake detection model
model = load_model("./deepfake_audio_detection_model_2163.h5")
input_shape = (128, 128)
label_encoder = LabelEncoder()
label_encoder.classes_ = np.array(['bonafide', 'spoof'])


#--------------------- Directory in which the spectograms are being saved
spectrogram_image_dir = os.path.abspath("KashfSahte_v1.0/src/assets/spectrogram_images")
os.makedirs(spectrogram_image_dir, exist_ok=True)


#------ Pre-processing Audio Files
def preprocess_audio(audio):
   
    y, sr = librosa.load(audio, sr=None, dtype=np.float32)
    return y, sr


#--------------- Creating Spectograms------------------
def create_spectrogram(y, sr):
    spec = librosa.feature.melspectrogram(y=y, sr=sr)
    spec_db = librosa.power_to_db(spec, ref=np.max)
    plt.figure(figsize=(16, 16), dpi=800)
    librosa.display.specshow(spec_db, x_axis='time', y_axis='mel', sr=sr, hop_length=512)
    plt.colorbar(format='%+2.0f dB')
    plt.title('Mel-scaled Spectrogram')
    plt.tight_layout()
    image = io.BytesIO()
    plt.savefig(image, format='png')
    plt.close()
    image.seek(0)
    img = Image.open(image)
    img = img.resize((input_shape[0], input_shape[1]))
    if img.mode == 'RGBA':
        img = img.convert('RGB')
    img = np.array(img)
    img = img.astype(np.float32) / 255.0
    return img

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024



#------------------- Prediction Route----------------------
@app.route('/detection', methods=['POST'])
def predict():
    try:
        audio_data = request.data
        print("Received audio data:", audio_data)
        y, sr = preprocess_audio(io.BytesIO(audio_data))
        spectrogram_image = create_spectrogram(y, sr)
        spectrogram_image = spectrogram_image.reshape(1, *input_shape, 3)
        image_filename = f"spectrogram_{uuid.uuid4().hex}.png"
        image_path = os.path.join(spectrogram_image_dir, image_filename).replace("\\", "/")
        plt.imsave(image_path, spectrogram_image[0])
        with open(image_path, "rb") as image_file:
            image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
        prediction = model.predict(spectrogram_image)
        predicted_label = label_encoder.inverse_transform(np.argmax(prediction, axis=1))[0]
        confidence_score = prediction[0][np.argmax(prediction)]
        
        
        #---------------------- Data being returned to node.js---------------
        response_data = {
            'predicted_label': predicted_label,
            'confidence_score': float(confidence_score),
            'spectrogramImageBase64': image_base64  # Return base64 encoded image
        }
        return jsonify(response_data)
    except Exception as e:
        print("Error processing audio:", str(e))
        return jsonify({'error': 'Flask Error processing audio'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=25000)