# 個人作品集網站 | Personal Portfolio Website

一個現代化的個人作品集網站，使用純前端技術打造，展示專業技能和作品。

## 🌟 特色功能

- **響應式設計** - 完美適配各種設備尺寸
- **Material Design** - 遵循 Material Design 設計規範
- **流暢動畫** - 使用 GSAP 實現的精美動畫效果
- **模組化架構** - 清晰的代碼結構，易於維護
- **SEO 優化** - 包含完整的 meta 標籤和語義化 HTML

## 🛠 技術棧

- **HTML5** - 語義化標籤結構
- **CSS3** - 現代化樣式與動畫
- **JavaScript (ES6+)** - 原生 JavaScript，無框架依賴
- **GSAP** - 專業動畫庫
- **Material Design** - Google 設計系統

## 📁 專案結構

```
portfolio/
├── index.html              # 首頁
├── about.html             # 關於我頁面
├── project-*.html         # 專案詳情頁
├── css/
│   ├── main.css          # 主要樣式
│   ├── material-design.css # Material Design 系統
│   ├── responsive.css    # 響應式設計
│   └── animations.css    # 動畫樣式
├── js/
│   ├── main.js          # 主要功能
│   ├── animations.js    # GSAP 動畫
│   ├── utils.js         # 工具函數
│   └── *.js            # 其他模組
└── assets/
    ├── images/         # 圖片資源
    ├── icons/          # 圖標文件
    └── fonts/          # 字體文件
```

## 🚀 部署到 GitHub Pages

### 1. 創建 GitHub Repository

1. 登入 [GitHub](https://github.com)
2. 點擊右上角的 "+" → "New repository"
3. 輸入 repository 名稱（例如：`portfolio`）
4. 設為 Public（GitHub Pages 免費版需要公開）
5. 不要勾選 "Add a README file"（我們已經有了）
6. 點擊 "Create repository"

### 2. 推送代碼到 GitHub

在終端機中執行以下命令：

```bash
# 添加所有文件到 Git
git add .

# 提交變更
git commit -m "Initial commit: Portfolio website"

# 添加遠端 repository（將 YOUR_USERNAME 替換為你的 GitHub 用戶名）
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# 推送到 GitHub
git push -u origin main
```

### 3. 啟用 GitHub Pages

1. 進入你的 GitHub repository
2. 點擊 "Settings" 標籤
3. 在左側選單找到 "Pages"
4. 在 "Source" 下拉選單選擇 "Deploy from a branch"
5. 在 "Branch" 選擇 "main" 和 "/ (root)"
6. 點擊 "Save"

### 4. 訪問你的網站

等待幾分鐘後，你的網站將會在以下網址上線：
```
https://YOUR_USERNAME.github.io/portfolio/
```

## 🔧 本地開發

### 使用 Live Server（推薦）

1. 安裝 VS Code 的 Live Server 擴充功能
2. 右鍵點擊 `index.html`
3. 選擇 "Open with Live Server"

### 使用 Python 簡易伺服器

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然後訪問 `http://localhost:8000`

## 📝 自定義內容

### 更新個人資訊

1. 編輯 `index.html` 中的個人資訊
2. 替換 `assets/images/` 中的圖片
3. 更新專案詳情頁面的內容

### 添加新專案

1. 複製任一 `project-*.html` 文件
2. 更新內容和圖片
3. 在首頁的精選作品區塊添加連結

## 🎨 自定義樣式

主要的設計變數都在 `css/material-design.css` 中定義：

```css
:root {
  --md-primary: #1976d2;          /* 主色調 */
  --md-primary-light: #42a5f5;    /* 主色調淺色 */
  --md-primary-dark: #0d47a1;     /* 主色調深色 */
  /* ... 更多變數 */
}
```

## 📱 瀏覽器支援

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移動設備瀏覽器

## 📄 授權

此專案僅供個人使用和學習參考。

---

如有任何問題或建議，歡迎提出 Issue 或 Pull Request！