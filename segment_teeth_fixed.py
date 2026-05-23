import trimesh
import numpy as np

print("Loading original model...")
scene = trimesh.load('assets/models/human_teeth.glb')

teeth_geom_name = None
gums_geom_name = None

for name in scene.geometry.keys():
    if 'Teeth' in name:
        teeth_geom_name = name
    elif 'Gums' in name:
        gums_geom_name = name

teeth_mesh = scene.geometry[teeth_geom_name]
print("Splitting teeth mesh into components...")
components = teeth_mesh.split(only_watertight=False)

valid_components = [c for c in components if len(c.vertices) > 50]

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

# Sort upper by X ascending
upper.sort(key=lambda x: x['center'][0])

# Upper mapping based on geometric analysis:
# 0: 3rd Molar (part 1) -> Tooth_1
# 1: 3rd Molar (part 2) -> Tooth_1
# 2: 2nd Molar -> Tooth_2
# 3: 1st Molar -> Tooth_3
# 4: 2nd Premolar -> Tooth_4
# 5: 1st Premolar -> Tooth_5
# 6: Canine -> Tooth_6
# 7: Central Incisor -> Tooth_8 (Missing Lateral #7)
# 8: Central Incisor -> Tooth_9 (Missing Lateral #10)
# 9: Canine -> Tooth_11
# 10: 1st Premolar -> Tooth_12
# 11: 2nd Premolar -> Tooth_13
# 12: 1st Molar -> Tooth_14
# 13: 2nd Molar -> Tooth_15
# 14: 3rd Molar (part 1) -> Tooth_16
# 15: 3rd Molar (part 2) -> Tooth_16
upper_mapping = [1, 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 13, 14, 15, 16, 16]

# Sort lower by X descending
lower.sort(key=lambda x: x['center'][0], reverse=True)

# Lower mapping is a perfect 1-to-1 sequence from 17 to 32
lower_mapping = list(range(17, 33))

new_scene = trimesh.Scene()

if gums_geom_name:
    gums_mesh = scene.geometry[gums_geom_name]
    new_scene.add_geometry(gums_mesh, geom_name='Gums')

# Add upper teeth
for i, item in enumerate(upper):
    mesh = item['mesh']
    if hasattr(teeth_mesh.visual, 'material'):
        mesh.visual.material = teeth_mesh.visual.material
    tooth_id = upper_mapping[i]
    # To handle multiple parts of the same tooth, we can append a suffix or just let trimesh handle it (it appends _1)
    new_scene.add_geometry(mesh, geom_name=f'Tooth_{tooth_id}')

# Add lower teeth
for i, item in enumerate(lower):
    mesh = item['mesh']
    if hasattr(teeth_mesh.visual, 'material'):
        mesh.visual.material = teeth_mesh.visual.material
    tooth_id = lower_mapping[i]
    new_scene.add_geometry(mesh, geom_name=f'Tooth_{tooth_id}')

print("Exporting to human_teeth_segmented.glb...")
new_scene.export('assets/models/human_teeth_segmented.glb')
print("Done!")
