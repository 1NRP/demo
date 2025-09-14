export { saveNote, deleteNote, getNote }; // Export The Note Functions.
async function saveNote(req) {
  try {
    const { lastSentence, REDIS_KEY } = JSON.parse(req.body);
    const response = await fetch(`${process.env.KV_REST_API_URL}/LPUSH/${REDIS_KEY}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
      },
      body: lastSentence
    });
    return new Response( await response.json() );
  } catch (error) {
    console.error('Error Name: ', error.name, 'Error Message: ', error.message);
  }
};

async function getNote(req) {
  try {
    const REDIS_KEY = new URL(req.url).searchParams.get('REDIS_KEY');
    const response = await fetch(`${process.env.KV_REST_API_URL}/LRANGE/${REDIS_KEY}/0/-1/`, {
      headers: {
        'Authorization': `Bearer ${process.env.KV_REST_API_READ_ONLY_TOKEN}`,
      }
    });
    return new Response( await response.json() );
  } catch (error) {
    console.error('Error:', error);
  }
};

async function deleteNote(req) {
  try {
    const REDIS_KEY = new URL(req.url).searchParams.get('REDIS_KEY');
    const response = await fetch(`${process.env.KV_REST_API_URL}/LREM/${REDIS_KEY}/0/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
      },
      body: req.body,
    });
    return new Response( await response.json() );
  } catch (error) {
    console.error(error);
    return new Response('An error occurred while sending to Upstash.', { status: 500 });
  }
};