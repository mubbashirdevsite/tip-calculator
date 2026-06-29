// ==========================================
// Tip Calculator
// Author: M Mubbashir Idrees
// ==========================================

// =============================
// Select Elements
// =============================
const billInput = document.getElementById("billAmount");
const customTipInput = document.getElementById("customTip");
const peopleInput = document.getElementById("people");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const tipAmount = document.getElementById("tipAmount");
const totalBill = document.getElementById("totalBill");
const perPerson = document.getElementById("perPerson");

const error = document.getElementById("error");

const tipButtons = document.querySelectorAll(".tip-btn");

// Default Tip Percentage
let selectedTip = 15;

// =============================
// Tip Button Selection
// =============================
tipButtons.forEach(button => {

    button.addEventListener("click", () => {

        tipButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedTip = Number(button.dataset.tip);

        customTipInput.value = "";

        calculateTip();
    });

});

// =============================
// Custom Tip Percentage
// =============================
customTipInput.addEventListener("input", () => {

    if (customTipInput.value !== "") {

        selectedTip = Number(customTipInput.value);

        tipButtons.forEach(btn => btn.classList.remove("active"));
    }

    calculateTip();
});

// =============================
// Live Calculation
// =============================
billInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);

// =============================
// Calculate Button
// =============================
calculateBtn.addEventListener("click", calculateTip);

// =============================
// Main Function
// =============================
function calculateTip() {

    error.textContent = "";

    const bill = parseFloat(billInput.value);
    let people = parseInt(peopleInput.value);

    // Validation
    if (isNaN(bill) || bill <= 0) {

        showError("Please enter a valid bill amount.");

        resetResults();

        return;
    }

    if (isNaN(people) || people < 1) {

        showError("Number of people must be at least 1.");

        resetResults();

        return;
    }

    if (selectedTip < 0) {

        showError("Tip percentage cannot be negative.");

        resetResults();

        return;
    }

    // Calculations
    const tip = bill * (selectedTip / 100);

    const total = bill + tip;

    const eachPerson = total / people;

    // Display Results
    tipAmount.textContent = formatCurrency(tip);

    totalBill.textContent = formatCurrency(total);

    perPerson.textContent = formatCurrency(eachPerson);

}

// =============================
// Currency Formatter
// =============================
function formatCurrency(value) {

    return "$" + value.toFixed(2);

}

// =============================
// Error Message
// =============================
function showError(message) {

    error.textContent = message;

}

// =============================
// Reset Result Values
// =============================
function resetResults() {

    tipAmount.textContent = "$0.00";

    totalBill.textContent = "$0.00";

    perPerson.textContent = "$0.00";

}

// =============================
// Reset Button
// =============================
resetBtn.addEventListener("click", () => {

    billInput.value = "";

    customTipInput.value = "";

    peopleInput.value = 1;

    selectedTip = 15;

    error.textContent = "";

    tipButtons.forEach(btn => btn.classList.remove("active"));

    document
        .querySelector('[data-tip="15"]')
        .classList.add("active");

    resetResults();

});