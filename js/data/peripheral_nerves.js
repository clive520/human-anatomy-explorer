// 周邊神經系統資料庫
window.ANATOMY_DATA = window.ANATOMY_DATA || {};

window.ANATOMY_DATA.peripheral_nerves = {
  // 由於周邊神經模型通常包含多個分支，這裡預留核心神經的對應
  "sciatic_nerve": {
    system: "周邊神經系統 (Peripheral Nervous System)",
    zh: "坐骨神經",
    en: "Sciatic Nerve",
    desc: "人體最粗大、最長的神經，起源於腰薦神經叢，延伸至大腿後側及小腿，負責下肢大部分的感覺與運動功能。"
  },
  "femoral_nerve": {
    system: "周邊神經系統 (Peripheral Nervous System)",
    zh: "股神經",
    en: "Femoral Nerve",
    desc: "起源於腰神經叢，主要負責大腿前側肌肉（如股四頭肌）的運動，以及大腿前側和小腿內側的感覺。"
  },
  "brachial_plexus": {
    system: "周邊神經系統 (Peripheral Nervous System)",
    zh: "臂叢神經",
    en: "Brachial Plexus",
    desc: "位於頸部和腋下之間的神經網絡，負責支配整個上肢（肩膀、手臂、手部）的感覺與運動。"
  },
  "vagus_nerve": {
    system: "周邊神經系統 (Peripheral Nervous System)",
    zh: "迷走神經",
    en: "Vagus Nerve",
    desc: "第十對腦神經，也是最長、分布最廣的腦神經，主要負責調控副交感神經系統，影響心率、消化和呼吸等無意識功能。"
  },
  "median_nerve": {
    system: "周邊神經系統 (Peripheral Nervous System)",
    zh: "正中神經",
    en: "Median Nerve",
    desc: "臂叢神經的主要分支之一，沿著手臂延伸至手部，控制前臂的屈肌及手部部分肌肉，並提供手掌橈側的感覺。"
  },
  "ulnar_nerve": {
    system: "周邊神經系統 (Peripheral Nervous System)",
    zh: "尺神經",
    en: "Ulnar Nerve",
    desc: "俗稱「麻筋」，行經手肘內側。主要控制手部精細動作的內部肌肉，並提供無名指與小指的感覺。"
  },

  // Fallback 預設資料
  "default": {
    system: "周邊神經系統 (Peripheral Nervous System)",
    zh: "周邊神經網絡",
    en: "Peripheral Nerve Network",
    desc: "周邊神經系統連接著中樞神經系統（大腦與脊髓）與身體的各個器官、肌肉和感覺接收器。負責傳遞大腦指令並將感覺訊號回傳。"
  }
};
