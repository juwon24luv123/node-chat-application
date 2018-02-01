var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());
var timeStamp = moment().valueOf();
console.log(timeStamp);

var createAt = 1234;
var date = moment(createAt);
console.log(date.format('H:m a'));