// 封装本地存储模块

/**
 * 存数据
 */
export const setItem = (key, value) => {
  // 处理对象和数组
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 取数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  // 处理对象和数组
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

/**
 * 删除数据
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
