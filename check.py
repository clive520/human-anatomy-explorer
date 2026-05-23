import trimesh
scene = trimesh.load('assets/models/human_teeth.glb')
teeth_mesh = scene.geometry['Teeth_TeethMaterial_0']
components = teeth_mesh.split(only_watertight=False)
valid_components = [c for c in components if len(c.vertices) > 50]

centers = [{'id': i, 'center': c.bounding_box.centroid, 'verts': len(c.vertices)} for i, c in enumerate(valid_components)]
centers.sort(key=lambda x: x['center'][1], reverse=True)
upper = centers[:16]
lower = centers[16:]

upper.sort(key=lambda x: x['center'][0])
lower.sort(key=lambda x: x['center'][0], reverse=True)

print('UPPER (Patient Right -> Patient Left):')
for i, c in enumerate(upper):
    print(f"Index {i} (Mapped to Tooth {i+1}): X={c['center'][0]:.3f}, Z={c['center'][2]:.3f}, Verts={c['verts']}")

print('\nLOWER (Patient Left -> Patient Right):')
for i, c in enumerate(lower):
    print(f"Index {i} (Mapped to Tooth {i+17}): X={c['center'][0]:.3f}, Z={c['center'][2]:.3f}, Verts={c['verts']}")
