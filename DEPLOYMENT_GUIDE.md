# 🚀 GitHub Pages 部署指南

## 步驟 1：創建 GitHub Repository

1. 前往 [GitHub](https://github.com) 並登入
2. 點擊右上角的 **+** → **New repository**
3. 填寫資訊：
   - Repository name: `my-portfolio` (或任何你喜歡的名稱)
   - Description: 個人作品集網站
   - 選擇 **Public**
   - **不要**勾選任何初始化選項
4. 點擊 **Create repository**

## 步驟 2：推送代碼

在你的專案資料夾中開啟終端機/命令提示字元，執行：

```bash
# 1. 添加所有文件
git add .

# 2. 創建第一個提交
git commit -m "Initial commit: Portfolio website"

# 3. 設定主分支名稱為 main
git branch -M main

# 4. 添加遠端 repository
# ⚠️ 將 YOUR_USERNAME 替換為你的 GitHub 用戶名
# ⚠️ 將 my-portfolio 替換為你的 repository 名稱
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git

# 5. 推送到 GitHub
git push -u origin main
```

## 步驟 3：啟用 GitHub Pages

1. 在 GitHub 上進入你的 repository
2. 點擊 **Settings**（設定）
3. 向下滾動找到 **Pages**（在左側選單）
4. 在 **Source** 區塊：
   - 選擇 **Deploy from a branch**
   - Branch: 選擇 **main**
   - Folder: 選擇 **/ (root)**
5. 點擊 **Save**

## 步驟 4：查看你的網站

1. 等待約 2-10 分鐘
2. 在 Pages 設定頁面會顯示你的網站網址：
   ```
   https://YOUR_USERNAME.github.io/my-portfolio/
   ```
3. 點擊連結查看你的作品集！

## 🔄 更新網站

當你修改內容後，執行以下命令更新網站：

```bash
# 添加變更
git add .

# 提交變更
git commit -m "更新內容描述"

# 推送到 GitHub
git push
```

GitHub Pages 會自動更新你的網站（通常需要 1-2 分鐘）。

## ⚠️ 常見問題

### 1. 網站顯示 404
- 確認 repository 是 Public
- 確認有 index.html 文件
- 等待幾分鐘再試

### 2. 樣式或圖片無法載入
- 檢查路徑是否正確（使用相對路徑）
- 確認文件名大小寫正確
- 清除瀏覽器快取

### 3. 更新後網站沒有變化
- 等待 1-2 分鐘
- 清除瀏覽器快取（Ctrl+F5）
- 檢查 GitHub Actions 是否有錯誤

## 💡 提示

- 使用自訂網域：在 Settings → Pages → Custom domain
- 啟用 HTTPS：GitHub Pages 預設提供 HTTPS
- 查看部署狀態：在 Actions 標籤查看部署進度

---

需要幫助？查看 [GitHub Pages 官方文檔](https://docs.github.com/pages)