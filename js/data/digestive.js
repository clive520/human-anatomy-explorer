// 消化系統解剖資料 (Digestive System Data)
// 來源：HuBMAP CCF 3D Reference Object Library — VH_Male/v1.2

window.DIGESTIVE_DATA = {

  // ─── 肝臟 Liver ───
  'VH_M_bare_area_of_liver':          { zh: '肝裸區', en: 'Bare Area of Liver', desc: '肝臟後面未被腹膜覆蓋的區域，直接與橫膈膜相鄰。' },
  'VH_M_liver_capsule':               { zh: '肝包膜', en: 'Liver Capsule (Glisson\'s Capsule)', desc: '包裹肝臟表面的纖維結締組織囊，稱為格利森氏包膜，保護肝實質並傳入血管神經。' },
  'VH_M_diaphragmatic_surface':       { zh: '肝膈面', en: 'Diaphragmatic Surface', desc: '肝臟的上表面，緊貼橫膈膜，呈凸狀。' },
  'VH_M_suprarenal_impression_of_liver': { zh: '腎上腺壓跡', en: 'Suprarenal Impression', desc: '肝臟臟面的壓跡，與右側腎上腺相鄰。' },
  'VH_M_renal_impression_of_liver':   { zh: '腎臟壓跡', en: 'Renal Impression', desc: '肝臟臟面的壓跡，與右腎相鄰。' },
  'VH_M_gastric_impression_of_liver': { zh: '胃壓跡', en: 'Gastric Impression', desc: '肝臟左葉臟面與胃相鄰所形成的壓跡。' },
  'VH_M_colic_impression_of_liver':   { zh: '結腸壓跡', en: 'Colic Impression', desc: '肝臟臟面與結腸肝曲相鄰所形成的壓跡。' },
  'VH_M_esophageal_impression_of_liver': { zh: '食道壓跡', en: 'Esophageal Impression', desc: '肝臟左葉上部與食道相鄰所形成的淺壓跡。' },
  'VH_M_duodenal_impression_of_liver': { zh: '十二指腸壓跡', en: 'Duodenal Impression', desc: '肝臟臟面與十二指腸相鄰所形成的壓跡。' },
  'VH_M_porta_hepatis':               { zh: '肝門', en: 'Porta Hepatis', desc: '肝臟臟面的橫溝，是門靜脈、肝動脈進入及肝管離開肝臟的通道，為肝臟最重要的解剖標誌之一。' },
  'VH_M_caudate_lobe_of_liver':       { zh: '肝尾狀葉', en: 'Caudate Lobe', desc: '位於肝門上方與下腔靜脈之間的小肝葉（Couinaud 第 I 段），接受雙側血液供應，手術切除難度較高。' },
  'VH_M_right_posteroinferior_segment': { zh: '右後下段 (VI段)', en: 'Right Posteroinferior Segment (S6)', desc: 'Couinaud 肝臟分段的第 VI 段，位於右肝後下方。' },
  'VH_M_right_posterosuperior_segment': { zh: '右後上段 (VII段)', en: 'Right Posterosuperior Segment (S7)', desc: 'Couinaud 肝臟分段的第 VII 段，位於右肝後上方。' },
  'VH_M_right_anterosuperior_segment': { zh: '右前上段 (VIII段)', en: 'Right Anterosuperior Segment (S8)', desc: 'Couinaud 肝臟分段的第 VIII 段，位於右肝前上方。' },
  'VH_M_right_anteroinferior_segment': { zh: '右前下段 (V段)', en: 'Right Anteroinferior Segment (S5)', desc: 'Couinaud 肝臟分段的第 V 段，位於右肝前下方。' },
  'VH_M_left_anterolateral_segment':  { zh: '左前外段 (III段)', en: 'Left Anterolateral Segment (S3)', desc: 'Couinaud 肝臟分段的第 III 段，位於左肝外葉下方。' },
  'VH_M_left_posterolateral_segment': { zh: '左後外段 (II段)', en: 'Left Posterolateral Segment (S2)', desc: 'Couinaud 肝臟分段的第 II 段，位於左肝外葉上方。' },
  'VH_M_left_superiomedial_segment':  { zh: '左上內段 (IVa段)', en: 'Left Superomedial Segment (S4a)', desc: 'Couinaud 肝臟分段的第 IVa 段，位於左肝內葉上方。' },
  'VH_M_left_inferomedial_segment':   { zh: '左下內段 (IVb段)', en: 'Left Inferomedial Segment (S4b)', desc: 'Couinaud 肝臟分段的第 IVb 段，位於左肝內葉下方。' },
  'VH_M_quadrate_lobe_of_liver':      { zh: '肝方葉', en: 'Quadrate Lobe', desc: '位於肝門前方、膽囊窩與圓韌帶之間的肝葉，在功能上屬於左肝內葉（S4b）。' },
  'VH_M_hepataduodenal_ligament':     { zh: '肝十二指腸韌帶', en: 'Hepatoduodenal Ligament', desc: '連接肝門與十二指腸的腹膜褶，其中包含門靜脈、肝動脈和膽總管（Pringle 三角）。' },
  'VH_M_ligamentum_venosum':          { zh: '靜脈韌帶', en: 'Ligamentum Venosum', desc: '胎兒時期靜脈導管的遺跡，位於肝臟臟面的靜脈韌帶裂。' },
  'VH_M_round_ligament_of_liver':     { zh: '肝圓韌帶', en: 'Round Ligament of Liver', desc: '臍靜脈閉鎖後形成的纖維帶，連接臍與肝臟。' },
  'VH_M_triangular_ligament_of_liver': { zh: '三角韌帶', en: 'Triangular Ligament', desc: '將肝臟固定於橫膈膜的腹膜褶，分左右兩條。' },
  'VH_M_falciform_ligament':          { zh: '鐮狀韌帶', en: 'Falciform Ligament', desc: '呈鐮刀形的腹膜褶，將肝臟固定於腹壁前方並分隔左右肝葉。' },
  'VH_M_coronary_ligament_of_liver':  { zh: '冠狀韌帶', en: 'Coronary Ligament', desc: '連接肝臟上面與橫膈膜的腹膜反摺，圍繞肝裸區周圍。' },

  // ─── 小腸 Small Intestine ───
  'VH_M_ileum':                       { zh: '迴腸', en: 'Ileum', desc: '小腸最長的部分（約 3.5 公尺），主要負責吸收維生素 B12、膽汁酸及其餘營養素，末端連接大腸。' },
  'VH_M_ileum_terminal':              { zh: '末端迴腸', en: 'Terminal Ileum', desc: '迴腸最後 5–10 公分，是維生素 B12 與膽汁酸的唯一主動吸收位置，也是克隆氏症最常侵犯的部位。' },
  'VH_M_jejunum':                     { zh: '空腸', en: 'Jejunum', desc: '小腸的中段（約 2.5 公尺），含有大量腸絨毛與微絨毛，是葡萄糖、胺基酸和脂肪酸的主要吸收場所。' },
  'VH_M_duodenum_ascending':          { zh: '十二指腸升部', en: 'Ascending Duodenum (D4)', desc: '十二指腸的第四段（升部），沿主動脈上行後移行為空腸，以 Treitz 韌帶為界。' },
  'VH_M_duodenum_descending':         { zh: '十二指腸降部', en: 'Descending Duodenum (D2)', desc: '十二指腸第二段，胰管與總膽管在此開口（Vater 壺腹），是膽汁與胰液進入腸道的入口。' },
  'VH_M_duodenum_horizonal':          { zh: '十二指腸水平部', en: 'Horizontal Duodenum (D3)', desc: '十二指腸第三段（水平部），橫跨腹主動脈與下腔靜脈前方，受腸繫膜上動脈由上方跨越。' },
  'VH_M_duodenum_superior':           { zh: '十二指腸上部', en: 'Superior Duodenum (D1)', desc: '十二指腸第一段，緊接幽門，為消化性潰瘍最常見的位置。' },
  'VH_M_duodenal_ampulla':            { zh: '十二指腸壺腹', en: 'Duodenal Ampulla (Ampulla of Vater)', desc: '膽總管與主胰管共同開口形成的膨大處，受 Oddi 括約肌控制，調節膽汁與胰液的流出。' },
  'VH_M_sphincter_of_hepatopancreatic_ampulla': { zh: 'Oddi 括約肌', en: 'Sphincter of Oddi', desc: '環繞 Vater 壺腹的平滑肌括約肌，控制膽汁和胰液的釋放，防止十二指腸內容物逆流。' },
  'VH_M_papilla_of_santorini':        { zh: '桑托里尼乳頭', en: 'Papilla of Santorini (Minor Duodenal Papilla)', desc: '副胰管的開口乳頭，位於十二指腸降部的次要乳頭。' },

  // ─── 大腸 Large Intestine ───
  'VH_M_ascending_colon':             { zh: '升結腸', en: 'Ascending Colon', desc: '大腸起始段，自盲腸向上延伸至肝曲，主要功能是吸收水分與電解質，使腸內容物變稠。' },
  'VH_M_descending_colon':            { zh: '降結腸', en: 'Descending Colon', desc: '大腸從脾曲向下延伸至乙狀結腸的部分，負責儲存待排出的糞便。' },
  'VH_M_hepatic_flexure_of_colon':    { zh: '結腸肝曲', en: 'Hepatic Flexure (Right Colic Flexure)', desc: '升結腸轉向橫結腸的直角彎曲，位於肝臟下方，又稱右結腸曲。' },
  'VH_M_rectum':                      { zh: '直腸', en: 'Rectum', desc: '大腸最末端（約 12–15 公分），負責暫時儲存糞便，直到排便反射啟動。' },
  'VH_M_sigmoid_colon':               { zh: '乙狀結腸', en: 'Sigmoid Colon', desc: '呈 S 形彎曲，連接降結腸與直腸，是大腸最易出現憩室炎的部位。' },
  'VH_M_splenic_flexure_of_colon':    { zh: '結腸脾曲', en: 'Splenic Flexure (Left Colic Flexure)', desc: '橫結腸轉向降結腸的彎曲，位於脾臟下方，角度較肝曲更銳利，手術操作較困難。' },
  'VH_M_transverse_colon':            { zh: '橫結腸', en: 'Transverse Colon', desc: '連接升結腸與降結腸的腸段，橫跨腹腔，是大腸中活動度最大的部分，由橫結腸繫膜固定。' },
  'VH_M_ileocecal_valve':             { zh: '迴盲瓣', en: 'Ileocecal Valve (Bauhin\'s Valve)', desc: '位於迴腸與盲腸交界處的單向瓣膜，防止大腸內容物逆流至小腸，同時控制迴腸排出速度。' },
  'VH_M_caecum':                      { zh: '盲腸', en: 'Caecum', desc: '大腸的起始盲端袋狀結構，位於右髂窩，蚓突（闌尾）即附著於此。' },
  'VH_M_vermiform_appendix':          { zh: '蚓突（闌尾）', en: 'Vermiform Appendix', desc: '附著於盲腸的蠕蟲狀盲管（約 5–10 公分），含有豐富的淋巴組織，闌尾炎是其最常見的疾病。' },

  // ─── 胰臟 Pancreas ───
  'VH_M_body_of_pancreas':            { zh: '胰體', en: 'Body of Pancreas', desc: '胰臟中間最大的部分，橫跨脊椎前方（L1–L2），含有外分泌腺泡（分泌胰液）與胰島（分泌胰島素）。' },
  'VH_M_tail_of_pancreas':            { zh: '胰尾', en: 'Tail of Pancreas', desc: '胰臟最左側的細長部分，延伸至脾門附近，是胰臟唯一被腹膜覆蓋且可移動的部分。' },
  'VH_M_head_of_pancreas':            { zh: '胰頭', en: 'Head of Pancreas', desc: '胰臟最右側最寬大的部分，坐落於十二指腸 C 形彎曲內側，胰管在此匯合膽總管後開口於 Vater 壺腹。' },
  'VH_M_neck_of_pancreas':            { zh: '胰頸', en: 'Neck of Pancreas', desc: '連接胰頭與胰體的較窄部分，其後方是腸繫膜上靜脈與門靜脈匯合的位置，為胰臟手術的重要解剖標誌。' },
  'VH_M_uncinate_process_of_the_pancreas': { zh: '胰鉤突', en: 'Uncinate Process', desc: '胰頭向左下方延伸的突起，鉤繞在腸繫膜上動靜脈後方，是胰頭十二指腸切除術中最難分離的部分。' },

  // ─── 膽囊 Gallbladder ───
  'VH_M_gallbladder':                 { zh: '膽囊', en: 'Gallbladder', desc: '位於肝臟右葉下面膽囊窩的梨形囊狀器官（容積約 30–50 ml），負責儲存並濃縮肝臟分泌的膽汁，進食後收縮排放膽汁至十二指腸以助消化脂肪。' },

  // ─── 膽道樹 Biliary Tree ───
  'VH_M_dorsal_pancreatic_duct':      { zh: '背胰管（副胰管）', en: 'Dorsal Pancreatic Duct', desc: '主胰管上方的輔助導管，開口於十二指腸副乳頭（Santorini 乳頭）。' },
  'VH_M_common_bile_duct':            { zh: '膽總管', en: 'Common Bile Duct', desc: '由肝總管與膽囊管匯合而成（長約 7–10 cm），向下穿過胰頭後與胰管匯合，開口於 Vater 壺腹。' },
  'VH_M_ventral_pancreatic_duct':     { zh: '腹胰管（主胰管）', en: 'Ventral Pancreatic Duct (Wirsung)', desc: '胰臟的主要導管，縱貫胰臟全長，在胰頭處與膽總管匯合後共同開口於 Vater 壺腹。' },
  'VH_M_hepatopancreatic_ampulla':    { zh: 'Vater 壺腹', en: 'Hepatopancreatic Ampulla (Ampulla of Vater)', desc: '膽總管與主胰管的共同開口膨大處，受 Oddi 括約肌控制，是膽胰匯合的關鍵結構。' },
  'VH_M_right_hepatic_duct':          { zh: '右肝管', en: 'Right Hepatic Duct', desc: '引流肝臟右葉膽汁的管道，與左肝管匯合形成肝總管。' },
  'VH_M_left_hepatic_duct':           { zh: '左肝管', en: 'Left Hepatic Duct', desc: '引流肝臟左葉膽汁的管道，較右肝管細長，與右肝管匯合形成肝總管。' },
  'VH_M_common_hepatic_duct':         { zh: '肝總管', en: 'Common Hepatic Duct', desc: '左右肝管在肝門處匯合形成的管道（長約 4 cm），向下與膽囊管匯合形成膽總管。' },
  'VH_M_cystic_duct':                 { zh: '膽囊管', en: 'Cystic Duct', desc: '連接膽囊頸部與肝總管的導管（長約 3–4 cm），其內側的螺旋瓣（Heister 瓣）可調節膽汁的流入流出。' },
};

// 消化系統的查詢函式
window.getDigestiveData = function(meshName) {
  if (!meshName) return null;
  const clean = meshName.replace(/\.\d+$/, '').toLowerCase().trim();
  for (const [key, val] of Object.entries(window.DIGESTIVE_DATA)) {
    if (key.toLowerCase() === clean) {
      return { zh: val.zh, en: val.en, system: '消化系統', desc: val.desc };
    }
  }
  let zh = meshName.replace(/^(VH_M_|SBU_M_)/i, '').replace(/_/g, ' ');
  zh = zh.replace(/\b\w/g, c => c.toUpperCase());
  return { zh, en: zh, system: '消化系統', desc: `${zh} — 消化系統的重要構造，參與食物消化、吸收與廢物排泄。` };
};
