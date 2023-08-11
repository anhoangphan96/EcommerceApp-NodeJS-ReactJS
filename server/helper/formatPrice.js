const formatPrice = (price) => {
  let priceTemp = "";
  let priceString = price.toString();
  for (let i = priceString.length - 1; i >= 0; i--) {
    priceTemp = priceString[i] + priceTemp;
    //cứ 3 ký tự thì sẽ thêm 1 dấu chấm ngăn cách và đó không phải là giá trị thứ i đứng đầu trong dãy ký tự
    if ((priceString.length - i) % 3 === 0 && i !== 0) {
      priceTemp = "." + priceTemp;
    }
  }
  return priceTemp;
};
module.exports = formatPrice;
