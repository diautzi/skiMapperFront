# SkiMapper-Frontend

Platform connecting backcountry skiers with trails, where users can:
- search trails by name and by location
-  add them to their favorite trails
-  signup/login into their accounts
-  post comments about favorite trails and check trail details, including Google Maps location
Built with RESTful API architecture and CRUD functionalities.

![SkiMapper](https://github.com/diautzi/SkiMapperFront/blob/master/welcomePage.png)

# Technical Details 
- Front-end built with React and React Router.
- Styling with pure CSS and Semantic UI.
- PostgreSQL database.
- Authentication with JWT.
- Developed a Ruby on Rails API backend with 4 different endpoints: for users, trails, comments and favorite trails.
- Used serializer to format the JSON file.
- APIs: The Powder Project Data API and Google Maps API

# Installation 
- Fork an clone the project frontend: 
  [https://github.com/diautzi/SkiMapper-Frontend](https://github.com/diautzi/SkiMapper-Frontend)
 - Fork an clone the project backend: 
  [https://github.com/diautzi/skiMapper](https://github.com/diautzi/skiMapper)
 - In your terminal, go to skiMapper:
 
      ```
      $ rails db:create
      $ rails db:migrate
      $ rails s
      ```
 The server will start on http://localhost:3001
- In your terminal ```cd.. ``` into SkiMapper-Frontend 
    ``` 
    $ npm install
    $ npm start
    ```
The react app will run on http://localhost:3000

# Demo 
[SkiMapper](https://skimapper.herokuapp.com/)
