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
for (let i = 1; i <= 5; i++) {
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

## Write more JS codes and Run and Trace it in JS Trace Table.
