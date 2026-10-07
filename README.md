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

## 上线状态

已托管在 GitHub：仓库 `https://github.com/Hanze-GE/Hanze-GE.github.io`，分支 `main`。

仓库名与用户名同名（`<用户名>.github.io`），属于 **用户主页**，所以站点直接挂在根域名下：

**https://hanze-ge.github.io/**

不是 `.../个人主页/` 这类子路径。对应的 Pages 设置是 Source = `main` / `root`。

## 日常更新流程

本目录已经是一个 git 仓库并连好 `origin`，改完推送即可：

```bash
cd C:\Users\1\Desktop\DS\个人主页
git add -A
git commit -m "更新说明"
git push
```

推送后约 1 分钟自动重新发布。进度看仓库的 Actions 标签页，或 Settings → Pages。

只想改几个字、不想开终端：在 GitHub 仓库页面点进对应文件 → 右上角铅笔图标 → 直接编辑 → Commit changes。同样会自动上线。

> 注意：本目录里的所有文件都会公开可访问，包括这个 `README.md`（在 `https://hanze-ge.github.io/README.md`）。不想公开的文件不要放进这里。


## 修改内容

| 想改什么 | 改哪儿 |
| --- | --- |
| 主页的自我介绍、经历、项目、技能、联系方式 | `index.html`（中文）、`en/index.html`（英文）——两份结构一一对应，改一边记得改另一边 |
| 配色、字号、间距 | `assets/css/style.css` 顶部的 CSS 变量（`--accent` 是主色 #12587f） |
| 证件照 | 替换 `assets/img/photo.jpg`（建议 760×1064 左右） |
| 简历 / 报告 PDF | 用同名文件替换 `assets/files/` 里对应的那份 |
| 报告阅读页正文 | **不在本目录**，见下 |

### 报告正文怎么改

源文件在工作区的另一个位置：

- `简历\行研\新建文件夹\code_artifact (1).md` —— CF/PEEK 报告
- `简历\行研\新建文件夹\code_artifact (2).md` —— CVD 硅碳负极报告
- `_sitebuild\en_brief_1.md` / `_sitebuild\en_brief_2.md` —— 对应英文摘要

改完在 `DS` 目录下重新渲染并校验（渲染器不在站点里，所以要在上层跑）：

```bash
python _sitebuild/build_reports.py     # 重新生成 4 个报告页
python _sitebuild/check_site.py        # 校验链接、锚点、资源、标签是否完好
```

再把 `个人主页` 里的改动 commit + push 即可。

（`build_reports.py` 是纯标准库的 Markdown 渲染器，支持标题、GFM 表格、嵌套列表、围栏代码块，以及一个极小的 LaTeX 子集：`\times \to \sum \pm \circ \% \text{}` 与 `_ ^` 上下标。公式在生成时就转成 HTML，不依赖 MathJax/KaTeX。）


## 说明

- 站点只公开 **邮箱 hanzege2@163.com** 与 **LinkedIn /in/hasel-ge**，不含手机号。
- 打印友好：报告页有「打印 / 存为 PDF」按钮，`@media print` 会隐藏导航与目录栏。
- 无障碍：语义化标签、跳转到主内容链接、键盘焦点样式、图片 alt、`prefers-reduced-motion` 下关闭动画。
