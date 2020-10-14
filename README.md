<h1 align="center">ExpressJS - Foodsie_Project RESTfull API</h1>

With more and more new food related business started popping out the demand for new food application that's accessible and easy to use are growing, this project was made to statisfy that demand. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.2-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name foodsie, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3001/)
8. You can see all the end point [here](#end-point)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=online_shop

PORT=3001
IP=127.0.0.1

```

## End Point

**1. GET**

- `/product/`(Get all product)
- `/product/:id`(Get product by id)
- `/product/search/name`(Get product by name)

- `/category/`(Get all category)
- `/category/:id`(Get category by id)

- `/history/:id`(Get history by id)
- `/history/days/days`(Get history per day)
- `/history/income/today`(Get income today)
- `/history/order/count`(Get order count per week)
- `/history/income/year`(Get income this year)
- `/history/chart/monthly`(Get total income each day per month)

- `/users/user/`(Get all user)
- `/users/user/:id`(Get user by id)

**2. POST**

- `/product/` (Post product)

  - `{ "category_id": 2, "product_name": "Coca-cola", "product_price": 8000 ,"product_picture": cocacola.jpg, "product_status": 1 | 0}`

- `/category/` (Post category)

  - `{ "category_name": "Food", "category_status": 1 | 0}`

- `/purchase/` (Post purchase)

  - `{ "orders": [{"product_id": 1, "purchase_qty": 1},{"product_id": 2, "purchase_qty": 3}] }`

- `/users/register` (Register user)
  - `{ "user_email": "cashier@gmail.com", "user_password": "Marakesh12", "user_name": "cashier1"}`
- `/users/login` (Login user)
  - `{ "user_email": "cashier@gmail.com", "user_password": "Marakesh12"}`

**3. PATCH**

- `/product/:id` (Update product by id)

  - `{ "category_id": 2, "product_name": "Coca-cola", "product_price": 8000 ,"product_picture": cocacola.jpg, "product_status" : 1 | 0}`

- `/category/:id` (Update category by id)

  - `{ "category_name": "Food", "category_status" : 1 | 0}`

- `/users/patch/:id` (Update user by id)
  - `{ "user_name": "cashier1", "user_password": "Marakesh12", "user_role": 2, "user_status": 1 | 0}`

**4. DELETE**

- `/product/:id` (Delete product by id)
- `/category/:id` (Delete category by id)

## Postman link

Link: https://web.postman.co/collections/12323107-3cd415e1-06ec-4889-9c61-e1c90c4ba219?version=latest&workspace=b7f7c54f-78e5-4889-81bc-f5c323799f66
