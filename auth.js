function registerUser(username, password, redirectUrl) {
  if (localStorage.getItem(username)) {
    document.getElementById('register-message').textContent = "Username already exists.";
  } else {
    localStorage.setItem(username, password); 
    localStorage.setItem('loggedInUser', username); 
    document.getElementById('register-message').textContent = "Registration successful! Redirecting...";
    setTimeout(function() {
      window.location.href = redirectUrl;
    }, 2000);  
  }
}

document.getElementById('register-button').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (username && password) {
    registerUser(username, password, "submit.html"); 
  } else {
    document.getElementById('register-message').textContent = "Please enter a username and password.";
  }
});
