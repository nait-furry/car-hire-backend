Update:
1. Authentication for post, put, delete should be owner not admin
2. Admin verifies, approves/reject, hides, delete, 
3. Controllers and routes: separate the two ie dissect routes...middleware
4. Handling static files:
    ```javascript
    // serve uploads (static)
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // serve existing frontend files from project root ( /public)
    app.use('/', express.static(path.join(__dirname, './public')));

    ```
 Frontend: example fetch to replace server-side PHP pages
 - cars.html: fetch list of cars (example snippet)
    ```javascript
    // ...existing code...
    async function loadCars() {
    const res = await fetch('/api/cars');
    const cars = await res.json();
    const list = document.getElementById('cars-list');
    list.innerHTML = cars.map(c => `
        <article>
        <img src="${c.imagePath ? '/' + c.imagePath : 'assets/vehicle-images/front.jpg'}" alt="${c.title}">
        <h3>${c.title}</h3>
        <p>${c.description || ''}</p>
        <p>KES ${c.pricePerDay}</p>
        <a href="/car-details.html?id=${c.id}">Details</a>
        </article>
    `).join('');
    }
    document.addEventListener('DOMContentLoaded', loadCars);
    ```

 - Admin add car form: send multipart/form-data to /api/cars with Authorization header (admin)
    ```javascript
    // short example: submit form with file
    const form = document.getElementById('addCarForm');
    form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // set after login
    const fd = new FormData(form);
    const res = await fetch('/api/cars', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
    });
    if (res.ok) alert('Car added');
    });
    ```
5. config/models: associations
6. image handling ie: fs, multer, 

APIs: Routes: requests: response
1. '/api/cars': 
    get: '/': query{ q, category, minPrice, maxPrice, sort } : 
    get: '/:id': req.params.id :
    post: '/': auth{}, requireAdmin{} ; body{ title, description, procePerDay, category }; image{ req.file }; :
    put: '/:id': auth{}, requireAdmin{} ; body{ title, description, pricePerDay, category, available } :
    delete: '/id': auth{}, requireAdmin{} ; req.params.id:

2. '/api/auth':
    post: '/register': req.body{ name, email, password }: res.body{ user:{id, email, name}, token };
    post: '/login': req.body{ email, password }; res.body{ user:{id, email, name role}, token } 

3. '/api/booking':
    post: '/': auth{}, req.body{ carId, startDate, endDate, totalPrice }; res.body{ id, carId, startDate, endDate, totalPrice }
    get: '/': auth{}, req.body{user.id}; res.body{ id, carId, startDate, endDate, totalPrice }

4. 


#######################################
> INTEGRATING FRONTEND AND BACKEND:


nait-furry: help me change the frontend so it can intergrate with the backend:
#file:about-page.html :
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>About Us - Car Hire Kenya</title>
    <link rel="stylesheet" href="about-page.css">
