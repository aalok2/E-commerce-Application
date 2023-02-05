# E-commerce-Application
Ecommerce-Application is a basic backend application , where a buyer login and can buy different products and seller can sell his products create catalogue etc., 
It is developed by using Node.js, javascript, express,js ,SQL, Sequelize
Starting App 
npm install
node index.js

The application will start on port 8080 , http://localhost:8080 being the baseUrl 

You will need to create basic tables mentioned in the models file , to run the application seemlessly 

One important note : After logging in the user will recieve a token in response and has to use the token in making subsequent api requests wherever neccesary 
Add a header named authorizartion and the value must contain Bearer Token 
This is just for the sake of backend applicaiton testing , when handlind requests through client the client will automatically send otherwise relevant error codes have been passed to the client

Postman Collection : 
Here is the postman collection of all the API's that are being used in the application : 
 https://documenter.getpostman.com/view/16831599/2s935oLPKo
 
