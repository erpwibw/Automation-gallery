# 🌟分享一个 Keyboard Maestro 动作，用来**将 Youtube 视频播放列表生成 Markdown 格式的列表**，方便标记播放进度或作为资料索引。

思路来自 Minja 的 [为 Safari 网页生成可点击的导航目录（Keyboard Maestro 为例）](https://utgd.net/article/9829)  

**原理也相同：** 通过在网页上运行 JavaScript 代码提取视频标题和链接

图1：Youtube 播放列表  
![图1-Youtube 视频列表](https://user-images.githubusercontent.com/23517447/230559607-3d84aea8-5ddb-46e6-a4c9-b1f3bd4ffed6.jpg)

图2：保存到 Obsidian 中的效果  
![图2-Obsidian 效果](https://user-images.githubusercontent.com/23517447/230559622-72aa0a7a-ae66-407f-bd8b-687d6a189aa5.jpg)

图3：Macro 动作细节  
![图3-Macro 动作细节](https://user-images.githubusercontent.com/23517447/230559632-744ce732-e8e4-446a-b00a-b30b3a6d3e85.jpg)

图4：与 ChatGPT 交流记录  
![图4-ChatGPT-聊天记录](https://user-images.githubusercontent.com/23517447/230559643-02a427b5-da16-484b-9e8d-bf97bc150d75.jpg)



---


⚙️**说一下我的制作流程：**  

1. 重看了 Minja 的文章，学习了思路和技术细节
2. 让 ChatGPT 翻译了一下 Minja 动作的中的 JavaScript 代码（**我完全不懂 JavaScript**，但懂一些编程），进一步了解技术细节
3. 观察了 Youtube 播放列表的 HTML 源代码，发现是比较简单的
4. 把包含视频标题和链接的部分 HTML 代码和需求发给 ChatGPT，第一次生成的代码就运行出正确的结果，后续逐渐微调
  - 一开始打算自己在 Keyboard Maestro 中组合成 Markdown 格式
  - 想了一下，干脆 JavaScript 一步到位，学习一下用法

📜**总结：**  

- 我基本没做什么工作，主要是**提供思路和指导**
- 需要懂编程、懂 Keyboard Maestro、懂基本 HTML 代码、懂如何与 ChatGPT 交流，才能比较容易的做出这个 Macro
- 我懂上面这些，但是没有 ChatGPT 的话，比较难做出这个 Marco 🤔