</head>
<body>
    <nav class="navbar">
        <div class="logo">
            <a href="index.html">Car Hire Kenya</a>
        </div>
        <button class="hamburger" id="hamburger">
            ☰
        </button>
        <ul class="nav-links" id="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="#" onclick="scrollToServices()">Services</a></li>
            <li><a href="cars.html">Cars</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="login.html">Login</a></li>
        </ul>
    </nav>

    <section class="hero-section">
        <div class="hero-image">
            <img src="./assets/hero-section-images/header-drone-image.erased.png" alt="drone image of the Croton Motors headquarters" width="600px" height="300px">
        </div>
        <div class="hero-content">
            <h1>About Car Hire Kenya</h1>
            <p>We are Kenya’s trusted car hire service, dedicated to providing safe, reliable, and affordable vehicles for every journey. Whether you're traveling for business or leisure, we have the perfect car for you.</p>
            <a href="cars.html">
                <button>Available Cars</button>
            </a>
        </div>
    </section>

    <section class="why-choose-us-section">
        <h2>Why Choose Us?</h2>
        <div class="company-values">
            <div class="values-card">
                <img src="./assets/icons/icons8-reliable-100.png" alt="Reliable services">
                <h3>Reliability</h3>
                <p>Every vehicle in our fleet is well-maintained and undergoes regular inspections to ensure your safety and comfort.</p>
            </div>
            <div class="values-card">
                <img src="./assets/icons/icons8-secured-100.png" alt="Secure cars">
                <h3>Security</h3>
                <p>Your security is our priority. All our cars are insured and maintained to the highest standards.</p>
            </div>
            <div class="values-card">
                <img src="./assets/icons/icons8-convenient-100.png" alt="Convient services">
                <h3>Convenience</h3>
                <p>Our booking process is simple and straightforward, so you can get on the road in no time.</p>
            </div>
            <div class="values-card">
                <img src="./assets/icons/icons8-customer-service-100.png" alt="24/7 customer service">
                <h3>Customer Service</h3>
                <p>Our customer support team is available 24/7 to assist you with any queries or concerns you may have.</p>
            </div>
            <div class="values-card">
                <img src="./assets/icons/icons8-affordable-100.png" alt="Affordable prices">
                <h3>Affordability</h3>
                <p>Competitive pricing with no hidden fees.</p>
            </div>
            <div class="values-card">
                <img src="./assets/icons/icons8-grow-100.png" alt="Sustainability">
                <h3>Sustainability</h3>
                <p>We are committed to reducing our environmental impact with fuel-efficient and hybrid car options.</p>
            </div>
        </div>
    </section>

    <section id="services" class="services-section">
        <section class="services-heading-section">
            <h2 class="services-section-h2">Our Car Rental Services</h2>
            <p>At Car Hire Kenya we offer all-inclusive car hire and car rental services in Nairobi Kenya. Contact us for a custom package.</p>
        </section>
        <div class="services-cards-container">
            <div class="service-card">
                <img src="./assets/icons/car-rentel.png" alt="Self Driven Car Rentals">
                <div class="service-content">
                    <h3>Self Drive Car Rentals</h3>
                    <p>We offer group & private hire and discounted long-term professional car hire services at competitive rates.</p>
                    
                </div>
            </div>
    
            <div class="service-card">
                <img src="./assets/icons/chauffer-driven-car-hire.png" alt="Chauffeur Driven Car Rental">
                <div class="service-content">
                    <h3>Chauffeur Driven Car Rentals</h3>
                    <p>We offer group & private car hire with professional drivers at competitive rates.</p>
                    
                </div>
            </div>
    
            <div class="service-card">
                <img src="./assets/icons/long-term-car-hire.png" alt="Long Term Car Rental">
                <div class="service-content">
                    <h3>Long Term Car Rentals</h3>
                    <p>We provide long-term car rental services at discounted rates for personal use within the specified paid duration of the hire contract.</p>
                    
                </div>
            </div>
    
            <div class="service-card">
                <img src="./assets/icons/vip-car-hire.png" alt="VIP Car Rental">
                <div class="service-content">
                    <h3>VIP and Event Car Hire</h3>
                    <p>For your staff and invited guests, we also organize transfers from all venues within Kenya for your conference and meeting needs.</p>
                    
                </div>
            </div>
        </div>
    </section>

    <section class="our-team-section">
        <h2>Our Team</h2>
        <div class="our-team-div">
            <div class="employee-card">
                <img src="./assets/team-photos/profile-pic.png" alt="John Dean" width="100px" height="100px">
                <h5>John Odhiambo</h5>
                <p>Managing Director</p>
            </div>
    
            <div class="employee-card">
                <img src="./assets/team-photos/profile-pic.png" alt="" width="100px" height="100px">
                <h5>David Murithi</h5>
                <p>Car Hire Consultant</p>
            </div>
    
            <div class="employee-card">
                <img src="./assets/team-photos/profile-pic.png" alt="" width="95px" height="100px">
                <h5>James Kamau</h5>
                <p>Head Mechanic</p>
            </div>
        </div>
       
    </section>

    <section class="social-proof-section">
        <h2>What Our Customers Say</h2>
        <div class="carousel-container">
            <button class="carousel-nav-btn prev" onclick="moveSlide(-1)">&#10094;</button>
            <div class="carousel">
                <div class="review">
                    <img src="./assets/team-photos/profile-pic.png" alt="a photo of one of our past customers" width="100px" height="100px">
                    <h5>Mark Kimungui</h5>
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>Fantastic service. The car was such a daisy, my family enjoyed the ride to ushago.</p>
                </div>
                <div class="review">
                    <img src="./assets/team-photos/profile-pic.png" alt="a photo of one of our past customers" width="100px" height="100px">
                    <h5>Peter Kariuki</h5>
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>My experience with CHK was great. The car was sick as well. It was the sickest ride in my life lol. Highly recommend Car Hire Kenya.</p>
                </div>
                <div class="review">
                    <img src="./assets/team-photos/profile-pic.png" alt="a photo of one of our past customers" width="100px" height="100px">
                    <h5>Moses Kipkoech</h5>
                    <div class="stars">⭐⭐⭐⭐⭐</div>
                    <p>I regret not knowing you early. I can't recommend you enough; your dedication to keep all your cars in good conditions and your excellent customer service are unmatched.</p>
                </div>
            </div>
            <button class="carousel-nav-btn next" onclick="moveSlide(1)">&#10095;</button>
        </div>
    </section>


    <section class="final-cta-section">
        <div class="rental-section">
            <div class="rental-content">
                <h2>Find Your Perfect Car Today</h2>
                <p>Find the perfect car for your next adventure. Request a quote and book in just a few clicks.</p>
                <a href="request-quote-page.html"><button class="last-cta-btn">REQUEST A QUOTE</button></a>
            </div>
            <div class="rental-features">
                <ul>
                    <li>Flexible Pick up and drop off service</li>
                    <li>We operate 24/7 throughout the year</li>
                    <li>Unlimited mileage</li>
                    <li>Long-term discount discounts</li>
                    <li>Trustworthy & reliable services</li>
                </ul>
            </div>
        </div>
    </section>

    
    <section class="footer-section">
        <div class="footer-section-container">
            <div class="site-pages">
                <h4>Website Pages</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="cars.html">Cars</a></li>
                    <li><a href="about-page.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
    
            <div class="services">
                <h4>Services</h4>
                <ul>
                    <li><a href="#services">Self Drive Car Rentals</a></li>
                    <li><a href="#services">Chauffeur Driven Car Rentals</a></li>
                    <li><a href="#services">Long Term Car Rentals</a></li>
                    <li><a href="#services">VIP and Event Car Hire</a></li>
                </ul>
            </div>
    
            <div class="social-media-links">
                <h4>Follow Us</h4>
                <ul>
                    <li><a href="https://www.meta.com" target="_blank">Facebook</a></li>
                    <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                    <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
                </ul>
            </div>
    
    
            <div class="contact-info">
                <h4>Contact Us</h4>
                <ul>
                    <li><a href="tel:+254708927845">+254708927845</a></li>
                </ul>
                <ul>
                    <li><a href="mailto:raydonsimiyu@gmail.com">raydonsimiyu@gmail.com</a></li>
                </ul>
                
            </div>
        </div>
        
    </section>    
        
    <footer>
        <p>&copy; 2025 Croton Motors. All rights reserved.</p>
    </footer>

    <script src="about-page-script.js"></script>
