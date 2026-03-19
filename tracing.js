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

    // 🔥 Convert let/const → var
    code = code.replace(/\blet\b/g, "var")
               .replace(/\bconst\b/g, "var");

    let lines = code.split("\n");
    let instrumented = "";
    let output = [];

    document.getElementById("output").innerText = "";

    // 🔥 Capture console.log (WITH TRACE)
    console.log = function (...args) {

        let msg = args.join(" ");
        output.push(msg);

        document.getElementById("output").innerText = output.join("\n");

        // 👉 Add OUTPUT as trace step
        steps.push({
            line: currentExecutingLine,
            variable: "Output",
            value: msg
        });
    };

    // Detect variables
    let varSet = new Set();

    lines.forEach(line => {
        let match = line.match(/\bvar\s+([a-zA-Z_]\w*)/);
        if (match) varSet.add(match[1]);
    });

    variables = Array.from(varSet);

    // Track current line
    window.currentExecutingLine = 0;

    // Inject tracer
    lines.forEach((line, index) => {
        instrumented += `
currentExecutingLine = ${index};
${line}
__trace(${index});
`;
    });

    // TRACE
    window.__trace = function (lineNo) {

        variables.forEach(v => {
            try {
                let val = eval(v);

                if (prevValues[v] !== val) {
                    steps.push({
                        line: lineNo,
                        variable: v,
                        value: val
                    });

                    prevValues[v] = val;
                }

            } catch {}
        });
    };

    try {
        eval(instrumented);
    } catch (e) {
        alert(e.message);
    }

    createHeader();
    nextStep();
}

// HEADER
function createHeader() {
    document.getElementById("tableHead").innerHTML = `
        <tr>
            <th>Step</th>
            <th>Variable</th>
            <th>Value</th>
        </tr>
    `;
}

// NEXT
function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        render();
        highlightLine();
    }
}

// PREV
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        render();
        highlightLine();
    }
}

// RENDER
function render() {
    let tbody = document.getElementById("traceTable");
    tbody.innerHTML = "";

    for (let i = 0; i <= currentStep; i++) {
        tbody.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${steps[i].variable}</td>
            <td>${steps[i].value}</td>
        </tr>`;
    }
}

// HIGHLIGHT
function highlightLine() {
    if (marker !== null) {
        editor.removeLineClass(marker, "background", "active-line");
    }

    let line = steps[currentStep].line;
    marker = line;

    editor.addLineClass(line, "background", "active-line");
    editor.scrollIntoView({ line: line, ch: 0 }, 100);
}
