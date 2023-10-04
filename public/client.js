const socket = io();

let name;
let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area')


do{
    name = prompt('Please enter your name: ')
}while(!name)

textArea.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user:name,
        message:message.trim()
    }
        appendMessage(msg,'outgoing')   
        textArea.value = '';
        scrollToBottom();
        //send to server
        socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup;
    messageArea.append(mainDiv)
}

// Recieve Message-

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}