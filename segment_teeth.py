import trimesh
import numpy as np

print("Loading original model...")
scene = trimesh.load('assets/models/human_teeth.glb')

# Find original meshes
teeth_geom_name = None
gums_geom_name = None

for name in scene.geometry.keys():
    if 'Teeth' in name:
        teeth_geom_name = name
    elif 'Gums' in name:
        gums_geom_name = name

if not teeth_geom_name:
    print("Error: Could not find Teeth mesh.")
    exit(1)

teeth_mesh = scene.geometry[teeth_geom_name]
print("Splitting teeth mesh into components...")
components = teeth_mesh.split(only_watertight=False)

# Keep only valid teeth (>= 50 vertices)
valid_components = [c for c in components if len(c.vertices) > 50]
if len(valid_components) != 32:
    print(f"Warning: Found {len(valid_components)} teeth instead of 32.")

# Calculate centers
centers = []
for i, c in enumerate(valid_components):
    centers.append({
        'mesh': c,
        'center': c.bounding_box.centroid
    })

# Separate upper and lower by Y
centers.sort(key=lambda x: x['center'][1], reverse=True)
upper = centers[:16]
lower = centers[16:]

# Sort upper by X ascending (-X to +X) -> Tooth_1 to Tooth_16
upper.sort(key=lambda x: x['center'][0])

# Sort lower by X descending (+X to -X) -> Tooth_17 to Tooth_32
lower.sort(key=lambda x: x['center'][0], reverse=True)

# Build a new scene
new_scene = trimesh.Scene()

# Add gums
if gums_geom_name:
    gums_mesh = scene.geometry[gums_geom_name]
    new_scene.add_geometry(gums_mesh, geom_name='Gums')

# Add segmented teeth
tooth_idx = 1
for item in upper:
    mesh = item['mesh']
    # Keep original visual properties if possible
    if hasattr(teeth_mesh.visual, 'material'):
        mesh.visual.material = teeth_mesh.visual.material
    new_scene.add_geometry(mesh, geom_name=f'Tooth_{tooth_idx}')
    tooth_idx += 1

for item in lower:
    mesh = item['mesh']
    if hasattr(teeth_mesh.visual, 'material'):
        mesh.visual.material = teeth_mesh.visual.material
    new_scene.add_geometry(mesh, geom_name=f'Tooth_{tooth_idx}')
    tooth_idx += 1

print("Exporting to human_teeth_segmented.glb...")
new_scene.export('assets/models/human_teeth_segmented.glb')
print("Done!")
