## SaaS Landing Page with Email Verification
### 📌 Project Overview


This project is a SaaS-style landing page with a complete sign-up and email verification workflow.
It is designed to capture leads, validate user input, send verification emails, and store verified users in a database.

The project is built as part of an internship assignment to demonstrate frontend + backend integration, real-world form handling, and email verification logic.



### 🧠 Abstract


The objective of this project is to build a conversion-focused SaaS landing page with a secure sign-up process.
Users can create an account by submitting their name and email, receive a verification email, and, upon verification, are redirected to a thank-you page and dashboard.


#### The system ensures:

- Proper frontend validation

- Secure backend handling

- Email verification using tokens

- Persistent data storage using MongoDB



### 🛠️ Tools & Technologies Used


#### Frontend:
HTML, Tailwind CSS, JavaScript

#### Backend: 
Node.js, Express.js

#### Database: 
MongoDB (Mongoose)

#### Email Service: 
Nodemailer (Gmail App Password)

#### Version Control: 
Git & GitHub



### 🗂️ Project Structure


saas-landing/
│
├── frontend/
│   ├── signup.html
│   ├── thankyou.html
│   ├── dashboard.html
│   ├── styles.css
│   └── script.js
│
├── index.html
│
├── backend/
│   ├── models/
│   │   ├── Lead.js
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env   (not committed)
│
└── README.md



### ⚙️ Steps Involved in Building the Project


- Designed a conversion-optimised SaaS landing page using HTML and Tailwind CSS

- Implemented responsive UI and client-side form validation using JavaScript

- Built a Node.js + Express backend to handle form submissions

- Integrated MongoDB to store user and lead data

- Implemented email verification using Nodemailer and secure tokens

- Redirected verified users to a thank-you page and dashboard

- Tested the complete flow locally



### ▶️ How to Run the Project Locally (Backend Setup)

#### 1️⃣ Prerequisites


##### Make sure you have installed:

- Node.js (v18 or higher recommended)

- MongoDB (local or Atlas)

- Git



### 2️⃣ Install Backend Dependencies

Open a terminal inside the backend folder and run:

#### npm install



### 3️⃣ Create .env File (IMPORTANT)

Inside the backend folder, create a file named .env and add:

#### PORT=3000
#### MONGO_URI=your_mongodb_connection_string
#### EMAIL_USER=your_gmail_address
#### EMAIL_PASS=your_gmail_app_password
#### BASE_URL=http://localhost:3000



### 4️⃣ Start the Backend Server

From the backend folder:

#### node server.js


If successful, you will see:

##### Server running on port 3000
##### MongoDB connected



### 5️⃣ Run Frontend

Open index.html directly in the browser or use Live Server.
Sign up, verify email, and test the complete flow.



### 🚀 Conclusion

This project demonstrates a complete SaaS sign-up workflow with real-world features such as email verification, backend validation, and database integration.
It reflects practical knowledge of full-stack web development and follows industry-relevant practices for handling user data securely.



### 🔗 Connect With Me

Shreya Dattatray Gaikwad

Email: shreyagaikwad2k4@gmail.com

LinkedIn: https://www.linkedin.com/in/shreya-gaikwad-2k4

GitHub: https://github.com/ShreyaGaikwad2k4
