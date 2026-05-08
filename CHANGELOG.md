# 工作日誌 (Changelog)

這份文件記錄「人體解剖互動網站 Human Anatomy Explorer」專案中所有的變更、新增功能與修復項目。

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
