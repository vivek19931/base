
let socket = io();
let paramsname;

function scrollToBottom() {
  let messages = document.querySelector('#messages').lastElementChild;
  messages.scrollIntoView();
}
var block=[];
socket.on('connect', function() {
  let searchQuery = window.location.search.substring(1);
  let params = JSON.parse('{"' + decodeURI(searchQuery).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g,'":"') + '"}');
  let paramsname=params.name;
	

  
  
  
		  


  socket.emit('join', params, function(err) {
    if(err){
      alert(err);
      window.location.href = '/';
    }else {
      console.log('No Error');
    }
  });
  
  
  socket.emit('newus', paramsname, function(err) {
    if(err){
      alert(err);
      window.location.href = '/';
    }else {
      console.log('No Error');
    }
  });
  
   socket.on('userExists', function(data) {
	   window.alert("Username already taken please choose another one");
         
		 
		 
		  location.replace("/");
		  
   })
  
  

  
  
  
  
});




  
  
 











socket.on('disconnect', function() {
  console.log('disconnected from server.');
});

socket.on('updateUsersList', function (users) {
  let ol = document.createElement('ol');

  users.forEach(function (user) {
    let li = document.createElement('li');
    li.innerHTML = user;
    ol.appendChild(li);
  });

  let usersList = document.querySelector('#users');
  usersList.innerHTML = "";
  usersList.appendChild(ol);
})


socket.on('blocks', function(data, callback) {
	uq=data.msg;
	console.log(uq);
        if(block.indexOf(uq) > -1) {
    block.pop(uq);
         
      }
        
		  
         
       else {
        
		 
	   
		 block.push(uq);

	      
	      
         
		
      }
   });



socket.on('newMessage', function(message) {
	b=message.from;
	    if(block.indexOf(b) > -1) {
    console.log('error');
         
      }
	else{
  const formattedTime = moment(message.createdAt).format('LT');
  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    
    from: message.from,
    text: message.text,
	  image:message.image,
	  links:message.links,
	  
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);
  scrollToBottom();
}
});























































socket.on('whisper', function(message) {
	l=message.msg;
	if(l===paramsname)
	{console.log('error');
	}
	else{
	
		
  const formattedTime = moment(message.createdAt).format('LT');
  const template = document.querySelector('#message-template').innerHTML;
  const html = Mustache.render(template, {
    from: message.nick,
    text: message.msg,
    createdAt: formattedTime
  });

  const div = document.createElement('div');
  div.innerHTML = html

  document.querySelector('#messages').appendChild(div);
  scrollToBottom();
	}
});
























document.querySelector('#submit-btn').addEventListener('click', function(e) {
  e.preventDefault();

  socket.emit("createMessage", {
    text: document.querySelector('input[name="message"]').value,
	  image: document.querySelector('input[name="image"]').value,
	  links: document.querySelector('input[name="links"]').value,
	   space: document.querySelector('input[name="space"]').value,
  }, function() {
    document.querySelector('input[name="message"]').value = '';
	    document.querySelector('input[name="image"]').value = '';
	  document.querySelector('input[name="links"]').value = '';
	  document.querySelector('input[name="space"]').value = '';
	 
  })
});













