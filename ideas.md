# CP-GPE Net 网站设计构思

## 项目背景
China Plantation Growth, Physiology & Ecology Network — 一个国际级的人工林生理生态监测网络平台。需要传达：科学严谨、国际水准、暗色高端、生态关怀。

---

<response>
## Idea 1: "Dark Canopy" — 暗夜林冠美学

<text>
### Design Movement
**Dark Ecological Brutalism** — 将科学监测的严谨感与森林生态的有机美感结合，用深邃的暗色调营造沉浸式的"林下"体验。

### Core Principles
1. **沉浸式暗色空间**：整个网站如同置身于夜间森林，深绿与墨黑为主色调
2. **数据即美学**：将科学数据可视化融入视觉设计，数字本身成为装饰元素
3. **有机几何**：用树木年轮、叶脉纹理等自然几何图案替代传统的直线网格
4. **光影叙事**：金色光点模拟阳光穿透林冠的效果

### Color Philosophy
- 主背景：`#0d1f17`（深墨绿）— 代表森林深处的静谧
- 次背景：`#1a3a2a`（暗森林绿）— 层次感
- 强调色：`#c8963e`（琥珀金）— 阳光穿透林冠的温暖
- 文字：`#e8e4dd`（暖白）— 柔和不刺眼
- 辅助：`#2d5a3f`（苔藓绿）— 过渡色

### Layout Paradigm
全屏垂直滚动叙事，每个section占满视口，通过视差滚动创造深度。侧边固定导航点。地图section采用全宽沉浸式布局。

### Signature Elements
1. **发光粒子系统**：Hero区域模拟萤火虫/光斑效果
2. **年轮纹理分隔线**：section之间用同心圆弧线分隔
3. **脉冲标记点**：地图上的站点用呼吸式发光动画

### Interaction Philosophy
悬停时元素微微发光，如同林间生物的生物荧光反应。滚动触发的渐入效果模拟在森林中逐步深入的体验。

### Animation
- Hero: 缓慢漂浮的光斑粒子 + 视差背景
- 数字统计: 滚动触发的计数器动画
- 卡片: 悬停时边框发出金色微光
- 地图标记: 持续的脉冲呼吸动画
- 页面过渡: 淡入淡出 + 轻微上移

### Typography System
- 标题：**Playfair Display**（衬线体）— 学术优雅感
- 正文：**Source Sans 3**（无衬线）— 清晰可读
- 数据/标签：**JetBrains Mono**（等宽）— 科学数据感
</text>
<probability>0.08</probability>
</response>

---

<response>
## Idea 2: "Meridian Grid" — 经纬网格科学美学

<text>
### Design Movement
**Scientific Cartographic Modernism** — 以地图学和科学制图为灵感，将经纬线、等高线、数据图表融入整体视觉语言。

### Core Principles
1. **制图学视觉语言**：经纬线网格作为基础视觉元素贯穿全站
2. **精密感**：所有元素对齐严格，间距精确，传达科学精密
3. **数据驱动叙事**：每个section都有数据可视化元素作为背景装饰
4. **冷暖对比**：冷色科学感 + 暖色人文关怀

### Color Philosophy
- 主背景：`#0a1a12`（极深绿黑）— 卫星夜景的深邃
- 网格线：`#1a3a2a` 20%透明度 — 若隐若现的经纬线
- 强调色：`#d4a84b`（暖金）— 数据高亮和交互反馈
- 次强调：`#3d8b6e`（翡翠绿）— 生态活力
- 文字：`#f0ece4`（象牙白）

### Layout Paradigm
基于不对称网格的模块化布局。左侧留出"数据边栏"空间，右侧为主内容。地图作为全宽断裂元素打破网格。底部采用等高线式波浪分隔。

### Signature Elements
1. **动态经纬网格背景**：随鼠标移动微微偏移的细线网格
2. **等高线波浪分隔符**：section间用地形等高线风格的曲线分隔
3. **坐标标注式标题**：标题旁附带经纬度风格的装饰数字

### Interaction Philosophy
鼠标移动时网格线微微响应，创造"在地图上探索"的感觉。点击效果如同在地图上放置标记pin。

### Animation
- 背景网格: 缓慢旋转和平移的SVG网格线
- 数字: 打字机式逐位显示
- 等高线分隔: 绘制动画（stroke-dashoffset）
- 卡片: 从网格线中"生长"出来的展开动画

### Typography System
- 标题：**DM Serif Display** — 制图学标题的经典感
- 正文：**IBM Plex Sans** — 科学出版物的标准感
- 坐标/数据：**IBM Plex Mono** — 精密数据展示
</text>
<probability>0.05</probability>
</response>

---

<response>
## Idea 3: "Living Data" — 生命数据流美学

<text>
### Design Movement
**Organic Data Visualization** — 将树液流、水分运输等生理过程的数据流动可视化，作为网站的核心视觉隐喻。

### Core Principles
1. **流动感**：所有视觉元素暗示液体/树液的流动
2. **生命节律**：动画节奏模拟树木的生理节律（昼夜变化）
3. **透明层叠**：多层半透明元素创造深度和有机感
4. **科学诗意**：将枯燥的数据转化为诗意的视觉体验

### Color Philosophy
- 主背景：`#0d1a14`（深林黑绿）— 树皮内部的深邃
- 流动色：`#1a5c3a` → `#c8963e` 渐变 — 模拟树液从根到冠的流动
- 发光色：`#e8c170`（蜂蜜金）— 阳光能量
- 辅助：`#2a4a3a`（暗苔绿）— 过渡
- 文字：`#eae6df`（纸白）— 学术论文的质感

### Layout Paradigm
流体式布局，section之间用曲线而非直线分隔。内容区域采用不对称的"河流式"排列——左右交替，如同树液在导管中蜿蜒流动。全宽地图作为视觉锚点。

### Signature Elements
1. **流动粒子轨迹**：背景中缓慢流动的粒子线条，模拟树液流
2. **脉冲环形图**：关键数据用同心圆脉冲展示，如同树木横截面
3. **渐变光晕标记**：地图标记带有从绿到金的径向渐变光晕

### Interaction Philosophy
交互如同触摸活的有机体——悬停时元素"呼吸"加速，点击产生涟漪效果。滚动时背景粒子流速变化，创造与内容同步的节奏感。

### Animation
- Hero: 全屏流动粒子 + 缓慢呼吸的标题文字
- 统计数字: 如同液体填充的计数动画
- Section过渡: 波浪式渐入
- 地图: 标记点的脉冲 + 连接线的流动动画
- 卡片: 悬停时边框渐变流动

### Typography System
- 标题：**Cormorant Garamond**（衬线）— 自然科学期刊的优雅
- 正文：**Nunito Sans** — 柔和圆润，呼应有机主题
- 数据：**Fira Code** — 等宽科学数据
</text>
<probability>0.07</probability>
</response>

---

## 最终选择：Idea 1 — "Dark Canopy" 暗夜林冠美学

选择理由：
1. 最符合用户要求的"Dark, premium, scientific"视觉风格
2. 发光粒子和脉冲标记点能创造强烈的视觉冲击力
3. Playfair Display + Source Sans 3 的字体组合兼具学术感和现代感
4. 与 TreeNet、ICOS 等国际科研网络的暗色主题风格一致
5. 琥珀金强调色与杨树林金色时刻的意象完美呼应
