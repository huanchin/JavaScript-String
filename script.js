"use strict";

// indexOf()
// slice()
// toLowerCase()
// toUpperCase()
// trim()
// replace()
// includes()
// startsWith()
// endsWith()
// split()
// join()
// padStart()
// padEnd()

/************* Working With Strings - Part 1 **************/
const airline = "TAP Air Portugal";
const plane = "A320";
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log(plane[-1]); // undefined
console.log("B737"[0]);

console.log(airline.length);
console.log("B737".length);

/************* indexOf() **************/
console.log(airline.indexOf("r")); // 6
console.log(airline.lastIndexOf("r")); // 10
console.log(airline.indexOf("Portugal")); // 8
console.log(airline.indexOf("portugal")); // -1 if not found (case sensitive)

/************* slice(start(include), end(exclude)) **************/
console.log(airline.slice(4)); // Air Portugal
console.log(airline.slice(4, 7)); // Air

console.log(airline.slice(0, airline.indexOf(" "))); // extract first word: TAP
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); // extract last word: Portugal

console.log(airline.slice(-2)); // al
console.log(airline.slice(1, -1)); // AP Air Portuga

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === "B" || s === "E") console.log("You got the middle seat 😬");
  else console.log("You got lucky 😎");
};

checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

// Boxing: JS automatically behind the scenes convert that string primitive into an String object (with the same content), and then its on that object where the methods are called whenever we call a method on a string
// when the operation is done, the object is converted back to regular string promitive
console.log(new String("jonas")); // String Object {...}
console.log(typeof new String("jonas")); // object
console.log(typeof new String("jonas").slice(1)); // primitive

/************* Working With Strings - Part 2 **************/

/************* toLowerCase(), toUpperCase() **************/

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = "jOnAS"; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

/******************* trim() *********************/
// Comparing emails
const email = "hello@jonas.io";
const loginEmail = "  Hello@Jonas.Io \n";
// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail); // hello@jonas.io
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

/******************* replace() *********************/
const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";

console.log(announcement.replace("door", "gate"));
console.log(announcement.replaceAll("door", "gate"));
console.log(announcement.replace(/door/g, "gate")); // replace all using regular expression

// Booleans
/******************* includes(), startsWith(), endsWith() *********************/
const plane2 = "Airbus A320neo";
console.log(plane2.includes("A320"));
console.log(plane2.includes("Boeing"));
console.log(plane2.startsWith("Airb"));

if (plane2.startsWith("Airbus") && plane2.endsWith("neo")) {
  console.log("Part of the NEW ARirbus family");
}

/******************* Practice exercise *********************/
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();

  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are NOT allowed on board");
  } else {
    console.log("Welcome aboard!");
  }
};

checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

/************* Working With Strings - Part 3 **************/

/************* Split and join **************/
console.log("a+very+nice+string".split("+")); // Array(4) [ "a", "very", "nice", "string" ]
console.log("Jonas Schmedtmann".split(" ")); // Array [ "Jonas", "Schmedtmann" ]

const [firstName, lastName] = "Jonas Schmedtmann".split(" ");
const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName); // Mr. Jonas SCHMEDTMANN

const capitalizeName = function (name) {
  const names = name.split(" ");
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(" "));
};

capitalizeName("jessica ann smith davis"); // Jessica Ann Smith Davis
capitalizeName("jonas schmedtmann"); // Jonas Schmedtmann

/************* Padding **************/
const message = "Go to gate 23!";
console.log(message.padStart(20, "+").padEnd(30, "+")); // ++++++Go to gate 23!++++++++++
console.log("Jonas".padStart(20, "+").padEnd(30, "+")); // +++++++++++++++Jonas++++++++++

/******************* Practice exercise *********************/
const maskCreditCard = function (number) {
  const str = number + ""; // convert number to string
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard("334859493847755774747"));

/************* Repeat **************/
const message2 = "Bad waether... All Departues Delayed... ";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${"🛩".repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

/******************* Practice exercise *********************/

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = (str) => str.slice(0, 3).toUpperCase();

for (const flight of flights.split("+")) {
  const [type, from, to, time] = flight.split(";");
  const output = `${type.startsWith("_Delayed") ? "🔴" : ""}${type.replaceAll("_", " ")} ${getCode(from)} ${getCode(to)} (${time.replace(":", "h")})`.padStart(36);
  console.log(output);
}

/****************  Coding Challenge #4 ****************/

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

const button = document.createElement("button");
button.innerText = "Click";
document.body.append(document.createElement("textarea"));
document.body.append(button);

// document.querySelector("button").addEventListener("click", function () {
//   const text = document.querySelector("textarea").value;
//   const rows = text.split("\n");

//   for (const [i, row] of rows.entries()) {
//     const [first, second] = row.toLowerCase().trim().split("_");

//     const output = `${first}${second.replace(
//       second[0],
//       second[0].toUpperCase()
//     )}`;
//     console.log(`${output.padEnd(20)}${"✅".repeat(i + 1)}`);
//   }
// });

document.querySelector("button").addEventListener("click", () => {
  const text = document.querySelector("textarea").value;
  const rows = text.split("\n");
  for (const [i, el] of rows.entries()) {
    const [first, second] = el.trim().toLowerCase().split("_");
    const output = first + second[0].toUpperCase() + second.slice("1");
    console.log(`${output.padEnd(20, " ")}${"✅".repeat(i + 1)}`);
  }
});
