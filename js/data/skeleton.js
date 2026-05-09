// 骨骼部位資料對照表
// Key 對應到 3D 模型中的 Mesh 名稱 (全小寫比對)
// 涵蓋人體主要骨骼系統 (約 206 塊骨頭的分類)

window.ANATOMY_DATA = {
  skeleton: {
    default: {
      zh: "人類骨骼系統",
      en: "Human Skeleton",
      system: "骨骼系統",
      desc: "成人骨骼系統通常由 206 塊骨頭組成，分為中軸骨骼（頭骨、脊柱、肋骨）與附肢骨骼（四肢、骨盆）。它提供了人體的物理支撐、保護內部器官，並與肌肉協同進行運動。"
    },

    // ==========================================
    // 1. 頭顱骨 (Skull)
    // ==========================================
    "skull": {
      zh: "頭蓋骨 (總稱)",
      en: "Skull / Cranium",
      system: "骨骼系統 - 中軸骨",
      desc: "頭蓋骨由 22 塊骨骼組成，主要功能是保護脆弱的大腦，並構成臉部的基本輪廓。"
    },
    "frontal": {
      zh: "額骨",
      en: "Frontal Bone",
      system: "骨骼系統 - 腦顱骨",
      desc: "構成前額和眼眶頂部的骨頭，保護大腦前葉。"
    },
    "parietal": {
      zh: "頂骨",
      en: "Parietal Bone",
      system: "骨骼系統 - 腦顱骨",
      desc: "位於頭骨兩側和頂部，構成顱腔的主要部分。"
    },
    "temporal": {
      zh: "顳骨",
      en: "Temporal Bone",
      system: "骨骼系統 - 腦顱骨",
      desc: "位於頭骨兩側下方，包圍著內耳與中耳結構。"
    },
    "occipital": {
      zh: "枕骨",
      en: "Occipital Bone",
      system: "骨骼系統 - 腦顱骨",
      desc: "位於頭骨後部和底部，包含枕骨大孔，是脊髓與大腦連接的通道。"
    },
    "sphenoid": {
      zh: "蝶骨",
      en: "Sphenoid Bone",
      system: "骨骼系統 - 腦顱骨",
      desc: "形狀像蝴蝶，位於顱底中部，幾乎與所有其他腦顱骨相連。"
    },
    "maxilla": {
      zh: "上頜骨",
      en: "Maxilla",
      system: "骨骼系統 - 顏面骨",
      desc: "構成上顎的核心骨骼，支撐上排牙齒，並形成鼻腔和眼眶的一部分。"
    },
    "mandible": {
      zh: "下頜骨",
      en: "Mandible",
      system: "骨骼系統 - 顏面骨",
      desc: "下顎骨，是頭骨中唯一可以自由活動的骨頭，支撐下排牙齒並參與咀嚼。"
    },
    "zygomatic": {
      zh: "顴骨",
      en: "Zygomatic Bone",
      system: "骨骼系統 - 顏面骨",
      desc: "俗稱的顴骨，構成臉頰的隆起部分及眼眶的外側壁。"
    },
    "nasal": {
      zh: "鼻骨",
      en: "Nasal Bone",
      system: "骨骼系統 - 顏面骨",
      desc: "兩塊小骨頭，構成鼻樑的堅硬部分。"
    },

    // ==========================================
    // 2. 脊柱 (Vertebral Column)
    // ==========================================
    "spine": {
      zh: "脊柱 (總稱)",
      en: "Spine / Vertebral Column",
      system: "骨骼系統 - 中軸骨",
      desc: "由 33 塊椎骨組成，是人體軀幹的主要支撐結構，保護脊髓神經。"
    },
    "cervical": {
      zh: "頸椎",
      en: "Cervical Vertebrae (C1-C7)",
      system: "骨骼系統 - 脊柱",
      desc: "位於頸部的 7 塊椎骨，支撐頭部重量並允許頭部靈活轉動。第一頸椎稱為寰椎，第二頸椎稱為樞椎。"
    },
    "thoracic": {
      zh: "胸椎",
      en: "Thoracic Vertebrae (T1-T12)",
      system: "骨骼系統 - 脊柱",
      desc: "位於胸部的 12 塊椎骨，兩側與肋骨相連，構成胸廓的後壁。"
    },
    "lumbar": {
      zh: "腰椎",
      en: "Lumbar Vertebrae (L1-L5)",
      system: "骨骼系統 - 脊柱",
      desc: "位於下背部的 5 塊椎骨，體積最大，承受上半身的大部分重量。"
    },
    "sacrum": {
      zh: "薦骨 (骶骨)",
      en: "Sacrum",
      system: "骨骼系統 - 脊柱",
      desc: "由 5 塊薦椎癒合而成，呈倒三角形，連接腰椎與骨盆（髂骨）。"
    },
    "coccyx": {
      zh: "尾骨",
      en: "Coccyx",
      system: "骨骼系統 - 脊柱",
      desc: "人體演化遺留的尾巴殘跡，由 3-5 塊尾椎癒合而成，為某些骨盆底肌肉提供附著點。"
    },

    // ==========================================
    // 3. 胸廓 (Thoracic Cage)
    // ==========================================
    "sternum": {
      zh: "胸骨",
      en: "Sternum / Breastbone",
      system: "骨骼系統 - 中軸骨",
      desc: "位於胸部正中前方的扁平骨，與兩側肋骨相連，保護心臟與大血管。"
    },
    "rib": {
      zh: "肋骨",
      en: "Ribs",
      system: "骨骼系統 - 中軸骨",
      desc: "人體有 12 對肋骨。前 7 對為真肋（直接連胸骨），第 8-10 對為假肋，第 11-12 對為浮肋。"
    },
    "clavicle": {
      zh: "鎖骨",
      en: "Clavicle / Collarbone",
      system: "骨骼系統 - 肩帶",
      desc: "呈 S 型的長骨，橫跨胸部前上方，連接胸骨與肩胛骨，是上肢與軀幹間的主要支撐點。"
    },
    "scapula": {
      zh: "肩胛骨",
      en: "Scapula / Shoulder Blade",
      system: "骨骼系統 - 肩帶",
      desc: "位於背部兩側的三角形扁骨，連接鎖骨與肱骨，提供多條肩部肌肉的附著點。"
    },

    // ==========================================
    // 4. 上肢 (Upper Limbs)
    // ==========================================
    "humerus": {
      zh: "肱骨",
      en: "Humerus",
      system: "骨骼系統 - 上肢骨",
      desc: "上臂的唯一骨骼，上端與肩胛骨形成肩關節，下端與尺骨、橈骨形成肘關節。"
    },
    "radius": {
      zh: "橈骨",
      en: "Radius",
      system: "骨骼系統 - 上肢骨",
      desc: "前臂外側（大拇指側）的長骨，允許前臂進行旋轉（手心翻上/翻下）的動作。"
    },
    "ulna": {
      zh: "尺骨",
      en: "Ulna",
      system: "骨骼系統 - 上肢骨",
      desc: "前臂內側（小指側）的長骨，與肱骨緊密連接，形成肘關節的主要鉸鏈結構。"
    },
    "carpal": {
      zh: "腕骨",
      en: "Carpals",
      system: "骨骼系統 - 上肢骨",
      desc: "手腕由 8 塊不規則的短骨組成，分兩排排列，提供手腕極大的靈活性。"
    },
    "metacarpal": {
      zh: "掌骨",
      en: "Metacarpals",
      system: "骨骼系統 - 上肢骨",
      desc: "手掌部位的 5 根長骨，連接腕骨與手指骨。"
    },
    "phalan": { // 涵蓋 phalanx / phalanges
      zh: "指骨 / 趾骨",
      en: "Phalanges",
      system: "骨骼系統 - 四肢骨",
      desc: "構成手指或腳趾的骨頭。大拇指/大拇趾各有 2 節，其餘各有 3 節。"
    },

    // ==========================================
    // 5. 骨盆與下肢 (Pelvis & Lower Limbs)
    // ==========================================
    "pelvis": {
      zh: "骨盆 (總稱)",
      en: "Pelvis",
      system: "骨骼系統 - 骨盆帶",
      desc: "骨盆由左右兩塊髖骨、薦骨及尾骨構成，保護下腹部器官並將體重傳遞至下肢。"
    },
    "ilium": {
      zh: "髂骨 (腸骨)",
      en: "Ilium",
      system: "骨骼系統 - 骨盆帶",
      desc: "髖骨最大且最上方的部分，兩側突出的部分即為我們摸得到的髖骨邊緣。"
    },
    "ischium": {
      zh: "坐骨",
      en: "Ischium",
      system: "骨骼系統 - 骨盆帶",
      desc: "髖骨的後下方部分，是我們坐著時主要承受重量的骨頭。"
    },
    "pubis": {
      zh: "恥骨",
      en: "Pubis",
      system: "骨骼系統 - 骨盆帶",
      desc: "髖骨的前下方部分，左右兩塊恥骨在前方相連，形成恥骨聯合。"
    },
    "femur": {
      zh: "股骨",
      en: "Femur / Thigh Bone",
      system: "骨骼系統 - 下肢骨",
      desc: "位於大腿，是人體中最長、最重且最強壯的骨頭，上接骨盆形成髖關節，下接脛骨形成膝關節。"
    },
    "patella": {
      zh: "髕骨 (膝蓋骨)",
      en: "Patella / Kneecap",
      system: "骨骼系統 - 下肢骨",
      desc: "人體最大的種子骨，包埋在股四頭肌腱中，保護膝關節前方並增加肌肉的槓桿力。"
    },
    "tibia": {
      zh: "脛骨",
      en: "Tibia / Shinbone",
      system: "骨骼系統 - 下肢骨",
      desc: "小腿內側的粗大長骨，是小腿主要承受重量的骨骼。"
    },
    "fibula": {
      zh: "腓骨",
      en: "Fibula",
      system: "骨骼系統 - 下肢骨",
      desc: "小腿外側較細的長骨，不直接承受體重，主要提供小腿肌肉的附著點，並穩定踝關節。"
    },
    "tarsal": {
      zh: "跗骨",
      en: "Tarsals",
      system: "骨骼系統 - 下肢骨",
      desc: "足踝部位的 7 塊短骨，包含最大的跟骨與構成踝關節的距骨。"
    },
    "talus": {
      zh: "距骨",
      en: "Talus",
      system: "骨骼系統 - 下肢骨",
      desc: "位於跟骨上方，與脛骨、腓骨相連形成踝關節，負責將體重傳導至足部。"
    },
    "calcaneus": {
      zh: "跟骨",
      en: "Calcaneus / Heel Bone",
      system: "骨骼系統 - 下肢骨",
      desc: "人體最大的跗骨，構成腳跟，承受行走時的巨大衝擊力，並連接阿基里斯腱。"
    },
    "metatarsal": {
      zh: "蹠骨",
      en: "Metatarsals",
      system: "骨骼系統 - 下肢骨",
      desc: "構成腳掌的 5 根長骨，連接跗骨與腳趾骨，參與形成足弓。"
    }
  }
};
