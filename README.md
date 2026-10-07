# 个人主页 · 葛瀚泽

求职用个人主页。纯静态站点，无构建步骤、无外部依赖（不加载任何 CDN、字体或统计脚本），可离线打开，也可直接部署到任意静态托管。

## 目录结构

```
个人主页/
├─ index.html                    中文主页
├─ en/index.html                 英文主页（一键切换，右上角 中 / EN）
├─ reports/cf-peek.html          报告阅读页：CF/PEEK 特种工程塑料改性
├─ reports/cvd-sic.html          报告阅读页：CVD 硅碳负极
├─ en/reports/*.html             上述两页的英文摘要版
└─ assets/
   ├─ css/style.css              唯一样式表（主页 + 报告页 + 亮/暗色 + 打印）
   ├─ js/app.js                  主题切换 / 移动端菜单 / 复制邮箱 / 目录高亮
   ├─ img/photo.jpg              证件照 760×1064
   ├─ img/favicon.svg            站点图标
   └─ files/                     4 份可下载 PDF（2 份报告 + 中英文简历）
```

## 本地预览

双击 `index.html` 即可。报告页之间的跳转、PDF 下载、语言切换全部走相对路径，`file://` 下同样可用。

## 部署（任选其一，都是免费的）

**GitHub Pages**（推荐，链接稳定且带 https）

```bash
cd 个人主页
git init && git add . && git commit -m "personal homepage"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```
然后在仓库 Settings → Pages 里把 Source 设为 `main` / `root`，几分钟后访问
`https://<你的用户名>.github.io/<仓库名>/`。

**Vercel / Netlify / Cloudflare Pages**：把 `个人主页` 整个文件夹拖进它们的网页控制台即可，无需任何构建配置（Build command 留空，Output directory 填 `.`）。

## 修改内容

- 主页文字、经历、项目：直接编辑 `index.html` 与 `en/index.html`（两份结构一一对应，改一边记得改另一边）。
- 配色、字号、间距：改 `assets/css/style.css` 顶部的 CSS 变量（`--accent` 是主色 #12587f）。暗色模式自动跟随系统，也可用右上角按钮手动切换。
- 报告正文：改 `简历/行研/新建文件夹/code_artifact (1).md`（CF/PEEK）与 `code_artifact (2).md`（CVD），英文摘要改 `_sitebuild/en_brief_1.md`、`_sitebuild/en_brief_2.md`，然后重新生成：

```bash
python _sitebuild/build_reports.py     # 重新渲染 4 个报告页
python _sitebuild/check_site.py        # 校验链接、锚点、资源、标签是否完好
```

（`build_reports.py` 是纯标准库的 Markdown 渲染器，支持标题、GFM 表格、嵌套列表、围栏代码块，以及一个极小的 LaTeX 子集：`\times \to \sum \pm \circ \% \text{}` 与 `_ ^` 上下标。公式在生成时就转成 HTML，不依赖 MathJax/KaTeX。）

## 说明

- 站点只公开 **邮箱 hanzege2@163.com** 与 **LinkedIn /in/hasel-ge**，不含手机号。
- 打印友好：报告页有「打印 / 存为 PDF」按钮，`@media print` 会隐藏导航与目录栏。
- 无障碍：语义化标签、跳转到主内容链接、键盘焦点样式、图片 alt、`prefers-reduced-motion` 下关闭动画。
