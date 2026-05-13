// 骨骼資料庫 — 使用 BodyExplorer 模型的精確 Mesh 名稱作為 key
window.ANATOMY_DATA = {
  skeleton: {
    default: {
      zh: "骨骼", en: "Bone", system: "骨骼系統",
      desc: "點擊任意骨骼部位以查看詳細資訊。"
    },

    // === 頭顱 ===
    "frontal bone": { zh:"額骨", en:"Frontal Bone", system:"腦顱骨", desc:"構成前額和眼眶頂部，保護大腦前葉。" },
    "occipital bone": { zh:"枕骨", en:"Occipital Bone", system:"腦顱骨", desc:"頭骨後下方，含枕骨大孔，為脊髓與大腦連接通道。" },
    "sphenoid bone": { zh:"蝶骨", en:"Sphenoid Bone", system:"腦顱骨", desc:"形似蝴蝶，位於顱底中部，與所有腦顱骨相連。" },
    "ethmoid": { zh:"篩骨", en:"Ethmoid Bone", system:"腦顱骨", desc:"位於鼻腔頂部，形成嗅覺神經通道。" },
    "vomer": { zh:"犁骨", en:"Vomer", system:"顏面骨", desc:"構成鼻中隔後下方的薄骨。" },
    "mandible": { zh:"下頜骨", en:"Mandible", system:"顏面骨", desc:"頭骨中唯一可活動的骨頭，支撐下排牙齒，參與咀嚼與說話。" },
    "manubrium": { zh:"胸骨柄", en:"Manubrium", system:"胸廓", desc:"胸骨最上方的部分，連接鎖骨與第一、二肋骨。" },
    "body of sternum": { zh:"胸骨體", en:"Body of Sternum", system:"胸廓", desc:"胸骨中間主體，連接第二至第七肋骨。" },
    "xiphoid process": { zh:"劍突", en:"Xiphoid Process", system:"胸廓", desc:"胸骨最下方的小突起，為腹肌提供附著點。" },
    "hyoid bone": { zh:"舌骨", en:"Hyoid Bone", system:"頸部", desc:"頸部懸浮的U形骨，支撐舌頭、喉嚨和氣管。" },
    "hyoid bone (2)": { zh:"舌骨（副）", en:"Hyoid Bone", system:"頸部", desc:"舌骨副構件，協助支撐舌頭與喉部肌肉。" },

    // 左側頭顱
    "left parietal bone": { zh:"左頂骨", en:"Left Parietal Bone", system:"腦顱骨", desc:"構成頭骨頂部左側，保護大腦頂葉。" },
    "left temporal bone": { zh:"左顳骨", en:"Left Temporal Bone", system:"腦顱骨", desc:"頭骨左下側，包圍內耳與中耳。" },
    "left maxilla": { zh:"左上頜骨", en:"Left Maxilla", system:"顏面骨", desc:"左側上顎骨，支撐上排左半部牙齒，形成鼻腔底部與眼眶下壁。" },
    "left nasal bone": { zh:"左鼻骨", en:"Left Nasal Bone", system:"顏面骨", desc:"構成鼻樑左側的小骨頭。" },
    "left zygomatic bone": { zh:"左顴骨", en:"Left Zygomatic Bone", system:"顏面骨", desc:"左臉頰隆起部分，形成眼眶外側壁。" },
    "left lacrimal bone": { zh:"左淚骨", en:"Left Lacrimal Bone", system:"顏面骨", desc:"眼眶內側最薄的小骨，含淚管通道。" },
    "left palatine bone": { zh:"左腭骨", en:"Left Palatine Bone", system:"顏面骨", desc:"構成硬腭後部與鼻腔側壁的L形骨。" },

    // 右側頭顱
    "right parietal bone": { zh:"右頂骨", en:"Right Parietal Bone", system:"腦顱骨", desc:"構成頭骨頂部右側，保護大腦頂葉。" },
    "right temporal bone": { zh:"右顳骨", en:"Right Temporal Bone", system:"腦顱骨", desc:"頭骨右下側，包圍內耳與中耳。" },
    "right maxilla": { zh:"右上頜骨", en:"Right Maxilla", system:"顏面骨", desc:"右側上顎骨，支撐上排右半部牙齒。" },
    "right nasal bone": { zh:"右鼻骨", en:"Right Nasal Bone", system:"顏面骨", desc:"構成鼻樑右側的小骨頭。" },
    "right zygomatic bone": { zh:"右顴骨", en:"Right Zygomatic Bone", system:"顏面骨", desc:"右臉頰隆起部分，形成眼眶外側壁。" },
    "right lacrimal bone": { zh:"右淚骨", en:"Right Lacrimal Bone", system:"顏面骨", desc:"眼眶內側薄骨，含淚管通道。" },
    "right palatine bone": { zh:"右腭骨", en:"Right Palatine Bone", system:"顏面骨", desc:"右側硬腭後部與鼻腔側壁的L形骨。" },

    // === 脊柱 ===
    "atlas": { zh:"寰椎（第一頸椎）", en:"Atlas (C1)", system:"脊柱", desc:"第一頸椎，與枕骨形成關節，支撐頭部並允許點頭動作。" },
    "axis": { zh:"樞椎（第二頸椎）", en:"Axis (C2)", system:"脊柱", desc:"第二頸椎，其齒突插入寰椎，使頭部能夠左右旋轉。" },
    "third cervical vertebra": { zh:"第三頸椎 (C3)", en:"Third Cervical Vertebra", system:"脊柱", desc:"頸椎第三節，傳遞頭部重量並保護脊髓。" },
    "fourth cervical vertebra": { zh:"第四頸椎 (C4)", en:"Fourth Cervical Vertebra", system:"脊柱", desc:"頸椎第四節，是呼吸肌神經的重要傳導節點。" },
    "fifth cervical vertebra": { zh:"第五頸椎 (C5)", en:"Fifth Cervical Vertebra", system:"脊柱", desc:"頸椎第五節，為手臂神經的主要出口之一。" },
    "sixth cervical vertebra": { zh:"第六頸椎 (C6)", en:"Sixth Cervical Vertebra", system:"脊柱", desc:"頸椎第六節，可從頸部前方觸及其橫突。" },
    "seventh cervical vertebra": { zh:"第七頸椎 (C7)", en:"Seventh Cervical Vertebra", system:"脊柱", desc:"頸椎最下節，其棘突最長，是頸椎彎曲時最明顯的突起。" },
    "first thoracic vertebra": { zh:"第一胸椎 (T1)", en:"First Thoracic Vertebra", system:"脊柱", desc:"胸椎第一節，與第一對肋骨相連。" },
    "second thoracic vertebra": { zh:"第二胸椎 (T2)", en:"Second Thoracic Vertebra", system:"脊柱", desc:"胸椎第二節，與第二對肋骨相連。" },
    "third thoracic vertebra": { zh:"第三胸椎 (T3)", en:"Third Thoracic Vertebra", system:"脊柱", desc:"胸椎第三節，參與構成胸廓。" },
    "fourth thoracic vertebra": { zh:"第四胸椎 (T4)", en:"Fourth Thoracic Vertebra", system:"脊柱", desc:"胸椎第四節，位置約在兩肩胛骨之間。" },
    "fifth thoracic vertebra": { zh:"第五胸椎 (T5)", en:"Fifth Thoracic Vertebra", system:"脊柱", desc:"胸椎第五節，保護脊髓並傳導軀幹神經訊號。" },
    "sixth thoracic vertebra": { zh:"第六胸椎 (T6)", en:"Sixth Thoracic Vertebra", system:"脊柱", desc:"胸椎第六節，支撐上背部結構。" },
    "seventh thoracic vertebra": { zh:"第七胸椎 (T7)", en:"Seventh Thoracic Vertebra", system:"脊柱", desc:"胸椎第七節，位於胸廓中部。" },
    "eighth thoracic vertebra": { zh:"第八胸椎 (T8)", en:"Eighth Thoracic Vertebra", system:"脊柱", desc:"胸椎第八節，支撐中背部結構。" },
    "ninth thoracic vertebra": { zh:"第九胸椎 (T9)", en:"Ninth Thoracic Vertebra", system:"脊柱", desc:"胸椎第九節。" },
    "tenth thoracic vertebra": { zh:"第十胸椎 (T10)", en:"Tenth Thoracic Vertebra", system:"脊柱", desc:"胸椎第十節。" },
    "eleventh thoracic vertebra": { zh:"第十一胸椎 (T11)", en:"Eleventh Thoracic Vertebra", system:"脊柱", desc:"胸椎第十一節，連接浮肋（第十一對）。" },
    "twelfth thoracic vertebra": { zh:"第十二胸椎 (T12)", en:"Twelfth Thoracic Vertebra", system:"脊柱", desc:"胸椎最下節，連接第十二對肋骨（浮肋）。" },
    "first lumbar vertebra": { zh:"第一腰椎 (L1)", en:"First Lumbar Vertebra", system:"脊柱", desc:"腰椎第一節，體積大，承受上半身大部分重量。" },
    "second lumbar vertebra": { zh:"第二腰椎 (L2)", en:"Second Lumbar Vertebra", system:"脊柱", desc:"腰椎第二節，為腰部肌肉提供附著點。" },
    "third lumbar vertebra": { zh:"第三腰椎 (L3)", en:"Third Lumbar Vertebra", system:"脊柱", desc:"腰椎第三節，位於腰部中心，活動度最大。" },
    "fourth lumbar vertebra": { zh:"第四腰椎 (L4)", en:"Fourth Lumbar Vertebra", system:"脊柱", desc:"腰椎第四節，常見椎間盤問題的好發位置。" },
    "fifth lumbar vertebra": { zh:"第五腰椎 (L5)", en:"Fifth Lumbar Vertebra", system:"脊柱", desc:"腰椎最下節，連接薦骨，承受極大的壓力。" },

    // === 肩帶 ===
    "left clavicle": { zh:"左鎖骨", en:"Left Clavicle", system:"肩帶", desc:"呈S型，連接胸骨與左肩胛骨，是上肢與軀幹的主要橋樑。" },
    "right clavicle": { zh:"右鎖骨", en:"Right Clavicle", system:"肩帶", desc:"呈S型，連接胸骨與右肩胛骨，容易因跌倒撞擊而骨折。" },
    "left scapula": { zh:"左肩胛骨", en:"Left Scapula", system:"肩帶", desc:"左側三角形扁骨，連接鎖骨與肱骨，提供多條肩部肌肉附著點。" },
    "right scapula": { zh:"右肩胛骨", en:"Right Scapula", system:"肩帶", desc:"右側三角形扁骨，與肱骨形成肩關節。" },

    // === 上肢 ===
    "left humerus": { zh:"左肱骨", en:"Left Humerus", system:"上肢骨", desc:"左上臂唯一的骨骼，上端與肩胛骨形成肩關節，下端形成肘關節。" },
    "right humerus": { zh:"右肱骨", en:"Right Humerus", system:"上肢骨", desc:"右上臂唯一的骨骼，上端與肩胛骨形成肩關節，下端形成肘關節。" },
    "left radius": { zh:"左橈骨", en:"Left Radius", system:"上肢骨", desc:"左前臂外側（大拇指側）長骨，允許前臂進行旋轉動作。" },
    "right radius": { zh:"右橈骨", en:"Right Radius", system:"上肢骨", desc:"右前臂外側長骨，跌倒時容易骨折。" },
    "left ulna": { zh:"左尺骨", en:"Left Ulna", system:"上肢骨", desc:"左前臂內側（小指側）長骨，形成肘關節的主要鉸鏈結構。" },
    "right ulna": { zh:"右尺骨", en:"Right Ulna", system:"上肢骨", desc:"右前臂內側長骨，與橈骨並行，共同支撐前臂。" },

    // 腕骨（左）
    "left scaphoid": { zh:"左舟狀骨", en:"Left Scaphoid", system:"腕骨", desc:"腕部最易骨折的骨頭，位於拇指側，參與腕關節活動。" },
    "left lunate": { zh:"左月狀骨", en:"Left Lunate", system:"腕骨", desc:"腕骨中排最中央的骨頭，月牙形。" },
    "left capitate": { zh:"左頭狀骨", en:"Left Capitate", system:"腕骨", desc:"腕骨中最大的一塊，位於中央。" },
    "left hamate": { zh:"左鉤狀骨", en:"Left Hamate", system:"腕骨", desc:"腕骨內側（小指側），有鉤形突起。" },
    "left trapezium": { zh:"左大多角骨", en:"Left Trapezium", system:"腕骨", desc:"與大拇指掌骨形成關節，使大拇指能對掌。" },
    "left trapezoid": { zh:"左小多角骨", en:"Left Trapezoid", system:"腕骨", desc:"腕骨中最小的骨頭之一。" },
    "left pisiform": { zh:"左豆狀骨", en:"Left Pisiform", system:"腕骨", desc:"腕部最小的骨頭，形如豆子，位於小指側前排。" },

    // 腕骨（右）
    "right scaphoid": { zh:"右舟狀骨", en:"Right Scaphoid", system:"腕骨", desc:"腕部最易骨折的骨頭，位於拇指側。" },
    "right lunate": { zh:"右月狀骨", en:"Right Lunate", system:"腕骨", desc:"腕骨中排最中央的月牙形骨頭。" },
    "right capitate": { zh:"右頭狀骨", en:"Right Capitate", system:"腕骨", desc:"腕骨中最大的一塊，位於中央。" },
    "right hamate": { zh:"右鉤狀骨", en:"Right Hamate", system:"腕骨", desc:"腕骨內側，有鉤形突起。" },
    "right trapezium": { zh:"右大多角骨", en:"Right Trapezium", system:"腕骨", desc:"與大拇指掌骨形成關節。" },
    "right trapezoid": { zh:"右小多角骨", en:"Right Trapezoid", system:"腕骨", desc:"腕骨中最小的骨頭之一。" },
    "right pisiform": { zh:"右豆狀骨", en:"Right Pisiform", system:"腕骨", desc:"腕部最小的骨頭，形如豆子。" },

    // === 骨盆 ===
    "left hip bone": { zh:"左髖骨", en:"Left Hip Bone", system:"骨盆", desc:"由髂骨、坐骨、恥骨癒合而成，與薦骨共同構成骨盆，保護下腹部器官。" },
    "right hip bone": { zh:"右髖骨", en:"Right Hip Bone", system:"骨盆", desc:"由三塊骨頭癒合而成，與薦骨形成骨盆環，支撐軀幹並傳遞重量至下肢。" },

    // === 下肢 ===
    "left femur": { zh:"左股骨", en:"Left Femur", system:"下肢骨", desc:"人體最長最強壯的骨頭，位於左大腿，上端形成髖關節，下端形成膝關節。" },
    "right femur": { zh:"右股骨", en:"Right Femur", system:"下肢骨", desc:"人體最長最強壯的骨頭，位於右大腿，上端形成髖關節，下端形成膝關節。" },
    "left patella": { zh:"左髕骨（膝蓋骨）", en:"Left Patella", system:"下肢骨", desc:"包埋在股四頭肌腱中，保護左膝關節前方，增加肌肉槓桿力。" },
    "right patella": { zh:"右髕骨（膝蓋骨）", en:"Right Patella", system:"下肢骨", desc:"包埋在股四頭肌腱中，保護右膝關節前方。" },
    "left tibia": { zh:"左脛骨", en:"Left Tibia", system:"下肢骨", desc:"左小腿內側粗大長骨，主要承受體重，其前緣即為可觸摸的「脛骨前」。" },
    "right tibia": { zh:"右脛骨", en:"Right Tibia", system:"下肢骨", desc:"右小腿內側粗大長骨，是下肢承重的主要結構。" },
    "left fibula": { zh:"左腓骨", en:"Left Fibula", system:"下肢骨", desc:"左小腿外側細長骨，不直接承重，主要穩定踝關節並提供肌肉附著點。" },
    "right fibula": { zh:"右腓骨", en:"Right Fibula", system:"下肢骨", desc:"右小腿外側細長骨，穩定踝關節。" },

    // 足骨（左）
    "left talus": { zh:"左距骨", en:"Left Talus", system:"足骨", desc:"位於跟骨上方，與脛腓骨形成踝關節，將體重傳導至足部各骨。" },
    "left calcaneus": { zh:"左跟骨", en:"Left Calcaneus", system:"足骨", desc:"腳跟部位最大的骨頭，連接阿基里斯腱，承受行走時的巨大衝擊。" },
    "left cuboid bone": { zh:"左骰骨", en:"Left Cuboid Bone", system:"足骨", desc:"足部外側的方形骨，位於跟骨與外側蹠骨之間。" },
    "navicular bone of left foot": { zh:"左足舟骨", en:"Left Navicular Bone", system:"足骨", desc:"足部內側的舟形骨，維持足弓高度的關鍵骨頭。" },
    "left medial cuneiform bone": { zh:"左內側楔形骨", en:"Left Medial Cuneiform", system:"足骨", desc:"足部內側最大的楔形骨，與第一蹠骨形成關節。" },
    "left intermediate cuneiform bone": { zh:"左中間楔形骨", en:"Left Intermediate Cuneiform", system:"足骨", desc:"三塊楔形骨中最小的一塊。" },
    "left lateral cuneiform bone": { zh:"左外側楔形骨", en:"Left Lateral Cuneiform", system:"足骨", desc:"足部外側楔形骨，與第三蹠骨形成關節。" },

    // 足骨（右）
    "right talus": { zh:"右距骨", en:"Right Talus", system:"足骨", desc:"與脛腓骨形成踝關節，是足部最重要的傳力骨。" },
    "right calcaneus": { zh:"右跟骨", en:"Right Calcaneus", system:"足骨", desc:"腳跟最大的骨頭，連接阿基里斯腱。" },
    "right cuboid bone": { zh:"右骰骨", en:"Right Cuboid Bone", system:"足骨", desc:"足部外側方形骨。" },
    "navicular bone of right foot": { zh:"右足舟骨", en:"Right Navicular Bone", system:"足骨", desc:"足部內側舟形骨，維持足弓。" },
    "right medial cuneiform bone": { zh:"右內側楔形骨", en:"Right Medial Cuneiform", system:"足骨", desc:"右足內側最大楔形骨。" },
    "right intermediate cuneiform bone": { zh:"右中間楔形骨", en:"Right Intermediate Cuneiform", system:"足骨", desc:"三塊楔形骨中最小的一塊。" },
    "right lateral cuneiform bone": { zh:"右外側楔形骨", en:"Right Lateral Cuneiform", system:"足骨", desc:"右足外側楔形骨。" }
  }
};

