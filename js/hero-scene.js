// 簡單的 Three.js 背景動畫（首頁 Hero 區塊）
// 在取得真實的 3D 解剖模型前，先使用抽象的幾何線條代表科技與人體結構

const initHeroScene = () => {
  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  // 1. Scene, Camera, Renderer
  const scene = new THREE.Scene();
  // 加上一點霧氣效果
  scene.fog = new THREE.FogExp2(0x080c14, 0.05);

  const camera = new THREE.PerspectiveCamera(
    45, 
    container.clientWidth / container.clientHeight, 
    0.1, 
    1000
  );
  camera.position.z = 15;
  camera.position.y = 2;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 2. 建立一個抽象的「人體脊椎/DNA」意象結構
  const group = new THREE.Group();
  scene.add(group);

  // 核心發光柱體
  const coreGeometry = new THREE.CylinderGeometry(0.5, 0.5, 10, 16);
  const coreMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x00d4ff, 
    transparent: true, 
    opacity: 0.1,
    wireframe: true
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  group.add(coreMesh);

  // 環繞的粒子與線條
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  const posArray = new Float32Array(particlesCount * 3);
  
  for(let i = 0; i < particlesCount * 3; i+=3) {
    // 讓粒子圍繞著圓柱體分佈（類似人體軀幹）
    const y = (Math.random() - 0.5) * 12;
    const radius = 2 + Math.sin(y * 0.5) * 1.5; // 模擬身形曲線
    const theta = Math.random() * Math.PI * 2;
    
    posArray[i] = Math.cos(theta) * radius; // x
    posArray[i+1] = y;                      // y
    posArray[i+2] = Math.sin(theta) * radius; // z
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x8ba4c0,
    transparent: true,
    opacity: 0.8
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  group.add(particlesMesh);

  // 3. 打光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x00d4ff, 2, 50);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // 4. 動畫迴圈
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // 緩慢旋轉整個群組
    group.rotation.y = elapsedTime * 0.1;
    
    // 讓粒子稍微上下浮動
    particlesMesh.position.y = Math.sin(elapsedTime * 0.5) * 0.5;

    renderer.render(scene, camera);
  };

  animate();

  // 5. RWD 視窗大小調整
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
};

// DOM 載入後執行
document.addEventListener('DOMContentLoaded', initHeroScene);
