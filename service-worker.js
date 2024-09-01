self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response) {
            // Clone the response to modify headers
            const modifiedResponse = response.clone();
            const headers = new Headers(modifiedResponse.headers);
            headers.set('Access-Control-Allow-Origin', '*'); // Modify headers to allow CORS

            // Create a new response with modified headers
            const newResponse = new Response(modifiedResponse.body, {
                status: modifiedResponse.status,
                statusText: modifiedResponse.statusText,
                headers: headers
            });

            return newResponse;
        }).catch(function(error) {
            console.error('Fetch failed:', error);
            return new Response('Network error happened', { status: 408 });
        })
    );
});
