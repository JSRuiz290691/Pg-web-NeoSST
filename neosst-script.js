// Tab Switching Logic
function openTab(evt, tabName) {
    // Hide all tab content by removing active class
    var i, tabContent, tabBtns;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove("active");
        // We handle display via CSS class strictly now
    }

    // Remove active class from all buttons
    tabBtns = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabBtns.length; i++) {
        tabBtns[i].className = tabBtns[i].className.replace(" active", "");
    }

    // Show the current tab
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.className += " active";
}

// Ensure first tab is open by default
document.addEventListener("DOMContentLoaded", function () {
    // Manually trigger the first tab active state if not already set
    var firstTab = document.getElementById("sg-sst");
    if (firstTab && !firstTab.classList.contains("active")) {
        firstTab.classList.add("active");
    }
    reveal(); // Trigger reveal on load
});

// Scroll Reveal Animation
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}
