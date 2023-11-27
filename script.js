function showPartDetails(partName, details, event) {
    var partDetails = document.getElementById('partDetails');

    // Get mouse coordinates
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    // Set position of part details container
    partDetails.style.left = mouseX + 5 + 'px'; // Add 10 pixels for some offset
    partDetails.style.top = mouseY + 5 + 'px'; // Add 10 pixels for some offset

    // Display part details
    partDetails.innerHTML = '<strong>Part: ' + partName + '</strong>';
    
    // Add details list
    if (details && details.length > 0) {
        partDetails.innerHTML += '<ul>';
        details.forEach(function(detail) {
            partDetails.innerHTML += '<li>' + detail + '</li>';
        });
        partDetails.innerHTML += '</ul>';
    }

    partDetails.style.display = 'block';
}

function hidePartDetails() {
    var partDetails = document.getElementById('partDetails');
    partDetails.style.display = 'none';
}
