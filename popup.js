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
  if (index === colomn || success) return;
  g[times] = g[times] || [];
  g[times][index] = letter;
  document.getElementById("g" + times.toString() + index.toString()).innerText =
    letter;
  index++;
};

handleDeleteClick = () => {
  if (index === 0 || success) return;
  index--;
  document.getElementById("g" + times.toString() + index.toString()).innerText =
    "";
};

handleEnterClick = () => {
  if (index !== colomn || success) return;
  const player_answer = g[times];
  console.log(player_answer);
  if (words.indexOf(player_answer.join("")) === -1) {
    alert("Not a word !!!");
    for (let i = 0; i < colomn; i++) {
      document.getElementById("g" + times.toString() + i.toString()).innerText =
        "";
    }
    index = 0;
    g[times].length = 0;
    return;
  }
  const answer_vis = [],
    player_answer_vis = [];
  for (let i = 0; i < answer.length; i++) {
    answer_vis[i] = false;
    player_answer_vis[i] = false;
  }
  // fully correct
  let correct_cnt = 0;
  for (let i = 0; i < colomn; i++) {
    if (player_answer[i] === answer[i]) {
      document.getElementById(
        "g" + times.toString() + i.toString()
      ).style.backgroundColor = "#6aaa64";
      document.getElementById(
        "g" + times.toString() + i.toString()
      ).style.color = "#ffffff";
      document.getElementById(player_answer[i]).style.backgroundColor =
        "#6aaa64";
      answer_vis[i] = true;
      player_answer_vis[i] = true;
      correct_cnt++;
    }
  }

  if (correct_cnt === colomn) {
    success = true;
    alert("You win !!!");
    return;
  }

  // halfly correct
  for (let i = 0; i < colomn; i++) {
    if (answer_vis[i]) continue;
    for (let j = 0; j < colomn; j++) {
      if (player_answer_vis[j]) continue;
      if (player_answer[i] === answer[j]) {
        document.getElementById(
          "g" + times.toString() + i.toString()
        ).style.backgroundColor = "#c9b458";
        document.getElementById(
          "g" + times.toString() + i.toString()
        ).style.color = "#ffffff";
        document.getElementById(player_answer[i]).style.backgroundColor =
          "#c9b458";
        answer_vis[i] = true;
        player_answer_vis[j] = true;
      }
    }
  }
  //fully incorrect
  for (let i = 0; i < colomn; i++) {
    if (answer_vis[i]) continue;
    answer_vis[i] = true;
    document.getElementById(
      "g" + times.toString() + i.toString()
    ).style.backgroundColor = "#787c7e";
    document.getElementById("g" + times.toString() + i.toString()).style.color =
      "#ffffff";
    document.getElementById(player_answer[i]).style.backgroundColor = "#787c7e";
  }

  if (++times === row) {
    alert("Answer is " + answer + " !!!");
    return;
  }
  index = 0;
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
