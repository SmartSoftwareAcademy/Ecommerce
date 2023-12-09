let inactivityTimeout;


function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);

    inactivityTimeout = setTimeout(logoutUser, 300000); // 5 minutes
}

function logoutUser() {
    // Perform logout logic here (e.g., clear user data)
    sessionStorage.removeItem("user"); // Clear user data
    const currentRoute = window.location.href;
    // Check if the user is already on the login page
    if (currentRoute !== window.location.origin + "/login") {
        // Redirect the user to the login page
        window.location.href = window.location.origin + "/login"; // Redirect to the login page
    }
}

// Add an event listener to reset the timer on user activity
window.addEventListener("mousemove", resetInactivityTimer);
window.addEventListener("keydown", resetInactivityTimer);

// Initialize the timer when the app loads or when the user logs in
resetInactivityTimer();
export default {
    resetInactivityTimer,
    logoutUser,
};