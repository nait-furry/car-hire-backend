Update:
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

4. 
 