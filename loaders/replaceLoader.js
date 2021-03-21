// module.exports的函数不能是箭头函数，因为函数里需要用this，node调用此loader时可能是不同的对象运行此函数，如果使用箭头函数可能会影响this指向
module.exports = function (source) {
  return source.replace('dell', 'dellLee');
}