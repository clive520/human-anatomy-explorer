import struct, json

def parse_glb(filepath):
    with open(filepath, 'rb') as f:
        magic = f.read(4)
        if magic != b'glTF': return 'Not a GLB'
        version, length = struct.unpack('<II', f.read(8))
        chunk_len, chunk_type = struct.unpack('<II', f.read(8))
        if chunk_type != 0x4E4F534A: return 'Not JSON chunk'
        json_data = f.read(chunk_len).decode('utf-8')
        return json.loads(json_data)

try:
    gltf = parse_glb('assets/models/human_teeth.glb')
    nodes = gltf.get('nodes', [])
    meshes = gltf.get('meshes', [])
    print(f'Total nodes: {len(nodes)}')
    print(f'Total meshes: {len(meshes)}')
    for i, n in enumerate(nodes):
        if 'mesh' in n:
            print(f"Node {i}: {n.get('name', 'unnamed')} (Mesh {n['mesh']})")
except Exception as e:
    print('Error:', e)
