# 🎥 VideoPlayTube

A platform to watch videos like YouTube, built with **Node.js**, **Express**, and **MongoDB**.

## 🚀 Getting Started

Follow these steps to set up and run the project.

### 📌 Prerequisites

- **Node.js** (Download from [nodejs.org](https://nodejs.org/))
- **MongoDB** (You can use [MongoDB Atlas](https://www.mongodb.com/atlas/database) or a local instance)

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-repo/videoplaytube.git
cd videoplaytube
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add the following environment variables:

PORT=8000

MONGODB_URI=

PASSWORD=

CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

### 4️⃣ Start the Server
```sh
npm run dev
```
The server will start on http://localhost:8000.

## 📦 Dependencies
Package	Version
express	^4.19.2
mongoose	^8.5.3
bcrypt	^5.1.1
jsonwebtoken	^9.0.2
multer	^1.4.5-lts.1
cloudinary	^2.4.0
cors	^2.8.5
dotenv	^16.4.5
cookie-parser	^1.4.6
mongoose-aggregate-paginate-v2	^1.1.2


## 📌 Features
✔ User Authentication (JWT)
✔ Video Upload & Streaming
✔ Secure API Endpoints
✔ MongoDB for Data Storage
✔ Cloudinary for Media Hosting
✔ CORS Support


## 🏗 Tech Stack
Backend: Node.js, Express.js, Mongoose
Database: MongoDB
Cloud Storage: Cloudinary
Authentication: JSON Web Token (JWT)

## 📩 Contact
📧 Vinayak Kamble - vinayakmkgen@gmail.com
🔗 GitHub: [github.com/your-username](https://github.com/vinayakmk19)

Made with ❤️ by Vinayak Kamble

