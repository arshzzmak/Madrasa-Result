async function searchResult() {
    let admissionNo = document.getElementById("admissionNo").value.trim();

    try {
        // Fetch the results.json file from GitHub
        let response = await fetch("https://raw.githubusercontent.com/arshzzmak/Madrasa-Result-/main/results.json");
        if (!response.ok) {
            throw new Error("Failed to load results.");
        }

        let data = await response.json();

        // Find student data (ensure correct key names in JSON)
        let student = data.find(student => student.admission_no === admissionNo);

        if (student) {
            // Display student details
            document.getElementById("studentName").textContent = student.name;
            document.getElementById("admissionNoDisplay").textContent = student.admission_no;
            document.getElementById("studentStd").textContent = student.std;
            document.getElementById("lisan").textContent = student.lisan;
            document.getElementById("fiqh").textContent = student.fiqh;
            document.getElementById("aqeeda").textContent = student.aqeeda;
            document.getElementById("akhlaq").textContent = student.akhlaq;
            document.getElementById("quran").textContent = student.quran;
            document.getElementById("total").textContent = student.total_marks;
            document.getElementById("percentage").textContent = student.percentage;

            // Check pass/fail condition
            let isPassed = student.fiqh >= 40 && student.aqeeda >= 40 && student.lisan >= 40 &&
                           student.akhlaq >= 40 && student.quran >= 40;
            let statusText = isPassed ? "✅ Pass" : "❌ Fail";
            let statusColor = isPassed ? "green" : "red";

            // Update status
            let statusElement = document.getElementById("status");
            statusElement.textContent = statusText;
            statusElement.style.color = statusColor;

            // Show result section and hide the input form
            document.getElementById("searchContainer").classList.add("hidden");
            document.getElementById("resultContainer").classList.remove("hidden");
        } else {
            alert("No result found! Please check the admission number.");
        }
    } catch (error) {
        alert("Error loading results. Please try again.");
    }
}

// Function to reset and go back to the search form
function goBack() {
    document.getElementById("searchContainer").classList.remove("hidden");
    document.getElementById("resultContainer").classList.add("hidden");
    document.getElementById("admissionNo").value = "";
}
