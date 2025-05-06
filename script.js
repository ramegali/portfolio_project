// Function to toggle the navigation menu's visibility
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger-menu');
    nav.classList.toggle('visible');
    hamburger.classList.toggle('active'); // Toggle 'X' icon
}

// Add event listener to the hamburger menu icon
document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);

// Collapse the navbar when a link is clicked
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.querySelector('nav ul');
        const hamburger = document.querySelector('.hamburger-menu');
        nav.classList.remove('visible'); // Collapse the navbar
        hamburger.classList.remove('active'); // Reset hamburger icon
    });
});

// Implement smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Function to filter projects by category
function filterProjects(category) {
    const projects = document.querySelectorAll('#projects ul li');
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'flex'; // Show matching projects
        } else {
            project.style.display = 'none'; // Hide non-matching projects
        }
    });
}

// Add event listeners to filter buttons
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', function () {
        const category = this.dataset.category;
        filterProjects(category);
    });
});

// Function to display a lightbox for project images
function showLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="Project Image">
            <span class="lightbox-close">&times;</span>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Close the lightbox when the close button is clicked
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });

    // Close the lightbox when clicking outside the image
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
}

// Add event listeners to project images
document.querySelectorAll('#projects ul li img').forEach(image => {
    image.addEventListener('click', function () {
        showLightbox(this.src);
    });
});

// Form validation and real-time feedback for the Contact form
const contactForm = document.querySelector('#contact form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show error message
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.color = 'red';
}

// Function to clear error message
function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
}

// Real-time validation for inputs
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() === '') {
            showError(input, `${input.name} is required.`);
        } else if (input === emailInput && !isValidEmail(input.value)) {
            showError(input, 'Please enter a valid email address.');
        } else {
            clearError(input);
        }
    });
});

// Form submission validation
contactForm.addEventListener('submit', (event) => {
    let isValid = true;

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required.');
        isValid = false;
    }

    if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address.');
        isValid = false;
    }

    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required.');
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});