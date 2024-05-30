const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const app = express();
const PORT = 3000;

// Define a route to handle the file download
app.get('/m3u8Link', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).send('URL parameter is required');
    }

    // Fetch the .m3u8 file
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch .m3u8 file');
    }
    
    // Read the content of the .m3u8 file
    const m3u8Content = await response.text();

    // Get the "fid" parameter from the URL
    const fid = new URL(url).searchParams.get('fid');
    if (!fid) {
      return res.status(400).send('fid parameter not found in the URL');
    }

    // Save the .m3u8 file on the server with the name as the "fid" parameter
    const filePath = path.join(__dirname, `${fid}.m3u8`);
    await promisify(fs.writeFile)(filePath, m3u8Content, 'utf8');

    // Respond with success message
    res.send('File saved successfully');

    // Delete the file after 12 hours
    setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });
    }, 12 * 60 * 60 * 1000); // 12 hours
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});
