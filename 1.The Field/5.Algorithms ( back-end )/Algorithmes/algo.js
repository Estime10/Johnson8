// const MA_FAV = 42

// console.log ("mon nombre favori est : "+ MA_FAV);

// concatenation
// const MA_FAV = 42
// const NOM = "John doe"

// console.log("Bonjour je m'appelle  "+ NOM , "et j'ai " +MA_FAV ,"ans");

// addition
// let FIRST_NUMBER = 21
// let SECOND_NUMBER = 32

// console.log(FIRST_NUMBER + SECOND_NUMBER);

// division
// let FIRST_NUMBER = 50
// let SECOND_NUMBER = 10

// console.log(FIRST_NUMBER / SECOND_NUMBER)

// modulo rest en % entier
// var1= 18
// var2= 4

// console.log(var1 % var2);

// tva
// var TVA = 0.21;
// var PRIX = 10;

// console.log(PRIX + (PRIX*TVA));
// console.log(PRIX)

//circle

//function calculateCircumference(radius) {
// return 2 * Math.PI * radius;
//}
//console.log(calculateCircumference(120))

//horloge
//var date = new Date();
//var current_hour = date.getHours();

//console.log(date + current_hour)


/*var chiffreUn = 10;
var chiffreDeux = 5;
var chiffreTrois = 8;
var maVariable = chiffreUn < chiffreDeux || chiffreUn < chiffreTrois || chiffreDeux == chiffreTrois

var resultat = maVariable

alert(maVariable);
alert(resultat)*/

// var userInput = prompt('Quelle est ta meilleure note');

// if(userInput > 0 && userInput <10) {
//     alert('T\'es nul...');
// }
// else if( userInput > 10 && userInput < 20) {
//     alert('Good game!!! ')
// }
// else if(userInput == 10){
//     alert('bosser un peu c\'est pas du luxe')
// }

// let x = prompt("quel est votre age?")
// if (x==18 || x >18){
//     console.log("Vous payez 10euros");
//     alert( "cest 10 euros");
// }else{
//     console.log("Vous payez 8 euros");
//     alert("cest 8 euros");
// };

/*alert('Bonjour ! et bienvenu');
var nbr1 = parseInt(prompt('entrer votre premier nombre:'));
var nbr2 = parseInt(prompt('entrer votre deuxième nombre:'));
var resultat = nbr1 + nbr2;
alert(nbr1 + ' + ' + nbr2 + ' = '+ resultat);*/


// var nbr1 = window.prompt('entre votre premier nombre:');
// var nbr2 = window.prompt('entre votre second nombre:');
// var nbr3 = window.prompt('entre votre troisieme nombre:');

// if (nbr1>=nbr2 && nbr1>=nbr3){
// console.log(nbr1);
// }
// else if(nbr2>= nbr1 && nbr2 >=nbr3){
// console.log(nbr2);
// }
// else(nbr3 >= nbr1 && nbr3 >=nbr2)
// console.log(nbr3);


//var first_throw = Math.floor(Math.random()*6) +1;
//var second_throw = Math.floor(Math.random()*6) +1;
//var thrid_throw = Math.floor(Math.random()*6) +1;

//console.log(first_throw, second_throw , thrid_throw)

//if(first_throw == second_throw && second_throw == thrid_throw){
//    console.log(3)
//  }
//else if(first_throw == second_throw || first_throw == thrid_throw || second_throw == thrid_throw){
//   console.log(2)
//}
//else{
//  console.log("none")
//}


// const dayNumber = {
    
//     1: "Monday",
//     2: "Thirsday",
//     3: "Wednesday",
//     4: "Tuesday",
//     5: "Friday"
// };

// let semaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

// n = parseInt( prompt( "Donner moi un nb entre 1 et 7"))

// n -=1
//   alert('tu as choisis le jour ' +semaine[n])

// let n = parseInt(prompt("donne un chiffre stp"))
// let sum = 0 







// var copy = prompt ('combien de copies ? ')
// var copy1 = 0.11
//  var copy2 = 0.10

// if (copy <= 10 ){
//     consoloe.log(copy *0.12)
// }


// var firstTen = 0.12;
// var nextTwenty = 0.11;
// var rest = 0.10;
// var nbrCopy;
// nbrCopy = prompt("combien de copies")
// var secondRound = nbrCopy - 10 
// var thirdRound = nbrCopy - 30  
// var price;

// if (nbrCopy > 30) {    
//  price = 10 * firstTen + 20 * nextTwenty + thirdRound * rest 
// }
// else if (nbrCopy >= 10 && nbrCopy <= 30) {
//          price = 10 * firstTen + secondRound * nextTwenty 
// }
// else {     
//     price = nbrCopy * firstTen 
// }  
//     console.log (price)


// var copy = prompt ('combien de copies');

//  if (copy <= 10 && copy <=20){
//  console.log(copy *0.12) 

// }    

//  else if(copy <=20){
//      console.log(copy *0.11+"euros")
//  }
//  else
//  console.log(copy *0.10);



// let pairs = 0 ;
// while ( pairs <= 10) {
//    console.log("while: ", pairs);
//     pairs+=2
// }

// let impairs = 0;
// while (impairs <= 100) {
//     console.log("while: ", impairs);
//     impairs+=3
// }


// for ( let n = 0 ; n <= 100 ; n += 1) {
//     console.log( n );
// }



// function getRandomInt(max) {
//     return Math.floor(Math.random(0)*max);
// }
// console.log(getRandomInt(100))


// var throwDice = Math.floor(Math.random()*6)+1;
// console.log(throwDice);



// function rand10() {
//   return Math.floor(Math.random() * 6)+1;
//   }

//   function multiRand(n){
//     let list = [];
//     let x = 0;
//     for(let i=0; i<n; i++){
//       x = rand10();
//       console.log(x);
//       list.push(x);
//     }
//     console.log(list); 
//   }

//   nbr = parseInt(prompt("entrer le nombre de lancer svp"));

//   multiRand(nbr);



// function throwdice(){
//     let nbrOfThrow = 3;
//     let searchedNbr = 6;
//     let dices = []
//     let cpt = 0;
//     for (let i = 1; i <= nbrOfThrow; ++i) {
//     let dice = Math.floor(math.Random() *6) +1;
//     if (dice === searchedNbr) {
//     ++cpt;
//     }
//     dices.push(dice);
//     }
//     console.log(dices + ":" + searchedNbr + "appears" + cpt + " times" );
//     }   



// let arr = [10, 20, 30]

// console.log(Math.min(10, 20, 30))
// console.log(Math.max(10, 20, 30))
// console.log (arr)

// const myArray = [80, 200, 130];
// console.log(Math.min(...myArray));

// let minElement =Math.min.apply(Math, myArray);
// console.log(minElement);

// const myArray = [80, 200, 30];
// const myArray1 = [70, 200, 20];



 




// if (arr[0] < arr[1]) {
//     console.log (arr[0])
//     return true
// } else if (arr[0] > arr[1]) {
//     // ...
//     return false
// } else {  if (arr[0] == arr[1])
//     // ...
//     return false
// }




// let animals = [
//     'cat', 'dog', 'elephant', 'bee', 'ant'
// ];
// animals.sort();
// console.log(animals[])




// let array = ["Jason", " Mike", "Julien", "Micha"]

// function pickLearner(input,n){
//   let tmp=Math.floor(Math.random()*n);
//   return input[tmp];}

//   let nbr = parseInt(prompt("entre un numero entre 1 et "+ array.length+"svp"));
//   while(nbr> array.length)
//     {    nbr = parseInt(prompt( "entre un numero entre 1 et" + Array.length))
// };

  




