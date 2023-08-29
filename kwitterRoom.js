
//ADICIONE SEUS LINKS FIREBASE
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


userName = localStorage.getItem("userName"); //pegamos o valor do localStorage

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";



function addRoom()
{
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose : "adicionar nome de sala"
  });

    localStorage.setItem("roomName", roomName); //armazenar esse nome de sala no localStorage.
    
    window.location = "kwitterPage.html"; //Redirecione-o para kwitterPage.html.
}



function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>"; //MOTIVO - Tudo isso é realizado para que quando o nome da sala for pressionado, queremos que o
      //usuário seja redirecionado àquela sala em específico.
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
window.location = "index.html";
}
