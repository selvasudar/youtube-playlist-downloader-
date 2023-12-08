// frontend/src/App.js
import React, { useState } from 'react';

function App() {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [downloadLinks, setDownloadLinks] = useState([]);

  const handleDownload = async (e) => {
    e.preventDefault();
    console.log('Handling download...');
    try {
      const response = await fetch('http://localhost:5000/download_playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playlist_url: playlistUrl }),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        // If the response is successful, update the download links state
        setDownloadLinks(result.video_paths);
      } else {
        // Handle error responses
        console.error('Error downloading playlist:', result.error);
      }
    } catch (error) {
      console.error('Error downloading playlist:', error);
    }
  };

  return (
    <section>
      <div className='container mt-5'>
        <div className='row text-center mt-5'>
          <div className='col-12'>
            <h1>YouTube Playlist Downloader</h1>
            <h6>- Selva D</h6>
            <input
              type="text"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              placeholder="Enter YouTube Playlist URL"
              className='form-control w-25 mx-auto mt-5'
            />
            <button type="button" className='btn btn-primary mt-2' onClick={handleDownload}>Download Playlist</button>
          </div>
        </div>
      </div>
      {downloadLinks.length > 0 && (
        <div className='container mt-5'>
          <div className='row justify-content-center text-center'>
            <h2>Download videos here</h2>
            {downloadLinks.map((link, index) => (
              <div className='col-3' key={index}>
                <video src={"downloads/" + link} controls>Video {index + 1}</video>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default App;
