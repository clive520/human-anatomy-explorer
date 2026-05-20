// 3D 探索器主程式邏輯

let scene, camera, renderer, controls;
let skeletonModel = null;
let muscleModel = null;
let vascularModel = null;
let brainSpineModel = new THREE.Group();
let respiratoryModel = null;
let interactableModels = [];
window.debugModels = { skeleton: null, muscle: null, vascular: null, brain_spine: null, respiratory: null };
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

// 儲存原始材質以供還原
const originalMaterials = new Map();

function init() {
  const container = document.getElementById('canvas-container');
  
  // 1. 初始化場景
  scene = new THREE.Scene();
  
  // 2. 初始化相機
  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 5); // 預設正面視角

  // 3. 初始化渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  // 4. 控制器 (OrbitControls)
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, 1, 0); // 將中心點對準人體軀幹中心

  // 5. 光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
  backLight.position.set(-5, 5, -7.5);
  scene.add(backLight);

  // 6. 點擊偵測 (Raycaster)
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // 7. 載入模型
  loadModels();

  // 8. 事件監聽
  window.addEventListener('resize', onWindowResize);
  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('click', onClick);
  
  setupUIControls();

  // 開始動畫迴圈
  animate();
}

function loadModels() {
  const loader = new THREE.GLTFLoader();
  
  let loadedCount = 0;
  let baseScale = 1.0;
  let baseCenter = new THREE.Vector3();

  const checkAllLoaded = () => {
    loadedCount++;
    if (loadedCount >= 6) {
      document.getElementById('loading-overlay').style.display = 'none';
    }
  };

  const handleError = (error) => {
    console.error('載入模型發生錯誤:', error);
    document.getElementById('loading-overlay').innerHTML = '<p style="color:red;">模型載入失敗，請檢查檔案路徑。</p>';
  };

  // 載入骨骼模型
  loader.load(
    './models/skeleton_bodyexplorer.glb',
    (gltf) => {
      skeletonModel = gltf.scene;
      skeletonModel.rotation.x = -Math.PI / 2;
      skeletonModel.updateMatrixWorld(true);

      const box = new THREE.Box3().setFromObject(skeletonModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      baseScale = 2.0 / maxDim;
      baseCenter.copy(center);

      skeletonModel.scale.set(baseScale, baseScale, baseScale);
      skeletonModel.position.x = -baseCenter.x * baseScale;
      skeletonModel.position.y = (-baseCenter.y * baseScale) + 1.0;
      skeletonModel.position.z = -baseCenter.z * baseScale;
      
      skeletonModel.traverse((child) => {
        if (child.isMesh) {
          child.userData.system = 'skeleton';
          originalMaterials.set(child.uuid, child.material);
          interactableModels.push(child);
        }
      });

      scene.add(skeletonModel);
      checkAllLoaded();
    },
    undefined,
    handleError
  );

  // 載入肌肉模型
  loader.load(
    './models/muscles.glb',
    (gltf) => {
      muscleModel = gltf.scene;
      muscleModel.rotation.x = -Math.PI / 2;
      muscleModel.updateMatrixWorld(true);
      muscleModel.scale.set(baseScale, baseScale, baseScale);
      muscleModel.position.x = -baseCenter.x * baseScale;
      muscleModel.position.y = (-baseCenter.y * baseScale) + 1.0;
      muscleModel.position.z = -baseCenter.z * baseScale;
      
      muscleModel.traverse((child) => {
        if (child.isMesh) {
          child.userData.system = 'muscle';
          originalMaterials.set(child.uuid, child.material);
          interactableModels.push(child);
        }
      });

      const toggleCheckbox = document.getElementById('toggle-muscle');
      muscleModel.visible = toggleCheckbox ? toggleCheckbox.checked : false;

      scene.add(muscleModel);
      checkAllLoaded();
    },
    undefined,
    handleError
  );

  // 載入血管模型
  loader.load(
    './models/vascular.glb',
    (gltf) => {
      vascularModel = gltf.scene;
      const box = new THREE.Box3().setFromObject(vascularModel);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const vascularScale = (1.2 / maxDim);
      vascularModel.scale.set(vascularScale, vascularScale, vascularScale);
      vascularModel.position.set(0, 0.95, -0.03);
      
      vascularModel.traverse((child) => {
        if (child.isMesh) {
          child.userData.system = 'vascular';
          originalMaterials.set(child.uuid, child.material);
          interactableModels.push(child);
        }
      });

      const toggleCheckbox = document.getElementById('toggle-vascular');
      vascularModel.visible = toggleCheckbox ? toggleCheckbox.checked : false;

      scene.add(vascularModel);
      checkAllLoaded();
    },
    undefined,
    handleError
  );

  // 載入神經模型 (大腦與脊髓)
  const hraScale = 1.2 / 0.871836645;
  brainSpineModel.scale.set(hraScale, hraScale, hraScale);
  brainSpineModel.position.set(0, 0.74, -0.03);
  scene.add(brainSpineModel);

  loader.load('./models/brain.glb', (gltf) => {
    gltf.scene.traverse(c => { if(c.isMesh) { c.userData.system = 'brain_spine'; interactableModels.push(c); }});
    brainSpineModel.add(gltf.scene);
    checkAllLoaded();
  });

  loader.load('./models/spinal_cord.glb', (gltf) => {
    gltf.scene.traverse(c => { if(c.isMesh) { c.userData.system = 'brain_spine'; interactableModels.push(c); }});
    brainSpineModel.add(gltf.scene);
    checkAllLoaded();
  });

  // 載入呼吸系統模型 (Lung GLB 已包含氣管、支氣管、嗅部軟骨)
  loader.load('./models/respiratory_lung.glb', (gltf) => {
    respiratoryModel = gltf.scene;

    // 自動縮放至骨骼相同的尺度系統
    respiratoryModel.scale.set(hraScale, hraScale, hraScale);
    respiratoryModel.position.set(0, 0.74, -0.03);

    // 建立色彩映射：依網格名稱分配色彩
    const lungColor     = new THREE.Color(0xF4A0B5); // 肉粉色 — 肺葉
    const airwayColor   = new THREE.Color(0xA8D8EA); // 淡藍色 — 氣管/支氣管
    const cartilageColor= new THREE.Color(0xE8E8D0); // 淡黃色 — 軟骨

    respiratoryModel.traverse((child) => {
      if (!child.isMesh) return;
      child.userData.system = 'respiratory';

      const n = child.name.toLowerCase();
      let targetColor;
      if (n.includes('cartilage') || n.includes('thyroid') || n.includes('cricoid') ||
          n.includes('epiglottic') || n.includes('arytenoid') || n.includes('corniculate')) {
        targetColor = cartilageColor;
      } else if (n.includes('bronchus') || n.includes('bronchi') || n.includes('trachea') || n.includes('carina')) {
        targetColor = airwayColor;
      } else {
        targetColor = lungColor;
      }

      const mat = new THREE.MeshStandardMaterial({
        color: targetColor,
        transparent: true,
        opacity: 0.82,
        roughness: 0.5,
        metalness: 0.05,
      });
      child.material = mat;
      originalMaterials.set(child.uuid, mat);
      interactableModels.push(child);
    });

    respiratoryModel.visible = false;
    window.debugModels.respiratory = respiratoryModel;
    scene.add(respiratoryModel);
    checkAllLoaded();
  }, undefined, (err) => { console.warn('呼吸系統載入失敗:', err); checkAllLoaded(); });
}

function onMouseMove(event) {
  const container = document.getElementById('canvas-container');
  const rect = container.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
}

function onClick(event) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactableModels, true);
  if (intersects.length > 0) {
    selectPart(intersects[0].object);
  } else {
    closeInfoPanel();
  }
}

