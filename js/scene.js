// 3D 探索器主程式邏輯

let scene, camera, renderer, controls;
let skeletonModel;
let muscleModel;
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
  const checkAllLoaded = () => {
    loadedCount++;
    if (loadedCount >= 2) {
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
      
      // 自動置中與縮放模型
      const box = new THREE.Box3().setFromObject(skeletonModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.0 / maxDim;
      skeletonModel.scale.set(scale, scale, scale);
      
      skeletonModel.position.x = -center.x * scale;
      skeletonModel.position.y = (-center.y * scale) + 1.0;
      skeletonModel.position.z = -center.z * scale;
      
      skeletonModel.traverse((child) => {
        if (child.isMesh) {
          child.userData.system = 'skeleton';
          originalMaterials.set(child.uuid, child.material);
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
      
      const box = new THREE.Box3().setFromObject(muscleModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.0 / maxDim;
      muscleModel.scale.set(scale, scale, scale);
      
      muscleModel.position.x = -center.x * scale;
      muscleModel.position.y = (-center.y * scale) + 1.0;
      muscleModel.position.z = -center.z * scale;
      
      muscleModel.traverse((child) => {
        if (child.isMesh) {
          child.userData.system = 'muscle';
          originalMaterials.set(child.uuid, child.material);
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
}

// 處理滑鼠移動 (Hover 效果)
function onMouseMove(event) {
  const container = document.getElementById('canvas-container');
  const rect = container.getBoundingClientRect();
  
  mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
}

// 處理點擊 (選取部位並開啟資訊卡)
function onClick(event) {
  raycaster.setFromCamera(mouse, camera);
  
  const interactableModels = [];
  if (muscleModel && muscleModel.visible) interactableModels.push(muscleModel);
  if (skeletonModel && skeletonModel.visible) interactableModels.push(skeletonModel);
  
  if (interactableModels.length === 0) return;
  
  const intersects = raycaster.intersectObjects(interactableModels, true);
  
  if (intersects.length > 0) {
    const object = intersects[0].object;
    selectPart(object);
  } else {
    // 點擊空白處關閉面板
    closeInfoPanel();
  }
}

function selectPart(mesh) {
  // 還原上一個選取物件的材質
  if (selectedMesh) {
    selectedMesh.material = originalMaterials.get(selectedMesh.uuid);
  }
  
  selectedMesh = mesh;
  selectedMesh.material = outlineMaterial.clone();

  // 使用精確比對：mesh.name 即為骨頭/肌肉英文名稱
  const systemType = mesh.userData.system || 'skeleton';
  const data = window.getAnatomyData(mesh.name, systemType);

  showInfoPanel(data, mesh.name);
}

// UI 互動：資訊面板
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
    selectedMesh.material = originalMaterials.get(selectedMesh.uuid);
    selectedMesh = null;
  }
}

// UI 互動：側邊欄控制項
function setupUIControls() {
  // 關閉面板按鈕
  document.getElementById('close-info').addEventListener('click', closeInfoPanel);

  // 系統開關 (目前有骨骼與肌肉)
  const toggleSkeleton = document.getElementById('toggle-skeleton');
  toggleSkeleton.addEventListener('change', (e) => {
    if (skeletonModel) skeletonModel.visible = e.target.checked;
  });

  const toggleMuscle = document.getElementById('toggle-muscle');
  if (toggleMuscle) {
    toggleMuscle.addEventListener('change', (e) => {
      if (muscleModel) muscleModel.visible = e.target.checked;
    });
  }

  // 透明度滑桿
  const opacitySlider = document.getElementById('opacity-slider');
  opacitySlider.addEventListener('input', (e) => {
    const opacity = e.target.value / 100;
    
    const updateOpacity = (model) => {
      if (model) {
        model.traverse((child) => {
          if (child.isMesh) {
            const mat = originalMaterials.get(child.uuid);
            if (mat) {
              mat.transparent = true;
              mat.opacity = opacity;
            }
          }
        });
      }
    };
    
    updateOpacity(skeletonModel);
    updateOpacity(muscleModel);
  });

  // 視角快捷鍵
  document.querySelectorAll('.camera-views .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const view = e.target.dataset.view;
      const targetPos = new THREE.Vector3(0, 1, 0); // 中心點
      
      // 使用 GSAP 或直接設定位置 (這裡用直接設定示範)
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
