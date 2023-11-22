// 获取书名
bookTitle = document.querySelector("#wrapper > h1 > span").textContent;
// 获取评分
rating = document.querySelector(
  "#interest_sectl > div > div.rating_self.clearfix > strong"
).textContent;
// 获取评价人数
reviewCount = document.querySelector(
  "#interest_sectl > div > div.rating_self.clearfix > div > div.rating_sum > span > a > span"
).textContent;

// 获取书籍信息
let info = document.querySelector("#info").textContent;
// 用于存储提取的键值对信息
let infoJson = {};
// 正则表达式，用于匹配“key: value”这样的字符串
// (.+): 捕获一或多个任意字符（代表键），后面跟着一个冒号
// \s* 匹配零个或多个空白字符
// (.+) 捕获一或多个任意字符（代表值）
// g 表示在文本中找到所有的匹配项
let regex = /(.+):\s*(.+)/g;
// 用于存储每次正则表达式匹配的结果
let match;
// 使用 while 循环重复地在 info 文本内容中查找与正则表达式匹配的项
while ((match = regex.exec(info)) !== null) {
  // 从匹配的结果获取第一个捕获组（即键），使用trim()删除前后的空白字符
  let key = match[1].trim();
  // 从匹配的结果中获取第二个捕获组（即值），删除前后的空白字符
  let value = match[2].trim();
  // 将键和值添加到 infoJson 字典中
  infoJson[key] = value;
}

// 获取内容简介的“渲染”文本
let bookDescription = document.querySelector("#link-report").innerText;
// 使用 replace 正则表达式替换 bookDescription 中的所有双引号（"）为单引号（'）
bookDescription = bookDescription.replace(/"/g, "'");

// 获取热门短评的“渲染”文本
let hotShortComments = document.querySelector(
  "#comment-list-wrapper"
).innerText;
// 替换所有双引号（"）为单引号（'）
hotShortComments = hotShortComments.replace(/"/g, "'");

// 获取当前页面的链接
link = window.location.href;

// 将所有抓取的信息组合为一个 JSON 字典
let book = {
  bookTitle: bookTitle,
  rating: rating,
  reviewCount: reviewCount,
  pageCount: infoJson["页数"],
  description: bookDescription,
  hotComments: hotShortComments,
  ISBN: infoJson["ISBN"],
  author: infoJson["作者"],
  publicationYear: infoJson["出版年"],
  publisher: infoJson["出版社"],
  link: link,
  csvRow: `${bookTitle},${rating},${reviewCount},${infoJson["页数"]},状态,种类,${bookDescription},${hotShortComments},${infoJson["ISBN"]},${infoJson["作者"]},${infoJson["出版年"]},${infoJson["出版社"]},${link}`,
};

completion(book);

