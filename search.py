import urllib.request, json
url = 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/reference-organ-scene.json'
try:
    with urllib.request.urlopen(url) as response:
        organs = json.loads(response.read().decode())
        for o in organs:
            # check representation_of or node_name
            name = o.get('node_name', '').lower() + o.get('representation_of', '').lower()
            if any(term in name for term in ['tooth', 'teeth', 'dental', 'mandible', 'maxilla', 'jaw', 'mouth', 'oral', 'skull', 'head']):
                print(o.get('node_name'), o.get('object', {}).get('file_url'))
except Exception as e:
    print('Error:', e)
