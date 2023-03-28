🌟制作了一个 B 站稍候看快捷指令，效果如图1所示

这里使用了 [Hum](https://utgd.net/article/20119) 在 [UNTAG Premium 第十九期](https://utgd.net/article/20116)介绍的技巧，将视频封面和 md 文档保存到 obsidian 库中，随时在 iPhone 上查看稍候看的视频。芜湖~起飞🛫

![效果预览](https://github.com/erpwibw/Shortcuts-gallery/blob/main/Bilibili%20%E7%A8%8D%E5%80%99%E7%9C%8B/bilibili.gif)

快捷指令链接：https://www.icloud.com/shortcuts/f1203f0937564a9ca90bad1c6941688e

注：如果不使用 Obsidian 查看需要在快捷指令中修改保存位置

### 💡使用方法：
从 B 站客户端分享链接运行即可

### ⚙️工作原理：
- B 站对扒网页比较友好，需要的内容全都在 head 标签里，直接正则表达式一把梭完事
- 从 html 中提取内容的细节见 thread
- 使用快捷指令将视频标题、视频链接、up主名字、发布日期、下载的视频封面文件地址保存到`/obsidian/bilibili/bilibili_quote.md` 文档中
- 使用快捷指令下载视频封面后将图片保存到 `/obsidian/bilibili/images/`文件夹中
- 打开 Obsidian 即可浏览保存的稍候看视频

感兴趣的朋友可以在 Github 关注后续需要的更新与修复

#### ✂️从 html 中提取内容：

**视频标题**html：
```html
<meta data-vue-meta="true" itemprop="name" name="title" content="我给媳妇做孜然羊肉卷煎饼，我炸一盘过年买的带鱼配啤酒，幸福小日子天天有_哔哩哔哩_bilibili">
```
正则表达式：`name="title" content="(.*?)">`

结果：我给媳妇做孜然羊肉卷煎饼，我炸一盘过年买的带鱼配啤酒，幸福小日子天天有_哔哩哔哩_bilibili


**up主** html：
```html
<meta data-vue-meta="true" itemprop="author" name="author" content="夜猫厨房">
```
正则表达式：`name="title" content="(.*?)">`

结果：夜猫厨房


**视频链接** html：
```html
<meta data-vue-meta="true" itemprop="url" content="https://www.bilibili.com/video/BV1r24y1W7y9/">
```
正则表达式`itemprop="url" content="(.*?)">`

结果：https://www.bilibili.com/video/BV1r24y1W7y9/


**封面链接**html：
```html
<meta data-vue-meta="true" itemprop="image" content="//i2.hdslb.com/bfs/archive/19057f00e6f751b04702546e542fe53c93062594.jpg@100w_100h_1c.png">
```
正则表达式：`itemprop="image" content="(.*?)">`

结果：//i2.hdslb.com/bfs/archive/19057f00e6f751b04702546e542fe53c93062594.jpg@100w_100h_1c.png


**发布时间** html：
```html
<meta data-vue-meta="true" itemprop="datePublished" content="2023-02-11 20:00:28">
```
正则表达式`itemprop="datePublished" content="(.*?)">`

结果：2023-02-11 20:00:28
