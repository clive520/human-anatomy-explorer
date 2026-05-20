// 牙齒解剖資料 (Teeth Anatomy Data)
// 依照 Universal Numbering System (#1–#32)

window.TEETH_INFO = {
  // ── 上顎 (Maxillary) 1–16 ──
  1:  { zh: '右上智齒（第三大臼齒）', en: 'Upper Right 3rd Molar (Wisdom)', type: 'molar',
        desc: '智齒是最後萌出的牙齒（通常在17–25歲），因空間不足常需拔除。上顎第三大臼齒有3–5個齒根，功能同大臼齒（研磨食物）。' },
  2:  { zh: '右上第二大臼齒', en: 'Upper Right 2nd Molar', type: 'molar',
        desc: '上顎第二大臼齒約在12歲萌出，有3個齒根（近頰、遠頰、舌側）。冠部寬扁，有4個牙尖，是研磨食物的主力之一。' },
  3:  { zh: '右上第一大臼齒', en: 'Upper Right 1st Molar', type: 'molar',
        desc: '約在6歲最先萌出，是「六歲齒」，重要性極高。有3個齒根和4個主要牙尖（含卡拉貝利尖），是咀嚼功能最核心的牙齒之一。' },
  4:  { zh: '右上第二小臼齒（雙尖牙）', en: 'Upper Right 2nd Premolar', type: 'premolar',
        desc: '上顎第二小臼齒（10–12歲萌出），有1個齒根，冠部有2個牙尖。功能介於犬齒（撕裂）與大臼齒（研磨）之間。' },
  5:  { zh: '右上第一小臼齒（雙尖牙）', en: 'Upper Right 1st Premolar', type: 'premolar',
        desc: '上顎第一小臼齒（10–11歲萌出），通常有2個齒根（頰根、舌根），有2個牙尖。是牙弓中央段的重要咬合支撐。' },
  6:  { zh: '右上犬齒（虎牙）', en: 'Upper Right Canine', type: 'canine',
        desc: '犬齒（11–13歲萌出）是牙弓的轉角，有牙列中最長的單一齒根（可達17mm）。齒冠有一個尖銳的牙尖，功能是撕裂食物，也是引導咬合的重要牙齒。' },
  7:  { zh: '右上側門齒', en: 'Upper Right Lateral Incisor', type: 'lateral_incisor',
        desc: '上顎側門齒（8–9歲萌出）位於中門齒旁邊，冠部較窄且常有形態變異（如釘形齒）。主要功能為切割食物，也影響微笑美觀。' },
  8:  { zh: '右上中門齒', en: 'Upper Right Central Incisor', type: 'central_incisor',
        desc: '上顎中門齒（7–8歲萌出）是最寬、最顯眼的前牙，直接影響微笑美觀與咬合引導。齒冠寬扁，切緣銳利，功能為切割食物。' },
  9:  { zh: '左上中門齒', en: 'Upper Left Central Incisor', type: 'central_incisor',
        desc: '左上中門齒（7–8歲萌出），與右上中門齒對稱，是牙弓最前方的中心點。齒冠寬扁，切緣銳利，功能為切割食物。' },
  10: { zh: '左上側門齒', en: 'Upper Left Lateral Incisor', type: 'lateral_incisor',
        desc: '上顎側門齒（8–9歲萌出）位於中門齒旁邊，冠部較窄。功能為切割食物，也影響微笑美觀。' },
  11: { zh: '左上犬齒（虎牙）', en: 'Upper Left Canine', type: 'canine',
        desc: '犬齒（11–13歲萌出），有牙列中最長的齒根。尖銳的牙尖用於撕裂食物，是引導咬合的關鍵牙齒。' },
  12: { zh: '左上第一小臼齒（雙尖牙）', en: 'Upper Left 1st Premolar', type: 'premolar',
        desc: '上顎第一小臼齒通常有2個齒根，是正畸治療中最常被拔除（提供排列空間）的牙齒之一。' },
  13: { zh: '左上第二小臼齒（雙尖牙）', en: 'Upper Left 2nd Premolar', type: 'premolar',
        desc: '上顎第二小臼齒有1個齒根，在咬合功能上幫助研磨食物，也是牙弓後段的重要支撐。' },
  14: { zh: '左上第一大臼齒', en: 'Upper Left 1st Molar', type: 'molar',
        desc: '約在6歲萌出的「六歲齒」，是發育最早的恆牙之一，也是齲齒（蛀牙）最常好發的牙齒，因此窩溝封填尤為重要。' },
  15: { zh: '左上第二大臼齒', en: 'Upper Left 2nd Molar', type: 'molar',
        desc: '上顎第二大臼齒（12歲萌出），冠部形態與第一大臼齒相似，是咀嚼功能的重要組成。' },
  16: { zh: '左上智齒（第三大臼齒）', en: 'Upper Left 3rd Molar (Wisdom)', type: 'molar',
        desc: '智齒是最後萌出的牙齒，因空間不足常阻生（無法完全萌出），是最常被拔除的牙齒。' },

  // ── 下顎 (Mandibular) 17–32 ──
  17: { zh: '左下智齒（第三大臼齒）', en: 'Lower Left 3rd Molar (Wisdom)', type: 'molar',
        desc: '下顎智齒因空間限制，水平阻生（橫躺）的比例很高，常導致旁邊第二大臼齒發炎或齲壞，是口腔科最常見的手術拔除對象。' },
  18: { zh: '左下第二大臼齒', en: 'Lower Left 2nd Molar', type: 'molar',
        desc: '下顎第二大臼齒（12歲萌出），有2個齒根（近中、遠中）。是咬合重要的支柱，常與上顎第二大臼齒形成咬合關係。' },
  19: { zh: '左下第一大臼齒', en: 'Lower Left 1st Molar', type: 'molar',
        desc: '下顎第一大臼齒（6歲萌出），是「六歲齒」，有5個牙尖（頰側3個、舌側2個），是齲齒最好發部位，兒童期窩溝封填非常重要。' },
  20: { zh: '左下第二小臼齒（雙尖牙）', en: 'Lower Left 2nd Premolar', type: 'premolar',
        desc: '下顎第二小臼齒（11–12歲萌出），有1個齒根，可能有2或3個牙尖（Y形或H形牙尖溝）。' },
  21: { zh: '左下第一小臼齒（雙尖牙）', en: 'Lower Left 1st Premolar', type: 'premolar',
        desc: '下顎第一小臼齒（10–11歲萌出），有1個齒根，頰側牙尖明顯大於舌側牙尖，因此功能上偏向犬齒（撕裂）。' },
  22: { zh: '左下犬齒', en: 'Lower Left Canine', type: 'canine',
        desc: '下顎犬齒（9–10歲萌出），比上顎犬齒稍小，但同樣有長而穩固的齒根，是牙弓轉角的支撐。' },
  23: { zh: '左下側門齒', en: 'Lower Left Lateral Incisor', type: 'lateral_incisor',
        desc: '下顎側門齒（7–8歲萌出），與中門齒形態相似但稍大。是最易受外傷的牙齒之一。' },
  24: { zh: '左下中門齒', en: 'Lower Left Central Incisor', type: 'central_incisor',
        desc: '下顎中門齒（6–7歲萌出）是全口最小的恆牙，齒冠窄小但切緣銳利，與上顎前牙共同完成切割食物的動作。' },
  25: { zh: '右下中門齒', en: 'Lower Right Central Incisor', type: 'central_incisor',
        desc: '下顎中門齒（6–7歲萌出）是全口最小的恆牙，齒冠窄小，切緣銳利，與上顎前牙形成切割咬合。' },
  26: { zh: '右下側門齒', en: 'Lower Right Lateral Incisor', type: 'lateral_incisor',
        desc: '下顎側門齒（7–8歲萌出），與中門齒形態相似，有一個齒根，主要功能為切割食物。' },
  27: { zh: '右下犬齒', en: 'Lower Right Canine', type: 'canine',
        desc: '下顎犬齒有強壯的齒根，是下顎前段的穩定支柱。撕裂食物和引導咬合是其主要功能。' },
  28: { zh: '右下第一小臼齒（雙尖牙）', en: 'Lower Right 1st Premolar', type: 'premolar',
        desc: '下顎第一小臼齒頰側牙尖較大，舌側小，功能上兼具犬齒（撕裂）特性。有1個粗壯的齒根。' },
  29: { zh: '右下第二小臼齒（雙尖牙）', en: 'Lower Right 2nd Premolar', type: 'premolar',
        desc: '下顎第二小臼齒（11–12歲萌出），有1個齒根，是後段牙弓重要的咬合支撐。' },
  30: { zh: '右下第一大臼齒', en: 'Lower Right 1st Molar', type: 'molar',
        desc: '右下第一大臼齒是最常見的蛀牙好發牙齒。有5個牙尖，是全口牙列最重要的咀嚼核心之一。' },
  31: { zh: '右下第二大臼齒', en: 'Lower Right 2nd Molar', type: 'molar',
        desc: '右下第二大臼齒（12歲萌出），與上顎第二大臼齒形成咬合，是後段咬合功能的重要支柱。' },
  32: { zh: '右下智齒（第三大臼齒）', en: 'Lower Right 3rd Molar (Wisdom)', type: 'molar',
        desc: '下顎智齒因頜骨空間不足，常發生阻生（橫躺或斜生），引起旁邊牙齒疼痛或感染，通常建議手術拔除。' },
};

// 牙型說明
window.TOOTH_TYPE_INFO = {
  central_incisor:  { zh: '中門齒', en: 'Central Incisor', desc: '切割食物，影響微笑美觀與發音。' },
  lateral_incisor:  { zh: '側門齒', en: 'Lateral Incisor', desc: '協助切割，與中門齒共同構成前牙美觀。' },
  canine:           { zh: '犬齒（虎牙）', en: 'Canine', desc: '撕裂食物，引導咬合，齒根最長最穩固。' },
  premolar:         { zh: '小臼齒（雙尖牙）', en: 'Premolar', desc: '兼具切割與研磨功能，為咬合功能的過渡牙。' },
  molar:            { zh: '大臼齒', en: 'Molar', desc: '寬大的冠部和多個牙尖，是研磨食物的主力。' },
};

window.getTeethData = function(toothNum) {
  const info = window.TEETH_INFO[toothNum];
  if (!info) return { zh: `牙齒 #${toothNum}`, en: `Tooth #${toothNum}`, system: '牙齒 (Teeth)', desc: '' };
  return { ...info, system: '牙齒 (Teeth)' };
};
