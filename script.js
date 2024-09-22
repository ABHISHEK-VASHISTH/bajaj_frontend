document.getElementById('submitBtn').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorMessage = document.getElementById('errorMessage');
    let jsonData;
  
    // Validate JSON
    try {
      jsonData = JSON.parse(jsonInput);
      errorMessage.textContent = ''; // Clear error message
    } catch (e) {
      errorMessage.textContent = 'Invalid JSON format. Please correct it.';
      return;
    }
  
    // Call the backend API (replace with actual API endpoint)
    fetch('https://example.com/api/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
      // Show dropdown after successful API call
      document.getElementById('dropdown-section').classList.remove('hidden');
      // Store the API response for filtering
      window.apiResponse = data;
    })
    .catch(err => {
      errorMessage.textContent = 'Error calling the API. Please try again.';
    });
  });
  
  document.getElementById('filterBtn').addEventListener('click', function() {
    const selectedOptions = Array.from(document.getElementById('filterOptions').selectedOptions)
                                 .map(option => option.value);
    const responseData = window.apiResponse.data; // Assuming the API returns data in this format
    let filteredData = [];
  
    // Apply filters based on dropdown selection
    if (selectedOptions.includes('alphabets')) {
      filteredData = filteredData.concat(responseData.filter(item => /^[A-Za-z]+$/.test(item)));
    }
    if (selectedOptions.includes('numbers')) {
      filteredData = filteredData.concat(responseData.filter(item => /^[0-9]+$/.test(item)));
    }
    if (selectedOptions.includes('lowercase')) {
      const lowercaseAlphabets = responseData.filter(item => /^[a-z]+$/.test(item));
      if (lowercaseAlphabets.length > 0) {
        filteredData.push(Math.max(...lowercaseAlphabets));
      }
    }
  
    // Display the filtered result
    document.getElementById('result').textContent = filteredData.join(', ');
    document.getElementById('resultSection').style.display = 'block';
  });
  