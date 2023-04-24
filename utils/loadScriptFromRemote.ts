export const load = (code: string) => {
  var script = document.createElement("script") //创建一个script标签
  script.type = "text/javascript"
  try {
    //IE浏览器认为script是特殊元素,不能再访问子节点;报错;
    script.appendChild(document.createTextNode(code))
  } catch (ex) {
    script.text = code
  }
  document.getElementsByTagName("head")[0].appendChild(script)
}
