from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/search_image', methods=['POST'])
def search_image():
    uploaded_file = request.files['image']
    file_name = request.form['fileName']

    # Use Google Custom Search API
    links = google_search(file_name)

    return jsonify({"links": links})

def google_search(search_term):
    API_KEY = 'AIzaSyAxOf6SZMJuRkhKr3uTxqmQg1r0ghuGxKs'
    SEARCH_ENGINE_ID = '64aff39f32f544d70'
    url = "https://www.googleapis.com/customsearch/v1"

    params = {
        'q': search_term,
        'key': API_KEY,
        'cx': SEARCH_ENGINE_ID,
        'searchType': 'image'
    }

    response = requests.get(url, params=params)
    results = response.json().get('items', [])

    links = [item['link'] for item in results if 'link' in item]
    return links

if __name__ == '__main__':
    app.run(debug=True)
