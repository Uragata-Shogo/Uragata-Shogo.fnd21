'use strict'
// 1行目に記載している 'use strict' は削除しないでください

const message = document.getElementById("message");//<ID:messageを取得>
const p = document.getElementsByTagName("p");//<p>を取得
const calendarContainer = document.getElementById("calendar-container");//ID名calendar-containerを取得
const currentYear = new Date().getFullYear();//今の日付の年を取得
const currentMonth = new Date().getMonth();//今の日付の月を取得(0~11で返す)
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();//指定した月の最終日を取得している
const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];//曜日を配列に格納

// カレンダーのHTML構造を生成
let calendarHtml = "<table><p></p><thead><tr>";  //calendarの中に追加するタグを作成
for (let i = 0; i < 7; i++) {  //カレンダーの曜日を作成
  calendarHtml += `<th>${week[i]}</th>`;  //<Th>曜日</Th>を７個作成（日～土）
}
calendarHtml += "</tr></thead><tbody>";  //終わりのタグを作成

//カレンダーに日付を入れる
for (let i = 1; i <= daysInMonth; i++) {  //1日から今月の末までの繰り返し処理
  const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();  //i(日付)の曜日を数字で取得(0 ～ 7)
if (i === 1) {  //初日の場合だけ
    calendarHtml += "<tr>";  //タグを追加する
    for (let j = 0; j < dayOfWeek; j++) {  //曜日が日曜日以外の場合、その曜日になるまで空の日付タグを追加する
      calendarHtml += "<td></td>";
    }
  }

  calendarHtml += `<td>${i}</td>`;  //日付を追加する

  if (dayOfWeek === 6) {  //もし追加した日付が土曜日なら
    calendarHtml += "</tr>";  //</tr>を追加する
    if (i < daysInMonth) {  //もし日付が月の最終日より小さい場合は
      calendarHtml += "<tr>";  //次のテーブルを用意する
    }
  } else if (i === daysInMonth) {  //もし日付が月の最終日の場合は
    for (let j = dayOfWeek + 1; j <= 6; j++) {  //曜日が土曜日になるまで
      calendarHtml += "<td></td>";  //空の日付を追加する
    }
    calendarHtml += "</tr>";  //日付が月の最終日を超えた場合は"</tr>"を追加する
  }
}

calendarHtml += "</tbody></table>";  //calendarHTMLに</tbody></table>を追加する
calendarContainer.innerHTML = calendarHtml; //calendar-containerにcalendarHtmlを追加する
p[1].id = "yearmonth"; //p[1]にIDを追加する
document.getElementById("yearmonth").innerText = `${currentYear}  年  ${currentMonth + 1}  月 `; //h1に今の年と月を追加する

function countdown(){ //countdown関数を宣言
  const yearFirstDate = new Date(currentYear + 1, 0, 1);  //来年の1月1日を取得
  const clickedDate = new Date(currentYear, currentMonth, event.target.innerText);  //クリックした日の日付を取得
  const remindDays = Math.floor((yearFirstDate.getTime() - clickedDate.getTime()) / (1000 * 60 * 60 * 24)); //来年の1月1日から今日の日付との差を取得する
  
  //羊のイラストを準備
  let sheeps = "";  
  for (let i = 0; i < remindDays; i++) {
    sheeps += "🐑";
  }

  if (yearFirstDate.getTime() === clickedDate.getTime()) {  //もしクリックした日が1月1日なら
    message.innerText = "🎍明けましておめでとうございます🎍";
  } else if (currentMonth === 10 && event.target.innerText === "11"){ //11月11日なら
    message.innerText = "||ポッキーの日です||";
  } else {  //それ以外なら
    message.innerHTML = `今年も残り<span class="day"> ${remindDays} </span>日です。<br>${sheeps}`;
  }
}

const target = document.getElementsByTagName("td");//<td>をタグに持つHTML要素を取得

//targetコレクションをループ処理し、クリックした日に対してcountdown処理をする
for (let i = 0; i < target.length; i++) {
  target[i].addEventListener("click", countdown);
}
