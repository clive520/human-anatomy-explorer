const https = require('https');

function searchGithub(query) {
    const options = {
        hostname: 'api.github.com',
        path: `/search/code?q=${encodeURIComponent(query)}`,
        headers: {
            'User-Agent': 'Node.js',
            'Accept': 'application/vnd.github.v3+json'
        }
    };

    https.get(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const results = JSON.parse(data);
            if (results.items) {
                results.items.slice(0, 5).forEach(item => {
                    console.log(`- ${item.name}: ${item.html_url}`);
                    console.log(`  Repo: ${item.repository.full_name}`);
                });
            } else {
                console.log(results);
            }
        });
    }).on('error', err => console.error(err));
}

searchGithub('nerve extension:glb');
