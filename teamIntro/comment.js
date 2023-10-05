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
  apiKey: "AIzaSyDspAV1LiugBcx69J0dWIk979EKColRCMY",
  authDomain: "nbcamp4dollar.firebaseapp.com",
  projectId: "nbcamp4dollar",
  storageBucket: "nbcamp4dollar.appspot.com",
  messagingSenderId: "903810170431",
  appId: "1:903810170431:web:d06256df539d9edb0e828a",
  measurementId: "G-LBRL46HQYD",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 데이터 읽기 스켈레톤
// member.js의 응원메세지 틀에 응원메세지 목록 갖다줌.
let docs = await getDocs(collection(db, "comments"));
$(".story").empty();
docs.forEach((doc) => {
  let row = doc.data();
  let commentName = row.commentName;
  let commentText = row.commentText;
  let temp_html = `
    <div class="result_msg">
      <span class="result_name">${commentName}</span>
      <span class="result_detail">${commentText}</span>
    </div>
  `;
  $(".story").append(temp_html);
});
