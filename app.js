// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // Hide results
  document.getElementById('results').style.display = 'none';

  //Show loader
  document.getElementById('loading').style.display = 'block';

  let timeout = 2000;

  setTimeout(calculateResults, 1500);

  e.preventDefault();
});

// calculate results

function calculateResults() {
  // UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2) + ' $';
    totalPayment.value = (monthly * calculatedPayments).toFixed(2) + ' $';
    totalInterest.value =
      (monthly * calculatedPayments - principal).toFixed(2) + ' $';

    // show results
    document.getElementById('results').style.display = 'block';

    // hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}
// function error
function showError(error) {
  // hide loader after checking for error
  document.getElementById('loading').style.display = 'none';

  // create div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class - bootstrap classes naming
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div

  errorDiv.appendChild(document.createTextNode(error));

  // Insert error abouve heading
  card.insertBefore(errorDiv, heading); // 1- what are u inserting 2-before what element are u inserting

  // Clear  error with timeout after 3 secs
  // setTimeout(clearError, 2000);

  // arrow funkcija za clear error bolja varijanta?
  let timeout = 2000;

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, timeout);
}

// clearError

// function clearError() {
//   document.querySelector(".alert").remove();
// }
