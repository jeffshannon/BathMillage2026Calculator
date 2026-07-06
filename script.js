// Millage rate inputs for multiple municipalities
const municipalities = {
    bath: {
        name: 'Bath Township',
        currentRateInput: 'bathCurrentRate',
        proposedRateInput: 'bathProposedRate',
        currentTaxDisplay: 'bathCurrentTax',
        proposedTaxDisplay: 'bathProposedTax',
        differenceDisplay: 'bathDifference',
        monthlyDisplay: 'bathMonthly'
    },
    dewittTwp: {
        name: 'DeWitt Township',
        currentRateInput: 'dewittTwpCurrentRate',
        proposedRateInput: 'dewittTwpProposedRate',
        currentTaxDisplay: 'dewittTwpCurrentTax',
        proposedTaxDisplay: 'dewittTwpProposedTax',
        differenceDisplay: 'dewittTwpDifference',
        monthlyDisplay: 'dewittTwpMonthly'
    },
    dewittCity: {
        name: 'DeWitt City',
        currentRateInput: 'dewittCityCurrentRate',
        proposedRateInput: 'dewittCityProposedRate',
        currentTaxDisplay: 'dewittCityCurrentTax',
        proposedTaxDisplay: 'dewittCityProposedTax',
        differenceDisplay: 'dewittCityDifference',
        monthlyDisplay: 'dewittCityMonthly'
    },
    meridian: {
        name: 'Meridian Township',
        currentRateInput: 'meridianCurrentRate',
        proposedRateInput: 'meridianProposedRate',
        currentTaxDisplay: 'meridianCurrentTax',
        proposedTaxDisplay: 'meridianProposedTax',
        differenceDisplay: 'meridianDifference',
        monthlyDisplay: 'meridianMonthly'
    }
};

// DOM Elements
const taxableValueInput = document.getElementById('taxableValue');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsSection = document.getElementById('resultsSection');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    taxableValueInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculate();
        }
    });
});

// Calculate taxes for all municipalities
function calculate() {
    const taxableValue = parseFloat(taxableValueInput.value);

    // Validate input
    if (isNaN(taxableValue) || taxableValue < 0) {
        alert('Please enter a valid taxable value');
        return;
    }

    // Check if any rates have been entered
    let anyRateEntered = false;
    for (let key in municipalities) {
        const currentRate = parseFloat(document.getElementById(municipalities[key].currentRateInput).value) || 0;
        const proposedRate = parseFloat(document.getElementById(municipalities[key].proposedRateInput).value) || 0;
        if (currentRate > 0 || proposedRate > 0) {
            anyRateEntered = true;
            break;
        }
    }

    if (!anyRateEntered) {
        alert('Please enter at least one millage rate to calculate');
        return;
    }

    // Calculate for each municipality
    for (let key in municipalities) {
        const muni = municipalities[key];
        const currentRate = parseFloat(document.getElementById(muni.currentRateInput).value) || 0;
        const proposedRate = parseFloat(document.getElementById(muni.proposedRateInput).value) || 0;

        // Calculate annual taxes
        const currentTax = (taxableValue / 1000) * currentRate;
        const proposedTax = (taxableValue / 1000) * proposedRate;
        const annualDifference = proposedTax - currentTax;
        const monthlyDifference = annualDifference / 12;

        // Display results
        document.getElementById(muni.currentTaxDisplay).textContent = formatCurrency(currentTax);
        document.getElementById(muni.proposedTaxDisplay).textContent = formatCurrency(proposedTax);
        document.getElementById(muni.differenceDisplay).textContent = formatCurrency(annualDifference);
        document.getElementById(muni.monthlyDisplay).textContent = formatCurrency(monthlyDifference);

        // Update difference color based on positive/negative
        const differenceCell = document.getElementById(muni.differenceDisplay);
        if (annualDifference > 0) {
            differenceCell.style.color = '#d32f2f'; // Red for increase
        } else if (annualDifference < 0) {
            differenceCell.style.color = '#388e3c'; // Green for decrease
        } else {
            differenceCell.style.color = '#666'; // Gray for no change
        }
    }

    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Reset calculator
function reset() {
    taxableValueInput.value = '';
    resultsSection.style.display = 'none';
    
    // Clear all rate inputs
    for (let key in municipalities) {
        document.getElementById(municipalities[key].currentRateInput).value = '';
        document.getElementById(municipalities[key].proposedRateInput).value = '';
    }
    
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