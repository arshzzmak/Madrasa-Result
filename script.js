async function searchResult() {
    const admissionNumber = document.getElementById('admissionNumber').value.trim().toUpperCase();
    const resultDiv = document.getElementById('result');
    
    if (!admissionNumber) {
        alert("Please enter an admission number");
        return;
    }

    try {
        const response = await fetch('results.json');
        const data = await response.json();
        
        // Debugging: Log the received data
        console.log('Loaded data:', data);
        
        const student = data.students.find(s => s.admission_number === admissionNumber);

        // Debugging: Log the search result
        console.log('Found student:', student);

        if (student) {
            let totalMarks = 0;
            const subjectRows = student.subjects.map(subject => {
                const mcq = subject.Mcq || '-';
                const written = subject.Written || '-';
                const subTotal = (parseInt(mcq) || 0) + (parseInt(written) || 0);
                totalMarks += subTotal;
                
                return `
                    <tr>
                        <td>${subject.subject}</td>
                        <td>${mcq}</td>
                        <td>${written}</td>
                        <td>${subTotal}</td>
                    </tr>
                `;
            }).join('');

            const attendancePercentage = ((student.attendance / student.total_working_days) * 100).toFixed(1);

            resultDiv.innerHTML = `
                <div class="student-info">
                    <h3>Student Details</h3>
                    <p>Name: ${student.name}</p>
                    <p>Admission Number: ${student.admission_number}</p>
                    <p>Date of Birth: ${student.date_of_birth}</p>
                    <p>Class: ${student.class} - Division ${student.division}</p>
                </div>

                <div class="grade-summary">
                    <h3>Academic Performance</h3>
                    <table class="marks-table">
                        <tr>
                            <th>Subject</th>
                            <th>MCQ</th>
                            <th>Written</th>
                            <th>Total</th>
                        </tr>
                        ${subjectRows}
                        <tr class="total-row">
                            <td colspan="3">Grand Total</td>
                            <td>${totalMarks}</td>
                        </tr>
                    </table>
                </div>

                <div class="attendance-info">
                    <h3>Attendance Details</h3>
                    <p>Days Present: ${student.attendance}</p>
                    <p>Total Working Days: ${student.total_working_days}</p>
                    <p>Attendance Percentage: ${attendancePercentage}%</p>
                </div>
            `;
            resultDiv.style.display = 'block';
        } else {
            resultDiv.innerHTML = "No results found for this admission number";
            resultDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.innerHTML = "Error loading results. Check console for details.";
        resultDiv.style.display = 'block';
    }
}
