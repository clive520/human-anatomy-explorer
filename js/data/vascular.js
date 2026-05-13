// 血管系統資料庫
window.ANATOMY_DATA = window.ANATOMY_DATA || {};

window.ANATOMY_DATA.vascular = {
  // 核心血管對應
  "vh_m_aortic_arch": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "主動脈弓",
    en: "Aortic Arch",
    desc: "主動脈弓是主動脈的一部分，位於升主動脈和降主動脈之間。它將富含氧氣的血液從心臟分配到上半身，包括頭部、頸部和手臂。"
  },
  "vh_m_ascending_aorta": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "升主動脈",
    en: "Ascending Aorta",
    desc: "升主動脈是主動脈的第一段，直接從左心室延伸而出，負責將充氧血運送至全身。"
  },
  "vh_m_descending_aorta_a": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "降主動脈",
    en: "Descending Aorta",
    desc: "降主動脈是主動脈的延伸，向下穿過胸腔和腹腔，為下半身器官與組織提供充氧血。"
  },
  "vh_m_superior_vena_cava": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "上腔靜脈",
    en: "Superior Vena Cava",
    desc: "上腔靜脈是人體最大的靜脈之一，負責收集來自頭部、頸部、上肢和胸部上半的缺氧血，並將其送回右心房。"
  },
  "vh_m_inferior_vena_cava_a": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "下腔靜脈",
    en: "Inferior Vena Cava",
    desc: "下腔靜脈是人體最大的靜脈，負責收集來自下半身（腹部、骨盆和下肢）的缺氧血，送回右心房。"
  },
  "vh_m_pulmonary_trunk": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "肺動脈幹",
    en: "Pulmonary Trunk",
    desc: "肺動脈幹源自右心室，隨後分支為左右肺動脈，負責將缺氧血送往肺部進行氣體交換。"
  },
  "vh_m_portal_vein": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "門靜脈",
    en: "Portal Vein",
    desc: "門靜脈收集來自胃、腸、脾臟和胰臟的血液，並將其運送至肝臟進行代謝與解毒。"
  },
  "vh_m_common_hepatic_artery": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "肝總動脈",
    en: "Common Hepatic Artery",
    desc: "肝總動脈是腹腔動脈幹的分支，負責供應肝臟、膽囊及部分胃與十二指腸的充氧血。"
  },
  "vh_m_renal_vein_l": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "左腎靜脈",
    en: "Left Renal Vein",
    desc: "負責將經過腎臟過濾後的血液從左腎輸送回下腔靜脈。"
  },
  "vh_m_renal_vein_r": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "右腎靜脈",
    en: "Right Renal Vein",
    desc: "負責將經過腎臟過濾後的血液從右腎輸送回下腔靜脈。"
  },
  "vh_m_left_renal_artery": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "左腎動脈",
    en: "Left Renal Artery",
    desc: "從腹主動脈分支，供應左腎充氧血以進行過濾作用。"
  },
  "vh_m_right_renal_artery": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "右腎動脈",
    en: "Right Renal Artery",
    desc: "從腹主動脈分支，供應右腎充氧血以進行過濾作用。"
  },

  // Fallback 預設資料
  "default": {
    system: "心血管系統 (Cardiovascular System)",
    zh: "血管構造",
    en: "Vascular Structure",
    desc: "心血管系統負責在全身輸送血液、氧氣、養分和荷爾蒙。動脈將富含氧氣的血液帶離心臟，而靜脈則將缺氧的血液帶回心臟（肺循環例外）。"
  }
};
