
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
 


  const firebaseConfig = {
    apiKey: "AIzaSyCbHDUB4fKVbixuw-UM3MWTfBNPRDSvIUM",
    authDomain: "project-2-quiz-game.firebaseapp.com",
    databaseURL: "https://project-2-quiz-game-default-rtdb.firebaseio.com",
    projectId: "project-2-quiz-game",
    storageBucket: "project-2-quiz-game.appspot.com",
    messagingSenderId: "953290275122",
    appId: "1:953290275122:web:e55dc02de2e27321adff2b"
  };


  const firebaseInfo = initializeApp(firebaseConfig);

  export default firebaseInfo
