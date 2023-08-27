import React from "react";
import { useState, useEffect } from "react";
//Xây dựng custom hook để chuyển định dạng Price được sử dụng ở nhiều component trong page
export const useFormatPrice = (originalPrice) => {
  let [price, setPrice] = useState("");
  //Sử dụng useeffect để thực hiện hàm chuyển đổi format price khi giá trị price được truyền xuống
  // chuyển từng char trong chuổi price vào string nếu đó là ký tự thứ 3 thì sẽ thêm dấu phẩy để đúng format
  useEffect(() => {
    let priceTemp = "";
    let priceString = originalPrice.toString();
    for (let i = priceString.length - 1; i >= 0; i--) {
      priceTemp = priceString[i] + priceTemp;
      //cứ 3 ký tự thì sẽ thêm 1 dấu chấm ngăn cách và đó không phải là giá trị thứ i đứng đầu trong dãy ký tự
      if ((priceString.length - i) % 3 === 0 && i !== 0) {
        priceTemp = "." + priceTemp;
      }
    }
    setPrice(priceTemp);
  }, [originalPrice]);
  return price;
};
