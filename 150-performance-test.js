const fs = require("fs");
const axios = require("axios");

var file = fs.readFileSync("150-performance-dummy-data.json", "utf-8");
var obj = JSON.parse(file).Sheet1;
var len = obj.length;

console.log("Start 150 Create KUR Application testing");
console.time("150test");

(function next(index) {
  var params = new URLSearchParams();
  params.append("user_uid", obj[index].user_uid);
  params.append("nik", obj[index].nik);
  params.append("credit_type", obj[index].credit_type);
  params.append("bank_name", obj[index].bank_name);
  params.append("amount", obj[index].amount);
  params.append("email", obj[index].email);

  axios
    .post("https://api.catena.id/v1/fabric/credit/create", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => {
      console.log(response.data);
      if (index === len - 1) {
        console.timeEnd("150test");
      } else {
        next(index + 1);
      }
    })
    .catch((error) => {
      console.log("failed");
      if (index === len - 1) {
        console.timeEnd("150test");
      } else {
        next(index + 1);
      }
    });
})(0);
