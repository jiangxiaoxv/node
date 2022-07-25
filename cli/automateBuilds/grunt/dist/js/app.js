"use strict";

var p = new Promise(function (res, rej) {
  setTimeout(function () {
    res(1);
  }, 1000);
});
p.then(function (val) {
  console.log(val);
  console.log('jxx');
});
//# sourceMappingURL=app.js.map
