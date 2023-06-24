// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: magic;
// let sourceUrl = "https://weibo.com/1111681197/4913161368765497"
let sourceUrl = args.shortcutParameter
// 获取微博 id（mblogid）
let mid = sourceUrl.split("/").at(-1)
// 构造微博 html 链接
let htmlUrl = `https://m.weibo.cn/status/${mid}?jumpfrom=weibocom`
// 创建请求
let req = new Request(htmlUrl)
// 获取 html
let html = await req.loadString()

// 正则表达式匹配微博 json 数据
let scriptPattern = /\$render_data = \[(.*?)\]\[0\] \|\| {};/s
// 匹配结果
let match = html.match(scriptPattern);

// 获取匹配结果中的第一个元素
let dataString = match[1]
// 将 json 字符串转换为 JSON 对象
let data = JSON.parse(dataString)

// 微博作者 id
let id = data.status.user.id
// 微博作者昵称
let screen_name = data.status.user.screen_name

// 创建时间
let created_at = data.status.created_at
let date = new Date(created_at)
created_at = date.toLocaleString("zh-CN")

// 清理文本
let text = data.status.text;
text = text.replaceAll("<br />", "\n")
text = text.replace(/<.*?>/g, "")
text = text.replaceAll("#", "📣")

// 创建图片链接数组
let imageUrls = []
// 创建图片名称数组
let imageNames = []
if ('pics' in data.status) {
  // 获取图片数组
  let pics = data.status.pics
  // 遍历每一张图片
  for (value of pics) {
    // 获取图片链接
    let imageUrl = value.large.url
    // 每次循环添加一个图片名称
    imageUrls.push(imageUrl)
    // 获取图片名称
    let imageName = imageUrl.split("/").at(-1)
    // 每次循环添加一个图片名称
    imageNames.push(`![[${imageName}]]`)
  }
}

let retweeted_screen_name
let retweeted_text

// 如果是转发微博
if ("retweeted_status" in data.status) {
  // 转发微博作者昵称
  retweeted_screen_name = data.status.retweeted_status.user.screen_name

  // 如果是长微博
  if (data.status.retweeted_status.isLongText) {
    retweeted_text =
      data.status.retweeted_status.longText.longTextContent
  } else {
    retweeted_text = data.status.retweeted_status.text
  }
  // 清理文本
  retweeted_text = retweeted_text.replaceAll("<br />", "\n")
  retweeted_text = retweeted_text.replace(/<.*?>/g, "")
  retweeted_text = retweeted_text.replaceAll("#", "📣")

  // 如果转发微博有图片
  if ("pics" in data.status.retweeted_status) {
    let pics = data.status.retweeted_status.pics
    for (value of pics) {
      let imageUrl = value.large.url
      imageUrls.push(imageUrl)
      let imageName = imageUrl.split("/").at(-1)
      imageNames.push(`![[${imageName}]]`)
    }
  }
}

// Markdown 格式的分割线
// 微博作者名字
// 微博创建时间
// 微博内容
// Markdown 格式的微博链接
let weibo_quote = `----
### @${screen_name}
${created_at}
${text}
`

// 如果是转发微博
if ("retweeted_status" in data.status) {
  weibo_quote += `
  **转发了@${retweeted_screen_name}**
  ${retweeted_text}
  `
}

weibo_quote += `[微博链接](${sourceUrl})` + "\n\n"

// Markdown 格式的图片链接
weibo_quote += imageNames.length > 0 ? imageNames.join("\n") + "\n\n\n" : "" + "\n\n\n"

// 创建输出对象
let output = {
  "weibo_quote": weibo_quote
}

// 如果有图片，添加图片链接数组
if (imageUrls.length > 0) {
  output.imageUrls = imageUrls
}

// 转换为 JSON
let jsonString = JSON.stringify(output)
Script.setShortcutOutput(jsonString)

console.log(jsonString)
