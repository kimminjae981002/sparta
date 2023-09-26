const moviePrint = document.getElementById("postingbtn");
const movieWrite = document.querySelector(".form");
const movieConfirm = document.getElementById("movie_confirm");
const card = document.getElementById("#container");
const cardEl = document.querySelector(".card");
const weather = document.getElementById("weather");

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
  apiKey: "AIzaSyApYNWydp35B2uvI8UoYh-6A2K2Mvc-aKY",
  authDomain: "sparta-14a52.firebaseapp.com",
  projectId: "sparta-14a52",
  storageBucket: "sparta-14a52.appspot.com",
  messagingSenderId: "725273822040",
  appId: "1:725273822040:web:12d6a44cbc386f8848db2d",
  measurementId: "G-LB76H50KR5",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 데이터 추가 스켈레톤
$("#movie_confirm").click(async function () {
  let imageUrl = document.querySelectorAll("#floatingTextarea")[0].value;
  let star = document.getElementById("star").value;
  let movieTtile = document.querySelectorAll("#floatingTextarea")[1].value;
  let movieReco = document.querySelectorAll("#floatingTextarea")[2].value;

  let doc = {
    image: imageUrl,
    star: star,
    title: movieTtile,
    reco: movieReco,
  };

  if (!doc.image || !doc.star || !doc.title || !doc.reco) {
    alert("빈 칸을 채우세요.");
  } else {
    await addDoc(collection(db, "cards"), doc); // 콜렉션 이름에 저장이 된다
    alert("저장완료");
    window.location.reload();
  }
});

// 데이터 읽기 스켈레톤
let docs = await getDocs(collection(db, "cards"));
// $("#card").empty();
docs.forEach((doc) => {
  let row = doc.data();
  let image = row.image;
  let title = row.title;
  let star = row.star;
  let reco = row.reco;
  let temp_html = `
  <div class="col-12 col-md-6 col-lg-4 col-xl-3">
  <div class="card" style="width: 18rem">
  <img
    src="${image}"
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${star}</p>
    <a href="#" class="btn btn-primary">${reco}</a>
  </div>
  </div>
  </div>
  `;
  $(".row").append(temp_html);
});

//팝업창 열 때 배경색 바꾸기
const backgroundColor = () => {
  document.body.classList.toggle("backgroundColor");
};

moviePrint.addEventListener("click", function () {
  movieWrite.classList.toggle("block");
  backgroundColor();
});

// movieConfirm.addEventListener("click", function () {
//   card.remove();
// });

navigator.geolocation.getCurrentPosition(function (pos) {
  console.log(pos);
  var latitude = pos.coords.latitude;
  var longitude = pos.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=658d847ef1d28e72e047ab0c5a476d54&units=metric`;
  // url에 데이터를 가져올 때까지 기다려 주세요
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let temp = data.main.temp;
      let shape = data.weather[0].main;
      if (temp > 20) {
        weather.innerHTML = `오늘의 온도는: ${temp} ${shape} 더워요`;
      } else {
        weather.innerHTML = `오늘의 온도는: ${temp} ${shape} 추워요`;
      }
    });
});

console.log(document.body);
