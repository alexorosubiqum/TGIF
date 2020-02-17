var myName = "Alex";
var age = 23;
var ignasiAge = 32;
var ageDiff = age - ignasiAge;
var number = 21;
if (ignasiAge > age) console.log("Ignasi is older than you");
else console.log("Ignasi is younger than you");
if (ignasiAge == age) console.log("You have the same age as Ignasi");

var students = [
  "Alex",
  "Ignasi",
  "Andrei",
  "Marc",
  "Kenneth",
  "Roxana",
  "Pablo",
  "Lluis",
  "Vasil",
  "Carol"
];

console.log(students[0]);
console.log(students[9]);
console.log(students);

var ages = [23, 35, 30, 29, 30, 25, 32, 28, 31, 27];

function even(array) {
  for (var i = 0; i < array.length; ++i) {
    if (array[i] % 2 == 0) {
      console.log(array[i]);
    }
  }
}
even(ages);

function lowest(array) {
  var lowest = array[0];
  for (i = 0; i < array.length; i++) {
    if (array[i] < lowest) {
      lowest = array[i];
    }
  }
  console.log("lowest: ", lowest);
}
lowest(ages);

function highest(array) {
  var highest = array[0];
  for (i = 0; i < array.length; i++) {
    if (array[i] > highest) {
      highest = array[i];
    }
  }
  console.log("highest:", highest);
}
highest(ages);

var numbers = [
  3,
  6,
  67,
  6,
  23,
  11,
  100,
  8,
  93,
  0,
  0,
  17,
  24,
  7,
  1,
  33,
  45,
  28,
  33,
  23,
  12,
  99,
  100,
  99,
  1212,
  1212
];
var index = 1;

function arrayIndex(array, index) {
  for (i = 0; i < array.length; i++) {
    if (i == index) console.log("arrayIndex", array[i]);
  }
}
arrayIndex(numbers, index);

function repeated(array) {
  for (i = 0; i < array.length - 1; i++) {
    for (j = i + 1; j < array.length; j++) {
      if (array[i] == array[j]) {
        console.log("repeated:", array[i]);
      }
    }
  }
}
repeated(numbers);

var rgwb = ["Red", "Green", "White", "Black"];
function colors(array) {
  for (i = 0; i < array.length; i++);
  array = array.join("  ");
  console.log("colors", array);
}
colors(rgwb);

function reverse(n) {
  n = n + " ";
  return n
    .split("")
    .reverse()
    .join("");
}
console.log("reversed number", reverse(123456789));

var sorted = "webmaster";
function sortAlpha(array) {
  array = array.split("");
  array.sort();
  console.log("reversed", array);
}
sortAlpha(sorted);

var pop = "prince of persia";
var popu = [];
function uppercase(string) {
  // dividir string en un array per paraules
  popu = string.split(" ");
  // for sobre l'array
  for (i = 0; i < popu.length; i++) {
    popu[i] = popu[i].charAt(0).toUpperCase() + popu[i].substring(1);
  }
  string = popu.join(" ");
  console.log(string);
}
uppercase(pop);

function longest(array) {
  var array = array.match(/\w[a-z]{0,}/gi);
  var result = array[0];

  for (var x = 1; x < array.length; x++) {
    if (result.length < array[x].length) {
      result = array[x];
    }
  }
  return result;
}
console.log(longest("Web Development Tutorial"));
