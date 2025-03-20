async function searchResult() {
    let admissionNo = document.getElementById("admissionNo").value.trim();

    try {
        // Fetch JSON file
        let response = await fetch("https://raw.githubusercontent.com/arshzzmak/Madrasa-Result-/main/results.json");
        if (!response.ok) {
            throw new Error("Failed to load results.");
        }

        let data = await response.json();

        // Debugging: Log fetched data and admission number
        console.log("Fetched Data:", data);
        console.log("Entered Admission No:", admissionNo);

        // Find student data
        let student = data.find(student => student.admission_no.trim() === admissionNo);

        if (student) {
            console.log("Student Found:", student);

            // Update HTML elements
            document.getElementById("studentName").textContent = student.name;
            document.getElementById("admissionNoDisplay").textContent = student.admission_no;
            document.getElementById("studentStd").textContent = student.std || "N/A";
            document.getElementById("lisan").textContent = student.lisan;
            document.getElementById("fiqh").textContent = student.fiqh;
            document.getElementById("aqeeda").textContent = student.aqeeda;
            document.getElementById("akhlaq").textContent = student.akhlaq;
            document.getElementById("quran").textContent = student.quran;
            document.getElementById("total").textContent = student.total_marks;
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

            // Fix: Ensure searchContainer and resultContainer exist before modifying classList
            let searchContainer = document.getElementById("searchContainer");
            let resultContainer = document.getElementById("resultContainer");

            if (searchContainer) {
                searchContainer.classList.add("hidden");
            }
            if (resultContainer) {
                resultContainer.classList.remove("hidden");
            }
        } else {
            alert("No result found! Please check the admission number.");
            console.log("No matching student found.");
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
