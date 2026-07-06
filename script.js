// Millage rates - Update these with the actual values from bathmillage2026.com
// These are placeholder values - replace with actual rates
const RATES = {
    current: 3.5348, // Current millage rate (mills per $1,000)
    proposed: 5 // Proposed millage rate (mills per $1,000)
};

// DOM Elements
const taxableValueInput = document.getElementById('taxableValue');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsSection = document.getElementById('resultsSection');
const currentRateDisplay = document.getElementById('currentRate');
const proposedRateDisplay = document.getElementById('proposedRate');
const currentTaxDisplay = document.getElementById('currentTax');
const proposedTaxDisplay = document.getElementById('proposedTax');
const taxDifferenceDisplay = document.getElementById('taxDifference');
const monthlyDifferenceDisplay = document.getElementById('monthlyDifference');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayRates();
    taxableValueInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculate();
        }
    });
});

// Display current rates
function displayRates() {
    if (RATES.current === 0 || RATES.proposed === 0) {
        currentRateDisplay.textContent = 'N/A';
        proposedRateDisplay.textContent = 'N/A';
        currentRateDisplay.parentElement.style.opacity = '0.5';
        proposedRateDisplay.parentElement.style.opacity = '0.5';
    } else {
        currentRateDisplay.textContent = RATES.current.toFixed(3);
        proposedRateDisplay.textContent = RATES.proposed.toFixed(3);
        currentRateDisplay.parentElement.style.opacity = '1';
        proposedRateDisplay.parentElement.style.opacity = '1';
    }
}

// Calculate taxes
function calculate() {
    const taxableValue = parseFloat(taxableValueInput.value);

    // Validate input
    if (isNaN(taxableValue) || taxableValue < 0) {
        alert('Please enter a valid taxable value');
        return;
    }

    if (RATES.current === 0 || RATES.proposed === 0) {
        alert('Millage rates are not yet configured. Please check back soon.');
        return;
    }

    // Calculate annual taxes
    const currentTax = (taxableValue / 1000) * RATES.current;
    const proposedTax = (taxableValue / 1000) * RATES.proposed;
    const annualDifference = proposedTax - currentTax;
    const monthlyDifference = annualDifference / 12;

    // Display results
    currentTaxDisplay.textContent = formatCurrency(currentTax);
    proposedTaxDisplay.textContent = formatCurrency(proposedTax);
    taxDifferenceDisplay.textContent = formatCurrency(annualDifference);
    monthlyDifferenceDisplay.textContent = formatCurrency(monthlyDifference);

    // Update difference display color based on positive/negative
    if (annualDifference > 0) {
        taxDifferenceDisplay.style.color = '#d32f2f'; // Red for increase
    } else if (annualDifference < 0) {
        taxDifferenceDisplay.style.color = '#388e3c'; // Green for decrease
    } else {
        taxDifferenceDisplay.style.color = '#666'; // Gray for no change
    }

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Reset calculator
function reset() {
    taxableValueInput.value = '';
    resultsSection.style.display = 'none';
    taxableValueInput.focus();
}

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// Event listeners
calculateBtn.addEventListener('click', calculate);
resetBtn.addEventListener('click', reset);