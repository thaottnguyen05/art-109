const draggables = document.querySelectorAll('.draggable');
const sentenceDisplay = document.getElementById('sentence');

// Function to position phrases randomly
function positionPhrasesRandomly() {
    draggables.forEach(draggable => {
        // Get random positions within the text container
        const container = document.querySelector('.text-container');
        const containerRect = container.getBoundingClientRect();

        // Calculate random positions
        const randomX = Math.random() * (containerRect.width - draggable.offsetWidth);
        const randomY = Math.random() * (containerRect.height - draggable.offsetHeight);

        // Apply random position
        draggable.style.left = `${randomX}px`;
        draggable.style.top = `${randomY}px`;
    });
}

// Function to update the current sentence
function updateSentenceDisplay() {
    const currentWords = Array.from(draggables).map(d => d.textContent.trim()).join(' ');
    sentenceDisplay.innerText = currentWords || 'Drag the phrases around!';
}

// Make the elements draggable
draggables.forEach(draggable => {
    draggable.addEventListener('mousedown', function (e) {
        e.preventDefault(); // Prevent text selection

        let shiftX = e.clientX - draggable.getBoundingClientRect().left;
        let shiftY = e.clientY - draggable.getBoundingClientRect().top;

        draggable.style.zIndex = 1000;  // Bring the element to the front

        function moveAt(pageX, pageY) {
            // Update position of the dragged element
            draggable.style.left = pageX - shiftX + 'px';
            draggable.style.top = pageY - shiftY + 'px';
        }

        // Move the element with the mouse
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        // Drop the element
        draggable.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            updateSentenceDisplay();
            draggable.onmouseup = null;
        };
    });

    draggable.ondragstart = function () {
        return false; // Prevent default drag behavior
    };
});

// Call the function to position phrases randomly on page load
window.onload = positionPhrasesRandomly;
