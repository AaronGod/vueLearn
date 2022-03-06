module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // rootValue: 37.5,
      rootValue ({
        file
      }) {
        // 设置vant中以375来计算 rem转换  ，而在750设计稿以750来计算 所以ps中量出多少就写多少
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
