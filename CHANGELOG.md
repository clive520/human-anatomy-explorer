# 工作日誌 (Changelog)

這份文件記錄「人體解剖互動網站 Human Anatomy Explorer」專案中所有的變更、新增功能與修復項目。

---

## [2026-05-14] — 修正血管系統座標與縮放比例對齊問題

### 修復 (Fixed)
- **多來源 3D 模型對齊問題**：
  - 修正了來自不同來源的模型（骨骼系統來自 BodyExplorer、血管系統來自 HRA）在座標系與預設縮放比例上的嚴重不一致。
  - 將骨骼與肌肉模型統一進行 Y-up 座標系旋轉 (`rotation.x = -Math.PI / 2`)，並建立共用的基準縮放點 (`baseScale` 與 `baseCenter`)。
  - 對血管系統 (`vascular.glb`) 獨立實施精細校準，將縮放比例調至 `1.2 / maxDim`，並將中心點推移至 `y=0.95`，確保心臟位於胸骨後方，大動脈貼齊脊柱，且下肢血管分叉點精準吻合骨盆位置。

---

## [2026-05-13] — 新增血管系統 (Vascular System) 與三層模型整合

### 新增 (Added)
- 導入 `vascular.glb` 模型 (106 個獨立血管 Mesh，由 Human Reference Atlas 提供)，實現心血管系統 3D 視覺化。
- 建立 `js/data/vascular.js` 資料庫，提供主動脈、腔靜脈等關鍵血管的雙語解說。
- `explorer.html` 左側控制台正式啟用「血管系統」切換開關，並確保能與骨骼、肌肉模型疊加顯示。

### 變更 (Changed)
- `js/scene.js` 新增第三個模型的載入與點擊偵測邏輯，所有模型同步受整體透明度滑桿控制。
- `js/data/skeleton.js` 的智慧後備機制 (Fallback) 擴充：
  - 專為血管系統移除 `vh_m_` 標記，自動格式化名稱顯示。
  - 新增動靜脈中英文智能推斷。

---

## [2026-05-13] — 整合肌肉系統與 3D 雙層模型支援

### 新增 (Added)
- 導入 `muscles.glb` 模型 (467 個獨立 Mesh)，支援肌肉系統視覺化展示。
- 建立 `js/data/muscles.js` 解剖資料庫，新增常見肌肉群的中英對照（如：胸大肌、腹直肌、肱二頭肌等）。
- `explorer.html` 左側控制台正式啟用「肌肉系統」切換開關。

### 變更 (Changed)
- 重構 `js/scene.js` 3D 核心：
  - 支援骨骼與肌肉雙模型的非同步平行載入。
  - 將模型載入與縮放邏輯標準化，確保多模型能共用同一套展示規格。
  - Raycaster 點擊偵測升級，能動態辨識目前開啟的系統圖層並選取對應的 Mesh。
  - 透過 `userData.system` 區分骨骼與肌肉模型，以呼叫正確的資料字典。
- 重構 `js/data/skeleton.js` 的 `window.getAnatomyData` 函式：
  - 支援傳入 `type` 參數，動態決定查詢哪個資料庫。
  - 強化的智慧後備處理 (Fallback Logic) 支援自動過濾底線字元，並針對肌肉英文名稱字根 (如 flexor, extensor) 進行模糊推斷分類。


## [2026-05-09] — 擴充骨骼系統解剖資料庫

### 新增 (Added)
- 全面擴充 `js/data/skeleton.js` 解剖資料庫，補齊人體主要骨骼的中英對照與詳細說明。
  - 涵蓋頭顱骨 (如：額骨、顳骨、下頜骨等)。
  - 涵蓋脊柱與胸廓 (如：頸椎、胸椎、胸骨、肋骨等)。
  - 涵蓋上肢與肩帶 (如：鎖骨、肩胛骨、肱骨、尺橈骨、指骨等)。
  - 涵蓋骨盆與下肢 (如：髂骨、坐骨、股骨、髕骨、脛腓骨、距骨等)。
- 資料庫採用英文學名(全小寫)與模型 Mesh 進行模糊比對，點擊 3D 模型任一部位即可自動顯示對應的中文解說。


## [2026-05-08] — 骨骼系統 3D 核心上線

### 新增 (Added)
- 下載並整合開源 `skeleton.glb` 高畫質 3D 骨骼模型 (26MB)。
- 建立 `explorer.html` 探索器主介面，支援響應式與玻璃擬態設計。
- 實作 `scene.js` (Three.js 核心邏輯)：
  - 支援模型自動計算 Bounding Box 進行置中與等比例縮放。
  - 實作 OrbitControls (滑鼠旋轉、縮放、平移)。
  - 實作 Raycaster，支援點擊模型任一部位高亮選取。
- 實作左側控制台：圖層開關、整體透明度滑桿、快速視角切換 (正面/背面/左右)。
- 實作右側智慧資訊面板：點擊部位自動對應 `skeleton.js` 資料庫顯示中英說明。
- 正式部署至 Firebase Hosting (`human-anatomy-explorer-18e1b.web.app`)。

---

## [2026-05-08] — 環境建置完成，首次部署成功

### 新增 (Added)
- 建立 GitHub Repository：`clive520/human-anatomy-explorer`
- 建立 Firebase 專案：`human-anatomy-explorer-18e1b`
- 啟用 Firebase Hosting，網站網址：`https://human-anatomy-explorer-18e1b.web.app`
- 新增佔位頁面 `index.html`，確認部署流程正常
- 修正 `deploy.js`：改用 `cmd /c npx` 解決 PowerShell 執行原則限制

### 工作流程確認
- ✅ GitHub 版控：`git push` 正常
- ✅ Firebase 部署：`npx firebase-tools deploy --only hosting` 正常
- ✅ 安全部署腳本 `deploy.js` 已驗證（先 GitHub 後 Firebase）

---

## [2026-05-08] — 專案初始化

### 新增 (Added)
- 建立專案資料夾結構 `human-anatomy-explorer/`
- 初始化 Git 版本控制 (`git init`)
- 建立 `.gitignore`（排除 node_modules、dist、.firebase 等）
- 建立 `README.md`（專案說明、技術棧、開發流程）
- 建立本工作日誌 `CHANGELOG.md`
- 建立安全部署腳本 `deploy.js`（強制 GitHub 備份後才部署 Firebase）
- 建立 Firebase 設定檔 `firebase.json`

### 規劃 (Planned)
- 開發計畫書已確認：3D 展示、四大系統（骨骼、肌肉、血管、神經）、中英對照、無帳號瀏覽
- 技術選型：Three.js + OrbitControls + GLTFLoader + Raycaster
- 部署策略：GitHub 版控 + Firebase Hosting

---

*未來每次有實質變更，請在此文件頂部新增一個日期區塊記錄。*
