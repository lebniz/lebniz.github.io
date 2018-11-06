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
                li.innerText = `${item.content}\n--${item.name}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
            })
        }
    )

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function(e) {
    e.preventDefault()
    let content = myForm.querySelector('textarea[name=content]').value
    let name = myForm.querySelector('input[name=name]').value
    var Message = AV.Object.extend('Message');
    var message = new Message();

    if(content.length > 0){
        message.save({
            'name':name,
            'content':content
        }).then(function(object) { //obiect为存入的数据的相关信息
            let li = document.createElement('li')
            li.innerText = `${object.attributes.content}\n--${object.attributes.name}`
            let messageList = document.querySelector('#messageList')
            messageList.appendChild(li)
            myForm.querySelector('input[name=name]').value=''
            myForm.querySelector('textarea[name=content]').value=''
        })
    }
})
