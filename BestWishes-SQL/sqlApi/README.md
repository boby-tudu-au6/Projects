# BestWishes
This is propject is basically an api for hotel management system

>[live preview](https://mongo-bestwishes.herokuapp.com/dashboard)

## Technology used:-
- node js (core langauage)
- expressjs (for routing purpose)
- mongodb (for database)
- nodemailer (for sending email)
- json web tokens (for authentication)
- bycrypt js (for password hashing)
- multer (for file uploading)
- razorpay api (for payment gateway)
- jest (for unit testing)


## api endpoints

1. for user registration 
     >```POST http://localhost:8080/registeruser ```
     - required fields
        - name
        - email
        - password


2. for user login
    >```POST http://localhost:8080/loginuser```

    - required fields
        - email
        - password

3. forgot password for client
    >```POST http://localhost:8080/forgotClient```

    - required fields
        - email
4. reset password for client
    >``` POST http://localhost:8080/resestClient/:token```

    - required fields
        - password
5. Home route to view all hotel (no need to login)
    >```GET http://localhost:8080/dashboard```

6. For placing order
    >```POST http://localhost:8080/order```
    - required fields
        - venueid

7. For adding venue for providers
    >```POST http://localhost:8080/addvenue```
    - required fields
        - venuename
        - location
        - charges
        - category
        - review
        - venueimg
        - capacity
        - provider

8. Delete venue for provider
    >```GET http://localhost:8080/provider/removevenue/:id```
9. Remove user for admin
    >```GET http://localhost:8080/admin/removeuser/:id```
10. Remove provider for admin
    >```GET http://localhost:8080/admin/removeprovider/:id```
