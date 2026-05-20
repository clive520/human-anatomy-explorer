// 心臟系統解剖資料 (Heart Anatomy Data)
// 來源：HuBMAP CCF 3D Reference Object Library — VH_Male/v1.2

window.HEART_DATA = {
  // ─── 腔室 (Chambers) ───
  'VH_M_right_cardiac_atrium': { zh: '右心房', en: 'Right Atrium', desc: '接收來自上、下腔靜脈和冠狀靜脈竇的缺氧血，並將其泵入右心室。' },
  'VH_M_left_cardiac_atrium': { zh: '左心房', en: 'Left Atrium', desc: '接收來自肺靜脈的充氧血，並將其泵入左心室。' },
  'VH_M_heart_right_ventricle': { zh: '右心室', en: 'Right Ventricle', desc: '接收來自右心房的缺氧血，並將其透過肺動脈泵至肺部進行氣體交換。' },
  'VH_M_heart_left_ventricle': { zh: '左心室', en: 'Left Ventricle', desc: '心臟肌肉最厚的腔室，負責將充氧血透過主動脈泵送至全身。' },
  'VH_M_interventricular_septum': { zh: '心室中膈', en: 'Interventricular Septum', desc: '分隔左心室與右心室的厚實肌肉壁，防止充氧血與缺氧血混合。' },

  // ─── 瓣膜 (Valves) ───
  'VH_M_tricuspid_valve': { zh: '三尖瓣', en: 'Tricuspid Valve', desc: '位於右心房與右心室之間的瓣膜，防止心室收縮時血液逆流回心房。' },
  'VH_M_mitral_valve': { zh: '二尖瓣 (僧帽瓣)', en: 'Mitral Valve', desc: '位於左心房與左心室之間的瓣膜，有兩片瓣葉。' },
  'VH_M_pulmonary_valve': { zh: '肺動脈瓣', en: 'Pulmonary Valve', desc: '位於右心室與肺動脈之間的半月瓣，防止血液逆流回右心室。' },
  'VH_M_aortic_valve': { zh: '主動脈瓣', en: 'Aortic Valve', desc: '位於左心室與主動脈之間的半月瓣，防止泵出的充氧血逆流回左心室。' },

  // ─── 乳頭肌 (Papillary Muscles) ───
  'VH_M_papillary_muscle_of_heart_anterior': { zh: '前乳頭肌', en: 'Anterior Papillary Muscle', desc: '心室壁上突起的肌肉，透過腱索連接房室瓣（二尖瓣或三尖瓣），防止瓣膜在心室收縮時翻轉。' },
  'VH_M_papillary_muscle_of_heart_posterior': { zh: '後乳頭肌', en: 'Posterior Papillary Muscle', desc: '心室壁後方的乳頭肌。' },
  'VH_M_papillary_muscle_of_heart_medial': { zh: '內側乳頭肌', en: 'Medial Papillary Muscle', desc: '位於心室中膈側的乳頭肌（常見於右心室）。' },
  'VH_M_papillary_muscle_of_heart_anterolateral': { zh: '前外側乳頭肌', en: 'Anterolateral Papillary Muscle', desc: '位於左心室前外側壁的乳頭肌。' },
  'VH_M_papillary_muscle_of_heart_posteromedial': { zh: '後內側乳頭肌', en: 'Posteromedial Papillary Muscle', desc: '位於左心室後內側壁的乳頭肌。' },

  // ─── 冠狀動脈 (Coronary Arteries) ───
  'VH_M_left_coronary_artery': { zh: '左冠狀動脈 (LCA)', en: 'Left Coronary Artery', desc: '源自主動脈根部，供應左心室、左心房及心室中膈前部的血液。' },
  'VH_M_right_coronary_artery': { zh: '右冠狀動脈 (RCA)', en: 'Right Coronary Artery', desc: '供應右心房、右心室以及部分心室中膈後部的血液。' },
  'VH_M_left_anterior_descending_artery': { zh: '左前降支動脈 (LAD)', en: 'Left Anterior Descending Artery', desc: '左冠狀動脈的主要分支，沿前室間溝下行，是心肌梗塞最常發生的部位（俗稱寡婦血管）。' },
  'VH_M_diagonal_branch_of_left_anterior_descending_artery': { zh: '左前降支對角支', en: 'Diagonal Branch (LAD)', desc: '左前降支的分支，供應左心室前側壁。' },
  'VH_M_diagonal_branch_of_anterior_descending_branch_of_left_coronary_artery': { zh: '前降支對角支', en: 'Diagonal Branch', desc: '左前降支的分支。' },
  'VH_M_right_marginal_artery': { zh: '右邊緣動脈', en: 'Right Marginal Artery', desc: '右冠狀動脈的分支，供應右心室外側壁。' },
  'VH_M_left_marginal_branch': { zh: '左邊緣動脈', en: 'Left Marginal Artery', desc: '左迴旋支的分支，供應左心室外側壁。' },
  'VH_M_right_posterior_descending_artery': { zh: '右後降支動脈 (PDA)', en: 'Posterior Descending Artery', desc: '多數人由右冠狀動脈延伸而來，沿後室間溝下行，供應心室中膈後部。' },

  // ─── 冠狀靜脈 (Cardiac Veins) ───
  'VH_M_coronary_sinus': { zh: '冠狀靜脈竇', en: 'Coronary Sinus', desc: '收集心臟大部分靜脈血的粗大靜脈，匯入右心房。' },
  'VH_M_great_cardiac_vein': { zh: '大心靜脈', en: 'Great Cardiac Vein', desc: '與左前降支動脈伴行，收集左心室前部的血液，匯入冠狀靜脈竇。' },
  'VH_M_middle_cardiac_vein': { zh: '中心靜脈', en: 'Middle Cardiac Vein', desc: '與後降支動脈伴行，收集心室後部的血液。' },
  'VH_M_small_cardiac_vein': { zh: '小心靜脈', en: 'Small Cardiac Vein', desc: '與右冠狀動脈伴行，收集右心室的血液。' },
  'VH_M_anterior_cardiac_vein': { zh: '前心靜脈', en: 'Anterior Cardiac Veins', desc: '直接引流右心室前壁血液至右心房的小靜脈。' },
  'VH_M_oblique_vein_of_left_atrium': { zh: '左心房斜靜脈 (Marshall)', en: 'Oblique Vein of Left Atrium', desc: '位於左心房後壁的一條小靜脈。' },
  'VH_M_posterior_vein_of_left_ventricle': { zh: '左心室後靜脈', en: 'Posterior Vein of Left Ventricle', desc: '引流左心室後壁的血液。' },

  // ─── 大血管 (Great Vessels) ───
  'VH_M_ascending_aorta': { zh: '升主動脈', en: 'Ascending Aorta', desc: '由左心室發出，將高壓的充氧血送往全身。' },
  'VH_M_aortic_arch': { zh: '主動脈弓', en: 'Aortic Arch', desc: '升主動脈的延續，彎曲如弓，分出供應頭頸部與上肢的動脈。' },
  'VH_M_descending_aorta_a': { zh: '降主動脈 (上段)', en: 'Descending Aorta', desc: '主動脈弓向下的延續，供應胸腹部與下肢。' },
  'VH_M_descending_aorta_b': { zh: '降主動脈 (下段)', en: 'Descending Aorta', desc: '主動脈弓向下的延續。' },
  
  'VH_M_pulmonary_trunk': { zh: '肺動脈幹', en: 'Pulmonary Trunk', desc: '由右心室發出，將缺氧血送往肺部。' },
  'VH_M_pulmonary_artery_L': { zh: '左肺動脈', en: 'Left Pulmonary Artery', desc: '肺動脈幹的分支，通往左肺。' },
  'VH_M_pulmonary_artery_R': { zh: '右肺動脈', en: 'Right Pulmonary Artery', desc: '肺動脈幹的分支，通往右肺。' },

  'VH_M_pulmonary_vein_L_sup': { zh: '左上肺靜脈', en: 'Left Superior Pulmonary Vein', desc: '將左肺完成氣體交換的充氧血送回左心房。' },
  'VH_M_pulmonary_vein_L_inf': { zh: '左下肺靜脈', en: 'Left Inferior Pulmonary Vein', desc: '將左肺完成氣體交換的充氧血送回左心房。' },
  'VH_M_pulmonary_vein_R_sup': { zh: '右上肺靜脈', en: 'Right Superior Pulmonary Vein', desc: '將右肺完成氣體交換的充氧血送回左心房。' },
  'VH_M_pulmonary_vein_R_inf': { zh: '右下肺靜脈', en: 'Right Inferior Pulmonary Vein', desc: '將右肺完成氣體交換的充氧血送回左心房。' },

  'VH_M_superior_vena_cava': { zh: '上腔靜脈 (SVC)', en: 'Superior Vena Cava', desc: '收集來自頭頸部及上肢的缺氧血，匯入右心房。' },
  'VH_M_inferior_vena_cava_a': { zh: '下腔靜脈 (IVC) 上段', en: 'Inferior Vena Cava', desc: '收集來自軀幹及下肢的缺氧血，匯入右心房。' },
  'VH_M_inferior_vena_cava_b': { zh: '下腔靜脈 (IVC) 下段', en: 'Inferior Vena Cava', desc: '收集來自軀幹及下肢的缺氧血，匯入右心房。' },

  'VH_M_brachiocephalic_artery_a': { zh: '頭臂動脈幹 (近端)', en: 'Brachiocephalic Artery', desc: '主動脈弓的第一個大分支，供應右側頭頸與右上肢。' },
  'VH_M_brachiocephalic_artery_b': { zh: '頭臂動脈幹 (遠端)', en: 'Brachiocephalic Artery', desc: '主動脈弓的第一個大分支。' },
  'VH_M_left_common_carotid_artery_a': { zh: '左總頸動脈 (近端)', en: 'Left Common Carotid Artery', desc: '主動脈弓的第二個分支，供應左側頭頸部。' },
  'VH_M_left_common_carotid_artery_b': { zh: '左總頸動脈 (遠端)', en: 'Left Common Carotid Artery', desc: '主動脈弓的第二個分支，供應左側頭頸部。' },
  'VH_M_left_subclavian_artery_a': { zh: '左鎖骨下動脈 (近端)', en: 'Left Subclavian Artery', desc: '主動脈弓的第三個分支，供應左上肢。' },
  'VH_M_left_subclavian_artery_b': { zh: '左鎖骨下動脈 (遠端)', en: 'Left Subclavian Artery', desc: '主動脈弓的第三個分支，供應左上肢。' },

  'VH_M_brachiocephalic_vein_L': { zh: '左頭臂靜脈', en: 'Left Brachiocephalic Vein', desc: '匯集左頸靜脈與左鎖骨下靜脈，注入上腔靜脈。' },
  'VH_M_brachiocephalic_vein_R': { zh: '右頭臂靜脈', en: 'Right Brachiocephalic Vein', desc: '匯集右頸靜脈與右鎖骨下靜脈，注入上腔靜脈。' }
};

window.getHeartData = function(meshName) {
  if (!meshName) return null;
  const key = meshName.trim();
  if (window.HEART_DATA[key]) {
    return { ...window.HEART_DATA[key], system: '心臟 (Heart)' };
  }
  
  // 兜底處理
  let zh = key.replace(/^(VH_M_|SBU_M_)/i, '').replace(/_/g, ' ');
  zh = zh.replace(/\b\w/g, c => c.toUpperCase());
  return { zh, en: zh, system: '心臟 (Heart)', desc: `${zh} — 心臟及附屬血管結構。` };
};
