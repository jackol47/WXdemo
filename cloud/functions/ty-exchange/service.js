function createHash(hashLength) {
  // 默认长度 16
  return Array.from(Array(Number(hashLength) || 16), () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join('');
}

module.exports = function (hashLength) {
  return createHash(hashLength)
}
