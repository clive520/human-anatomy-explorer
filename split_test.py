import trimesh
import numpy as np

try:
    # Load the GLB scene
    scene = trimesh.load('assets/models/human_teeth.glb')
    print("Available geometries:", scene.geometry.keys())
    
    teeth_geom_name = None
    gums_geom_name = None
    
    for name in scene.geometry.keys():
        if 'Teeth' in name:
            teeth_geom_name = name
        elif 'Gums' in name:
            gums_geom_name = name
            
    if teeth_geom_name:
        teeth_mesh = scene.geometry[teeth_geom_name]
        print(f"Splitting teeth mesh: {teeth_geom_name}")
        components = teeth_mesh.split(only_watertight=False)
        print(f"Number of disconnected components in teeth: {len(components)}")
        
        # Count components with reasonable number of vertices (to filter out tiny artifacts)
        valid_components = [c for c in components if len(c.vertices) > 50]
        print(f"Number of valid components (>50 vertices): {len(valid_components)}")
    else:
        print("Teeth geometry not found.")

except Exception as e:
    print(f"Error: {e}")
