// Customer Registration
document
  .getElementById("registrationForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let email = document.getElementById("email").value.trim();
    let ssnId = document.getElementById("ssnId").value.trim();
    let contact = document.getElementById("contact").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    let customerId = "CUST" + Math.floor(Math.random() * 1000000);

    let customerData = {
      firstName,
      lastName,
      email,
      ssnId,
      contact,
      password,
      customerId,
    };

    localStorage.setItem(customerId, JSON.stringify(customerData));

    // Redirect to success page first
    window.location.href = `success.html?customerId=${customerId}&name=${firstName} ${lastName}`;
  });

// Customer Login
document
  .getElementById("loginForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    let customerId = document.getElementById("customerId").value.trim();
    let password = document.getElementById("password").value;

    let storedData = localStorage.getItem(customerId);

    if (!storedData) {
      alert("Invalid Customer ID!");
      return;
    }

    let customerData = JSON.parse(storedData);

    if (customerData.password !== password) {
      alert("Incorrect Password!");
      return;
    }

    // Create a custom green acknowledgment popup
    let messageBox = document.createElement("div");
    messageBox.innerHTML = `
        <div class="popup">
            <p>✅ <strong style="color: green;">Customer login successful!</strong></p>
            <button onclick="closePopup()">OK</button>
        </div>
    `;
    document.body.appendChild(messageBox);

    // Delay redirect to home page
    window.closePopup = function () {
      document.body.removeChild(messageBox);
      window.location.href = "home.html"; // Redirect to Home Page
    };
  });
/////
// Fetch Account Details from Local Storage
function fetchAccountDetails() {
    let customerId = document.getElementById("customerId").value.trim();
    if (!customerId) {
        alert("Please enter Customer ID to fetch details.");
        return;
    }

    let storedData = localStorage.getItem(customerId);
    if (!storedData) {
        alert("No account found for this Customer ID.");
        return;
    }

    let customerData = JSON.parse(storedData);
    
    // Populate input fields
    document.getElementById("ssnId").value = customerData.ssnId || "";
    document.getElementById("name").value = customerData.name || "";
    document.getElementById("accountNumber").value = customerData.accountNumber || "";
    document.getElementById("ifscCode").value = customerData.ifscCode || "";
    document.getElementById("accountBalance").value = customerData.accountBalance || "";
    document.getElementById("aadhaar").value = customerData.aadhaar || "";
    document.getElementById("pan").value = customerData.pan || "";
    document.getElementById("dob").value = customerData.dob || "";
    document.getElementById("gender").value = customerData.gender || "";
    document.getElementById("maritalStatus").value = customerData.maritalStatus || "";
    document.getElementById("email").value = customerData.email || "";
    document.getElementById("contact").value = customerData.contact || "";
}

// Handle Account Update
document.getElementById("editAccountForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let customerId = document.getElementById("customerId").value.trim();
    if (!customerId) {
        alert("Customer ID is required.");
        return;
    }

    let updatedData = {
        ssnId: document.getElementById("ssnId").value,
        name: document.getElementById("name").value,
        accountNumber: document.getElementById("accountNumber").value,
        ifscCode: document.getElementById("ifscCode").value,
        accountBalance: document.getElementById("accountBalance").value,
        aadhaar: document.getElementById("aadhaar").value,
        pan: document.getElementById("pan").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        maritalStatus: document.getElementById("maritalStatus").value,
        email: document.getElementById("email").value,
        contact: document.getElementById("contact").value
    };

    localStorage.setItem(customerId, JSON.stringify(updatedData));

    showSuccessPopup("Customer Update Successful!");
});

// Success Popup
function showSuccessPopup(message) {
    let popup = document.createElement("div");
    popup.innerHTML = `
        <div class="popup">
            <p>✅ <strong style="color: green;">${message}</strong></p>
            <button onclick="closePopup()">OK</button>
        </div>
    `;
    document.body.appendChild(popup);
}

function closePopup() {
    document.querySelector(".popup").remove();
}
////////
// Fetch Current Balance
function fetchBalance() {
    let customerId = document.getElementById("customerId").value.trim();
    if (!customerId) {
        alert("Please enter Customer ID to check balance.");
        return;
    }

    let storedData = localStorage.getItem(customerId);
    if (!storedData) {
        alert("No account found for this Customer ID.");
        return;
    }

    let customerData = JSON.parse(storedData);
    document.getElementById("currentBalance").textContent = `Current Balance: ₹${customerData.accountBalance}`;
}

// Handle Withdrawal Process
document.getElementById("withdrawForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let customerId = document.getElementById("customerId").value.trim();
    let withdrawAmount = parseFloat(document.getElementById("withdrawAmount").value);

    if (!customerId || isNaN(withdrawAmount)) {
        alert("Please enter valid details.");
        return;
    }

    let storedData = localStorage.getItem(customerId);
    if (!storedData) {
        alert("No account found for this Customer ID.");
        return;
    }

    let customerData = JSON.parse(storedData);
    let currentBalance = parseFloat(customerData.accountBalance);

    // Validation
    if (withdrawAmount < 1000) {
        alert("Minimum withdrawal amount is ₹1,000.");
        return;
    }

    if (currentBalance - withdrawAmount < 500) {
        alert("Minimum balance should be ₹500.");
        return;
    }

    // Update balance
    customerData.accountBalance = currentBalance - withdrawAmount;
    localStorage.setItem(customerId, JSON.stringify(customerData));

    // Update UI & Show Success Popup
    document.getElementById("currentBalance").textContent = `Current Balance: ₹${customerData.accountBalance}`;
    showSuccessPopup("Withdrawal Successful!");
});

// Success Popup
function showSuccessPopup(message) {
    let popup = document.createElement("div");
    popup.innerHTML = `
        <div class="popup">
            <p>✅ <strong style="color: green;">${message}</strong></p>
            <button onclick="closePopup()">OK</button>
        </div>
    `;
    document.body.appendChild(popup);
}

function closePopup() {
    document.querySelector(".popup").remove();
}
// Fetch Current Balance
function fetchBalance() {
    let customerId = document.getElementById("customerId").value.trim();
    if (!customerId) {
        alert("Please enter Customer ID to check balance.");
        return;
    }

    let storedData = localStorage.getItem(customerId);
    if (!storedData) {
        alert("No account found for this Customer ID.");
        return;
    }

    let customerData = JSON.parse(storedData);
    document.getElementById("currentBalance").textContent = `Current Balance: ₹${customerData.accountBalance}`;
}

// Handle Deposit Process
document.getElementById("depositForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let customerId = document.getElementById("customerId").value.trim();
    let depositAmount = parseFloat(document.getElementById("depositAmount").value);

    if (!customerId || isNaN(depositAmount) || depositAmount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }

    let storedData = localStorage.getItem(customerId);
    if (!storedData) {
        alert("No account found for this Customer ID.");
        return;
    }

    let customerData = JSON.parse(storedData);
    customerData.accountBalance += depositAmount;
    localStorage.setItem(customerId, JSON.stringify(customerData));

    // Update UI & Show Success Popup
    document.getElementById("currentBalance").textContent = `Current Balance: ₹${customerData.accountBalance}`;
    showSuccessPopup("Deposit Successful!");
});

// Success Popup
function showSuccessPopup(message) {
    let popup = document.createElement("div");
    popup.innerHTML = `
        <div class="popup">
            <p>✅ <strong style="color: green;">${message}</strong></p>
            <button onclick="closePopup()">OK</button>
        </div>
    `;
    document.body.appendChild(popup);
}

function closePopup() {
    document.querySelector(".popup").remove();
}

