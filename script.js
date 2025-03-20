async function searchResult() {
    let admissionNo = document.getElementById("admissionNo").value.trim();

    try {
        // Fetch JSON file
        let response = await fetch("https://raw.githubusercontent.com/arshzzmak/Madrasa-Result-/main/results.json");
        if (!response.ok) {
            throw new Error("Failed to load results.");
        }

        let data = await response.json();

        // Find student data
        let student = data.find(student => student.admissionNo.trim() === admissionNo);

        if (student) {
            // Update HTML elements
            document.getElementById("studentName").textContent = student.name;
            document.getElementById("admissionNoDisplay").textContent = student.admissionNo;
            document.getElementById("studentStd").textContent = student.std || "N/A";
            document.getElementById("lisan").textContent = student.lisan;
            document.getElementById("fiqh").textContent = student.fiqh;
            document.getElementById("aqeeda").textContent = student.aqeeda;
            document.getElementById("akhlaq").textContent = student.akhlaq;
            document.getElementById("quran").textContent = student.quran;
            document.getElementById("total").textContent = student.total;
            document.getElementById("percentage").textContent = student.percentage;

            // Pass/Fail logic
            let isPassed = student.fiqh >= 40 && student.aqeeda >= 40 && student.lisan >= 40 &&
                           student.akhlaq >= 40 && student.quran >= 40;
            let statusText = isPassed ? "✅ Pass" : "❌ Fail";
            let statusColor = isPassed ? "green" : "red";

            // Update status
            let statusElement = document.getElementById("status");
            statusElement.textContent = statusText;
            statusElement.style.color = statusColor;

            // Hide search input, show result
            document.getElementById("searchContainer").classList.add("hidden");
            document.getElementById("resultContainer").classList.remove("hidden");
        } else {
            alert("No result found! Please check the admission number.");
        }
    } catch (error) {
        alert("Error loading results. Please try again.");
        console.error("Fetch error:", error);
    }
}

// Reset function to go back to search input
function resetSearch() {
    document.getElementById("searchContainer").classList.remove("hidden");
    document.getElementById("resultContainer").classList.add("hidden");
    document.getElementById("admissionNo").value = ""; // Clear input field
}
