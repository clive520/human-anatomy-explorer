import { execSync } from 'child_process';

const run = (command) => {
  console.log(`\n> ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (err) {
    console.error(`\n❌ 部署中斷！執行 '${command}' 時發生錯誤。請檢查錯誤訊息。`);
    process.exit(1);
  }
};

console.log("🚀 開始安全部署流程...");
console.log("📋 專案：人體解剖互動網站 (human-anatomy-explorer)");

// 1. 加入所有變更
run("git add .");

// 2. Commit 變更 (如果有改變的話)
try {
  execSync('git commit -m "Auto deploy update"', { stdio: 'ignore' });
  console.log("✅ 成功建立版本紀錄。");
} catch (e) {
  console.log("ℹ️ 目前沒有需要提交的新變更，繼續流程...");
}

// 3. Push 到 GitHub（關鍵安全閘門，必須成功才能繼續）
run("git push");
console.log("✅ GitHub 備份成功！");

// 4. 部署到 Firebase Hosting（純靜態，無需 build 步驟）
// 使用 cmd /c 繞過 PowerShell 執行原則限制
run("cmd /c npx firebase-tools deploy --only hosting");

console.log("🎉 部署完成！雲端已更新至最新版本。");
