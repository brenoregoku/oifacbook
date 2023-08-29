//LINKS FIREBASE
const firebaseConfig = {
      apiKey: "AIzaSyBX_51KazV2PZ-7feyNzIkAZjHjSUnXTyg",
      authDomain: "ktterfinalllllllllllllllllllll.firebaseapp.com",
      databaseURL: "https://ktterfinalllllllllllllllllllll-default-rtdb.firebaseio.com",
      projectId: "ktterfinalllllllllllllllllllll",
      storageBucket: "ktterfinalllllllllllllllllllll.appspot.com",
      messagingSenderId: "900664713026",
      appId: "1:900664713026:web:9f6462caddd110ce1af2db"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    userName = localStorage.getItem("userName");
	roomName = localStorage.getItem("roomName");

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(roomName).push({
    name:userName,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}
//------------------------------------------------------------
//esse código é utilizado para obter todos os dados do firebase:
function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
//Início do código
         console.log(firebaseMessageId); //Utilize a variável firebaseMessageId para conter todas as Ids únicas, das mensagens, geradas pelo firebase.
	       console.log(messageData); //Utilize a variável messageData para conter todas as mensagens, likes e nomes de usuário.
	       name = messageData['name'];
	       message = messageData['message'];
         like = messageData['like']; 
         nameWithTag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>"; //nameWithTag é nossa variável, nela, armazenamos o nome do usuário e a imagem de verificado.         
         messageWithTag = "<h4 class='message_h4'>" + message + "</h4>"; //messageWithTag é nossa variável, nela, armazenaremos a mensagem.
         like_button ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
         spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        row = nameWithTag + messageWithTag +like_button + spanWithTag;       
        document.getElementById("output").innerHTML += row;
//Fim do código
      } });  }); }
getData();

function updateLike(messageId)
{
  console.log("botão de like pressionado - " + messageId);
	buttonId = messageId;
	likes = document.getElementById(buttonId).value;
	updatedLikes = Number(likes) + 1;
	console.log(updatedLikes);

	firebase.database().ref(roomName).child(messageId).update({
		like : updatedLikes  
	 });

}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
window.location.replace("index.html");
}