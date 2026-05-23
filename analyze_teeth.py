import trimesh
import numpy as np

scene = trimesh.load('assets/models/human_teeth.glb')
teeth_mesh = scene.geometry['Teeth_TeethMaterial_0']
components = teeth_mesh.split(only_watertight=False)

centers = []
for i, c in enumerate(components):
    center = c.bounding_box.centroid
    centers.append({'id': i, 'center': center})

# Sort by Y to find upper and lower
centers.sort(key=lambda x: x['center'][1], reverse=True)
upper = centers[:16]
lower = centers[16:]

print(f"Upper Y range: {min(c['center'][1] for c in upper):.3f} to {max(c['center'][1] for c in upper):.3f}")
print(f"Lower Y range: {min(c['center'][1] for c in lower):.3f} to {max(c['center'][1] for c in lower):.3f}")

# For upper, check X range
print(f"Upper X range: {min(c['center'][0] for c in upper):.3f} to {max(c['center'][0] for c in upper):.3f}")
print(f"Lower X range: {min(c['center'][0] for c in lower):.3f} to {max(c['center'][0] for c in lower):.3f}")

# For upper, check Z range
print(f"Upper Z range: {min(c['center'][2] for c in upper):.3f} to {max(c['center'][2] for c in upper):.3f}")
print(f"Lower Z range: {min(c['center'][2] for c in lower):.3f} to {max(c['center'][2] for c in lower):.3f}")

# Sort upper by X
upper.sort(key=lambda x: x['center'][0])
print("Upper sorted by X (left to right in world coordinates):")
for c in upper:
    print(f"  ID: {c['id']}, X: {c['center'][0]:.3f}, Z: {c['center'][2]:.3f}")

