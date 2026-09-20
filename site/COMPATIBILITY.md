# Markdown 兼容性检查

检查时间：2026-09-20。范围与旧 Quarto 网站一致；没有修改原始 Markdown。

## 已通过

- 240 份 Markdown 成功构建为 274 个页面，另有 404 页面。
- 检查了所有 275 个 HTML 页面的本地资源及页面链接，没有生成指向缺失文件的链接。
- Obsidian 双链、中文路径、图片尺寸、笔记/标题/段落嵌入、折叠 callout、块引用、公式、表格及标题编号通过测试。
- 桌面和手机布局、左右侧栏独立开关、目录定位/折叠、搜索、字号设置、GitHub 链接与前后页导航通过浏览器测试。
- 对 8,764 个不同的 LaTeX 表达式做了渲染检查；除下列 3 处原文语法问题，其余表达式均未触发 MathJax 解析错误。这不是数学内容的正确性审校。
- `aligned`/`gathered` 内手动编号已在渲染层兼容；Markdown 和公式标签保持原样。

## 原笔记里的 3 处 LaTeX 语法问题

这些是原文已有的语法错误，留给作者确认后修正；网站改版没有改写笔记。

| 笔记 | 位置 | 问题 |
| --- | --- | --- |
| `notes/理论/实分析/第八章/8.2 Criterion for Integrability.md` | 第 94 行，“Example 1” 的分段函数 | 换行处写成了 `\$$6pt]`，会提前结束公式；疑似原意为 `\\[6pt]`。 |
| `notes/理论/广义相对论/Ch. 8 — Geodesics.md` | 第 32 行，连续推导 (8.12) | 行末 `\dot x^{\nu}}` 多出一个右花括号。 |
| `research/Hypre/Paper.md` | 第 38 行，累计成本目标函数 | `T_{wall^{(t)}` 的下标花括号未闭合；需作者确认所需的上下标分组。 |

路径均相对于 Obsidian 的 `content/` 目录。完整表达式和解析信息见 `.preview-artifacts/math-audit.json`。

## 原笔记里的 3 处未解析链接

| 笔记 | 目标 |
| --- | --- |
| `notes/理论/index.md` | `偏微分方程/index.md`（当前实际课程位于 `PDEs`，不擅自猜测重定向） |
| `notes/理论/index.md` | `微分几何笔记/index.md`（实际文件夹名称不同） |
| `research/Advanced Lab/Module 1 LabVIEW.md` | `SetupPhase/learning-setup/scripts/test%201.py`（未找到对应目标） |

侧栏层级由实际笔记文件生成，因此正常浏览不依赖前两处旧目录链接。有正文的索引文件直接显示为 Markdown 页面；同名文件夹笔记优先作为侧栏可点击的文件夹名称。未解析的旧正文链接仍显示为非点击文本。

## 明确的边界

- 本地公式字体及 MathJax 不依赖 CDN；原笔记的外部图片依然依赖其原始网站。
- Markdown 内的代码不自动执行；Dataview、实时 TikZ 等 Obsidian 插件功能不作为网页脚本运行。
- 独立的整行笔记嵌入会展开；正文行内的笔记嵌入按链接处理。
- 新构建输出位于 `.quiet-reader/dist/`，不会改写原站 `docs/`，也不会部署到线上。
