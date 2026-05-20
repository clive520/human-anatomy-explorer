// 淋巴/免疫系統解剖資料 (Lymphatic / Immune System Data)
// 來源：HuBMAP CCF 3D Reference Object Library — VH_Male/v1.2

window.LYMPHATIC_DATA = {
  // ─── 脾臟 Spleen ───
  'VH_M_colic_surface_of_spleen': { zh: '脾結腸面', en: 'Colic Surface of Spleen', desc: '脾臟與結腸左曲（脾曲）相接觸的表面，位於脾臟下方。' },
  'VH_M_diaphragmatic_surface_of_spleen': { zh: '脾膈面', en: 'Diaphragmatic Surface of Spleen', desc: '脾臟的凸面，平滑且向外，緊貼橫膈膜的左下方。' },
  'VH_M_gastric_surface_of_spleen': { zh: '脾胃面', en: 'Gastric Surface of Spleen', desc: '脾臟前內側較寬大且凹陷的表面，與胃大彎及胃底相鄰。' },
  'VH_M_hilum_of_spleen': { zh: '脾門', en: 'Hilum of Spleen', desc: '脾臟內側面的長條形凹陷處，是脾動脈、脾靜脈及神經、淋巴管進出的門戶。' },
  'VH_M_renal_surface_of_spleen': { zh: '脾腎面', en: 'Renal Surface of Spleen', desc: '脾臟後內側的平坦面，與左腎和左腎上腺相接觸。' },

  // ─── 胸腺 Thymus ───
  'VH_M_thymus_lobe_L': { zh: '胸腺左葉', en: 'Left Lobe of Thymus', desc: '胸腺的左半部，位於胸骨後方，是 T 淋巴細胞成熟的主要器官。胸腺在青春期後會逐漸退化並被脂肪組織取代。' },
  'VH_M_thymus_lobe_R': { zh: '胸腺右葉', en: 'Right Lobe of Thymus', desc: '胸腺的右半部。' },
};

// 淋巴/免疫系統的查詢函式
window.getLymphaticData = function(meshName) {
  if (!meshName) return null;
  const clean = meshName.toLowerCase().trim();

  for (const [key, val] of Object.entries(window.LYMPHATIC_DATA)) {
    if (key.toLowerCase() === clean) {
      return { zh: val.zh, en: val.en, system: '淋巴/免疫系統', desc: val.desc };
    }
  }

  let zh = meshName.replace(/^(VH_M_|SBU_M_)/i, '').replace(/_/g, ' ');
  zh = zh.replace(/\b\w/g, c => c.toUpperCase());
  return { zh, en: zh, system: '淋巴/免疫系統', desc: `${zh} — 淋巴與免疫系統構造，負責免疫反應與淋巴液過濾。` };
};
