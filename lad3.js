let readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// number generation
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function createNumber() {
  let c = getRandomArbitrary(3, 6);
  let res = [];
  for (let i = 0; i < c; i++) {
    res.push(getRandomArbitrary(0, 9));
  }
  return res;
}

// creation of output
function processInput1(a, correctNum, numSet) {
  let c = 0;
  let resultArr = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] == correctNum[i]) {
      c++;
      resultArr.push(a[i]);
    } else {
      if (numSet.has(a[i])) {
        resultArr.push(String(a[i]) + "?");
      } else {
        resultArr.push("#");
      }
    }
  }
  console.log(resultArr.join(" ") + "\n");
  if (c == a.length) {
    return 1;
  } else {
    return 0;
  }
}

function processInput2(a, correctNum, numSet) {
  let c = 0;
  let onPlace = new Set();
  let notOnPlaceCount = 0;
  let notOnPlace = new Set();
  for (let i = 0; i < a.length; i++) {
    if (a[i] == correctNum[i]) {
      c++;
      onPlace.add(a[i]);
    } else {
      if (numSet.has(a[i])) {
        notOnPlaceCount++;
        notOnPlace.add(a[i]);
      }
    }
  }
  console.log("\ndigits on places:" + c + ` (${Array.from(onPlace)})`);
  console.log(
    "digits not on places:" + notOnPlaceCount + ` (${Array.from(notOnPlace)})\n`
  );
  if (c == a.length) {
    return 1;
  } else {
    return 0;
  }
}

// main logic
function numberGuesser() {
  let correctNum = createNumber();
  let maxAtt = getRandomArbitrary(3, 5);
  console.log("correct num", correctNum);
  let attempt = 0;
  let digs = new Set(correctNum);
  let x = 1;
  let type;
  console.log("choose output format:\n");
  console.log("Grafic: ##56?# [1]");
  console.log(
    "Numbers: '2 digits on place(5,6), 2 digits not on place(2,3)' [2]\n"
  );
  rl.on("line", (input) => {
    if (x) {
      if (input == "1") {
        type = 1;
        console.log(
          `\nHello!!! You have ${maxAtt} opportunities to guess the ${correctNum.length}-digit number!!!`
        );
        console.log("\n# - not match(number does not exist)");
        console.log("<number>? - not match(number exists)");
        console.log("<number> - match!!!\n");
        x = 0;
      } else if (input == "2") {
        console.log(
          `\nHello!!! You have ${maxAtt} opportunities to guess the ${correctNum.length}-digit number!!!\n`
        );
        type = 0;
        x = 0;
      } else {
        console.log("\nWrong input. Try again!!!");
      }
    } else {
      if (input.length != correctNum.length) {
        console.log("wrong digits count!!!\n");
      } else if (
        type
          ? processInput1(
              input.split("").map((x) => Number(x)),
              correctNum,
              digs
            )
          : processInput2(
              input.split("").map((x) => Number(x)),
              correctNum,
              digs
            )
      ) {
        console.log("YOU WON!!!");
        rl.close();
      }
      attempt++;
      if (attempt == maxAtt) {
        console.log("sorry, you lost");
        rl.close();
      }
    }
  });
}

numberGuesser();
