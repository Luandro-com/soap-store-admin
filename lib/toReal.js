module.exports = (amount) => {
  if (amount > 0) {
    const cents = amount.toString().slice(-2)
    const others = amount.toString().slice(0, -2)
    return `BRL ${others},${cents}`
  }
  return `BRL 00,00`
}