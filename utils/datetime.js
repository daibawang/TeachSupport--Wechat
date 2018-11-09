
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()  

 // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')  
 return year+"/"+month+"/"+day
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function TimeDifference(old){
  var oldTime=new Date(old)
  var timedif = Date.parse(new Date())-Date.parse(oldTime)
  var data=new Date(timedif)
  return data.getMonth+data.getDate+data.getDay+data.getHours+data.getMinutes+data.getSeconds
}

module.exports = {
  formatTime: formatTime,
  TimeDifference: TimeDifference
}  