# 🌟受 [Minja](https://utgd.net/author/10002) [《用 Shortcuts 和 DEVONthink 摘抄微博内容》](https://utgd.net/article/20106)文章的启发和指引，做了一个获取微博全部内容的快捷指令

----

图 1：在 Obsidian 中浏览保存的微博图文

![图1](https://github.com/erpwibw/Automation-gallery/blob/main/Shortcuts%20%E5%BF%AB%E6%8D%B7%E6%8C%87%E4%BB%A4/%E4%BF%9D%E5%AD%98%E5%BE%AE%E5%8D%9A/obsidian_preview.gif)

图 2：比较复杂的微博样式和保存后的 md 文档、 Obsidian 中的效果
![图2](https://user-images.githubusercontent.com/23517447/227451752-1b10ee45-09c1-456b-afb8-8af561fecacb.jpg)


图 3：为抓取时的内容预览
![图3](https://user-images.githubusercontent.com/23517447/227451781-65d93045-22ee-4919-a7bd-4ff579e5cf71.jpg)


----

### 💡基本上看到的微博都能够保存下来，包括长微博，**所见即所得**。

之前一直陷在用稍候读的方式保存内容，没想到如何优雅的保存微博。其实对于微博这种比较友好的平台，直接扒网页就行🤣 简单粗暴可定制，不受限于稍候读工具。

做了一下技术调研，发现微博现在会**返回一个 json** 格式的响应，包含了所有要获取的内容。不需要用正则表达式扒网页了，直接用**词典选取值**即可。

### ✂️简单说一下流程：
1. 从奇点中分享链接（推荐奇点开箱即用，其他的要调整链接）
2. 构造请求 json 的 url，并获取 json
3. 使用词典依次从 json 中获取博主、发布时间、发布内容、转发博主、转发内容、配图（即所有能看到的内容都在 json 中）
4. 保存上述文件到 md 文档，并下载配图

### 📜使用须知：
因为要做的事情太多，不可避免的会有一个巨长的、难以维护的快捷指令，于是我分成了 3 个快捷指令依次运行，来完成整个流程。**每个快捷指令主要完成一件事**，相对来说比较好调整和维护。

摘微博-1/3（请求并保存 json）：https://www.icloud.com/shortcuts/737adfd92fef4f2a8cf0f050b272aaf4

摘微博-2/3（获取微博）：https://www.icloud.com/shortcuts/a249cc0b79434519978299df8baccda4

摘微博-3/3（获取被转发微博）：https://www.icloud.com/shortcuts/c52c0c24d8ce4aa0859e4ddce2ffd5e8

依次安装完后，可能需要在摘微博-1/3 中，手动选择其他 2 个，才能正常运行。

微博内容保存在 `Shortcuts/weibo/weibo_quote.md` ，微博图片保存在 `Shortcuts/weibo/images`

在 Obsidian 中浏览的方法：将 `weibo_quote.md` 和` images` 文件夹复制到 Obsidian 库中，打开 `weibo_quote.md` 浏览即可

🙏**感谢 [Hum](https://utgd.net/author/10031) 写的[捷径：由浅入深完全指南](https://sspai.com/series/68)**，做这个捷径时又回去翻了翻，作为技术参考。
主要用到了《App Store 操作》Share Sheet 相关知识、《用 Toggl 的 API 在捷径中创建计时器》API 请求相关知识、《理解扒网页的原理和思路》扒网页的相关知识。

---
## 👇以下为技术细节：
### 关于链接：
如果第三方客户端分享出来的链接是类似

`https://weibo.com/1694917363/MwrHj3jrT`

可以获得 json 响应的链接是：

`https://m.weibo.cn/statuses/show?id=MwrHj3jrT`

官方客户端分享出来的链接是：

`https://weibo.com/1727858283/4877359037547151`

可以获得 json 响应的链接是：

`https://m.weibo.cn/comments/hotflow?id=4877359037547151&mid=4877359037547151&max_id_type=0`

我没有测试过官方客户端，而且还不能直接通过分享运行，要经过剪贴板，不太推荐。

### 微博的 json 结构（只节选有用部分）：
——ok

——data

————created_at 发布时间

————text 内容

————user

——————screen_name 昵称

————pics

——————large

————————url 配图地址

————retweeted_status 被转发微博

——————user

————————screen_name 被转发昵称

——————text 被转发内容

——————pics

————————large

——————————url 被转发配图

### 在快捷指令中的实现：
**摘微博-1/3：** 构造请求、获取 json、保存 json 到文件、保存微博链接的 markdown 格式到 weibo_quote.md、运行后续 2 个快捷指令、预览2 个快捷指令运行的结果。

**摘微博-2/3：** 从文件读取 json、获取发布日期、获取发布内容（并进行一些文本处理：替换换行符、去除表情和链接）、获取博主名字、获取图片链接和图片名称、构建 Obsidian 格式的图片语法、下载图片（保存到`/weibo/images/图片名称`）、将上述内容按照一定的格式保存到 weibo_quote.md。输出保存的内容（用来最终预览结果）

**摘微博-3/3：** 保存转发内容，因此整体上类似上面的快捷指令，再来一遍。判断是否有转发博主，如果有的话，在文本中加上“转发了”。将被转发博主、被转发内容、被转发图片按照一定格式保存到weibo_quote.md。输出保存的内容（用来最终预览结果）

### 没做的功能（技术上都可行，就是做起来太麻烦）：
获取视频链接、获取转发配图

### 不能捕获的微博：
仅粉丝可见（需要 cookie）

转发包含 github 内容的转发微博（被转发的微博可以正常保存，转发的不行）

### 除了利用 json 获得内容外还有一种方案：
将奇点分享的链接在 Shortcuts 中经过“获取网页内容”动作后，再转为 markdown 格式，做一些文本的处理看起来也不错。里面也包含了图片链接，是一个备选方案。 
