async function searchResult() {
    const admissionNumber = document.getElementById('admissionNumber').value;
    const resultDiv = document.getElementById('result');
    
    if (!admissionNumber) {
        alert("Please enter an admission number");
        return;
    }

    try {
        const response = await fetch('results.json');
        const data = await response.json();
        const student = data.students.find(s => s.admissionNumber === admissionNumber);

        if (student) {
            resultDiv.innerHTML = `
                <div class="student-info">
                    <h3>Student Details</h3>
                    <p>Name: ${student.name}</p>
                    <p>Admission Number: ${student.admissionNumber}</p>
                    <p>Class: ${student.class}</p>
                </div>

                <h3>Marklist</h3>
                <table class="subject-table">
                    <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                        <th>Grade</th>
                    </tr>
                    ${student.subjects.map(subject => `
                        <tr>
                            <td>${subject.name}</td>
                            <td>${subject.marks}</td>
                            <td>${subject.grade}</td>
                        </tr>
                    `).join('')}
                </table>
            `;
            resultDiv.style.display = 'block';
        } else {
            resultDiv.innerHTML = "No results found for this admission number";
            resultDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = "Error loading results";
        resultDiv.style.display = 'block';
    }
}
