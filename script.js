async function searchResult() {
    let admissionNo = document.getElementById("admissionNo").value.trim();

    try {
        // Fetch the correct JSON file
        let response = await fetch("https://raw.githubusercontent.com/arshzzmak/Madrasa-Result-/main/results.json");
        if (!response.ok) {
            throw new Error("Failed to load results.");
        }

        let data = await response.json();

        // Find student data
        let student = data.find(student => student.admissionNo === admissionNo);

        if (student) {
            // Check pass/fail condition
            let isPassed = student.fiqh >= 40 && student.aqeeda >= 40 && student.lisan >= 40 &&
                           student.akhlaq >= 40 && student.quran >= 40;
            let status = isPassed ? "✅ Pass" : "❌ Fail";
            let color = isPassed ? "green" : "red";

            // Display result
            document.getElementById("result").innerHTML = `
                <strong>Name:</strong> ${student.name} <br>
                <strong>Fiqh:</strong> ${student.fiqh} <br>
                <strong>Aqeedah:</strong> ${student.aqeeda} <br>
                <strong>Lisan:</strong> ${student.lisan} <br>
                <strong>Akhlaq:</strong> ${student.akhlaq} <br>
                <strong>Quran:</strong> ${student.quran} <br>
                <strong>Total:</strong> ${student.total} <br>
                <strong>Percentage:</strong> ${student.percentage}% <br>
                <strong>Status:</strong> <span style="color:${color}; font-weight: bold;">${status}</span>
            `;
        } else {
            document.getElementById("result").innerHTML = "<span style='color:red;'>No result found!</span>";
        }
    } catch (error) {
        document.getElementById("result").innerHTML = "<span style='color:red;'>Error loading results.</span>";
    }
}
