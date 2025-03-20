async function fetchResults() {
    const response = await fetch('results.json');
    const results = await response.json();

    const searchInput = document.getElementById('searchInput');
    const resultContainer = document.getElementById('resultContainer');

    document.getElementById('searchButton').addEventListener('click', () => {
        const admissionNo = searchInput.value.trim();
        const student = results.find(student => student.admission_no === admissionNo);

        if (student) {
            resultContainer.innerHTML = `
                <h2>Result for ${student.name}</h2>
                <p><strong>Fiqh:</strong> ${student.fiqh}</p>
                <p><strong>Aqeeda:</strong> ${student.aqeeda}</p>
                <p><strong>Lisan:</strong> ${student.lisan}</p>
                <p><strong>Akhlaq:</strong> ${student.akhlaq}</p>
                <p><strong>Quran:</strong> ${student.quran}</p>
                <p><strong>Total Marks:</strong> ${student.total_marks}</p>
                <p><strong>Percentage:</strong> ${student.percentage}%</p>
                <p><strong>Result:</strong> ${student.result}</p>
            `;
        } else {
            resultContainer.innerHTML = "<p>No result found</p>";
        }
    });
}

fetchResults();
