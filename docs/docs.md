# How the System Works

1. **User Writes Code**

   * The user types JavaScript code in the CodeMirror editor on the left panel.
   * Example: a simple `for` loop that calculates a sum.

2. **Run Code**

   * When the user clicks **RUN ▶**, the `runCode()` function is triggered.
   * It performs the following:

     * Converts `let`/`const` to `var` (for easier dynamic evaluation).
     * Detects all variables declared in the code.
     * Wraps each line of code with a **tracer function** (`__trace(lineNo)`).
     * Overrides `console.log` to capture outputs as trace steps.

3. **Trace Table**

   * The tracer function runs after each line and checks all variables.
   * If a variable’s value changes, a new step is added to the `steps` array.
   * Each step records:

     * **Line number** – The code line executing.
     * **Variable name** – The variable or “Output” for `console.log`.
     * **Value** – The current value of the variable.

4. **Navigation**

   * The **Next** button moves forward through `steps` and updates the table.
   * The **Prev** button moves backward to previous steps.
   * The code editor highlights the currently executing line.

5. **Auto-scroll**

   * The table automatically scrolls to show the latest step when new rows are added.

---

## Example Code

Let’s use the example code already in your editor:

```javascript
let sum = 0;

for (let i = 1; i <= 5; i++) {
    sum = sum + i;
}

console.log(sum);
```

---

## Trace Table Example

After running this code, your trace table would look something like this (step-by-step):

| Step | Variable | Value |
| ---- | -------- | ----- |
| 1    | sum      | 0     |
| 2    | i        | 1     |
| 3    | sum      | 1     |
| 4    | i        | 2     |
| 5    | sum      | 3     |
| 6    | i        | 3     |
| 7    | sum      | 6     |
| 8    | i        | 4     |
| 9    | sum      | 10    |
| 10   | i        | 5     |
| 11   | sum      | 15    |
| 12   | Output   | 15    |

**Explanation of Table Steps**:

1. `sum = 0` → Initial assignment.
2. `i = 1` → First loop iteration.
3. `sum = sum + i` → `0 + 1 = 1`.
4. `i = 2` → Second iteration.
5. `sum = sum + i` → `1 + 2 = 3`.
6. Repeat until loop ends.
7. `console.log(sum)` → Output captured as a trace step.


This system **effectively simulates step-by-step execution**, making it easy for learners to see how variables change in loops, conditionals, and functions.


