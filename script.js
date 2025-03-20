async function searchResult() {
    let admissionNo = document.getElementById("admissionNo").value.trim();

    try {
        // Fetch the results.json file from GitHub
        let response = await fetch("https://raw.githubusercontent.com/arshzzmak/Madrasa-Result-/main/results.json");
        if (!response.ok) {
            throw new Error("Failed to load results.");
        }

        let data = await response.json();

        // Find student data
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

            // Show result section
            document.getElementById("resultContainer").classList.remove("hidden");
        } else {
            document.getElementById("resultContainer").classList.add("hidden");
            alert("No result found!");
        }
    } catch (error) {
        document.getElementById("resultContainer").classList.add("hidden");
        alert("Error loading results.");
    }
}
