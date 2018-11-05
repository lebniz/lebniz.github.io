window.onload=function() {
  // Month,Day,Year,Hour,Minute,Second
  upTime('2015-12-31 12:10:21'); // ****** Change this line!
}

function upTime(countTo) {
  now = new Date();

  countTo = countTo.toString().replace(/-/g, "/");
  // countTo = new Date(Date.parse(countTo.replace(/-/g, "/")));
  countTo = new Date(countTo);
  difference = (now-countTo);

  days=Math.floor(difference/(60*60*1000*24)*1);
  hours=Math.floor((difference%(60*60*1000*24))/(60*60*1000)*1);
  mins=Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
  secs=Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);


    $('#countdown').html(
            '<div class="day">' + days + ' <span>Days</span></div>'+
            '<div class="hour">' + hours + ' <span>Hours</span></div>'+
            '<div class="min">' + mins + ' <span>Minutes</span></div>'+
            '<div class="sec">' + secs + ' <span>Seconds</span></div>'
        );
    

  clearTimeout(upTime.to);
  upTime.to=setTimeout(function(){ upTime(countTo); },1000);
}


var AV = require('leancloud-storage');
var { Query, User } = AV;
// 实时消息服务
var { Realtime, TextMessage } = require('leancloud-realtime');

var APP_ID = 'dbkqgkS5KaiLREIKUppiXSVI-gzGzoHsz';
var APP_KEY = '0H0TNESh9J8qHPU2xDHisgld';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var query = new AV.Query('Message');
query.find()
    .then(
        function(messages) {
            let array = messages.map((item) => item.attributes)
            array.forEach((item) => {
                let li = document.createElement('li')
                li.innerText = `${item.name}: ${item.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
            })
        }
    )

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let content = myForm.querySelector('input[name=content]').value
    let name = myForm.querySelector('input[name=name]').value
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        'name':name,
        'content':content
    }).then(function(object) { //obiect为存入的数据的相关信息
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}:${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value=''
    })
})
