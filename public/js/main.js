var socket = io();
socket.on('message',function(data){
    console.log(data);
    $("#socketMessage").text(data.text);

});
socket.on('chatUpdate' ,(data)=>{
    $("#messages").append("<span>"+data.id+": "+data.text+"</span><br/>");

});

$( "#sendMsg" ).submit(function( event ) {
    socket.emit('chatMsg',{message:$("#textToSend").val()});
    event.preventDefault();
  });