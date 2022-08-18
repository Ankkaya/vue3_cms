let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  // 线上地址
  BASE_URL = ''
} else {
  // 测试地址
  BASE_URL = ''
}

export { BASE_URL, TIME_OUT }
