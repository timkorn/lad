let readline = require("readline");

// get random number
function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// init data
const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
    {
      name: "Удар когтистой лапой",
      physicalDmg: 3, // физический урон
      magicDmg: 0, // магический урон
      physicArmorPercents: 20, // физическая броня
      magicArmorPercents: 20, // магическая броня
      cooldown: 0, // ходов на восстановление
    },
    {
      name: "Огненное дыхание",
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Удар хвостом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
    },
  ],
};

let moves = [
  {
    name: "Удар боевым кадилом",
    physicalDmg: 2,
    magicDmg: 0,
    physicArmorPercents: 0,
    magicArmorPercents: 50,
    cooldown: 0,
  },
  {
    name: "Вертушка левой пяткой",
    physicalDmg: 4,
    magicDmg: 0,
    physicArmorPercents: 0,
    magicArmorPercents: 0,
    cooldown: 4,
  },
  {
    name: "Каноничный фаербол",
    physicalDmg: 0,
    magicDmg: 5,
    physicArmorPercents: 0,
    magicArmorPercents: 0,
    cooldown: 3,
  },
  {
    name: "Магический блок",
    physicalDmg: 0,
    magicDmg: 0,
    physicArmorPercents: 100,
    magicArmorPercents: 100,
    cooldown: 4,
  },
];

class Player {
  constructor(obj) {
    this.health = obj.maxHealth;
    this.name = obj.name;
    this.moves = new Map();
    for (let i = 0; i < obj.moves.length; i++) {
      this.moves.set(obj.moves[i].name, obj.moves[i]);
    }
  }
  cooldownMoves = {
    moves: [],
    movesLast: [],
  };
  getMoves() {
    return Array.from(this.moves.keys()).filter(
      (item) => !this.cooldownMoves.moves.includes(item)
    );
  }
  makeMove(name) {
    this.decreaseCooldown();
    this.makeCooldown(name);
    return this.moves.get(name);
  }
  makeCooldown(name) {
    if (this.moves.get(name).cooldown !== 0) {
      this.cooldownMoves.moves.push(name);
      this.cooldownMoves.movesLast.push(this.moves.get(name).cooldown);
    }
  }
  decreaseCooldown() {
    let arr = [];

    for (let i = 0; i < this.cooldownMoves.movesLast.length; i++) {
      this.cooldownMoves.movesLast[i] -= 1;
      if (this.cooldownMoves.movesLast[i] == 0) {
        arr.push(i);
      }
    }
    this.cooldownMoves.moves = this.cooldownMoves.moves.filter(
      (item, i) => !arr.includes(i)
    );
    this.cooldownMoves.movesLast = this.cooldownMoves.movesLast.filter(
      (item, i) => !arr.includes(i)
    );
  }
}

// players creation
function startGame(comp, pl) {
  const computer = new Player(comp);
  const player = new Player(pl);
  play(computer, player);
}

function choosePlayerMove(moves) {
  console.log(`choose your move:`);
  for (let i = 0; i < moves.length; i++) {
    console.log(`# ${moves[i]} [${i + 1}]`);
  }
}

// damage calculator
function computeDamage(att, def) {
  let damage = Math.floor(
    att.physicalDmg * (1 - def.physicArmorPercents / 100) +
      att.magicDmg * (1 - def.magicArmorPercents / 100)
  );
  return damage;
}
function computeDamagePoints(computer, player, compMove, playerMove) {
  let compDamage = computeDamage(compMove, playerMove);
  let plDamage = computeDamage(playerMove, compMove);
  computer.health -= plDamage;
  player.health -= compDamage;
}

// main logic
function play(computer, player) {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let compMoves = computer.getMoves();
  let compMove = computer.makeMove(
    compMoves[getRandomArbitrary(0, compMoves.length - 1)]
  );
  console.log(`computer's move: ${compMove.name}`);
  let playerMoves = player.getMoves();
  choosePlayerMove(playerMoves);
  rl.on("line", (input) => {
    input = Number(input) - 1;
    if (
      !(Number.isInteger(input) && input >= 0 && input < playerMoves.length)
    ) {
      console.log("Incorrect enter, try again!!!");
    } else {
      let playerMove = player.makeMove(playerMoves[input]);
      computeDamagePoints(computer, player, compMove, playerMove);
      if (computer.health <= 0 || player.health <= 0) {
        if (computer.health <= 0) {
          console.log(`${computer.name} is dead!!!`);
        }
        if (player.health <= 0) {
          console.log(`${player.name} is dead!!!`);
        }
        console.log("\nGAME OVER!!!");
        rl.close();
      } else {
        console.log(`\n${computer.name} health: ${computer.health}`);
        console.log(`${player.name} health: ${player.health}\n`);
        compMoves = computer.getMoves();
        compMove = computer.makeMove(
          compMoves[getRandomArbitrary(0, compMoves.length - 1)]
        );
        console.log(`computer's move: ${compMove.name}`);
        playerMoves = player.getMoves();
        choosePlayerMove(playerMoves);
      }
    }
  });
}

// start choice
async function chooseLevel() {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.log("Choose the start health level:");
  console.log("# max-health - 12 [1]");
  console.log("# max-health - 10 [2]");
  console.log("# max-health - 8 [3]");
  let pl = {};
  pl.moves = moves;
  pl.name = "Евстафий";
  await new Promise((resolve) =>
    rl.on("line", (input) => {
      if (input == "1") {
        pl.maxHealth = 12;
        rl.close();
        resolve();
      } else if (input == "2") {
        pl.maxHealth = 10;
        rl.close();
        resolve();
      } else if (input == "3") {
        pl.maxHealth = 8;
        rl.close();
        resolve();
      } else {
        console.log("incorrect enter, try again");
      }
    })
  );
  await new Promise(() => {
    startGame(monster, pl);
  });
}
chooseLevel();
