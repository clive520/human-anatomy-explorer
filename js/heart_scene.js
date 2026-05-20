// 心臟專屬 3D 場景邏輯 (Heart Scene)

let scene, camera, renderer, controls;
let myocardiumModel = new THREE.Group(); // 心房與心室外壁
let valvesModel = new THREE.Group();     // 瓣膜與乳頭肌
let coronaryModel = new THREE.Group();   // 冠狀動靜脈
let vesselsModel = new THREE.Group();    // 大血管

let interactableModels = [];
let raycaster, mouse;
let hoveredMesh = null;
let selectedMesh = null;

const outlineMaterial = new THREE.MeshStandardMaterial({
  color: 0x00d4ff,
  emissive: 0x00d4ff,
  emissiveIntensity: 0.5,
  wireframe: true,
  transparent: true,
  opacity: 0.5
});

const originalMaterials = new Map();

function init() {
  const container = document.getElementById('canvas-container');
  
  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 100);
  camera.position.set(0, 0, 0.3); // 心臟模型較小，相機靠近
  
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, 0, 0);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(2, 5, 3);
  scene.add(directionalLight);

  const backLight = new THREE.DirectionalLight(0xffffff, 0.6);
  backLight.position.set(-2, -2, -3);
  scene.add(backLight);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  scene.add(myocardiumModel);
  scene.add(valvesModel);
  scene.add(coronaryModel);
  scene.add(vesselsModel);

  loadModels();

  window.addEventListener('resize', onWindowResize);
  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('click', onClick);
  
  setupUIControls();
  animate();
}

function loadModels() {
  const loader = new THREE.GLTFLoader();
  let loadedCount = 0;
  
  const checkAllLoaded = () => {
    loadedCount++;
    if (loadedCount >= 2) {
      document.getElementById('loading-overlay').style.display = 'none';
      
      // 計算整個場景的 Bounding Box 來讓相機對焦
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      controls.target.copy(center);
      camera.position.set(center.x, center.y, center.z + 0.15);
      controls.update();
    }
  };

  // 1. 載入心臟本體 (包含心肌與瓣膜)
  loader.load('./models/b1_heart.glb', (gltf) => {
    gltf.scene.traverse((child) => {
      if (!child.isMesh) return;
      
      const n = child.name.toLowerCase();
      let targetGroup = myocardiumModel;
      
      // 顏色與分組邏輯
      let colorHex = 0xB22222; // 預設心肌顏色
      
      if (n.includes('valve') || n.includes('papillary')) {
        targetGroup = valvesModel;
        colorHex = 0xFFFFF0; // 象牙白
      } else if (n.includes('right_ventricle') || n.includes('right_cardiac_atrium')) {
        colorHex = 0xA52A2A; // 右心稍暗一點以做區別
      }
      
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        roughness: 0.6,
        metalness: 0.1,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide
      });
      
      child.material = mat;
      originalMaterials.set(child.uuid, mat);
      interactableModels.push(child);
      
      // 將 mesh 放進對應的群組 (這會從原先的階層移出，但 GLTF 沒有複雜的骨架動畫，所以這樣做是安全的)
      const clonedMesh = child.clone();
      targetGroup.add(clonedMesh);
      interactableModels.push(clonedMesh); // 將 cloned 加進去，原本的放進去沒用因為被移除了
    });
    
    // 清除舊的 interactableModels 內無用的 child (因為我們用 clonedMesh 取代)
    interactableModels = interactableModels.filter(m => m.parent !== null && (m.parent === myocardiumModel || m.parent === valvesModel));
    
    checkAllLoaded();
  });

  // 2. 載入心臟血管系統
  loader.load('./models/b1_heart_vessels.glb', (gltf) => {
    gltf.scene.traverse((child) => {
      if (!child.isMesh) return;
      
      const n = child.name.toLowerCase();
      let targetGroup = vesselsModel;
      
      // 顏色與分組邏輯
      let colorHex = 0xAA0000; // 預設暗紅
      
      if (n.includes('coronary') || n.includes('descending_artery') || n.includes('marginal') || n.includes('cardiac_vein') || n.includes('sinus')) {
        targetGroup = coronaryModel;
        // 冠狀動脈為紅，靜脈為藍
        if (n.includes('vein') || n.includes('sinus')) {
          colorHex = 0x1E90FF; // 藍色
        } else {
          colorHex = 0xFF0000; // 紅色
        }
      } else {
        // 大血管分類
        // 注意：肺動脈(pulmonary artery)是缺氧血(藍)，肺靜脈(pulmonary vein)是充氧血(紅)
        if (n.includes('pulmonary_artery') || n.includes('pulmonary_trunk') || n.includes('vena_cava') || n.includes('brachiocephalic_vein')) {
          colorHex = 0x1E90FF; // 藍色 (缺氧血)
        } else if (n.includes('aorta') || n.includes('pulmonary_vein') || n.includes('carotid') || n.includes('subclavian') || n.includes('brachiocephalic_artery')) {
          colorHex = 0xFF0000; // 紅色 (充氧血)
        }
      }
      
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        roughness: 0.4,
        metalness: 0.2,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide
      });
      
      child.material = mat;
      
      const clonedMesh = child.clone();
      originalMaterials.set(clonedMesh.uuid, mat);
      targetGroup.add(clonedMesh);
      interactableModels.push(clonedMesh);
    });
    
    checkAllLoaded();
  });
}

