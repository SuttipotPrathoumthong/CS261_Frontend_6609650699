const loginBtn = document.getElementById('login-btn');
const username = document.getElementById('username');
const password = document.getElementById('password');
const role = document.getElementById('role');

function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function validateFields() {
    let isValid = true;

    if (!username.value) {
        document.getElementById('username-error').innerText = 'ต้องกรอก Username';
        isValid = false;
    } else {
        document.getElementById('username-error').innerText = '';
    }

    if (!password.value) {
        document.getElementById('password-error').innerText = 'ต้องกรอก Password';
        isValid = false;
    } else {
        document.getElementById('password-error').innerText = '';
    }

    if (!role.value) {
        document.getElementById('role-error').innerText = 'ต้องกรอกตำแหน่ง';
        isValid = false;
    } else {
        document.getElementById('role-error').innerText = '';
    }

    loginBtn.disabled = !isValid;
}

document.getElementById("login-btn").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const data = {
        "UserName": username,
        "PassWord": password
    };

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU15155cbae9f02b0f01554634b97e2febe213f611858b5cf923a3655ba3c810466fb155600418f472fb7bd423c6c3e1fb'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === true) {
            document.getElementById("displayname_th").textContent = data.displayname_th;
            document.getElementById("result").style.display = "block";
        } else {
            alert("Login failed: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

username.addEventListener('input', validateFields);
password.addEventListener('input', validateFields);
role.addEventListener('change', validateFields);