// 骨骼部位資料對照表
// Key 通常會對應到 3D 模型中的 Mesh 名稱 (例如 "Skull", "Femur")

window.ANATOMY_DATA = {
  skeleton: {
    // 若無法精確對應 Mesh 名稱，會使用這個預設資料
    default: {
      zh: "人類骨骼系統",
      en: "Human Skeleton",
      system: "骨骼系統",
      desc: "成人骨骼系統通常由 206 塊骨頭組成，分為中軸骨骼（頭骨、脊柱、肋骨）與附肢骨骼（四肢、骨盆）。它提供了人體的物理支撐、保護內部器官，並與肌肉協同進行運動。"
    },
    // 預期模型中可能有的部位名稱（根據模型結構調整）
    "skull": {
      zh: "頭蓋骨",
      en: "Skull / Cranium",
      system: "骨骼系統",
      desc: "頭蓋骨由 22 塊骨骼組成，主要功能是保護脆弱的大腦，並構成臉部的基本輪廓。"
    },
    "spine": {
      zh: "脊柱",
      en: "Spine / Vertebral Column",
      system: "骨骼系統",
      desc: "脊柱由 33 塊椎骨組成，是人體軀幹的主要支撐結構，同時保護其中的脊髓神經。"
    },
    "ribs": {
      zh: "肋骨",
      en: "Rib Cage",
      system: "骨骼系統",
      desc: "人體通常有 12 對肋骨，它們與胸骨和脊椎共同構成胸廓，保護心臟與肺臟等重要器官。"
    },
    "femur": {
      zh: "股骨",
      en: "Femur",
      system: "骨骼系統",
      desc: "股骨位於大腿，是人體中最長、最重且最強壯的骨頭，支撐著上半身的重量。"
    },
    "pelvis": {
      zh: "骨盆",
      en: "Pelvis",
      system: "骨骼系統",
      desc: "骨盆位於軀幹下方，連接脊柱與下肢，負責保護下腹部器官（如膀胱、生殖器官）。"
    }
  }
};
