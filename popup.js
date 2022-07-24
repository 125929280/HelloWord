const row = 6;
const colomn = 5;
let random = new Date().getTime() % words.length;
let answer = words[random].split("");
console.log(answer);
let times = 0;
let index = 0;
let g = [];
let success = false;

handleLetterClick = (letter) => {
  console.log(letter);
  if (index === colomn) return;
  g[times] = g[times] || [];
  g[times][index] = letter;
  document.getElementById("g" + times.toString() + index.toString()).innerText =
    letter;
  index++;
};

handleDeleteClick = () => {
  if (index === 0) return;
  index--;
  document.getElementById("g" + times.toString() + index.toString()).innerText =
    "";
};

handleEnterClick = () => {
  if (index !== colomn) return;
  const player_answer = g[times];
  console.log(player_answer);
  // let temp_answer = answer;
  const vis = [];
  for (let i = 0; i < answer.length; i++) vis[i] = false;
  // fully correct
  for (let i = 0; i < colomn; i++) {
    if (player_answer[i] === answer[i]) {
      document.getElementById(
        "g" + times.toString() + i.toString()
      ).style.backgroundColor = "#6aaa64";
      document.getElementById(player_answer[i]).style.backgroundColor =
        "#6aaa64";
      vis[i] = true;
      // player_answer.splice(i, 1);
      // temp_answer.splice(i, 1);
    }
  }
  // halfly correct
  // for (let i = 0; i < colomn; i++) {
  //   if (vis[i]) continue;
  //   const act_index = answer.findIndex((t) => t === player_answer[i]);
  //   if (act_index !== -1) {
  //     document.getElementById(
  //       "g" + times.toString() + act_index.toString()
  //     ).style.backgroundColor = "#c9b458";
  //     document.getElementById(player_answer[i]).style.backgroundColor =
  //       "#c9b458";
  //     vis[i] = true;
  //     player_answer.splice(i, 1);
  //     temp_answer.splice(i, 1);
  //   }
  // }
  console.log(player_answer);
};

document.onclick = function (event) {
  const obj = event.srcElement;
  if (obj.type === "button") {
    if (obj.id === "enter") {
      handleEnterClick();
    } else if (obj.id === "delete") {
      handleDeleteClick();
    } else {
      handleLetterClick(obj.id);
    }
  }
};