</body>
</html>

#file:admin-panel.html :
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="admin.css">
</head>
<body>
    <div class="wrapper">
        <!-- Sidebar -->
        <nav class="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li><a href="admin_dashboard.php">Dashboard</a></li>
                <li><a href="add_car.html">Add New Car</a></li>
                <li><a href="logout.php">Logout</a></li>
            </ul>
        </nav>

        <!-- Main Content -->
        <div class="main-content">
            <h2>Manage Car Listings</h2>
            <a href="add_car.php" class="btn btn-primary mb-3">+ Add New Car</a>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Car Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($car = mysqli_fetch_assoc($result)) { ?>
                    <tr>
                        <td><?php echo $car['name']; ?></td>
                        <td>$<?php echo $car['price']; ?></td>
                        <td><span class="badge bg-<?php echo $car['availability'] == 'available' ? 'success' : 'danger'; ?>">
                            <?php echo ucfirst($car['availability']); ?>
                        </span></td>
                        <td>
                            <a href="edit_car.php?id=<?php echo $car['id']; ?>" class="btn btn-warning btn-sm">Edit</a>
                            <a href="delete_car.php?id=<?php echo $car['id']; ?>" class="btn btn-danger btn-sm" onclick="return confirm('Are you sure?');">Delete</a>
                        </td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>

#file:car-details.html :
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Details</title>
    <link rel="stylesheet" href="styles.css">
    <script defer src="script.js"></script>
</head>
<body>
    <header>
        <h1>Car Details</h1>
        <div class="home"><a href="index.html">Home</a></div>
    </header>

    <section class="car-details">
        <h2 id="car-title">Car Name</h2>

        <div class="slideshow-container">
            <div class="slide fade">
                <img id="car-img-1" src="" alt="Car View 1">
            </div>
            <div class="slide fade">
                <img id="car-img-2" src="" alt="Car View 2">
            </div>
            <div class="slide fade">
                <img id="car-img-3" src="" alt="Car View 3">
            </div>
            <div class="slide fade">
                <img id="car-img-4" src="" alt="Car Interior">
            </div>
            
            <a class="prev" onclick="plusSlides(-1)">❮</a>
            <a class="next" onclick="plusSlides(1)">❯</a>
        </div>

        <div class="car-info">
            <p><strong>Price Per Day:</strong> <span id="car-price"></span></p>
            <p><strong>Description:</strong> <span id="car-description"></span></p>
            <button class="book-btn">Proceed to Payment</button>
        </div>
    </section>

    <section class="footer-section">
        <div class="footer-section-container">
            <div class="site-pages">
                <h4>Website Pages</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="cars.html">Cars</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
    
            <div class="services">
                <h4>Services</h4>
                <ul>
                    <li><a href="#">Self Drive Car Rentals</a></li>
                    <li><a href="#">Chauffeur Driven Car Rentals</a></li>
                    <li><a href="#">Long Term Car Rentals</a></li>
                    <li><a href="#">VIP and Event Car Hire</a></li>
                </ul>
            </div>
    
            <div class="social-media-links">
                <h4>Follow Us</h4>
                <ul>
                    <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
                    <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                    <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
                </ul>
            </div>
    
    
            <div class="contact-info">
                <h4>Contact Us</h4>
                <ul>
                    <li><a href="tel:+254708927845">+254708927845</a></li>
                </ul>
                <ul>
                    <li><a href="mailto:raydonsimiyu@gmail.com">raydonsimiyu@gmail.com</a></li>
                </ul>
                
            </div>
        </div>
        
    </section>

    <footer>
        <p>&copy; 2025 Croton Motors. All rights reserved. Site Developed by Group Five</p>
    </footer>
</body>
</html>


#file:cars.html :
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Available Cars - Car Hire Kenya</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="logo">Car Hire Kenya</div>
        <button class="hamburger" id="hamburger">
            ☰
        </button>
        <ul class="nav-links" id="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="#" onclick="scrollToServices()">Services</a></li>
            <li><a href="cars.html">Cars</a></li>
            <li><a href="about-page.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="login.html">Login</a></li>
        </ul>
    </nav>

    <section class="car-listings">
        <h1>Available Cars for Hire</h1>
        <div class="car-list">
            <div class="car-card">
                <img src="./assets/vehicle-images/toyota-vitz/rear-right.jpg" alt="Toyota Vitz">
                <h3>Toyota Vitz</h3>
                <p>KES 3,000/day</p>
                <button class="book-btn">Book Now</button>
            </div>
            <div class="car-card">
                <img src="./assets/vehicle-images/nissan-xtrail/nissan-xtrail-side.png" alt="Nissan X-Trail">
                <h3>Nissan X-Trail</h3>
                <p>KES 6,000/day</p>
                <button class="book-btn">Book Now</button>
            </div>
            <div class="car-card">
                <img src="./assets/vehicle-images/mercedes-benz/mercedes-benz-c-class-rear-left.png" alt="Mercedes C-Class">
                <h3>Mercedes C-Class</h3>
                <p>KES 10,000/day</p>
                <button class="book-btn">Book Now</button>
            </div>
            <div class="car-card">
                <img src="./assets/vehicle-images/toyota-vitz/front.jpg" alt="Toyota Vitz">
                <h3>Toyota Vitz</h3>
                <p>KES 3,000/day</p>
                <button class="book-btn">Book Now</button>
            </div>
            <div class="car-card">
                <img src="./assets/vehicle-images/nissan-xtrail/nissan-xtrail-side.png" alt="Toyota Vitz">
                <h3>nissan-xtrail</h3>
                <p>KES 3,000/day</p>
                <button class="book-btn">Book Now</button>
            </div>
            <div class="car-card">
                <img src="./assets/vehicle-images/mercedes-benz/mercedes-benz-c-class-back.png" alt="Toyota Vitz">
                <h3>mercedes-benz</h3>
                <p>KES 3,000/day</p>
                <button class="book-btn">Book Now</button>
            </div>
        </div>
    </section>


    <section class="footer-section">
        <div class="footer-section-container">
            <div class="site-pages">
                <h4>Website Pages</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="cars.html">Cars</a></li>
                    <li><a href="about-page.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
    
            <div class="services">
                <h4>Services</h4>
                <ul>
                    <li><a href="#">Self Drive Car Rentals</a></li>
                    <li><a href="#">Chauffeur Driven Car Rentals</a></li>
                    <li><a href="#">Long Term Car Rentals</a></li>
                    <li><a href="#">VIP and Event Car Hire</a></li>
                </ul>
            </div>
    
            <div class="social-media-links">
                <h4>Follow Us</h4>
                <ul>
                    <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
                    <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                    <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
                </ul>
            </div>
    
    
            <div class="contact-info">
                <h4>Contact Us</h4>
                <ul>
                    <li><a href="tel:+254708927845">+254708927845</a></li>
                </ul>
                <ul>
                    <li><a href="mailto:raydonsimiyu@gmail.com">raydonsimiyu@gmail.com</a></li>
                </ul>
                
            </div>
        </div>
        
    </section>

    <footer>
        <p>&copy; 2025 Car Hire Kenya. All rights reserved.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>

#file:contact.html :
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Car Hire Kenya</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="logo">Car Hire Kenya</div>
        <button class="hamburger" id="hamburger">
            ☰
        </button>
        <ul class="nav-links" id="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="#" onclick="scrollToServices()">Services</a></li>
            <li><a href="cars.html">Cars</a></li>
            <li><a href="about-page.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="login.html">Login</a></li>
        </ul>
    </nav>

    <section class="contact-section">
        <h1>Contact Us</h1>
        <p>Have questions? Reach out to us through the form below.</p>
        <p>You can also call us at:</p>
        <p><a href="tel:+254708927845"><button id="call-button">+254708927845</button></a></p>
        <form>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>

            <button type="submit">Send Message</button>
        </form>
    </section>


    <section class="footer-section">
        <div class="footer-section-container">
            <div class="site-pages">
                <h4>Website Pages</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="cars.html">Cars</a></li>
                    <li><a href="about-page.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
    
            <div class="services">
                <h4>Services</h4>
                <ul>
                    <li><a href="#">Self Drive Car Rentals</a></li>
                    <li><a href="#">Chauffeur Driven Car Rentals</a></li>
                    <li><a href="#">Long Term Car Rentals</a></li>
                    <li><a href="#">VIP and Event Car Hire</a></li>
                </ul>
            </div>
    
            <div class="social-media-links">
                <h4>Follow Us</h4>
                <ul>
                    <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
                    <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                    <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
                </ul>
            </div>
    
    
            <div class="contact-info">
                <h4>Contact Us</h4>
                <ul>
                    <li><a href="tel:+254708927845">+254708927845</a></li>
                </ul>
                <ul>
                    <li><a href="mailto:raydonsimiyu@gmail.com">raydonsimiyu@gmail.com</a></li>
                </ul>
                
            </div>
        </div>
        
    </section>

    <footer>
        <p>&copy; 2025 Car Hire Kenya. All rights reserved.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>

#file:index.html :
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Group Five | Car Hiring Website</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    

    <section class="hero">
        <h1>Find Your Perfect Rental Car</h1>
        <input type="text" id="search" placeholder="Search for a car...">
        <button onclick="searchCar()">Search</button>
    </section>

    <section id="cars" class="featured-cars">
        <h2><b>Featured Cars</b></h2>
        <div class="car-list">
            <div class="car-card">
                <img src="./assets/vehicle-images/toyota-vitz/rear-right.jpg" alt="Car 1">
                <h3>Toyota Vitz</h3>
                <p>KES 3,000/day</p>
                <a href="car-details.html?car=toyota-vitz">
                    <button>Learn More</button>
              </a>
            </div>
            <div class="car-card">
                <img src="./assets/vehicle-images/nissan-xtrail/nissan-xtrail-front.png" alt="Car 2">
                <h3>Nissan X-Trail</h3>
                <p>KES 6,000/day</p>
                <a href="car-details.html?car=nissan-xtrail">
                    <button>Learn More</button>
              </a>
              
            </div>
            <div class="car-card">
                <img src="./assets/vehicle-images/mercedes-benz/mercedes-benz-c-class-rear-right.png" alt="Car 3">
                <h3>Mercedes C-Class</h3>
                <p>KES 10,000/day</p>
                <a href="car-details.html?car=mercedes-c-class">
                    <button>Learn More</button>
                </a>
            </div>
            <div class="car-card">
                <img src="./assets/vehicle-images/toyota-vitz/front.jpg" alt="Toyota Vitz">
                <h3>Toyota Vitz</h3>
                <p>KES 3,000/day</p>
                <button class="book-btn">Learn More</button>
            </div>
            <div class="car-card">
                <img src="./assets/vehicle-images/nissan-xtrail/nissan-xtrail-side.png" alt="Toyota Vitz">
                <h3>nissan-Xtrail</h3>
                <p>KES 6,000/day</p>
                <button class="book-btn">Learn More</button>
            </div>
            <div class="car-card">
                <img src="./assets/vehicle-images/mercedes-benz/mercedes-benz-c-class-back.png" alt="Toyota Vitz">
                <h3>mercedes-benz</h3>
                <p>KES 10,000/day</p>
                <button class="book-btn">Learn More</button>
            </div>
        </div>

        <div class="more-cars">
            <a href="cars.html">
                <button>See More Cars</button>
          </a>
        </div>
    </section>

    <section id="services" class="services-section">
        <section class="services-heading-section">
            <h2 class="services-section-h2">Our Car Rental Services</h2>
            <p>At Car Hire Kenya we offer all-inclusive car hire and car rental services in Nairobi Kenya. Contact us for a custom package.</p>
        </section>
        <div class="services-cards-container">
            <div class="service-card">
                <img src="./assets/icons/car-rentel.png" alt="Self Driven Car Rentals">
                <div class="service-content">
                    <h3>Self Drive Car Rentals</h3>
                    <p>We offer group & private hire and discounted long-term professional car hire services at competitive rates.</p>
                    
                </div>
            </div>
    
            <div class="service-card">
                <img src="./assets/icons/chauffer-driven-car-hire.png" alt="Chauffeur Driven Car Rental">
                <div class="service-content">
                    <h3>Chauffeur Driven Car Rentals</h3>
                    <p>We offer group & private car hire with professional drivers at competitive rates.</p>
                    
                </div>
            </div>
    
            <div class="service-card">
                <img src="./assets/icons/long-term-car-hire.png" alt="Long Term Car Rental">
                <div class="service-content">
                    <h3>Long Term Car Rentals</h3>
                    <p>We provide long-term car rental services at discounted rates for personal use within the specified paid duration of the hire contract.</p>
                    
                </div>
            </div>
    
            <div class="service-card">
                <img src="./assets/icons/vip-car-hire.png" alt="VIP Car Rental">
                <div class="service-content">
                    <h3>VIP and Event Car Hire</h3>
                    <p>For your staff and invited guests, we also organize transfers from all venues within Kenya for your conference and meeting needs.</p>
                    
                </div>
            </div>
        </div>
    </section>

    <section class="final-cta-section">
        <div class="rental-section">
            <div class="rental-content">
                <h2>Find Your Perfect Car Today</h2>
                <p>Find the perfect car for your next adventure. Request a quote and book in just a few clicks.</p>
                <a href="request-quote-page.html"><button class="last-cta-btn">REQUEST A QUOTE</button></a>
            </div>
            <div class="rental-features">
                <ul>
                    <li>Flexible Pick up and drop off service</li>
                    <li>We operate 24/7 throughout the year</li>
                    <li>Unlimited mileage</li>
                    <li>Long-term discount discounts</li>
                    <li>Trustworthy & reliable services</li>
                </ul>
            </div>
        </div>
    </section>

    <section class="footer-section">
        <div class="footer-section-container">
            <div class="site-pages">
                <h4>Website Pages</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="cars.html">Cars</a></li>
                    <li><a href="about-page.html">About</a></li>
                    <li><a href="contact-page.html">Contact</a></li>
                </ul>
            </div>
    
            <div class="services">
                <h4>Services</h4>
                <ul>
                    <li><a href="#">Self Drive Car Rentals</a></li>
                    <li><a href="#">Chauffeur Driven Car Rentals</a></li>
                    <li><a href="#">Long Term Car Rentals</a></li>
                    <li><a href="#">VIP and Event Car Hire</a></li>
                </ul>
            </div>
    
            <div class="social-media-links">
                <h4>Follow Us</h4>
                <ul>
                    <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
                    <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                    <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
                </ul>
            </div>
    
    
            <div class="contact-info">
                <h4>Contact Us</h4>
                <ul>
                    <li><a href="tel:+254708927845">+254708927845</a></li>
                </ul>
                <ul>
                    <li><a href="mailto:raydonsimiyu@gmail.com">raydonsimiyu@gmail.com</a></li>
                </ul>
                
            </div>
        </div>
        
    </section>

    <script src="script.js"></script>
</body>
</html>

#file:login.html :
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Car Hire Kenya</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="logo">Car Hire Kenya</div>
        <button class="hamburger" id="hamburger">
            ☰
        </button>
        <ul class="nav-links" id="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="#" onclick="scrollToServices()">Services</a></li>
            <li><a href="cars.html">Cars</a></li>
            <li><a href="about-page.html">About</a></li>
            <li><a href="contact-page.html">Contact</a></li>
            <li><a href="login.html">Login</a></li>
        </ul>
    </nav>

    <section class="login-section">
        <h1>Sign In</h1>
        <form>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="register.html">Register here</a></p>
    </section>

    <section class="footer-section">
        <div class="footer-section-container">
            <div class="site-pages">
                <h4>Website Pages</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="cars.html">Cars</a></li>
                    <li><a href="about-page.html">About</a></li>
                    <li><a href="contact-page.html">Contact</a></li>
                </ul>
            </div>
    
            <div class="services">
                <h4>Services</h4>
                <ul>
                    <li><a href="#">Self Drive Car Rentals</a></li>
                    <li><a href="#">Chauffeur Driven Car Rentals</a></li>
                    <li><a href="#">Long Term Car Rentals</a></li>
                    <li><a href="#">VIP and Event Car Hire</a></li>
                </ul>
            </div>
    
            <div class="social-media-links">
                <h4>Follow Us</h4>
                <ul>
                    <li><a href="https://www.facebook.com" target="_blank">Facebook</a></li>
                    <li><a href="https://www.twitter.com" target="_blank">Twitter</a></li>
                    <li><a href="https://www.instagram.com" target="_blank">Instagram</a></li>
                </ul>
            </div>
    
    
            <div class="contact-info">
                <h4>Contact Us</h4>
                <ul>
                    <li><a href="tel:+254708927845">+254708927845</a></li>
                </ul>
                <ul>
                    <li><a href="mailto:raydonsimiyu@gmail.com">raydonsimiyu@gmail.com</a></li>
                </ul>
                
            </div>
        </div>
        
    </section>

    <footer>
        <p>&copy; 2025 Croton Motors. All rights reserved. Site Developed by Group Five</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>

#file:request-quote-page.html :
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Page - Car Hire Kenya</title>
    <link rel="stylesheet" href="request-quote-page.css">
</head>
<body>

  <nav class="navbar">
    <div class="logo">Car Hire Kenya</div>
    <button class="hamburger" id="hamburger">
        ☰
    </button>
    <ul class="nav-links" id="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="cars.html">Cars</a></li>
        <li><a href="about-page.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="login.html">Login</a></li>
    </ul>
</nav>

  <section class="contact-section">
    <div class="form-container">
      <h2>Request A Quote</h2>
      <p>You can also call us at:</p>
        <p><a href="tel:+254708927845"><button lkid="call-button">+254708927845</button></a></p>
      <form id="quoteForm" action="process_quote.php" method="post">
          <input type="text" placeholder="Name*" required>
          <input type="text" placeholder="Destination*" required>
          <select required>
              <option value="">Select Car Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
          </select>
          <input type="tel" placeholder="Phone Number*" required>
          <input type="email" placeholder="Email*" required>
          <input type="date" placeholder="Pick-Up-Date*" required>
          <input type="date" placeholder="Drop-off-Date*" required>
          <p>How would you like to be contacted</p>
          <div class="contact-options">
            <label><input type="checkbox"> Email</label>
            <label><input type="checkbox"> WhatsApp</label>
            <label><input type="checkbox"> Call</label>
        </div>
          <button type="submit" class="btn">REQUEST A QUOTE</button>
      </form>
    </div>
    
    <div id="popupMessage" class="popup-message"></div>    

  </section>

  <script src="request-quote-page.js"></script>
</body>
</html>

#file:script.js :
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


#file:styles.css :
    :root {
        
        --button-color: #007bff;
        --button-color-hover:#0056b3;
        --primary-color-dark:#db6f35;
        --text-dark:#333333;
        --text-light:#767268;
        --white-pure:#ffffff;
        --white-smoke:#f9f9f9;
        --max-width:1200px;
        --header-font:"Bebas Neue", sans-serif;          
    }

/* Global Styles */
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    font-family: open sans;
    box-sizing: border-box;
    line-height: 1.6;
  }

 /* Navigation Bar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0A2141;
    color: white;
    padding: 15px 20px;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }.logo a {
    text-decoration: none;
    color: white;
  }

  .logo a:hover {
    text-decoration: none;
    color: #FFC107;
  }
  
  /* Navigation Links */
  .nav-links {
    list-style: none;
    display: flex;
    gap: 15px;
  }
  
  .nav-links li {
    display: inline;
  }
  
  .nav-links a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    padding: 8px 5px;
    transition: 0.3s;
  }
  
  .nav-links a:hover {
    color: #FFC107;
    
  }
  
  /* Hamburger Menu Button */
  .hamburger {
    display: none; /* Hide by default */
    font-size: 1.8rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    transition: 0.3s;
  }
  
  /* Mobile Styles */
  @media (max-width: 768px) {
    .nav-links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 60px;
        right: 0;
        background: #0A2141;
        width: 100%;
        text-align: center;
        padding: 10px 0;
    }
  
    .nav-links.active {
        display: flex;
    }
  
    .nav-links li {
        display: block;
        padding: 10px 0;
    }
  
    .hamburger {
        display: block; /* Show hamburger menu */
    }
  }

