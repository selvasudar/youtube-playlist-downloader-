# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from pytube import Playlist
import os

app = Flask(__name__)
CORS(app)

@app.route('/download_playlist', methods=['POST'])
def download_playlist():
    print("service works")
    data = request.get_json()
    playlist_url = data.get('playlist_url')
    output_path = './public/downloads'

    playlist = Playlist(playlist_url)
    video_paths = []

    for video in playlist.videos:
        video_path = os.path.join(video.title + '.mp4')
        video.streams.get_highest_resolution().download(output_path)
        video_paths.append(video_path)
    
    return jsonify({'message': 'Download complete', 'video_paths': video_paths})

if __name__ == '__main__':
    app.run(debug=True)
