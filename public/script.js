document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
  
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
  
        // Toggle the icon between ☰ and ✖
        if (navLinks.classList.contains("active")) {
            hamburger.textContent = "✖"; // Close icon
        } else {
            hamburger.textContent = "☰"; // Hamburger icon
        }
    });
  });

function searchCar() {
    let query = document.getElementById("search").value.toLowerCase();
    let cars = document.querySelectorAll(".car-card");
    cars.forEach(car => {
        let name = car.querySelector("h3").textContent.toLowerCase();
        if (name.includes(query)) {
            car.style.display = "block";
        } else {
            car.style.display = "none";
        }
    });
    document.getElementById("cars").scrollIntoView({ behavior: "smooth" });
}

// Add event listener for Enter key press on the search input
document.getElementById("search").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission (if inside a form)
        searchCar();
    }
});

function scrollToServices() {
    document.getElementById("services").scrollIntoView({ behavior: "smooth" });
}

// Simulated Car Data (In a real project, this would come from a database)
const cars = {
    "toyota-corolla": {
        name: "Toyota Corolla",
        price: "$50 per day",
        description: "A comfortable and fuel-efficient sedan.",
        images: ["corolla-front.jpg", "corolla-back.jpg", "corolla-side.jpg", "corolla-interior.jpg"]
    },
    "nissan-xtrail": {
        name: "Nissan X-Trail",
        price: "$70 per day",
        description: "A spacious SUV perfect for long trips.",
        images: ["xtrail-front.jpg", "xtrail-back.jpg", "xtrail-side.jpg", "xtrail-interior.jpg"]
    }
};

// Function to Load Car Details
function loadCarDetails() {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get("car");

    if (carId && cars[carId]) {
        document.getElementById("car-title").textContent = cars[carId].name;
        document.getElementById("car-price").textContent = cars[carId].price;
        document.getElementById("car-description").textContent = cars[carId].description;

        // Load Images
        document.getElementById("car-img-1").src = "images/" + cars[carId].images[0];
        document.getElementById("car-img-2").src = "images/" + cars[carId].images[1];
        document.getElementById("car-img-3").src = "images/" + cars[carId].images[2];
        document.getElementById("car-img-4").src = "images/" + cars[carId].images[3];
    }
}


//Changes to integrate the frontend and backend:
const API_URL = 'http://localhost:3000/api';

// Authentication functions
async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      return true;
    }
    throw new Error(data.message);
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
}

// Cars functions
async function loadCars() {
  try {
    const response = await fetch(`${API_URL}/cars`);
    const cars = await response.json();
    
    const carList = document.querySelector('.car-list');
    if (!carList) return;

    carList.innerHTML = cars.map(car => `
      <div class="car-card">
        <img src="${car.image_url || './assets/vehicle-images/default-car.jpg'}" alt="${car.name}">
        <h3>${car.name}</h3>
        <p>KES ${car.price_per_day}/day</p>
        <a href="car-details.html?id=${car.id}">
          <button>Learn More</button>
        </a>
      </div>
    `).join('');
  } catch (error) {
    console.error('Failed to load cars:', error);
  }
}

async function loadCarDetails() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    if (!carId) return;

    const response = await fetch(`${API_URL}/cars/${carId}`);
    const car = await response.json();

    document.getElementById('car-title').textContent = car.name;
    document.getElementById('car-price').textContent = `KES ${car.price_per_day}/day`;
    document.getElementById('car-description').textContent = car.description;

    // Load images if available
    const images = car.images || [];
    for (let i = 1; i <= 4; i++) {
      const imgElement = document.getElementById(`car-img-${i}`);
      if (imgElement) {
        imgElement.src = images[i-1] || './assets/vehicle-images/default-car.jpg';
      }
    }
  } catch (error) {
    console.error('Failed to load car details:', error);
  }
}

// Form submission functions
async function submitContactForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    
    if (response.ok) {
      alert('Message sent successfully!');
      form.reset();
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Form submission failed:', error);
    alert('Failed to send message. Please try again.');
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Load cars on cars.html and index.html
  if (document.querySelector('.car-list')) {
    loadCars();
  }

  // Load car details on car-details.html
  if (document.querySelector('.car-details')) {
    loadCarDetails();
  }

  // Handle login form submission
  const loginForm = document.querySelector('.login-section form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const success = await login(email, password);
      if (success) {
        window.location.href = 'index.html';
      } else {
        alert('Login failed. Please check your credentials.');
      }
    });
  }

  // Handle contact form submission
  const contactForm = document.querySelector('.contact-section form');
  if (contactForm) {
    contactForm.addEventListener('submit', submitContactForm);
  }
});