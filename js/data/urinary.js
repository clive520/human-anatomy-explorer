// 泌尿系統解剖資料 (Urinary System Data)
// 來源：HuBMAP CCF 3D Reference Object Library — VH_Male/v1.2

window.URINARY_DATA = {
  // ─── 腎臟 Kidney ───
  'VH_M_kidney_capsule_L': { zh: '左腎被膜', en: 'Left Kidney Capsule', desc: '包覆在左腎表面的纖維結締組織薄膜，保護腎臟實質並維持其形狀。' },
  'VH_M_kidney_capsule_R': { zh: '右腎被膜', en: 'Right Kidney Capsule', desc: '包覆在右腎表面的纖維結締組織薄膜。右腎通常比左腎稍低，以容納上方的肝臟。' },
  'VH_M_hilum_of_kidney_L': { zh: '左腎門', en: 'Left Renal Hilum', desc: '左腎內側緣的凹陷處，是腎血管、淋巴管、神經及腎盂進出腎臟的門戶。' },
  'VH_M_hilum_of_kidney_R': { zh: '右腎門', en: 'Right Renal Hilum', desc: '右腎內側緣的凹陷處，為腎臟主要出入口。' },
  'VH_M_outer_cortex_of_kidney_L': { zh: '左腎皮質', en: 'Left Renal Cortex', desc: '左腎外層顏色較淺的部分，含有大量腎小體和腎小管，是過濾血液形成尿液的主要區域。' },
  'VH_M_outer_cortex_of_kidney_R': { zh: '右腎皮質', en: 'Right Renal Cortex', desc: '右腎外圍的實質部分，負責主要的血液過濾。' },
  'VH_M_renal_column_L': { zh: '左腎柱', en: 'Left Renal Column (Bertin)', desc: '左腎皮質向髓質內延伸的部分，分隔各個腎錐體，內含豐富的血管。' },
  'VH_M_renal_column_R': { zh: '右腎柱', en: 'Right Renal Column (Bertin)', desc: '右腎皮質向內延伸分隔腎錐體的組織。' },
  
  // ─── 腎錐體與腎乳頭 Renal Pyramids and Papillae ───
  'VH_M_renal_pyramid_L': { zh: '左腎錐體', en: 'Left Renal Pyramid', desc: '左腎髓質內的錐形結構，由平行的集尿管和直血管組成，負責將尿液導入腎乳頭。' },
  'VH_M_renal_pyramid_R': { zh: '右腎錐體', en: 'Right Renal Pyramid', desc: '右腎髓質內的錐形結構。' },
  'VH_M_renal_papilla_L': { zh: '左腎乳頭', en: 'Left Renal Papilla', desc: '左腎錐體的頂端，有多個乳頭孔，尿液由此滴入腎小盞。' },
  'VH_M_renal_papilla_R': { zh: '右腎乳頭', en: 'Right Renal Papilla', desc: '右腎錐體的頂端。' },

  // ─── 腎盞與腎盂 Calyces and Pelvis ───
  'VH_M_minor_calyx_L': { zh: '左腎小盞', en: 'Left Minor Calyx', desc: '包圍左腎乳頭的杯狀結構，負責收集來自單一腎乳頭的尿液。' },
  'VH_M_minor_calyx_R': { zh: '右腎小盞', en: 'Right Minor Calyx', desc: '收集右腎單一乳頭尿液的杯狀構造。' },
  'VH_M_major_calyx_L': { zh: '左腎大盞', en: 'Left Major Calyx', desc: '由數個左腎小盞匯合而成，將尿液導向腎盂。' },
  'VH_M_major_calyx_R': { zh: '右腎大盞', en: 'Right Major Calyx', desc: '由數個右腎小盞匯合而成。' },
  'VH_M_renal_pelvis_L': { zh: '左腎盂', en: 'Left Renal Pelvis', desc: '左腎大盞匯合形成的漏斗狀囊，是輸尿管的上端膨大部，收集尿液後導入輸尿管。' },
  'VH_M_renal_pelvis_R': { zh: '右腎盂', en: 'Right Renal Pelvis', desc: '右側收集尿液的漏斗狀結構，向下連接輸尿管。' },

  // ─── 輸尿管 Ureters ───
  'VH_M_ureter_L': { zh: '左輸尿管', en: 'Left Ureter', desc: '連接左腎盂與膀胱的肌性管道（約 25–30 公分），藉由蠕動將尿液輸送至膀胱。' },
  'VH_M_ureter_R': { zh: '右輸尿管', en: 'Right Ureter', desc: '連接右腎盂與膀胱的管道。' },

  // ─── 膀胱 Urinary Bladder ───
  'VH_M_urinary_bladder_neck_smooth_muscle': { zh: '膀胱頸平滑肌', en: 'Bladder Neck Smooth Muscle', desc: '膀胱最下端與尿道交界處的環狀平滑肌，有助於控制尿液排放。' },
  'VH_M_fundus_of_urinary_bladder_dome': { zh: '膀胱頂', en: 'Bladder Dome', desc: '膀胱的前上部，當膀胱充盈時會向上膨脹進入腹腔。' },
  'VH_M_fundus_of_urinary_bladder_base1': { zh: '膀胱底', en: 'Bladder Base / Fundus', desc: '膀胱的後下部，呈倒三角形，形狀和位置相對固定。' },
  'VH_M_trigone_of_urinary_bladder': { zh: '膀胱三角', en: 'Bladder Trigone', desc: '膀胱底內面的三角形平滑區，由兩個輸尿管口與尿道內口圍成，是膀胱炎和膀胱腫瘤最常發生的部位。' },
  'VH_M_ureteral_orifice_L': { zh: '左輸尿管口', en: 'Left Ureteral Orifice', desc: '左輸尿管進入膀胱的開口，具有類似瓣膜的作用，防止尿液逆流。' },
  'VH_M_ureteral_orifice_R': { zh: '右輸尿管口', en: 'Right Ureteral Orifice', desc: '右輸尿管進入膀胱的開口。' },
};