// ===== 智慧後備函式 =====
// 若模型 Mesh 名稱不在資料庫中，自動格式化英文名稱並推斷中文分類
window.getAnatomyData = function(meshName, type = 'skeleton') {
  const name = meshName.toLowerCase();
  
  // 依照傳入的系統類型，選擇對應的資料庫
  const database = window.ANATOMY_DATA[type] || window.ANATOMY_DATA.skeleton;
  const data = database[name];
  if (data) return data;

  // 後備：將英文名稱格式化（首字母大寫，移除可能有的底線或雜訊）
  const cleanName = meshName.replace(/[_]/g, ' ');
  const enName = cleanName.replace(/\b\w/g, c => c.toUpperCase());
  
  // 肌肉系統後備邏輯
  if (type === 'muscle') {
    let system = "肌肉系統";
    if (name.includes("flexor")) system = "屈肌";
    else if (name.includes("extensor")) system = "伸肌";
    else if (name.includes("adductor")) system = "內收肌";
    else if (name.includes("abductor")) system = "外展肌";
    else if (name.includes("pectoralis")) system = "胸部肌肉";
    else if (name.includes("gluteus")) system = "臀部肌肉";

    return {
      zh: enName,
      en: enName,
      system: system,
      desc: `${enName} — 人體肌肉系統的組成部分。`
    };
  }

  // 骨骼系統後備邏輯
  let system = "骨骼系統";
  if (name.includes("phalanx")) system = name.includes("toe") ? "趾骨" : "指骨";
  else if (name.includes("metacarpal")) system = "掌骨";
  else if (name.includes("metatarsal")) system = "蹠骨";
  else if (name.includes("rib")) system = "肋骨";
  else if (name.includes("vertebra")) system = "脊柱";
  else if (name.includes("sesamoid")) system = "種子骨";

  return {
    zh: enName,
    en: enName,
    system: system,
    desc: `${enName} — 人體骨骼系統的組成部分。`
  };
};
