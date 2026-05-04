
let steps = [];
let currentStep = -1;
let variables = [];
let prevValues = {};
let marker = null;

// RUN
function runCode() {
    steps = [];
    currentStep = -1;
    variables = [];
    prevValues = {};

    let code = editor.getValue();

    // 1. Convert let/const to var (using regex word boundaries to avoid partial matches)
    code = code.replace(/\b(let|const)\b/g, "var");

    let lines = code.split("\n");
    let instrumented = "";
    let output = [];

    document.getElementById("output").innerText = "";

    // 2. Capture console.log with JSON stringification for objects
    console.log = function (...args) {
        let msg = args.map(arg => 
            (typeof arg === 'object' && arg !== null) ? JSON.stringify(arg) : arg
        ).join(" ");

        output.push(msg);
        document.getElementById("output").innerText = output.join("\n");

        steps.push({
            line: window.currentExecutingLine,
            variable: "Output",
            value: msg
        });
    };

    // 3. Detect variables using a global regex
    let varSet = new Set();
    const varRegex = /\bvar\s+([a-zA-Z_]\w*)/g;
    let match;
    while ((match = varRegex.exec(code)) !== null) {
        varSet.add(match[1]);
    }
    variables = Array.from(varSet);

    // 4. Inject tracer safely 
    // We wrap the line and the tracer in a block or ensure semicolons exist
    lines.forEach((line, index) => {
        let trimmed = line.trim();
        if (trimmed === "" || trimmed.startsWith("//")) {
            instrumented += line + "\n";
        } else {
            // Wrapping the line and tracer prevents "Unexpected Number" syntax errors
            instrumented += `window.currentExecutingLine = ${index}; ${line}; window.__trace(${index});\n`;
        }
    });

    // 5. Define the Trace Logic
    window.__trace = function (lineNo) {
        variables.forEach(v => {
            try {
                // Access variable value safely
                let rawVal = eval(v);
                
                // Format objects/arrays as JSON strings, else keep primitive
                let val = (typeof rawVal === 'object' && rawVal !== null) 
                          ? JSON.stringify(rawVal) 
                          : rawVal;

                // Track changes only
                if (prevValues[v] !== val) {
                    steps.push({
                        line: lineNo,
                        variable: v,
                        value: val
                    });
                    prevValues[v] = val;
                }
            } catch (e) {
                // Ignore errors for variables not yet in scope
            }
        });
    };

    try {
        window.currentExecutingLine = 0;
        eval(instrumented);
    } catch (e) {
        console.error("Tracing Error:", e);
        alert("Syntax Error in code: " + e.message);
    }

    createHeader();
    if (steps.length > 0) {
        currentStep = 0;
        render();
        highlightLine();
    }
}

// TABLE HEADER
function createHeader() {
    document.getElementById("tableHead").innerHTML = `
        <tr>
            <th>Step</th>
            <th>Variable</th>
            <th>Value</th>
        </tr>
    `;
}

// NAVIGATION: NEXT
function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        render();
        highlightLine();
    }
}

// NAVIGATION: PREVIOUS
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        render();
        highlightLine();
    }
}

// RENDER TABLE ROWS
function render() {
    let tbody = document.getElementById("traceTable");
    tbody.innerHTML = "";

    for (let i = 0; i <= currentStep; i++) {
        let step = steps[i];
        tbody.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${step.variable}</td>
            <td>${step.value}</td>
        </tr>`;
    }
}

// HIGHLIGHT CODE LINE
function highlightLine() {
    if (marker !== null) {
        editor.removeLineClass(marker, "background", "active-line");
    }

    if (steps[currentStep]) {
        let line = steps[currentStep].line;
        marker = line;
        editor.addLineClass(line, "background", "active-line");
        editor.scrollIntoView({ line: line, ch: 0 }, 100);
    }
}

// AUTO-SCROLL TABLE
(function() {
    const tableContainer = document.querySelector('.table-container');
    const traceTable = document.getElementById('traceTable');
    if (!tableContainer || !traceTable) return;

    const observer = new MutationObserver(() => {
        tableContainer.scrollTop = tableContainer.scrollHeight;
    });
    observer.observe(traceTable, { childList: true });
})();
