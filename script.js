let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["Grass Cutter"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const monsters = [
  {
    name: "slime",
    level: 2,
    health : 15 
  },
  {
    name : "Azhdaha",
    level: 8,
    health : 68 
  },
  {
    name : "Dragon",
    level: 20,
    health : 300 
  }
];

const weapons = [
  {
    name : "Dull blade",
    power : 5
  },
  {
    name : "Isshin Blade",
    power : 30
  },
  {
    name : "Mistsplitter",
    power : 50
  },
  {
    name : "Jade Cutter",
    power : 100
  }
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store","Go to cave","Fight Dragon"],
    "button functions": [goStore,goCave,fightDragon],
    text : "You enter the store you see a sign that says \"store\"."
  
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)","Buy Weapon (30 gold)","go to town square"],
    "button functions": [buyHealth,buyWeapon,goTown],
    text : "you enter the store"
  },
  {
    name: "cave",
    "button text": ["Fight slime (ezy noob)","Fight Azhdaha (💀)","go to town square"],
    "button functions": [fightSlime,fightAzhdaha,goTown],
    text : "you enter the cave. You see monsters"
  },
  {
    name: "fight",
    "button text": ["Attack","Dodge","Run"],
    "button functions": [attack,dodge,goTown],
    text : "You are fighting monsters (Oh shit !)"
  },
  {
    name: "kill monster",
    "button text": ["go to town square","go to town square","go to town square"],
    "button functions": [goTown,goTown,easterEgg],
    text: "the monster screams \"arg!\" as it dies crumbling to dust. You find Gold and Xp.   "
  },
  {
    name: "lose",
    "button text": ["REPLAY","REPLAY","REPLAY"],
    "button functions": [restart,restart,restart],
    text : "You die. 😔"
  },
  {
    name: "win",
    "button text": ["REPLAY","REPLAY","REPLAY"],
    "button functions": [restart,restart,restart],
    text : "You win !!!. yahoo "
  },
  {
    name: "easter egg",
    "button text": ["2","8","Go to town square?"],
    "button functions": [pickTwo,pickEight,goTown],
    text : "You find a secret game. Pick a number above. If the number you picked matched the random number chosen between o and 10, you win ! "
  } 

]

//initilize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0]
  button2.innerText = location["button text"][1]
  button3.innerText = location["button text"][2]
  button1.onclick = location["button functions"][0]
  button2.onclick = location["button functions"][1]
  button3.onclick = location["button functions"][2]
  text.innerText = location.text;
}

function goTown(){
  update(locations[0]);
}

function goStore(){
  update(locations[1]); 
}

function goCave(){
  update(locations[2]); 
}

function buyHealth(){
  if (gold>=10) {
    gold-=10;
    health+=10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }
  else{
    text.innerText = "You do not have enough gold to buy health. (Sed)"
  }
}

function buyWeapon(){
  if (currentWeapon<weapons.length-1) {
    if (gold >= 30) {
      gold-=30;
      currentWeapon++;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = `You now have a new  ${newWeapon}. `;
      inventory.push(newWeapon);
      goldText.innerText = gold; 
      text.innerText  += " In your inventory you have " + inventory +".";
    }else{
      text.innerText = "You do not have enough gold to buy a weapon (pathetic)"
    }
  }else{
    text.innerText = "you already have the most powerful weapon in existense (gasp)"
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
} 

function sellWeapon(){
  if(inventory.length > 1){
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon  = inventory.shift();
    text.innerText = `You sold ${currentWeapon}`
    text.innerText  += " In your inventory you have " + inventory +".";
  }else{
    text.innerText = "Don't sell your only weapon dumbass 😡"
  }
}

function fightSlime(){
  fighting = 0;
  goFight();
}

function fightAzhdaha(){
  fighting = 1;
  goFight();
}

function fightDragon(){
  fighting = 2;
  goFight();
}

function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack(){
  text.innerText = `The ${monsters[fighting].name} attacks.`;
  text.innerText += `You attack it with your ${weapons[currentWeapon].name + "."}`;
  if(isMonsterHit()){
    health -= getMonstersAttackValue(monsters[fighting].level);
  }else{
    text.innerText += "You misss";
  }
  
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() *xp) + 1;
  healthText.innerText = health; 
  monsterHealthText.innerText = monsterHealth; 
  
  if(health<=0){
    lose();
  }else if (monsterHealth <= 0){
    fighting===2 ? win() : defeatMonster(); 
  }
  if (Math.random() <= .1 && inventory.length !==  1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
    
  }
}

function getMonstersAttackValue(level) {
  let hit = (level*5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;

}

function isMonsterHit() {
  return Math.random()> 0.2;
}

function dodge(){
  text.innerText = "you dodge the attack from  " + monsters[fighting].name + ".";
}


function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function win() {
  update(locations[6]);

}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  inventory = ["stick"];
  goTown();
}

function easterEgg() {
  update(locations[7]);
}
function pickTwo(){
  pick(2);
}

function pickEight(){
  pick(8);
}

function pick(guess){
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "You picked " + guess + ". Here are the random numbers: \n";

  for(let i=0;i<10;i++){
    text.innerText += numbers[i] + "\n";
  }

  if(numbers.indexOf(guess) !== -1){
    text.innerText += "Right! You win 20 gold!"
    gold += 20;
    goldText.innerText = gold;
  }else{
    text.innerText += "Wrong! You lose 10 health"
    health -= 10;
    healthText.innerText = health;
    if(health<=0){
      lose();
    }
  }
}