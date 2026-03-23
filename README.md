# Connecting backend
- The car-hire project was a frontEnd project with no backend server, database for consistency, and Account features(authentication, authorization).
- The challenge was to connect the frontEnd to my backend modules.
- 
# Update:
1. Authentication for post, put, delete should be owner not admin
2. Admin verifies, approves/reject, hides, delete, 
3. Controllers and routes: separate the two ie dissect routes...middleware
4. config/models: associations
5. image handling ie: fs, multer, 

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

## Project Overview

This is a car hiring platform for **Car Hire Kenya**. It allows users to browse available cars, view details, request quotes, and contact the company. The current implementation uses static HTML, CSS, JS, and PHP for some backend functionality.

## Current Structure

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP (for admin panel, car details, add car)
- **Assets:** Images, icons, team photos
- **Admin Panel:** Add/edit/delete car listings
- **User Features:** Search cars, view details, request quotes, contact form

## Key Files

- `index.html`: Homepage, featured cars, services, CTA
- `cars.html`: List of available cars
- `car-details.html`: Car details (populated via JS)
- `car-details.php`: Car details (populated via DB)
- `add_car.html`, `add_car.php`: Admin add car form
- `admin-panel.html`, `admin-panel.php`: Admin dashboard
- `login.html`: User login page
- `request-quote-page.html`: Quote request form
- `about-page.html`: About the company
- `contact.html`: Contact form
- `script.js`: Main JS for UI interactivity
- `assets/`: Images and icons

## Planned Changes

1. **Integrate Node.js Backend**
   - Replace PHP backend with Node.js (Express).
   - Set up REST API endpoints for cars, users, bookings, etc.
   - Use a database (MongoDB, PostgreSQL, or MySQL).

2. **Image Upload**
   - Implement image upload for cars (use [multer](https://www.npmjs.com/package/multer) in Node.js).
   - Store image paths in the database.

3. **Database Integration**
   - Store car listings, user accounts, bookings, etc.
   - Update frontend to fetch data from API.

4. **Registration & Login**
   - Add user registration and authentication (JWT or sessions).
   - Secure admin routes.

5. **Interactive UI**
   - Use AJAX/fetch for dynamic updates.
   - Add car filtering, sorting, and search.
   - Improve quote request and booking flows.

6. **Other Features**
   - Admin dashboard for managing cars and bookings.
   - User dashboard for viewing bookings.
   - Reviews and ratings for cars.
   - Responsive design improvements.
   - Searching and filtering by category(region, price, car-tA

   car-hiring-website-project/
├─ server.js                    (existing)
├─ package.json                 (existing)
├─ uploads/                     (create; serve static images)
├─ .env                         (create; DB + JWT secrets)
├─ src/
│  ├─ db.js                     (DB pool / ORM setup)
│  ├─ routes/
│  │  ├─ auth.js                (register / login)
│  │  ├─ cars.js                (GET list, GET/:id, POST upload, PUT, DELETE)
│  │  └─ bookings.js            (POST booking, GET user bookings)
│  ├─ controllers/              (optional: route logic)
│  └─ middleware/
│     └─ auth.js                (JWT verify middleware)
├─ uploads/                     (runtime uploaded images)
└─ public/ or existing HTML files (index.html, cars.html, etc. — use frontend fetch to /api/*)

## To do
1. **Integrate Node.js Backend**
   - Replace PHP backend with Node.js (Express).
   - Set up REST API endpoints for cars, users, bookings, etc.
   - Use a database (MongoDB, PostgreSQL, or MySQL).

2. **Image Upload**
   - Implement image upload for cars (use [multer](https://www.npmjs.com/package/multer) in Node.js).
   - Store image paths in the database.

3. **Database Integration**
   - Store car listings, user accounts, bookings, etc.
   - Update frontend to fetch data from API.

4. **Registration & Login**
   - Add user registration and authentication (JWT or sessions).
   - Secure admin routes.

5. **Interactive UI**
   - Use AJAX/fetch for dynamic updates.
   - Add car filtering, sorting, and search.
   - Improve quote request and booking flows.

6. **Other Features**
   - Admin dashboard for managing cars and bookings.
   - User dashboard for viewing bookings.
   - Reviews and ratings for cars.
   - Responsive design improvements.
   - Searching and filtering by category(region, price, car-tA

   Detailing what goes where given:
      car-hiring-website-project/
   ├─ server.js                    (existing)
   ├─ package.json                 (existing)
   ├─ uploads/                     (create; serve static images)
   ├─ .env                         (create; DB + JWT secrets)
   ├─ src/
   │  ├─ db.js                     (DB pool / ORM setup)
   │  ├─ routes/
   │  │  ├─ auth.js                (register / login)
   │  │  ├─ cars.js                (GET list, GET/:id, POST upload, PUT, DELETE)
   │  │  └─ bookings.js            (POST booking, GET user bookings)
   │  ├─ controllers/              (optional: route logic)
   │  └─ middleware/
   │     └─ auth.js                (JWT verify middleware)
   ├─ uploads/                     (runtime uploaded images)
   └─ public/ or existing HTML files (index.html, cars.html, etc. — use frontend fetch to /api/*)

Workspace: Sure, here's a proposed directory structure for a Node.js Express app:


Create Workspace...

nait-furry: Procede with how to achieve 
. **Integrate Node.js Backend**
   - Replace PHP backend with Node.js (Express).
   - Set up REST API endpoints for cars, users, bookings, etc.
   - Use a database (MongoDB, PostgreSQL, or MySQL).

2. **Image Upload**
   - Implement image upload for cars (use [multer](https://www.npmjs.com/package/multer) in Node.js).
   - Store image paths in the database.

3. **Database Integration**
   - Store car listings, user accounts, bookings, etc.
   - Update frontend to fetch data from API.

4. **Registration & Login**
   - Add user registration and authentication (JWT or sessions).
   - Secure admin routes.

5. **Interactive UI**
   - Use AJAX/fetch for dynamic updates.
   - Add car filtering, sorting, and search.
   - Improve quote request and booking flows.

6. **Other Features**
   - Admin dashboard for managing cars and bookings.
   - User dashboard for viewing bookings.
   - Reviews and ratings for cars.
   - Responsive design improvements.
   - Searching and filtering by category(region, price, car-type)


 
