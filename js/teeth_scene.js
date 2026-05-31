// 牙齒 3D 場景（真實 3D 模型版）— v5

let scene, camera, renderer, controls;
let teethModel = null;
let interactableObjects = [];
let raycaster, mouse;
let selectedMesh = null;
const originalMaterials = new Map();

const highlightMat = new THREE.MeshStandardMaterial({
  color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 0.45,
  transparent: true, opacity: 0.85, roughness: 0.1, wireframe: true
});

function init() {
  const container = document.getElementById('canvas-container');

  scene  = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.01, 100);
  camera.position.set(0, 0, 50); // 將隨模型大小調整

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping   = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.1;
  controls.maxDistance = 50.0;
  
  // 燈光
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dl1 = new THREE.DirectionalLight(0xffffff, 1.2); dl1.position.set(1, 1, 2); scene.add(dl1);
  const dl2 = new THREE.DirectionalLight(0xfff5e8, 0.5); dl2.position.set(-1, -1, -1); scene.add(dl2);
  const dl3 = new THREE.DirectionalLight(0xffffff, 0.35); dl3.position.set(0, 2, -1); scene.add(dl3);

  raycaster = new THREE.Raycaster();
  mouse     = new THREE.Vector2();

  window.addEventListener('resize', onWindowResize);
  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('click', onClick);

  setupUIControls();
  loadModel();
  animate();
}

function loadModel() {
  const loader = new THREE.GLTFLoader();
  
  // Set up DRACOLoader
  const dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
  loader.setDRACOLoader(dracoLoader);

  const overlay = document.getElementById('loading-overlay');
  
  loader.load(
    './assets/models/human_teeth_segmented_draco.glb',
    function (gltf) {
      teethModel = gltf.scene;
      
      // 用一個 Group 包裝以便於縮放與置中
      const wrapper = new THREE.Group();
      wrapper.add(teethModel);
      
      const box = new THREE.Box3().setFromObject(teethModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      
      // 1. 將模型在其局部空間中置中
      teethModel.position.x = -center.x;
      teethModel.position.y = -center.y;
      teethModel.position.z = -center.z;
      
      // 2. 縮放外層 wrapper
      // 檢查 maxDim 是否異常大（如果有雜訊點）
      let scale = 3.0 / maxDim;
      if (scale < 0.001) scale = 1; // 防呆機制
      wrapper.scale.set(scale, scale, scale);
      
      scene.add(wrapper);
      
      // 設定視角
      camera.position.set(0, 0, 4);
      controls.target.set(0, 0, 0);
      controls.update();

      // 提取可互動網格，確保雙面渲染
      teethModel.traverse((child) => {
        if (child.isMesh) {
          if (child.material) {
            child.material.side = THREE.DoubleSide;
            // 如果模型太黑，可以給點基礎亮度
            if (child.material.color.getHex() === 0x000000) {
              child.material.color.setHex(0xeeeeee);
            }
          }
          interactableObjects.push(child);
          originalMaterials.set(child.uuid, child.material);
        }
      });
      
      console.log(`成功載入牙齒模型！網格數: ${interactableObjects.length}`);
      if (overlay) overlay.style.display = 'none';
    },
    function (xhr) {
      if (overlay) {
        overlay.innerHTML = `<div class="spinner"></div><p>載入中... ${Math.round(xhr.loaded / xhr.total * 100)}%</p>`;
      }
    },
    function (error) {
      console.error('模型載入失敗:', error);
      if (overlay) overlay.innerHTML = '<p style="color:#ff6b6b">模型載入失敗！請確認 assets/models/human_teeth.glb 是否存在。</p>';
    }
  );
}

// ── 互動 ─────────────────────────────────────────────────
function onMouseMove(evt) {
  const c = document.getElementById('canvas-container');
  const r = c.getBoundingClientRect();
  mouse.x =  ((evt.clientX - r.left) / c.clientWidth)  * 2 - 1;
  mouse.y = -((evt.clientY - r.top)  / c.clientHeight) * 2 + 1;
}

function onClick() {
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(interactableObjects, false);

  if (selectedMesh) {
    selectedMesh.material = originalMaterials.get(selectedMesh.uuid) || selectedMesh.material;
    selectedMesh = null;
  }

  if (!hits.length) { closeInfoPanel(); return; }
  
  const mesh = hits[0].object;
  mesh.material = highlightMat.clone();
  selectedMesh = mesh;

  // 嘗試解析牙位 Tooth_1 ~ Tooth_32
  const meshName = mesh.name || '';
  const match = meshName.match(/Tooth_(\d+)/);
  
  if (match && window.TEETH_INFO) {
    const id = parseInt(match[1]);
    const toothInfo = window.TEETH_INFO[id];
    if (toothInfo) {
      document.getElementById('info-system').innerText = '牙齒模型';
      document.getElementById('info-tooth-num').innerText = `#${id}`;
      document.getElementById('info-title-zh').innerText = toothInfo.zh;
      document.getElementById('info-title-en').innerText = toothInfo.en;
      document.getElementById('info-description').innerText = toothInfo.desc;
      document.getElementById('info-panel').classList.add('open');
      return;
    }
  }
  
  //  fallback
  const data = { 
    system: '牙齒模型', 
    zh: meshName === 'Gums' ? '牙齦' : (meshName || '選取的部位'), 
    en: '', 
    desc: meshName === 'Gums' ? '支撐和保護牙齒的軟組織。' : '這是一顆由真實 3D 掃描生成的牙齒模型。' 
  };
  
  document.getElementById('info-system').innerText      = data.system;
  document.getElementById('info-tooth-num').innerText   = '';
  document.getElementById('info-title-zh').innerText    = data.zh;
  document.getElementById('info-title-en').innerText    = data.en;
  document.getElementById('info-description').innerText = data.desc;
  document.getElementById('info-panel').classList.add('open');
}

function closeInfoPanel() {
  if (selectedMesh) {
    selectedMesh.material = originalMaterials.get(selectedMesh.uuid) || selectedMesh.material;
    selectedMesh = null;
  }
  document.getElementById('info-panel').classList.remove('open');
}

// ── UI ───────────────────────────────────────────────────
function setupUIControls() {
  document.getElementById('close-info').addEventListener('click', closeInfoPanel);

  const VIEWS = {
    front:  [0,   0,    4],
    top:    [0,   4,    0.5],
    bottom: [0,  -4,    0.5],
    left:   [-4,  0,    0.5],
  };
  document.querySelectorAll('.camera-views .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = VIEWS[btn.dataset.view];
      if (v) { camera.position.set(...v); controls.target.set(0, 0, 0); controls.update(); }
    });
  });

  const toggleUpper = document.getElementById('toggle-upper');
  const toggleLower = document.getElementById('toggle-lower');
  
  if (toggleUpper) {
    toggleUpper.addEventListener('change', (e) => {
      interactableObjects.forEach(mesh => {
        const match = mesh.name.match(/Tooth_(\d+)/);
        if (match) {
          const id = parseInt(match[1]);
          if (id >= 1 && id <= 16) {
            mesh.visible = e.target.checked;
          }
        }
      });
    });
  }

  if (toggleLower) {
    toggleLower.addEventListener('change', (e) => {
      interactableObjects.forEach(mesh => {
        const match = mesh.name.match(/Tooth_(\d+)/);
        if (match) {
          const id = parseInt(match[1]);
          if (id >= 17 && id <= 32) {
            mesh.visible = e.target.checked;
          }
        }
      });
    });
  }
}

function onWindowResize() {
  const c = document.getElementById('canvas-container');
  camera.aspect = c.clientWidth / c.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(c.clientWidth, c.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', init);