.hero {
    text-align: center;
    padding: 50px 20px;
    background: #007BFF;
    color: white;
    background: url(assets/hero-section-images/header-drone-image.erased.png) no-repeat center center/cover;
    background-size: contain;
    min-height: 59vh;
}

.hero h1 {
    font-size: 2.2em;
    margin-top: 60px;
    color: var(--white-pure);
}

.hero input {
    padding: 10px;
    width: 60%;
    margin-top: 60px;
}
.hero button {
    padding: 10px 20px;
    margin-top: 60px;
    cursor: pointer;
    background: #0056b3;
    color: white;
    border: none;
}

.featured-cars {
        text-align: center;
        padding: 20px 20px;
        
    }
    .featured-cars .h2 {
        margin-top: 20px;
        margin-bottom: 60px;
    }
    .car-list {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
    }
    .car-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .car-card img {
        max-width: 100%;
        border-radius: 10px;
    }
    .book-btn {
        padding: 10px;
        background: #28a745;
        color: white;
        border: none;
        cursor: pointer;
        margin-top: 10px;
    }
    

    /* Services Section */
    
    .services-section {
        margin-top: 6%;
        margin-bottom: 0%;
        background-color: #F9F9F9;
    }
    
    .services-heading-section {
        text-align: center;
        padding: 20px;
    }
    
    .services-section-h2 {
        position: relative;
        display: inline-block;
        font-size: 2em;
        margin: 0;
        padding: 0 20px;
    }
    
    .services-section-h2::before,
    .services-section-h2::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 50px;
        height: 2px;
        background-color: #333;
    }
    
    .services-section-h2::before {
        left: -60px;
    }
    
    .services-section-h2::after {
        right: -60px;
    }
    
    @media (max-width: 600px) {
        .services-section-h2::before,
        .services-section-h2::after {
            display: none;
            
        }
    }
    
    .services-cards-container {
        max-width: 1100px;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        justify-content: center;
        grid-auto-flow: row dense; /* Helps in handling the layout */
    }
    
    .service-card {
        background: rgba(255, 255, 255, 0.05);
        padding: 20px;
        border-radius: 10px;
        display: flex;
        align-items: flex-start;
        gap: 15px;
        transition: transform 0.3s ease;
    }
    
    .service-card:hover {
        transform: translateY(-5px);
    }
    
    .service-card img {
        width: 50px;
        height: 50px;
    }
    
    .service-content h3 {
        font-size: 1.2em;
        margin-bottom: 5px;
    }
    
    .service-content p {
        font-size: 0.9em;
        opacity: 0.8;
        margin-bottom: 8px;
    }
    
    .service-content a {
        color: #4a90e2;
        text-decoration: none;
        font-weight: bold;
        font-size: 0.9em;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .service-card:nth-child(odd):last-child {
        grid-column: span 2;
        justify-self: center;
        max-width: 50%;
    }
    }
  
    /*Final CTA Section*/
