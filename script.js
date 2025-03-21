async function searchResult() {
    let admissionNo = document.getElementById("admissionNo").value.trim();

    try {
        let response = await fetch("https://raw.githubusercontent.com/arshzzmak/Madrasa-Result/main/results.json");
        if (!response.ok) {
            throw new Error("Failed to load results.");
        }

        let data = await response.json();
        let student = data.find(student => student.admissionNo.trim() === admissionNo);

        if (student) {
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

            let isPassed = student.fiqh >= 40 && student.aqeeda >= 40 && student.lisan >= 40 &&
                           student.akhlaq >= 40 && student.quran >= 40;
            let statusText = isPassed ? "✅ Pass" : "❌ Fail";
            let statusColor = isPassed ? "green" : "red";

            let statusElement = document.getElementById("status");
            statusElement.textContent = statusText;
            statusElement.style.color = statusColor;

            document.getElementById("searchContainer").style.display = "none";
            document.getElementById("resultContainer").style.display = "block";
        } else {
            alert("No result found! Please check the admission number.");
        }
    } catch (error) {
        alert("Error loading results. Please try again.");
        console.error("Fetch error:", error);
    }
}

function resetSearch() {
    document.getElementById("searchContainer").style.display = "block";
    document.getElementById("resultContainer").style.display = "none";
    document.getElementById("admissionNo").value = "";
                }
