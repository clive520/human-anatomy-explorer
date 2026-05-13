// 肌肉資料庫 — 使用 models/muscles.glb 的精確或模糊 Mesh 名稱作為 key
window.ANATOMY_DATA = window.ANATOMY_DATA || {};
window.ANATOMY_DATA.muscle = {
  default: {
    zh: "肌肉", en: "Muscle", system: "肌肉系統",
    desc: "點擊任意肌肉部位以查看詳細資訊。"
  },

  // === 頭部與頸部 ===
  "occipitofrontalis": { zh: "枕額肌", en: "Occipitofrontalis", system: "頭部肌肉", desc: "覆蓋頭骨頂部，負責揚起眉毛和產生額頭皺紋。" },
  "temporalis": { zh: "顳肌", en: "Temporalis", system: "咀嚼肌", desc: "位於頭部兩側，強而有力的咀嚼肌之一，負責閉合下巴。" },
  "masseter": { zh: "咬肌", en: "Masseter", system: "咀嚼肌", desc: "位於下顎角，是人體最強壯的肌肉之一，主要負責咀嚼。" },
  "sternocleidomastoid": { zh: "胸鎖乳突肌", en: "Sternocleidomastoid", system: "頸部肌肉", desc: "頸部兩側的粗大肌肉，負責頭部的旋轉和屈曲。" },

  // === 軀幹 (胸部、腹部、背部) ===
  "pectoralis major": { zh: "胸大肌", en: "Pectoralis Major", system: "胸部肌肉", desc: "胸部最表層的大肌肉，負責肩關節的內收、內旋和屈曲。" },
  "pectoralis minor": { zh: "胸小肌", en: "Pectoralis Minor", system: "胸部肌肉", desc: "位於胸大肌下方，協助穩定肩胛骨。" },
  "rectus abdominis": { zh: "腹直肌", en: "Rectus Abdominis", system: "腹部肌肉", desc: "即俗稱的「八塊肌」，負責軀幹屈曲並保護腹腔內臟。" },
  "external oblique": { zh: "腹外斜肌", en: "External Oblique", system: "腹部肌肉", desc: "腹部兩側表層肌肉，協助軀幹旋轉和側屈。" },
  "internal oblique": { zh: "腹內斜肌", en: "Internal Oblique", system: "腹部肌肉", desc: "位於腹外斜肌下方，協助軀幹旋轉和側屈。" },
  "transversus abdominis": { zh: "腹橫肌", en: "Transversus Abdominis", system: "腹部肌肉", desc: "腹部最深層的肌肉，像馬甲一樣環繞軀幹，維持核心穩定。" },
  "trapezius": { zh: "斜方肌", en: "Trapezius", system: "背部肌肉", desc: "後頸至中背部的大型菱形肌肉，負責控制肩胛骨和頭部運動。" },
  "latissimus dorsi": { zh: "背闊肌", en: "Latissimus Dorsi", system: "背部肌肉", desc: "人體面積最大的肌肉，位於中下背部，負責手臂的伸展和內收。" },
  "erector spinae": { zh: "豎脊肌", en: "Erector Spinae", system: "背部深層肌肉", desc: "沿著脊椎兩側分佈，負責維持直立姿勢和脊柱伸展。" },

  // === 上肢 (肩、臂、前臂) ===
  "deltoid": { zh: "三角肌", en: "Deltoid", system: "肩部肌肉", desc: "包覆肩關節的三角形肌肉，負責手臂的外展。" },
  "biceps brachii": { zh: "肱二頭肌", en: "Biceps Brachii", system: "上臂肌肉", desc: "上臂前側的肌肉，主要負責肘關節屈曲和前臂旋後。" },
  "triceps brachii": { zh: "肱三頭肌", en: "Triceps Brachii", system: "上臂肌肉", desc: "上臂後側的肌肉，主要負責肘關節伸展。" },
  "brachialis": { zh: "肱肌", en: "Brachialis", system: "上臂肌肉", desc: "位於肱二頭肌下方，是肘關節屈曲的強力協同肌。" },
  "brachioradialis": { zh: "肱橈肌", en: "Brachioradialis", system: "前臂肌肉", desc: "前臂外側的肌肉，協助肘關節屈曲。" },
  "flexor carpi radialis": { zh: "橈側腕屈肌", en: "Flexor Carpi Radialis", system: "前臂肌肉", desc: "前臂掌側肌肉，負責手腕屈曲和外展。" },
  "extensor digitorum": { zh: "伸指肌", en: "Extensor Digitorum", system: "前臂肌肉", desc: "前臂背側肌肉，負責伸展手指。" },

  // === 下肢 (臀、大腿、小腿) ===
  "gluteus maximus": { zh: "臀大肌", en: "Gluteus Maximus", system: "臀部肌肉", desc: "人體最大且最有力的肌肉之一，負責髖關節的伸展和外旋。" },
  "gluteus medius": { zh: "臀中肌", en: "Gluteus Medius", system: "臀部肌肉", desc: "位於骨盆外側，對維持骨盆穩定和單腳站立至關重要。" },
  "quadriceps femoris": { zh: "股四頭肌", en: "Quadriceps Femoris", system: "大腿前側肌肉", desc: "大腿前側的強大肌群（含股直肌等四塊），主要負責膝關節伸展。" },
  "rectus femoris": { zh: "股直肌", en: "Rectus Femoris", system: "大腿前側肌肉", desc: "股四頭肌的一部分，跨越髖關節和膝關節。" },
  "sartorius": { zh: "縫匠肌", en: "Sartorius", system: "大腿前側肌肉", desc: "人體最長的肌肉，呈帶狀，協助大腿和膝蓋的屈曲與旋轉。" },
  "biceps femoris": { zh: "股二頭肌", en: "Biceps Femoris", system: "大腿後側肌肉 (膕繩肌)", desc: "大腿後側肌群的一部分，負責膝關節屈曲和髖關節伸展。" },
  "semitendinosus": { zh: "半腱肌", en: "Semitendinosus", system: "大腿後側肌肉 (膕繩肌)", desc: "大腿後側內側的肌肉，協助膝關節屈曲。" },
  "gastrocnemius": { zh: "腓腸肌", en: "Gastrocnemius", system: "小腿後側肌肉", desc: "小腿肚的主要肌肉，連接阿基里斯腱，負責踝關節蹠屈（墊腳尖）。" },
  "soleus": { zh: "比目魚肌", en: "Soleus", system: "小腿後側肌肉", desc: "位於腓腸肌下方，站立與行走時的重要維持肌。" },
  "tibialis anterior": { zh: "脛前肌", en: "Tibialis Anterior", system: "小腿前側肌肉", desc: "小腿前側主要肌肉，負責踝關節背屈（勾腳尖）。" }
};
