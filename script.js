// Hard-coded millage rates for all municipalities
const RATES = {
    bath: {
        current: 8.1815,  // Current Bath Township rate (mills per $1,000)
        proposed: 9.6467  // Proposed Bath Township rate (mills per $1,000)
    },
    dewittTwp: {
        current: 7.381   // DeWitt Township current rate (mills per $1,000)
    },
    dewittCity: {
        current: 13.9593  // DeWitt City current rate (mills per $1,000)
    },
    meridian: {
        current: 12.213   // Meridian Township current rate (mills per $1,000)
    }
};

// DOM Elements
const taxableValueInput = document.getElementById('taxableValue');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsSection = document.getElementById('resultsSection');

// Display rates on page load
document.addEventListener('DOMContentLoaded', function() {
    displayRates();
    taxableValueInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculate();
        }
    });
});

// Display the current and proposed rates
function displayRates() {
    document.getElementById('currentBathRate').textContent = RATES.bath.current.toFixed(4) + ' mills';
    document.getElementById('proposedBathRate').textContent = RATES.bath.proposed.toFixed(4) + ' mills';
}

// Calculate tax differences
function calculate() {
    const taxableValue = parseFloat(taxableValueInput.value);

    // Validate input
    if (isNaN(taxableValue) || taxableValue < 0) {
        alert('Please enter a valid taxable value');
        return;
    }

    // Calculate Bath Township taxes
    const currentBathTax = (taxableValue / 1000) * RATES.bath.current;
    const proposedBathTax = (taxableValue / 1000) * RATES.bath.proposed;
    const annualDifference = proposedBathTax - currentBathTax;
    const monthlyDifference = annualDifference / 12;

    // Display Bath Township results
    document.getElementById('currentTax').textContent = formatCurrency(currentBathTax);
    document.getElementById('proposedTax').textContent = formatCurrency(proposedBathTax);
    document.getElementById('annualDifference').textContent = formatCurrency(annualDifference);
    document.getElementById('monthlyDifference').textContent = formatCurrency(monthlyDifference);

    // Update difference color
    const differenceElement = document.getElementById('annualDifference');
    if (annualDifference > 0) {
        differenceElement.style.color = '#d32f2f'; // Red for increase
    } else if (annualDifference < 0) {
        differenceElement.style.color = '#388e3c'; // Green for decrease
    } else {
        differenceElement.style.color = '#666'; // Gray for no change
    }

    // Calculate and display comparison taxes
    const dewittTwpTax = (taxableValue / 1000) * RATES.dewittTwp.current;
    const dewittCityTax = (taxableValue / 1000) * RATES.dewittCity.current;
    const meridianTax = (taxableValue / 1000) * RATES.meridian.current;

    // Update comparison table
    document.getElementById('bathCurrentRate').textContent = RATES.bath.current.toFixed(4);
    document.getElementById('bathCurrentTaxComp').textContent = formatCurrency(currentBathTax);
    document.getElementById('bathProposedRate').textContent = RATES.bath.proposed.toFixed(4);
    document.getElementById('bathProposedTaxComp').textContent = formatCurrency(proposedBathTax);
    document.getElementById('dewittTwpRate').textContent = RATES.dewittTwp.current.toFixed(4);
    document.getElementById('dewittTwpTax').textContent = formatCurrency(dewittTwpTax);
    document.getElementById('dewittCityRate').textContent = RATES.dewittCity.current.toFixed(4);
    document.getElementById('dewittCityTax').textContent = formatCurrency(dewittCityTax);
    document.getElementById('meridianRate').textContent = RATES.meridian.current.toFixed(4);
    document.getElementById('meridianTax').textContent = formatCurrency(meridianTax);

    // Show results
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