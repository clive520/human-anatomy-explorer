# 人體解剖互動網站 — Human Anatomy Explorer

一個以 Three.js 為核心的 3D 互動人體解剖學習網站，支援骨骼、肌肉、血管、神經四大系統的視覺化探索。

## 功能特色

- 🦴 **骨骼系統**：可旋轉的 3D 骨骼模型，點擊查看各骨骼中英對照說明
- 💪 **肌肉系統**：肌肉群分層展示，了解各肌肉位置與功能
- 🫀 **血管系統**：動脈（紅）與靜脈（藍）的完整循環系統
- 🧠 **神經系統**：中樞與周邊神經系統的空間分布

## 技術棧

- **3D 引擎**：Three.js（OrbitControls + GLTFLoader + Raycaster）
- **前端**：HTML5 + CSS3 + Vanilla JavaScript
- **部署**：Firebase Hosting
- **版控**：GitHub

## 開發工作流程

```bash
# 開發時
# 直接開啟 index.html 或使用 Live Server

# 安全部署（先備份 GitHub，再部署 Firebase）
node deploy.js
```

## 工作日誌

所有變更請見 [CHANGELOG.md](./CHANGELOG.md)

## 專案結構

```
human-anatomy-explorer/
├── index.html          # 首頁
├── explorer.html       # 3D 探索器主頁面
├── css/
│   ├── base.css        # 設計系統變數
│   ├── components.css  # UI 元件
│   └── explorer.css    # 探索器樣式
├── js/
│   ├── scene.js        # Three.js 場景
│   ├── controls.js     # 相機控制
│   ├── raycaster.js    # 點擊偵測
│   ├── ui.js           # UI 互動
│   └── data/           # 各系統解剖資料（中英）
├── models/             # 3D 模型 (.glb)
├── assets/             # 字型、圖示等靜態資源
├── deploy.js           # 安全部署腳本
├── firebase.json       # Firebase 設定
└── CHANGELOG.md        # 工作日誌
```

## 授權

本專案僅供學習與教育用途。
