document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pcos-form");
  const outputBox = document.getElementById("output");

  form.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission

      // Fetch input values
      const username = document.getElementById("name").value.trim();
      const age = parseInt(document.getElementById("age").value.trim());
      const symptoms = document.querySelectorAll('input[name="symptoms"]:checked');

      // Validate inputs
      if (!username) {
          alert("Please enter your name.");
          return;
      }

      if (!age || age <= 0) {
          alert("Please enter a valid age.");
          return;
      }

      if (symptoms.length === 0) {
          alert("Please select at least one symptom.");
          return;
      }

      // Collect checked symptoms
      const checkedSymptoms = Array.from(symptoms).map((checkbox) => checkbox.value);

      // Perform symptom analysis
      let analysis = "";
      if (checkedSymptoms.length > 2) {
          analysis = `Based on your input, you may have some symptoms associated with PCOS/PCOD. 
                      We recommend consulting a healthcare professional for further evaluation and diagnosis.`;
      } else {
          analysis = `Based on your input, the likelihood of PCOS/PCOD may be lower. 
                      However, it's always best to consult a healthcare professional for personalized advice.`;
      }

      // Display the analysis in the output box
      outputBox.innerHTML = `
          <h3>Analysis for ${username}</h3>
          <p>${analysis}</p>
      `;
      outputBox.style.display = "block"; // Ensure the output box is visible
  });
});
