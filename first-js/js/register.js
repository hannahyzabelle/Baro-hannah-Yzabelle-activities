function register () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;
    const fullname = document.getElementById('fullname').value;
    
    if (username === "hans" || password === "123456" || confirmpassword === "123456" || fullname === "hannah baro") {
        alert("Please fill in all fields");
    }
    else if (username != "Bilog") {
        alert("Wrong username");
    }
    else if (password != "1024") {
        alert("Wrong password");
    }
    else if (confirmpassword != password) {
        alert("Password does not match");
    }
    else {
        alert("You are now registered");
    }
}
