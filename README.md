# 🗺️ Location Map App

A responsive location map application built using **React.js + Vite + TailwindCSS** for the frontend and **Node.js + Express + Prisma + PostgreSQL** for the backend. Users can add locations manually or via ZIP upload, and view them on an interactive map.

---

## 🌐 Live Demo

- **Frontend:** [https://location-map01.netlify.app/](https://location-map01.netlify.app/)  
- **Backend:** [https://location-map.onrender.com/](https://location-map.onrender.com/)

---

## 📸 UI Screenshots

![Login Screen](https://i.ibb.co/sv43vj6J/login.png)  
![Map & Locations](https://i.ibb.co/nqSxbxjJ/Screenshot-2025-08-14-111903.png)

---

## 🛠️ Tech Stack

### Frontend
- **React.js** with **Vite**
- **Redux** for state management
- **Tailwind CSS**
- **Leaflet** for interactive maps

### Backend
- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**

---

## ✨ Features

- 🗺️ Interactive map displaying added locations
- 📝 Add new locations manually
- 📂 Upload locations via ZIP file (CSV inside)
- 📱 Fully responsive design for mobile and desktop

---

## 🚀 Local Development

To run this project locally, follow the steps below:

### 📦 Clone the Repository

```shell
https://github.com/mrDeepakk/location-map.git
cd location-map
```

Create a `.env` file inside the backend folder
```bash
DATABASE_URL="postgresql_database_url"
JWT_SECRET="jwt_key_change_me"
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

## 🔧 Setup Backend

Navigate to the `backend` directory

```bash
cd backend
```

### Install dependencies

```bash
npm install
```

### Run Prisma commands (first-time setup or after schema changes)
```bash
npx prisma migrate dev --name init --create-only
npx prisma migrate deploy
npx prisma generate
npx prisma db push
```

### Start backend application

```bash
npm run dev
```

## ⚡ Frontend Setup

### Navigate to the frontend folder
```shall
cd ../frontend
```

### Install dependencies
```shall
npm install
```

### Start development server
```shall
npm run dev
```

