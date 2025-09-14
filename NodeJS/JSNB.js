export default async function (req, res) {
if (req.method == 'GET') {
  try {
    const response = await fetch(`${process.env.KV_REST_API_URL}/GET/JAVASCRIPT_NOTEBOOK`, {
      headers: {
        'Authorization': `Bearer ${process.env.KV_REST_API_READ_ONLY_TOKEN}`
      }
    });
    res.json( await response.json() );
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching Notebook from KV.' });
  }
    
  } else if(req.method == 'POST') {
  try {
    const response = await fetch(`${process.env.KV_REST_API_URL}/SET/JAVASCRIPT_NOTEBOOK`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
          'Content-Type': 'text/plain'
        },
        body: req.body
    });
    res.json( await response.json() );
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving Notebook to KV.' });
  }
  } else {
    res.status(404).json({ notFoundError: 'Neither GET nor POST request was received.' });
  }
}