function onMouseMove(event) {
  const container = document.getElementById('canvas-container');
  const rect = container.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
}

function onClick(event) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  
  const validIntersect = intersects.find(hit => {
    if (!interactableModels.includes(hit.object)) return false;
    let isVisible = true;
    let obj = hit.object;
    while (obj) {
      if (obj.visible === false) { isVisible = false; break; }
      obj = obj.parent;
    }
    if (!isVisible) return false;
    if (hit.object.material && hit.object.material.opacity <= 0.05) return false;
    return true;
  });

  if (validIntersect) {
    selectPart(validIntersect.object);
  } else {
    closeInfoPanel();
  }
}

function selectPart(mesh) {
  if (selectedMesh) selectedMesh.material = originalMaterials.get(selectedMesh.uuid) || selectedMesh.material;
  selectedMesh = mesh;
  selectedMesh.material = outlineMaterial.clone();

  let data = window.getHeartData ? window.getHeartData(mesh.name) : { system: 'Heart', zh: mesh.name, en: mesh.name, desc: '' };
  showInfoPanel(data);
}

function showInfoPanel(data) {
  const panel = document.getElementById('info-panel');
  document.getElementById('info-system').innerText = data.system;
  document.getElementById('info-title-zh').innerText = data.zh;
  document.getElementById('info-title-en').innerText = data.en;
  document.getElementById('info-description').innerText = data.desc;
  panel.classList.add('open');
}

function closeInfoPanel() {
  document.getElementById('info-panel').classList.remove('open');
  if (selectedMesh) {
    selectedMesh.material = originalMaterials.get(selectedMesh.uuid) || selectedMesh.material;
    selectedMesh = null;
  }
}

function setupUIControls() {
  document.getElementById('close-info').addEventListener('click', closeInfoPanel);
  
  const toggleMap = {
    'toggle-myocardium': myocardiumModel,
    'toggle-valves': valvesModel,
    'toggle-coronary': coronaryModel,
    'toggle-vessels': vesselsModel
  };

  for (let id in toggleMap) {
    document.getElementById(id)?.addEventListener('change', e => {
      toggleMap[id].visible = e.target.checked;
    });
  }

  function setOpacity(model, opacity) {
    model.traverse((child) => {
      if (child.isMesh) {
        const mat = originalMaterials.get(child.uuid);
        if (mat) {
          mat.transparent = opacity < 1.0;
          mat.opacity = opacity;
          mat.needsUpdate = true;
        }
      }
    });
  }

  const opacityMap = [
    { slider: 'opacity-myocardium', val: 'opacity-myocardium-val', model: myocardiumModel },
    { slider: 'opacity-valves', val: 'opacity-valves-val', model: valvesModel },
    { slider: 'opacity-coronary', val: 'opacity-coronary-val', model: coronaryModel },
    { slider: 'opacity-vessels', val: 'opacity-vessels-val', model: vesselsModel }
  ];

  opacityMap.forEach(({ slider, val, model }) => {
    const s = document.getElementById(slider);
    const v = document.getElementById(val);
    if (!s) return;
    s.addEventListener('input', (e) => {
      const pct = parseInt(e.target.value, 10);
      if (v) v.textContent = pct + '%';
      setOpacity(model, pct / 100);
    });
  });

  document.querySelectorAll('.camera-views .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const view = e.target.dataset.view;
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      
      // 心臟模型很小，所以偏移量要小
      const offset = 0.15; 
      
      switch(view) {
        case 'front': camera.position.set(center.x, center.y, center.z + offset); break;
        case 'back':  camera.position.set(center.x, center.y, center.z - offset); break;
        case 'top':   camera.position.set(center.x, center.y + offset, center.z); break;
      }
      controls.target.copy(center);
      controls.update();
    });
  });
}

function onWindowResize() {
  const container = document.getElementById('canvas-container');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', init);
