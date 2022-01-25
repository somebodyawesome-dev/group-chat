<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<!-- <p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p> -->

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:
Laravel is accessible, powerful, and provides tools required for large, robust applications.

## API Routes


### Unprotected Routes
#### /login
verify user creds and return authentication token

- [x] POST
- [ ] GET
- [ ] PUT
- [ ] DELETE


**body request** :
   ```
   {
   "email":"required|string",
   "password":"required|string"
   }
   ```
 **response** :
 ```
 {
 "user":{
        "name":"somebodyawesome",
        "group":"group01",
        "email":"somebodyawesome@wewe.tn",
        },
 "token":"some token to be saved"
 }
 ```


### Protected Routes
 All protected code require Bearer token 
 protected routes splites to two types :
 - regular user routes
 - admin routes
 
### Standard User Routes
#### /messages
verify user creds and return authentication token

- [x] POST
- [X] GET
- [ ] PUT
- [ ] DELETE


**body request** :
   ```
   {
   "message":"required|string",
   "toUser":"required|string|exists:users,email"
   }
   ```
 **response** :
 ```
 {
 "message":"message sent"
 }
 ```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
