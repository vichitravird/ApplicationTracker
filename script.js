function appTracker() {
    window.open('https://forms.gle/ttuHEVi725RMhQf17', '_blank'); // Opens the link in a new tab
}

function intTracker() {
    window.open('https://forms.gle/AhMQkJ1uVHbgBNVn8', '_blank'); // Opens the link in a new tab
}

function analysisTracker() {
    window.open('https://docs.google.com/spreadsheets/d/1TY0G_WjYtZ6YSbRNkN-LVqnd8U-HffYGzCgH54CZCAo/edit?usp=sharing', '_blank'); // Opens the link in a new tab
}

function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString();
    document.getElementById('datetime').textContent = formattedDateTime;
}

setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call to display the time immediately