function selectPart(mesh) {
  if (selectedMesh) selectedMesh.material = originalMaterials.get(selectedMesh.uuid) || selectedMesh.material;
  selectedMesh = mesh;
  selectedMesh.material = outlineMaterial.clone();

  let data;
  if (mesh.userData.system === 'respiratory' && window.getRespiratoryData) {
    data = window.getRespiratoryData(mesh.name);
  } else {
    data = window.getAnatomyData ? window.getAnatomyData(mesh.name, mesh.userData.system)
                                 : { system: mesh.userData.system, zh: mesh.name, en: mesh.name, desc: '' };
  }
  showInfoPanel(data, mesh.name);
}

function showInfoPanel(data, rawName) {
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
  document.getElementById('toggle-skeleton')?.addEventListener('change', e => { if(skeletonModel) skeletonModel.visible = e.target.checked; });
  document.getElementById('toggle-muscle')?.addEventListener('change', e => { if(muscleModel) muscleModel.visible = e.target.checked; });
  document.getElementById('toggle-vascular')?.addEventListener('change', e => { if(vascularModel) vascularModel.visible = e.target.checked; });
  document.getElementById('toggle-brain-spine')?.addEventListener('change', e => { if(brainSpineModel) brainSpineModel.visible = e.target.checked; });
  document.getElementById('toggle-respiratory')?.addEventListener('change', e => { if(respiratoryModel) respiratoryModel.visible = e.target.checked; });

  // 各系統個別透明度控制
  function setSystemOpacity(model, opacity) {
    if (!model) return;
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

  const opacityConfigs = [
    { sliderId: 'opacity-skeleton',    valId: 'opacity-skeleton-val',    getModel: () => skeletonModel },
    { sliderId: 'opacity-muscle',      valId: 'opacity-muscle-val',      getModel: () => muscleModel },
    { sliderId: 'opacity-vascular',    valId: 'opacity-vascular-val',    getModel: () => vascularModel },
    { sliderId: 'opacity-brain-spine', valId: 'opacity-brain-spine-val', getModel: () => brainSpineModel },
    { sliderId: 'opacity-respiratory', valId: 'opacity-respiratory-val', getModel: () => respiratoryModel },
  ];

  opacityConfigs.forEach(({ sliderId, valId, getModel }) => {
    const slider = document.getElementById(sliderId);
    const valDisplay = document.getElementById(valId);
    if (!slider) return;
    slider.addEventListener('input', (e) => {
      const pct = parseInt(e.target.value, 10);
      if (valDisplay) valDisplay.textContent = pct + '%';
      setSystemOpacity(getModel(), pct / 100);
    });
  });

  // 視角快捷鍵
  document.querySelectorAll('.camera-views .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const view = e.target.dataset.view;
      const targetPos = new THREE.Vector3(0, 1, 0); // 中心點
      
      switch(view) {
        case 'front': camera.position.set(0, 1.5, 5); break;
        case 'back':  camera.position.set(0, 1.5, -5); break;
        case 'left':  camera.position.set(-5, 1.5, 0); break;
        case 'right': camera.position.set(5, 1.5, 0); break;
      }
      controls.target.copy(targetPos);
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

// 執行初始化
document.addEventListener('DOMContentLoaded', init);
