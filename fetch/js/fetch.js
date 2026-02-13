// ---------------- GET STUDENTS ----------------
async function fetchStudents() {
    try {
        const response = await fetch('http://localhost/api/student-list.php');
        const data = await response.json();

        if (data.success) {
            renderStudentTable(data.students);
        } else {
            alert("Failed to load student data.");
        }
    } catch (error) {
        console.error("Error fetching students:", error);
    }
}

// ---------------- RENDER TABLE ----------------
function renderStudentTable(students) {
    const tbody = document.getElementById("studentTableBody");
    tbody.innerHTML = "";

    students.forEach(student => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${student.student_id}</td>
            <td>${student.first_name} ${student.last_name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.year_level}</td>
            <td>${student.enrollment_date}</td>
        `;

        tbody.appendChild(tr);
    });

    // Show student section
    document.getElementById("studentSection").style.display = "block";
}

// ---------------- LOGIN FUNCTION ----------------
async function login(username, password) {
    const payload = { username, password };

    const response = await fetch('http://localhost/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Login failed");
    }

    return result;
}

// ---------------- EVENT LISTENERS ----------------
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");
    const logoutBtn = document.getElementById("logoutBtn");

    // LOGIN FORM SUBMIT
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            await login(username, password);
            message.textContent = "Login Successful!";
            message.style.color = "green";

            // Hide login, show students
            document.getElementById("loginSection").style.display = "none";
            fetchStudents();
        } catch (err) {
            message.textContent = err.message;
            message.style.color = "red";
        }
    });

    // LOGOUT BUTTON CLICK
    logoutBtn.addEventListener("click", () => {
        document.getElementById("studentSection").style.display = "none";
        document.getElementById("loginSection").style.display = "block";
        message.textContent = "";
        form.reset();
    });
});