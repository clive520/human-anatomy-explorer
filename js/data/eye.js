// 眼睛系統解剖資料 (Eye Anatomy Data)
// 來源：HuBMAP CCF 3D Reference Object Library — VH_Male/v1.2

window.EYE_DATA = {
  // ─── 眼球外壁 (Outer Wall) ───
  'VH_M_sclera_L':               { zh: '鞏膜（左）', en: 'Sclera (L)', desc: '眼球最外層堅硬的白色纖維膜，維持眼球形狀並保護內部結構，即俗稱的「眼白」。' },
  'VH_M_sclera_R':               { zh: '鞏膜（右）', en: 'Sclera (R)', desc: '眼球最外層堅硬的白色纖維膜，維持眼球形狀並保護內部結構，即俗稱的「眼白」。' },
  'VH_M_cornea_L':               { zh: '角膜（左）', en: 'Cornea (L)', desc: '眼球前方的透明凸出部分，是光線進入眼球的第一道關卡，負責大部分的屈光（聚焦）功能。' },
  'VH_M_cornea_R':               { zh: '角膜（右）', en: 'Cornea (R)', desc: '眼球前方的透明凸出部分，是光線進入眼球的第一道關卡，負責大部分的屈光（聚焦）功能。' },
  'VH_M_corneo_scleral_junction_L': { zh: '角鞏膜交界（左）', en: 'Corneoscleral Junction (L)', desc: '角膜與鞏膜的過渡區域，又稱「鞏角膜緣」，含有角膜幹細胞，是重要的外科手術標誌。' },
  'VH_M_corneo_scleral_junction_R': { zh: '角鞏膜交界（右）', en: 'Corneoscleral Junction (R)', desc: '角膜與鞏膜的過渡區域，又稱「鞏角膜緣」。' },

  // ─── 葡萄膜 (Uveal Tract) ───
  'VH_M_iris_L':                 { zh: '虹膜（左）', en: 'Iris (L)', desc: '眼球中間層的環狀有色肌肉組織，透過調整瞳孔大小來控制進入眼球的光線量。其顏色決定了眼睛的顏色。' },
  'VH_M_iris_R':                 { zh: '虹膜（右）', en: 'Iris (R)', desc: '眼球中間層的環狀有色肌肉組織，透過調整瞳孔大小來控制進入眼球的光線量。' },
  'VH_M_pupil_L':                { zh: '瞳孔（左）', en: 'Pupil (L)', desc: '虹膜中央的開孔，光線通過此處進入眼球內部。強光下縮小，暗處放大。' },
  'VH_M_pupil_R':                { zh: '瞳孔（右）', en: 'Pupil (R)', desc: '虹膜中央的開孔，光線通過此處進入眼球內部。' },
  'VH_M_ciliary_body_L':         { zh: '睫狀體（左）', en: 'Ciliary Body (L)', desc: '位於虹膜後方的環形肌肉組織，負責分泌房水，並控制水晶體的曲率（調節視力）。' },
  'VH_M_ciliary_body_R':         { zh: '睫狀體（右）', en: 'Ciliary Body (R)', desc: '位於虹膜後方的環形肌肉組織，負責分泌房水，並控制水晶體的曲率。' },
  'VH_M_ciliary_muscle_L':       { zh: '睫狀肌（左）', en: 'Ciliary Muscle (L)', desc: '睫狀體內的平滑肌，收縮時使水晶體變厚（看近），舒張時使水晶體變薄（看遠）。' },
  'VH_M_ciliary_muscle_R':       { zh: '睫狀肌（右）', en: 'Ciliary Muscle (R)', desc: '睫狀體內的平滑肌，控制水晶體曲率。' },
  'VH_M_ciliary_processes_L':    { zh: '睫狀突（左）', en: 'Ciliary Processes (L)', desc: '睫狀體上的放射狀突起，負責分泌房水，並連接懸韌帶（睫狀小帶）。' },
  'VH_M_ciliary_processes_R':    { zh: '睫狀突（右）', en: 'Ciliary Processes (R)', desc: '睫狀體上的放射狀突起，負責分泌房水。' },
  'VH_M_optic_choroid_L':        { zh: '脈絡膜（左）', en: 'Choroid (L)', desc: '位於鞏膜與視網膜之間的富含血管層，為外層視網膜提供氧氣和營養素。' },
  'VH_M_optic_choroid_R':        { zh: '脈絡膜（右）', en: 'Choroid (R)', desc: '位於鞏膜與視網膜之間的富含血管層，為外層視網膜提供養分。' },

  // ─── 房水相關 (Aqueous Humor System) ───
  'VH_M_aqueous_humor_L':        { zh: '房水（左）', en: 'Aqueous Humor (L)', desc: '填充於角膜與水晶體之間（前房、後房）的透明液體，維持眼球內壓，並為角膜和水晶體提供養分。' },
  'VH_M_aqueous_humor_R':        { zh: '房水（右）', en: 'Aqueous Humor (R)', desc: '填充於前後房的透明液體，維持眼內壓。' },
  'VH_M_schlemms_canal_L':       { zh: 'Schlemm 管（左）', en: "Schlemm's Canal (L)", desc: '位於角鞏膜交界處的環形管道，負責引流房水進入靜脈系統，調節眼內壓。青光眼常與此管道引流不暢有關。' },
  'VH_M_schlemms_canal_R':       { zh: 'Schlemm 管（右）', en: "Schlemm's Canal (R)", desc: '負責引流房水的環形管道，與青光眼密切相關。' },
  'VH_M_trabecular_meshwork_L':  { zh: '小樑網（左）', en: 'Trabecular Meshwork (L)', desc: '位於虹膜角膜角的海綿狀組織，是房水流出的主要通道，功能失常會導致開角型青光眼。' },
  'VH_M_trabecular_meshwork_R':  { zh: '小樑網（右）', en: 'Trabecular Meshwork (R)', desc: '房水流出的主要通道，與青光眼密切相關。' },

  // ─── 水晶體與玻璃體 (Lens & Vitreous) ───
  'VH_M_lens_L':                 { zh: '水晶體（左）', en: 'Lens (L)', desc: '眼球內的雙凸透明結構，透過睫狀肌改變曲率來調節視力。老化後彈性下降即形成老花眼，混濁後稱為白內障。' },
  'VH_M_lens_R':                 { zh: '水晶體（右）', en: 'Lens (R)', desc: '眼球內的雙凸透明結構，調節視力焦距。' },
  'VH_M_vitreous_humor_L':       { zh: '玻璃體（左）', en: 'Vitreous Humor (L)', desc: '填充於水晶體與視網膜之間的透明膠狀物，維持眼球形狀，並允許光線穿透到達視網膜。' },
  'VH_M_vitreous_humor_R':       { zh: '玻璃體（右）', en: 'Vitreous Humor (R)', desc: '填充於水晶體後方的透明膠狀物，維持眼球形狀。' },
  'VH_M_suspensory_ligament_of_lens_L': { zh: '懸韌帶（睫狀小帶）（左）', en: 'Suspensory Ligament / Zonule (L)', desc: '連接睫狀突與水晶體赤道部的纖維束，將水晶體懸吊於正確位置，並傳遞睫狀肌的張力來調節視力。' },
  'VH_M_suspensory_ligament_of_lens_R': { zh: '懸韌帶（睫狀小帶）（右）', en: 'Suspensory Ligament / Zonule (R)', desc: '連接睫狀突與水晶體的纖維束，調節視力。' },

  // ─── 視網膜 (Retina) ───
  'VH_M_retina_L':               { zh: '視網膜（左）', en: 'Retina (L)', desc: '位於眼球後壁的光感受器層，含有視錐細胞（辨色、精細視力）和視桿細胞（暗視覺）。接收光線並轉換為神經訊號，傳向大腦。' },
  'VH_M_retina_R':               { zh: '視網膜（右）', en: 'Retina (R)', desc: '眼球後壁的光感受器層，接收光線並轉換為神經訊號。' },
  'VH_M_fovea_L':                { zh: '中央窩（左）', en: 'Fovea Centralis (L)', desc: '視網膜中央凹陷處，密集分布視錐細胞，是視力最敏銳的區域，負責精細視力和色覺。黃斑病變即影響此區域。' },
  'VH_M_fovea_R':                { zh: '中央窩（右）', en: 'Fovea Centralis (R)', desc: '視力最敏銳的區域，密布視錐細胞。' },
  'VH_M_macula_lutea_L':         { zh: '黃斑（左）', en: 'Macula Lutea (L)', desc: '圍繞中央窩的橢圓形黃色區域（直徑約 5mm），負責中心視覺。老年性黃斑部病變（AMD）好發於此。' },
  'VH_M_macula_lutea_R':         { zh: '黃斑（右）', en: 'Macula Lutea (R)', desc: '負責中心視覺的橢圓形黃色區域，老年性黃斑部病變好發於此。' },
  'VH_M_optic_disc_L':           { zh: '視神經盤（盲點）（左）', en: 'Optic Disc (L)', desc: '視神經從眼球後部離開的點，此處無光感受器，因此是視覺的「盲點」。青光眼可引起視神經盤凹陷。' },
  'VH_M_optic_disc_R':           { zh: '視神經盤（盲點）（右）', en: 'Optic Disc (R)', desc: '視神經離開眼球之處，是視覺的「盲點」。' },
  'VH_M_ora_serrata_of_retina_L':{ zh: '鋸齒緣（左）', en: 'Ora Serrata (L)', desc: '視網膜前端的鋸齒狀邊界，是視網膜與睫狀體的交界處。視網膜撕裂常發生於此。' },
  'VH_M_ora_serrata_of_retina_R':{ zh: '鋸齒緣（右）', en: 'Ora Serrata (R)', desc: '視網膜前端的鋸齒狀邊界，視網膜撕裂常發生於此。' },

  // ─── 結膜 (Conjunctiva) ───
  'VH_M_bulbar_conjunctiva_L':              { zh: '球結膜（左）', en: 'Bulbar Conjunctiva (L)', desc: '覆蓋眼球鞏膜前部的透明黏膜，充血時即出現「眼睛紅」。' },
  'VH_M_bulbar_conjunctiva_R':              { zh: '球結膜（右）', en: 'Bulbar Conjunctiva (R)', desc: '覆蓋眼球鞏膜前部的透明黏膜。' },
  'VH_M_palpebral_conjunctiva_of_upper_eyelid_L': { zh: '上眼瞼結膜（左）', en: 'Upper Palpebral Conjunctiva (L)', desc: '覆蓋上眼瞼內面的黏膜，與球結膜相接，形成結膜囊。' },
  'VH_M_palpebral_conjunctiva_of_upper_eyelid_R': { zh: '上眼瞼結膜（右）', en: 'Upper Palpebral Conjunctiva (R)', desc: '覆蓋上眼瞼內面的黏膜。' },
  'VH_M_palpebral_conjunctiva_of_lower_eyelid_L': { zh: '下眼瞼結膜（左）', en: 'Lower Palpebral Conjunctiva (L)', desc: '覆蓋下眼瞼內面的黏膜。' },
  'VH_M_palpebral_conjunctiva_of_lower_eyelid_R': { zh: '下眼瞼結膜（右）', en: 'Lower Palpebral Conjunctiva (R)', desc: '覆蓋下眼瞼內面的黏膜。' },

  // ─── 眼外肌 (Extraocular Muscles) ───
  'VH_M_superior_rectus_extraocular_muscle_L':  { zh: '上直肌（左）', en: 'Superior Rectus (L)', desc: '使眼球向上轉動的直肌，由動眼神經支配。' },
  'VH_M_superior_rectus_extraocular_muscle_R':  { zh: '上直肌（右）', en: 'Superior Rectus (R)', desc: '使眼球向上轉動的直肌，由動眼神經支配。' },
  'VH_M_inferior_rectus_extraocular_muscle_L':  { zh: '下直肌（左）', en: 'Inferior Rectus (L)', desc: '使眼球向下轉動的直肌。' },
  'VH_M_inferior_rectus_extraocular_muscle_R':  { zh: '下直肌（右）', en: 'Inferior Rectus (R)', desc: '使眼球向下轉動的直肌。' },
  'VH_M_medial_rectus_extraocular_muscle_L':    { zh: '內直肌（左）', en: 'Medial Rectus (L)', desc: '使眼球向鼻側轉動（內轉）的直肌，是眼外肌中最大的一條。' },
  'VH_M_medial_rectus_extraocular_muscle_R':    { zh: '內直肌（右）', en: 'Medial Rectus (R)', desc: '使眼球向鼻側轉動的直肌，是眼外肌中最大的一條。' },
  'VH_M_lateral_rectus_extraocular_muscle_L':   { zh: '外直肌（左）', en: 'Lateral Rectus (L)', desc: '使眼球向顳側轉動（外轉）的直肌，由外展神經（第六腦神經）支配。' },
  'VH_M_lateral_rectus_extraocular_muscle_R':   { zh: '外直肌（右）', en: 'Lateral Rectus (R)', desc: '使眼球向顳側轉動的直肌，由外展神經支配。' },
  'VH_M_superior_oblique_extraocular_muscle_L': { zh: '上斜肌（左）', en: 'Superior Oblique (L)', desc: '使眼球內旋、下轉及外轉的斜肌，由滑車神經（第四腦神經）支配，是最細長的眼外肌。' },
  'VH_M_superior_oblique_extraocular_muscle_R': { zh: '上斜肌（右）', en: 'Superior Oblique (R)', desc: '使眼球內旋、下轉及外轉的斜肌，由滑車神經支配。' },
  'VH_M_inferior_oblique_extraocular_muscle_L': { zh: '下斜肌（左）', en: 'Inferior Oblique (L)', desc: '使眼球外旋、上轉及外轉的斜肌，由動眼神經支配。' },
  'VH_M_inferior_oblique_extraocular_muscle_R': { zh: '下斜肌（右）', en: 'Inferior Oblique (R)', desc: '使眼球外旋、上轉及外轉的斜肌。' },
  'VH_M_levator_palpebrae_superioris_L':        { zh: '上瞼提肌（左）', en: 'Levator Palpebrae Superioris (L)', desc: '負責提起上眼瞼的肌肉，由動眼神經支配。麻痺時會造成上眼瞼下垂（眼瞼下垂症）。' },
  'VH_M_levator_palpebrae_superioris_R':        { zh: '上瞼提肌（右）', en: 'Levator Palpebrae Superioris (R)', desc: '負責提起上眼瞼，麻痺時造成眼瞼下垂。' },

  // ─── 視神經 (Optic Nerve) ───
  'VH_M_left_optic_nerve':   { zh: '視神經（左）', en: 'Optic Nerve (L)', desc: '第二腦神經，將視網膜的視覺訊號傳遞至大腦視覺皮層。左右視神經在視交叉處部分交叉，形成雙眼視覺。' },
  'VH_M_right_optic_nerve':  { zh: '視神經（右）', en: 'Optic Nerve (R)', desc: '第二腦神經，將視網膜的視覺訊號傳遞至大腦。' },
  'VH_M_dura_mater_left':    { zh: '硬腦膜鞘（左視神經）', en: 'Dural Sheath (Optic Nerve L)', desc: '包裹視神經的硬腦膜延伸，提供保護。顱內壓升高時，可引起視神經乳頭水腫。' },
  'VH_M_dura_mater_right':   { zh: '硬腦膜鞘（右視神經）', en: 'Dural Sheath (Optic Nerve R)', desc: '包裹視神經的硬腦膜延伸，提供保護。' },
};

window.getEyeData = function(meshName) {
  if (!meshName) return null;
  const key = meshName.trim();
  if (window.EYE_DATA[key]) {
    return { ...window.EYE_DATA[key], system: '眼睛 (Eye)' };
  }
  let zh = key.replace(/^(VH_M_|VH_F_)/i, '').replace(/_[LR]$/i, '').replace(/_/g, ' ');
  zh = zh.replace(/\b\w/g, c => c.toUpperCase());
  return { zh, en: zh, system: '眼睛 (Eye)', desc: `${zh} — 眼球或附屬構造。` };
};
