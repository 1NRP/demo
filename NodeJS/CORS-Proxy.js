export async function corsProxy (req, res) {
  try {
    const { URL } = req.query;
    const response = await fetch(URL);  // If the HTTP method is not specified, the 'GET' method is used by default.
    // Get the response body (try to parse it as JSON if it's JSON, or as text otherwise).
    let responseData;
    const contentType = response.headers.get('content-type');
    // Set common headers to the response for CORS and caching.
    res.setHeader('Access-Control-Allow-Origin', 'https://1nrp.github.io');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour.
    // If the content type is JSON.
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
      res.setHeader('Content-Type', 'application/json');
      res.json(responseData);
    } 
    // If the content type is text.
    else {
      responseData = await response.text();
      res.setHeader('Content-Type', 'text/plain');
      res.send(responseData);
    } 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      Error_Details: error.message,
      Error_Message: 'An error occurred while processing the CORS proxy request.',
    });
  }
};