// 泌尿系統的查詢函式
window.getUrinaryData = function(meshName) {
  if (!meshName) return null;
  // 處理 _a, _b, _c 等後綴以共用基礎說明
  let clean = meshName.toLowerCase().trim();
  clean = clean.replace(/_[a-z]$/, ''); // 移除小寫字母後綴 (如 _a, _b)
  clean = clean.replace(/\d+$/, ''); // 移除數字

  for (const [key, val] of Object.entries(window.URINARY_DATA)) {
    if (key.toLowerCase() === clean || key.toLowerCase() === meshName.toLowerCase().trim()) {
      return { zh: val.zh, en: val.en, system: '泌尿系統', desc: val.desc };
    }
  }

  // 兜底處理
  let baseKey = clean.replace(/_[lr]$/, ''); // 移除左右後綴嘗試匹配
  for (const [key, val] of Object.entries(window.URINARY_DATA)) {
    if (key.toLowerCase().startsWith(baseKey)) {
      let side = meshName.match(/_L/i) ? '左' : (meshName.match(/_R/i) ? '右' : '');
      let enSide = meshName.match(/_L/i) ? 'Left ' : (meshName.match(/_R/i) ? 'Right ' : '');
      return { 
        zh: side + val.zh.replace(/^[左右]/, ''), 
        en: enSide + val.en.replace(/^(Left|Right) /, ''), 
        system: '泌尿系統', 
        desc: val.desc 
      };
    }
  }

  let zh = meshName.replace(/^(VH_M_|SBU_M_)/i, '').replace(/_/g, ' ');
  zh = zh.replace(/\b\w/g, c => c.toUpperCase());
  return { zh, en: zh, system: '泌尿系統', desc: `${zh} — 泌尿系統構造，負責尿液的生成、儲存與排泄。` };
};
