// 检测是否为纯粹的对象
export const isPlainObject = function isPlainObject (obj) {
  if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') return false
  const proto = Object.getPrototypeOf(obj)
  if (!proto) return true
  // eslint-disable-next-line no-prototype-builtins
  const Ctor = proto.hasOwnProperty('constructor') && proto.constructor
  return typeof Ctor === 'function' && Ctor === Object
}

// 处理最大宽度
export const handleMaxWidth = function handleMaxWidth () {
  const html = document.documentElement
  const app = document.querySelector('#app')
  const size = parseFloat(html.style.fontSize)
  if (size > 75) {
    html.style.fontSize = '75px'
    app.style.width = '750px'
  } else {
    app.style.width = '100%'
  }
}

// 日期格式化
export const formatTime = function formatTime (time, template) {
  if (typeof time !== 'string') {
    time = new Date().toLocaleString('zh-CN', { hour12: false })
  }
  if (typeof template !== 'string') {
    template = '{0}年{1}月{2}日 {3}:{4}:{5}'
  }
  // 解析出年月日等信息
  let arr = []
  if (/^\d{8}$/.test(time)) {
    const [, $1, $2, $3] = /^(\d{4})(\d{2})(\d{2})$/.exec(time)
    arr.push($1, $2, $3)
  } else {
    arr = time.match(/\d+/g)
  }
  // 把获取的数据替换模板
  return template.replace(/\{(\d+)\}/g, (_, $1) => {
    let item = arr[$1] || '00'
    if (item.length < 2) item = '0' + item
    return item
  })
}
