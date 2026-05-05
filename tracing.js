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

    // Convert let/const → var
    code = code.replace(/\b(let|const)\b/g, "var");

    document.getElementById("output").innerText = "";

    // ================= REAL-TIME console.log =================
    console.log = function (...args) {
        let msg = args.map(arg =>
            (typeof arg === 'object' && arg !== null)
                ? JSON.stringify(arg)
                : arg
        ).join(" ");

        document.getElementById("output").innerText += msg + "\n";

        steps.push({
            line: window.currentExecutingLine,
            variable: "Output",
            value: msg
        });
    };

    // ================= Variable Detection =================
    let varSet = new Set();
    const varRegex = /\bvar\s+([a-zA-Z_]\w*)/g;
    let match;
    while ((match = varRegex.exec(code)) !== null) {
        varSet.add(match[1]);
    }
    variables = Array.from(varSet);

    // ================= Function Entry =================
    code = code.replace(
        /function\s+([a-zA-Z_]\w*)\s*\((.*?)\)\s*\{/g,
        function (_, fname, args) {
            return `function ${fname}(${args}) {
window.__enterFunction("${fname}", arguments);`;
        }
    );

    // ================= Return Trace =================
    code = code.replace(/return\s+([^;]+);/g, function (_, val) {
        return `return __return(${val});`;
    });

    // ================= LINE-BY-LINE INSTRUMENT =================
    let lines = code.split("\n");
    let instrumented = "";

    lines.forEach((line, index) => {
        let trimmed = line.trim();

        if (trimmed === "" || trimmed.startsWith("//")) {
            instrumented += line + "\n";
            return;
        }

        instrumented += `
window.currentExecutingLine = ${index};
${line}
window.__trace(${index});
`;
    });

    // ================= TRACE =================
    window.__trace = function (lineNo) {
        variables.forEach(v => {
            try {
                let val = eval(v);
                if (typeof val === "object") val = JSON.stringify(val);

                if (prevValues[v] !== val) {
                    steps.push({
                        line: lineNo,
                        variable: v,
                        value: val
                    });
                    prevValues[v] = val;
                }
            } catch (e) {}
        });
    };

    // ================= FUNCTION CALL =================
    window.__enterFunction = function (fname, args) {
        steps.push({
            line: window.currentExecutingLine,
            variable: "CALL",
            value: fname + "(" + Array.from(args).join(", ") + ")"
        });
    };

    // ================= RETURN =================
    window.__return = function (value) {
        steps.push({
            line: window.currentExecutingLine,
            variable: "RETURN",
            value: value
        });
        return value;
    };

    // ================= EXECUTE =================
    try {
        window.currentExecutingLine = 0;
        eval(instrumented);
    } catch (e) {
        console.error(e);
        alert("Syntax Error: " + e.message);
    }

    createHeader();

    if (steps.length > 0) {
        currentStep = 0;
        render();
        highlightLine();
    }
}

// ================= HEADER =================
function createHeader() {
    document.getElementById("tableHead").innerHTML = `
        <tr>
            <th>Step</th>
            <th>Variable</th>
            <th>Value</th>
        </tr>
    `;
}

// ================= NEXT =================
function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        render();
        highlightLine();
    }
}

// ================= PREVIOUS =================
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        render();
        highlightLine();
    }
}

// ================= RENDER =================
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

// ================= HIGHLIGHT =================
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

// ================= AUTO SCROLL =================
(function () {
    const tableContainer = document.querySelector('.table-container');
    const traceTable = document.getElementById('traceTable');

    if (!tableContainer || !traceTable) return;

    const observer = new MutationObserver(() => {
        tableContainer.scrollTop = tableContainer.scrollHeight;
    });

    observer.observe(traceTable, { childList: true });
})();
