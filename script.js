// Millage rates for Bath and East Lansing
// Update these with the actual values from the official sources
const RATES = {
    bath: {
        current: 0, // Current Bath millage rate (mills per $1,000)
        proposed: 0 // Proposed Bath millage rate (mills per $1,000)
    },
    eastLansing: {
        current: 0, // Current East Lansing millage rate (mills per $1,000)
        proposed: 0 // Proposed East Lansing millage rate (mills per $1,000)
    }
};

// DOM Elements
const taxableValueInput = document.getElementById('taxableValue');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const cityBtns = document.querySelectorAll('.city-btn');
const bathCalculator = document.getElementById('bathCalculator');
const eastlansingCalculator = document.getElementById('eastlansingCalculator');

// City selector
let currentCity = 'bath';

cityBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        currentCity = this.dataset.city;
        cityBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        if (currentCity === 'bath') {
            bathCalculator.style.display = 'block';
            eastlansingCalculator.style.display = 'none';
        } else {
            bathCalculator.style.display = 'none';
            eastlansingCalculator.style.display = 'block';
        }
        
        resetCalculator();
    });
});

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
    // Bath rates
    if (RATES.bath.current === 0 || RATES.bath.proposed === 0) {
        document.getElementById('bathCurrentRate').textContent = 'N/A';
        document.getElementById('bathProposedRate').textContent = 'N/A';
    } else {
        document.getElementById('bathCurrentRate').textContent = RATES.bath.current.toFixed(3);
        document.getElementById('bathProposedRate').textContent = RATES.bath.proposed.toFixed(3);
    }

    // East Lansing rates
    if (RATES.eastLansing.current === 0 || RATES.eastLansing.proposed === 0) {
        document.getElementById('elCurrentRate').textContent = 'N/A';
        document.getElementById('elProposedRate').textContent = 'N/A';
    } else {
        document.getElementById('elCurrentRate').textContent = RATES.eastLansing.current.toFixed(3);
        document.getElementById('elProposedRate').textContent = RATES.eastLansing.proposed.toFixed(3);
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

    if (currentCity === 'bath') {
        calculateBath(taxableValue);
    } else {
        calculateEastLansing(taxableValue);
    }
}

// Calculate Bath taxes
function calculateBath(taxableValue) {
    if (RATES.bath.current === 0 || RATES.bath.proposed === 0) {
        alert('Bath millage rates are not yet configured. Please check back soon.');
        return;
    }

    const currentTax = (taxableValue / 1000) * RATES.bath.current;
    const proposedTax = (taxableValue / 1000) * RATES.bath.proposed;
    const annualDifference = proposedTax - currentTax;
    const monthlyDifference = annualDifference / 12;

    // Display results
    document.getElementById('bathCurrentTax').textContent = formatCurrency(currentTax);
    document.getElementById('bathProposedTax').textContent = formatCurrency(proposedTax);
    document.getElementById('bathTaxDifference').textContent = formatCurrency(annualDifference);
    document.getElementById('bathMonthlyDifference').textContent = formatCurrency(monthlyDifference);

    // Update color
    updateDifferenceColor(document.getElementById('bathTaxDifference'), annualDifference);

    document.getElementById('bathResultsSection').style.display = 'block';
    document.getElementById('bathResultsSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Calculate East Lansing taxes
function calculateEastLansing(taxableValue) {
    if (RATES.eastLansing.current === 0 || RATES.eastLansing.proposed === 0) {
        alert('East Lansing millage rates are not yet configured. Please check back soon.');
        return;
    }

    const currentTax = (taxableValue / 1000) * RATES.eastLansing.current;
    const proposedTax = (taxableValue / 1000) * RATES.eastLansing.proposed;
    const annualDifference = proposedTax - currentTax;
    const monthlyDifference = annualDifference / 12;

    // Display results
    document.getElementById('elCurrentTax').textContent = formatCurrency(currentTax);
    document.getElementById('elProposedTax').textContent = formatCurrency(proposedTax);
    document.getElementById('elTaxDifference').textContent = formatCurrency(annualDifference);
    document.getElementById('elMonthlyDifference').textContent = formatCurrency(monthlyDifference);

    // Update color
    updateDifferenceColor(document.getElementById('elTaxDifference'), annualDifference);

    document.getElementById('elResultsSection').style.display = 'block';
    document.getElementById('elResultsSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Update difference color
function updateDifferenceColor(element, difference) {
    if (difference > 0) {
        element.style.color = '#d32f2f'; // Red for increase
    } else if (difference < 0) {
        element.style.color = '#388e3c'; // Green for decrease
    } else {
        element.style.color = '#764ba2'; // Purple for no change
    }
}

// Reset calculator
function resetCalculator() {
    taxableValueInput.value = '';
    document.getElementById('bathResultsSection').style.display = 'none';
    document.getElementById('elResultsSection').style.display = 'none';
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
resetBtn.addEventListener('click', resetCalculator);