.final-cta-section {
    background: #F9F9F9;
    padding: 20px
  }
  
  .rental-section {
    background: #007BFF;
    color: #fff;
    padding: 40px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
    margin: 50px auto;
  }
  .rental-content {
    max-width: 50%;
  }
  .rental-content h2 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  .rental-content p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .last-cta-btn {
    background: #FFC107;
    color: #000;
    padding: 12px 20px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
  }
  .rental-features {
    max-width: 45%;
  }
  .rental-features ul {
    list-style: none;
    padding: 0;
  }
  .rental-features ul li {
    font-size: 16px;
    margin: 10px 0;
  }
  .rental-features ul li::before {
    content: '\2713'; /* Checkmark */
    color: #FFC107;
    font-weight: bold;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    .rental-section {
      flex-direction: column;
      text-align: center;
    }
    .rental-content {
      max-width: 100%;
      text-align: center;
    }
    .rental-features {
      max-width: 100%;
      text-align: left;
    }
  }


    /* Car Listings Page */
    .car-listings {
        padding: 20px;
        text-align: center;
    }

    .car-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }

    .car-card {
        background: #f4f4f4;
        padding: 15px;
        width: 300px;
        border-radius: 5px;
        text-align: center;
    }

    .car-card img {
        max-width: 100%;
        height: auto;
        border-radius: 5px;
    }

    .book-btn {
        background: #004466;
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
        margin-top: 10px;
    }

    .book-btn:hover {
        background: #003355;
    }

    /* Responsive Car Listings */
    @media (max-width: 768px) {
        .car-list {
            flex-direction: column;
            align-items: center;
        }
    }

    /* Contact Page */
    .contact-section {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        text-align: center;
    }

    #call-button {
        background: #FFC107;
        color: #000;
        padding: 12px 20px;
        border: none;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
    }

    #call-button:hover {
        background: #003355;
        color: #FFC107;
    }

    .contact-section a #call-button:hover {
        color: #FFC107;
        text-decoration: none;
    }
    

    /* About page */
    .about-section {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        text-align: center;
    }

    /* Login page */
    form {
        display: flex;
        flex-direction: column;
        max-width: 600px;
                    
    }
    .login-section {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        text-align: center;

    }
    input, textarea {
        margin-bottom: 10px;
        padding: 10px;
        font-size: 1em;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        background: #004466;
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
    }

    button:hover {
        background: #003355;
        color: #FFC107;
    }

    .login-section a:hover {
        color: #FFC107;
        text-decoration: none;
    }

    /*Car Details page */
    .home a {
        color: white;
        text-decoration: none;
    }

    /* Car Details Section */
    .car-details {
        max-width: 800px;
        margin: 20px auto;
        text-align: center;
    }

    .car-details h2 {
        margin-bottom: 10px;
    }

    /* Slideshow Styles */
    .slideshow-container {
        position: relative;
        max-width: 100%;
        margin: auto;
    }

    .slide {
        display: none;
    }

    img {
        width: 100%;
        border-radius: 5px;
    }

    /* Navigation Buttons */
    .prev, .next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 10px;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        font-size: 20px;
        border: none;
    }

    .prev { left: 10px; }
    .next { right: 10px; }

    .prev:hover, .next:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    /* Car Info Section */
    .car-info {
        margin-top: 20px;
        padding: 15px;
        background: #f4f4f4;
        border-radius: 5px;
    }

    .book-btn {
        background: #004466;
        color: white;
        padding: 10px 15px;
        border: none;
        cursor: pointer;
        font-size: 1em;
        margin-top: 10px;
    }

    .book-btn:hover {
        background: #003355;
    }

    .more-cars {
        background: #004466;
        color: white;
        padding: 0px 0px;
        border: none;
        cursor: pointer;
        font-size: 1em;
        max-width: fit-content;
        align-items: center;
        justify-self: center;
        align-self: center;
        align-content: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    /* Responsive Design */
    @media (max-width: 768px) {
        .prev, .next {
            font-size: 16px;
            padding: 8px;
        }
    }


    /*footer-section */
    .footer-section-container {
        display: flex;
        justify-content: space-between;
        align-items: left;
        background-color: #0A2141;
        color: #fff;
        padding: 20px;
        text-align: left;
        justify-items: left;
    }
    
    .footer-section-container ul li a {
        color: #fff;
        align-self: left;
        margin-right: 10px;
        text-decoration: none;
    }
    .footer-section-container a:hover {
        color: #FFC107;
        text-decoration: underline;
    }
    
    .footer-section-container ul {
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    
    .footer-section-container ul li {
        list-style: none;
        margin: 5px 0px;
    }
    
    .footer-section-container .site-pages, .services, .social-media-links, .contact-info {
        margin-left: 60px;
    }
    
    .footer-section-container .contact-info {
        margin-right: 60px;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .footer-section-container {
        flex-direction: column;
        text-align: left;
        height: auto;
        justify-content: space-between;
        }
    
        .footer-section-container .site-pages, .services, .social-media-links, .contact-info {
        margin-bottom: 60px;
        }
    }

    /* Footer */
    footer {
        background-color: #767268;
        margin-bottom: 0px;
        margin-top: 0px;
        text-align: center;
    }

    /* Make Footer Responsive */
    @media (max-width: 768px) {
        footer {
            font-size: 0.9em;
        }
    }

    #file:server.js :
    // ...existing code...
    const express = require('express');
    const path = require('path');
    require('dotenv').config();
    const { sequelize } = require('./db');
    const models = require('./config/models'); // loads associations
    const errorMiddleware = require('./middleware/error.middlware');
    
    const app = express();
    app.use(express.json());
    app.use(require('cors')());
    app.use(express.urlencoded({ extended: true }));
    
    // serve uploads (static)
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    
    // serve existing frontend files from project root ( /public)
    app.use('/', express.static(path.join(__dirname, '../public')));
    
    // mount API
    app.use('/api/auth', require('./routes/auth.routes'));
    app.use('/api/cars', require('./routes/cars.routes'));
    app.use('/api/bookings', require('./routes/bookings.routes'));
    app.use(errorMiddleware);
    
    const PORT = process.env.PORT || 3000;
    (async () => {
      try {
        await sequelize.authenticate();
        await sequelize.sync(); // for dev: use migrations in production
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
      } catch (err) {
        console.error('DB connection failed', err);
      }
    })();
    

    Suggestion for public/script.js:
    async function loadCars() {
  const response = await fetch('/api/cars');
  const cars = await response.json();
  
  const carList = document.querySelector('.car-list');
  carList.innerHTML = cars.map(car => `
    <div class="car-card">
      <img src="${car.image}" alt="${car.name}">
      <h3>${car.name}</h3>
      <p>KES ${car.price_per_day}/day</p>
      <a href="car-details.html?id=${car.id}">
        <button>Learn More</button>
      </a>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', loadCars);











GitHub Copilot: I'll help you integrate the frontend with the backend API. Here are the key changes needed:

1. First, let's modify the script.js to handle API calls:

````javascript
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
````

2. Add a loading state indicator to show while data is being fetched:

````css
/* Add these styles */
.loading {
  text-align: center;
  padding: 20px;
}

.loading::after {
  content: "Loading...";
  display: inline-block;
  animation: dots 1.5s infinite;
}

@keyframes dots {
  0%, 20% { content: "Loading.  "; }
  40% { content: "Loading.. "; }
  60% { content: "Loading..."; }
  90%, 100% { content: "Loading.  "; }
}

.error-message {
  color: #dc3545;
  text-align: center;
  padding: 20px;
}
````

3. Update the car-details.html template to work with the API:

````html
<!-- In the car-details section -->
<section class="car-details">
    <div id="loading" class="loading"></div>
    <div id="error" class="error-message" style="display: none;"></div>
    
    <div id="car-content" style="display: none;">
        <h2 id="car-title">Car Name</h2>
        <!-- ... rest of the content ... -->
    </div>
</section>
````

These changes will:
- Connect the frontend to your backend API endpoints
- Handle loading and error states
- Manage authentication with JWT tokens
- Submit forms to the backend
- Load car data from the database instead of hardcoded values

Make sure your backend API is properly configured to:
1. Handle CORS requests
2. Return proper JSON responses
3. Process form submissions
4. Serve static files (images)
5. Implement proper error handling

Let me know if you need help with any specific part of the integration!
