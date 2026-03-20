# Examples for JS Trace Table


## 1. Sum of First 5 Numbers

```javascript
let sum = 0;
for (let i = 1; i <= 5; i++) {
    sum += i;
}
console.log(sum);
```

**Trace Table Behavior:**

* `i` goes from 1 to 5.
* `sum` accumulates values 0 → 1 → 3 → 6 → 10 → 15.
* Output: 15.



## 2. Factorial of 4

```javascript
let fact = 1;
for (let n = 1; n <= 4; n++) {
    fact *= n;
}
console.log(fact);
```

**Trace Table Behavior:**

* `n` increments 1 → 4.
* `fact` multiplies sequentially: 1 → 1 → 2 → 6 → 24.
* Output: 24.


## 3. Fibonacci Sequence (First 5 Terms)

```javascript
let a = 0, b = 1;
for (let i = 1; i <= 10; i++) {
    let temp = a;
    a = b;
    b = temp + b;
    console.log(a);
}
```

**Trace Table Behavior:**

* `a` and `b` update each iteration.
* Output sequence: 1, 1, 2, 3, 5.


## 4. Even Numbers Up to 10

```javascript
for (let i = 2; i <= 10; i += 2) {
    console.log(i);
}
```

**Trace Table Behavior:**

* `i` increments 2 → 10.
* Output: 2, 4, 6, 8, 10.


## 5. Sum of Array Elements

```javascript
let arr = [3, 7, 2];
let total = 0;
for (let i = 0; i < arr.length; i++) {
    total += arr[i];
}
console.log(total);
```

**Trace Table Behavior:**

* `total` updates: 0 → 3 → 10 → 12.
* Output: 12.


## 6. Maximum in Array

```javascript
let arr = [4, 9, 2, 8];
let max = arr[0];
for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
}
console.log(max);
```

**Trace Table Behavior:**

* `max` updates when a larger number is found.
* Output: 9.

```js
// Array or List
let numbers = [10, 25, 5, 30, 15];
let max = numbers[0];

for (let i = 1; i < numbers.length; i = i + 1) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
}

console.log("Maximum number: " + max);

```


## 7. Check Prime Number

```javascript
let num = 7;
let isPrime = true;
for (let i = 2; i < num; i++) {
    if (num % i === 0) isPrime = false;
}
console.log(isPrime);
```

**Trace Table Behavior:**

* `isPrime` remains true.
* Output: true.


## 8. Countdown

```javascript
for (let i = 5; i > 0; i--) {
    console.log(i);
}
console.log("Blast off!");
```

**Trace Table Behavior:**

* `i` decrements 5 → 1.
* Output: 5, 4, 3, 2, 1, "Blast off!"


## 9. Nested Loops (Multiplication Table for 1–3)

```javascript
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`${i} x ${j} = ${i*j}`);
    }
}
```

**Trace Table Behavior:**

* `i` outer loop 1 → 3, `j` inner loop 1 → 3.
* Outputs multiplication table: 1×1=1 … 3×3=9.



## 10. Running Average

```javascript
let nums = [2, 4, 6, 8];
let sum = 0;
for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    console.log(sum / (i+1));
}
```

**Trace Table Behavior:**

* Computes average as numbers are added.
* Output: 2, 3, 4, 5.

```js
// Loop
let a = 1;
let b = 20;

for (a = 1; a < b; a++) {
    if (a % 2 == 0) {
        // Continue
        continue;
    } else if (a == 15) {
        // Break
        break;
    } else {
        console.log(a);
    }
}

```

  
## 11. Array, Function and Object
  
```js
// Array
let fruits = ["apple", "banana", "cherry"];

// Object
let colors = { apple: "red", banana: "yellow", cherry: "red" };

// Function
function showFruits(arr) {
  for (let i = 0; i < arr.length; i++) {        // Loop
    let fruit = arr[i];
    if (colors[fruit] === "red") {              // Condition
      console.log(fruit + " is red");           // String
    } else {
      console.log(fruit + " is " + colors[fruit]);
    }
  }
}

// Call the function
showFruits(fruits);
```

## 12. Traffic Light Signal
```js
// Traffic Light States
let lights = ["red", "yellow", "green"];

// Light Instructions
let actions = { red: "Stop", yellow: "Slow Down", green: "Go" };

// Function to process traffic lights
function manageTraffic(arr) {
  for (let i = 0; i < arr.length; i++) {
    let light = arr[i];
    
    if (light === "red") {
      console.log("STOP! The light is red.");
    } else {
      // Accesses the action from the object based on the current light
      console.log(light.toUpperCase() + ": " + actions[light]);
    }
  }
}

// Call the function
manageTraffic(lights);
```
## 13. Buy Something to Cart
```js
let total = 0;
let shopping = true;

while (shopping) {
    let item = prompt("Enter item to buy (apple, banana, orange) or 'exit' to finish:");

    if (item === null || item.toLowerCase() === 'exit') {
        shopping = false; // Stop the loop
        console.log("Shopping finished. Final total: $" + total);
    } else if (item.toLowerCase() === "apple") {
        total += 2;
        console.log("You bought an Apple. Current total: $" + total);
    } else if (item.toLowerCase() === "banana") {
        total += 1;
        console.log("You bought a Banana. Current total: $" + total);
    } else if (item.toLowerCase() === "orange") {
        total += 3;
        console.log("You bought an Orange. Current total: $" + total);
    } else {
        console.log("Item not available.");
    }
}
```
## 14. Number Guessing Game
```js
// Number Guessing Game (browser version using prompt)

let k = Math.floor(Math.random() * 100); // random number between 0 and 99
let count = 1;

// Ask the user for the first guess
let kh = Number(prompt("Guess the number (0-99):"));

function guess() {
    // Check if input is a valid number
    if (isNaN(kh)) {
        kh = Number(prompt("Please enter a valid number! Try again:"));
        guess();
        return;
    }

    if (kh === k) {
        console.log("Congratulations! You guessed the number: " + kh);
        console.log("It took you " + count + " guesses.");
        alert("You guessed it right! The number was " + kh + ". It took " + count + " guesses.");
    } else if (kh > k) {
        count++;
        kh = Number(prompt("Too high! Try a smaller number:"));
        guess();
    } else if (kh < k) {
        count++;
        kh = Number(prompt("Too low! Try a bigger number:"));
        guess();
    }
}

// Start the game
guess();
```
## 15. Boolean Operation 
```js
// Condition Operation
console.log(5 > 3);           // true (5 is larger)
console.log(10 == 15);        // false (10 and 15 are not equal)
console.log("Likhan" == "Likhan"); // true (Values are identical)
console.log("Bangla" != "Code");   // true (Values are not identical)

// Logical Operation
console.log((10 > 5) && (20 < 30)); // true (AND)
console.log((5 > 10) || (20 < 30));  // true (OR)
console.log(!(5 > 10));              // true (NOT)

// String Check
console.log("Likhan".length > 0); // true (String is not empty)

// Number Check
console.log(7 % 2 == 0); // false (7 is odd)
console.log(8 % 2 == 0); // true  (8 is even)

// Directly Boolean Variable
let isCorrect = true;
console.log(isCorrect); // true
```
## Write more JS codes and Run and Trace it in JS Trace Table.
