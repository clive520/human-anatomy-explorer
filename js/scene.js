// 3D 探索器主程式邏輯

let scene, camera, renderer, controls;
let skeletonModel;
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
  
  // 載入骨骼模型
  loader.load(
    './models/skeleton.glb',
    (gltf) => {
      skeletonModel = gltf.scene;
      
      // 自動置中與縮放模型
      const box = new THREE.Box3().setFromObject(skeletonModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // 計算最大維度，並將模型縮放到大約高 2 單位
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.0 / maxDim;
      skeletonModel.scale.set(scale, scale, scale);
      
      // 將模型中心點移到 (0, 1, 0)
      skeletonModel.position.x = -center.x * scale;
      skeletonModel.position.y = (-center.y * scale) + 1.0;
      skeletonModel.position.z = -center.z * scale;
      
      // 確保所有 Mesh 投射陰影並儲存原始材質
      skeletonModel.traverse((child) => {
        if (child.isMesh) {
          originalMaterials.set(child.uuid, child.material);
        }
      });

      scene.add(skeletonModel);
      
      // 隱藏載入畫面
      document.getElementById('loading-overlay').style.display = 'none';
    },
    (xhr) => {
      // 可在此加入進度條邏輯
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
      console.error('載入模型發生錯誤:', error);
      document.getElementById('loading-overlay').innerHTML = '<p style="color:red;">模型載入失敗，請檢查檔案路徑。</p>';
    }
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
  
  // 僅檢查骨骼模型
  if (!skeletonModel) return;
  
  const intersects = raycaster.intersectObject(skeletonModel, true);
  
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
  // 套用高亮材質
  selectedMesh.material = outlineMaterial;
  
  // 嘗試從資料庫尋找對應說明
  // 注意：這裡使用 toLowerCase 比對，實際需依據您的 GLB Mesh 命名調整
  const meshName = mesh.name.toLowerCase();
  let partData = window.ANATOMY_DATA.skeleton.default;
  
  // 簡單的比對邏輯
  for (const key in window.ANATOMY_DATA.skeleton) {
    if (meshName.includes(key)) {
      partData = window.ANATOMY_DATA.skeleton[key];
      break;
    }
  }

  showInfoPanel(partData, mesh.name);
}

// UI 互動：資訊面板
function showInfoPanel(data, rawName) {
  const panel = document.getElementById('info-panel');
  document.getElementById('info-system').innerText = data.system;
  document.getElementById('info-title-zh').innerText = data.zh;
  
  // 如果找不到對應資料，顯示原始 Mesh 名稱供除錯
  if(data.zh === "人類骨骼系統") {
     document.getElementById('info-title-en').innerText = data.en + ` (${rawName})`;
  } else {
     document.getElementById('info-title-en').innerText = data.en;
  }
  
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

  // 系統開關 (目前僅有骨骼)
  const toggleSkeleton = document.getElementById('toggle-skeleton');
  toggleSkeleton.addEventListener('change', (e) => {
    if (skeletonModel) skeletonModel.visible = e.target.checked;
  });

  // 透明度滑桿
  const opacitySlider = document.getElementById('opacity-slider');
  opacitySlider.addEventListener('input', (e) => {
    const opacity = e.target.value / 100;
    if (skeletonModel) {
      skeletonModel.traverse((child) => {
        if (child.isMesh) {
          const mat = originalMaterials.get(child.uuid);
          if (mat) {
            mat.transparent = true;
            mat.opacity = opacity;
          }
        }
      });
    }
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
