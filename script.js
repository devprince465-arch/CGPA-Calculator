
// Select all student rows
const studentRows = document.querySelectorAll("#studentTable tr");

// Function to calculate grade
function calculateGrade(average) {

    if (average >= 70) {
        return "A";
    } else if (average >= 60) {
        return "B";
    } else if (average >= 50) {
        return "C";
    } else if (average >= 45) {
        return "D";
    } else if (average >= 40) {
        return "E";
    } else {
        return "F";
    }

}

// Function to calculate student scores
function calculateScores() {

    let totalClassScore = 0;
    let completedStudents = 0;
    let passed = 0;
    let failed = 0;

    studentRows.forEach(function(row) {

        const inputs = row.querySelectorAll(".score");

        let total = 0;
        let valid = true;

        inputs.forEach(function(input) {

            const value = input.value;

            if (value === "") {
                valid = false;
                return;
            }

            const score = Number(value);

            if (!Number.isFinite(score) || score < 0 || score > 100) {
                valid = false;
                return;
            }

            total += score;

        });

        const totalCell = row.querySelector(".total");
        const gradeCell = row.querySelector(".grade");

        if (valid) {

            const average = total / 4;

            totalCell.textContent = total;
            gradeCell.textContent = calculateGrade(average);

            totalClassScore += total;
            completedStudents++;

            if (average >= 40) {
                passed++;
            } else {
                failed++;
            }

        } else {

            totalCell.textContent = "-";
            gradeCell.textContent = "-";

        }

    });

    // Calculate class summary
    const average = completedStudents > 0
        ? totalClassScore / (completedStudents * 4)
        : 0;

    document.querySelector("#classAverage").textContent =
        "Class Average: " + average.toFixed(2);

    document.querySelector("#passCount").textContent =
        "Students Passed: " + passed;

    document.querySelector("#failCount").textContent =
        "Students Failed: " + failed;

}

// Add input event listener to every score field
const allInputs = document.querySelectorAll(".score");

allInputs.forEach(function(input) {

    input.addEventListener("input", function() {

        calculateScores();

    });

});

// Reset button
document.querySelector("#resetButton").addEventListener("click", function() {

    allInputs.forEach(function(input) {
        input.value = "";
    });

    calculateScores();

});

// Prevent invalid scores
allInputs.forEach(function(input) {

    input.addEventListener("input", function() {

        if (this.value !== "" &&
            (Number(this.value) < 0 || Number(this.value) > 100)) {

            this.setCustomValidity("Enter a score between 0 and 100.");

        } else {

            this.setCustomValidity("");

        }

    });

});
