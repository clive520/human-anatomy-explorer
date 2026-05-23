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
  const overlay = document.getElementById('loading-overlay');
  
  loader.load(
    './assets/models/human_teeth.glb',
    function (gltf) {
      teethModel = gltf.scene;
      
      // 自動置中與縮放
      const box = new THREE.Box3().setFromObject(teethModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      teethModel.position.x += (teethModel.position.x - center.x);
      teethModel.position.y += (teethModel.position.y - center.y);
      teethModel.position.z += (teethModel.position.z - center.z);
      
      const scale = 2.0 / maxDim; // 縮放至約 2 單位大
      teethModel.scale.set(scale, scale, scale);
      
      scene.add(teethModel);
      
      // 設定視角
      camera.position.set(0, 0, 3);
      controls.target.set(0, 0, 0);
      controls.update();

      // 提取可互動網格
      teethModel.traverse((child) => {
        if (child.isMesh) {
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

  // 如果模型有名稱，可以嘗試解析牙位，否則顯示通用資訊
  const meshName = mesh.name || '';
  
  const data = { 
    system: '牙齒模型', 
    zh: meshName || '選取的部位', 
    en: '', 
    desc: '這是一顆由真實 3D 掃描/建模生成的牙齒模型。由於是外部匯入的模型，目前無法自動分辨精確牙位。' 
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
    front:  [0,   0,    3],
    top:    [0,   3,    0.5],
    bottom: [0,  -3,    0.5],
    left:   [-3,  0,    0.5],
  };
  document.querySelectorAll('.camera-views .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = VIEWS[btn.dataset.view];
      if (v) { camera.position.set(...v); controls.target.set(0, 0, 0); controls.update(); }
    });
  });
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
