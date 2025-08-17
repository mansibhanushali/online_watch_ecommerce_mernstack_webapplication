⌚ Wrist Watch - E-commerce Website (MERN Stack)
Wrist Watch is a full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to browse wrist watches, add them to cart, and purchase online. Admins can manage product listings, categories, and orders.
🚀 Features
🔐 User Authentication & Authorization (JWT-based)
⌚ Browse and search wrist watches
🛒 Add to cart & manage cart items
💳 Place orders with order tracking
👨‍💻 Admin dashboard to manage products & orders
🌐 Responsive UI with modern design
🛠️ Tech Stack
Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT & bcrypt
State Management: Context API

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/mansibhanushali/online_watch_ecommerce_mernstack_webapplication.git
cd Wrist-Watch
2️⃣ Install dependencies
Backend:
  cd backend
  npm install
  npm run dev
Frontend:
  cd frontend
  npm install
  npm run dev
3️⃣ Add Environment Variables
Create a `.env` file in the backend folder with the following:
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=4000
