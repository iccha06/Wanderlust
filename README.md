# 🏠 Wanderlust – Airbnb Clone (MERN Stack Project)
**Live Demo:** [https://wanderlust-bkfk.onrender.com](https://wanderlust-bkfk.onrender.com)

---

## 📌 About the Project
Wanderlust is a full-stack Airbnb-inspired web application built using the **MERN stack** (MongoDB, Express, Node.js) with server-side rendering using **EJS**. It allows users to explore property listings, create accounts, add reviews, and manage listings in a seamless travel-style booking experience. 

This project was built to strengthen skills in:
*   Full-stack web development
*   Authentication & authorization
*   RESTful API design
*   Database management with MongoDB
*   Deployment using Render

---

## 🚀 Features
*   **🔐 User authentication:** Secure Login and Registration
*   **🏠 Listing Management:** Create, edit, and delete property listings
*   **📸 Image Upload:** Integrated with Cloudinary for storage
*   **⭐ Reviews:** Add and manage property reviews
*   **❤️ Wishlist:** Functionality to save favorite listings
*   **🔍 Location Search:** View and search listings according to location
*   **💬 User Feedback:** Flash messages for actions and secure session handling
*   **🌐 Live:** Fully deployed on Render

---

## 🛠 Tech Stack
*   **Frontend:** EJS (Embedded JavaScript Templates), HTML, CSS, Bootstrap
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB Atlas, Mongoose
*   **Authentication:** Passport.js, Passport-Local-Mongoose
*   **Other Tools:** Cloudinary, Multer, express-session, connect-mongo, method-override, dotenv

---

## 📂 Project Structure
```text
Wanderlust/
├── models/      # Mongoose schemas
├── routes/      # Express routes
├── views/       # EJS templates
├── public/      # Static files (CSS, JS)
├── init/        # Seed data
├── utils/       # Helper functions
├── app.js       # Main server file
└── package.json
    
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
