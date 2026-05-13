# 🏠 Wanderlust – Airbnb Clone (MERN Stack Project)
[Live Demo](https://wanderlust-bkfk.onrender.com)

## 📌 About the Project
Wanderlust is a full-stack Airbnb-inspired web application built using the **MERN stack** (MongoDB, Express, Node.js) with server-side rendering using **EJS**. It allows users to explore property listings, create accounts, and manage bookings in a seamless travel-style experience.

## 🚀 Features
* **🔐 User authentication** (Login / Register)
* **🏠 Create, edit, and delete listings**
* **📸 Image upload** using Cloudinary
* **⭐ Reviews** & Wishlist functionality
* **🔍 Search** by location and category

## 🛠 Tech Stack
* **Frontend:** EJS, HTML, CSS, Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose)
* **Auth:** Passport.js

## 📂 Project Structure
Wanderlust/
├── models/      # Mongoose schemas
├── routes/      # Express routes
├── views/       # EJS templates
├── public/      # Static files (CSS, JS)
└── app.js       # Main server file
    
⚙️ Installation & Setup

1.Clone the repository
  git clone https://github.com/iccha06/Wanderlust.git
2.Install dependencies
  npm install
3.Create .env file
  ATLAS_DB_URL=your_mongodb_url
  SECRET=your_secret_key
4.Run the project
  node app.js

🌐 Deployment
This project is deployed using Render:
👉 https://wanderlust-bkfk.onrender.com
