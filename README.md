# Ayush Kamboj - Full Stack Portfolio Website

A modern, responsive, and fully functional portfolio website built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Clean and professional design with smooth animations
- **Dark Mode Toggle**: Switch between light and dark themes
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Interactive Components**: Smooth scrolling, typing animations, and hover effects
- **RESTful API**: Complete backend API for managing portfolio content
- **MongoDB Integration**: Persistent data storage for projects, skills, and certificates
- **Email Integration**: Contact form with email notifications
- **Performance Optimized**: Fast loading, lazy loading, and optimized images
- **SEO Friendly**: Meta tags and semantic HTML
- **Dark/Light Mode**: System preference detection with manual toggle

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Building for Production](#building-for-production)
6. [API Endpoints](#api-endpoints)
7. [Technologies Used](#technologies-used)
8. [Contributing](#contributing)
9. [License](#license)

## 🏗️ Project Structure

```
Portfolio/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── projectController.js
│   │   ├── skillController.js
│   │   ├── certificateController.js
│   │   └── contactController.js
│   ├── models/
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   ├── Certificate.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── certificateRoutes.js
│   │   └── contactRoutes.js
│   ├── server.js                # Express server
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosConfig.js   # API client configuration
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── index.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLIENT_URL=http://localhost:3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=your_email@gmail.com
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

## ⚙️ Configuration

### Environment Variables

#### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| NODE_ENV | Environment | development |
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection | mongodb://localhost:27017/portfolio |
| CLIENT_URL | Frontend URL | http://localhost:3000 |
| EMAIL_USER | Gmail for sending emails | your_email@gmail.com |
| EMAIL_PASSWORD | Gmail app password | [Google App Password] |
| ADMIN_EMAIL | Recipient email | your_email@gmail.com |
| JWT_SECRET | JWT secret key | your_jwt_secret_key_here |

#### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | API endpoint | http://localhost:5000/api |

### MongoDB Setup

1. **Local MongoDB**:
```bash
# Install MongoDB locally and run
mongod
```

2. **MongoDB Atlas** (Recommended):
   - Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get connection string
   - Update `MONGODB_URI` in `.env`

### Email Configuration (Gmail)

1. Enable 2-factor authentication on Gmail
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the app password in `EMAIL_PASSWORD`

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
```

Access the application at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

## 🏭 Building for Production

### Backend Build

```bash
cd backend
npm start
```

### Frontend Build

```bash
cd frontend
npm run build
npm run preview
```

The built frontend will be in `frontend/dist/`

## 📡 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?category=fullstack` - Filter by category
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Skills
- `GET /api/skills` - Get all skills (grouped by category)
- `GET /api/skills/:id` - Get single skill
- `POST /api/skills` - Create skill (admin)
- `PUT /api/skills/:id` - Update skill (admin)
- `DELETE /api/skills/:id` - Delete skill (admin)

### Certificates
- `GET /api/certificates` - Get all certificates
- `GET /api/certificates/:id` - Get single certificate
- `POST /api/certificates` - Create certificate (admin)
- `PUT /api/certificates/:id` - Update certificate (admin)
- `DELETE /api/certificates/:id` - Delete certificate (admin)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `GET /api/contact/:id` - Get single message (admin)
- `PUT /api/contact/:id` - Update message status (admin)
- `DELETE /api/contact/:id` - Delete message (admin)

### Health Check
- `GET /api/health` - Server status

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide Icons** - SVG icons
- **PostCSS** - CSS processing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Helmet** - Security headers
- **Cors** - Cross-origin requests
- **Express Rate Limit** - Rate limiting
- **Nodemailer** - Email sending
- **Dotenv** - Environment variables

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎨 Features Breakdown

### Hero Section
- Animated typing effect
- Social media links
- Resume download button
- Profile image with gradient border

### About Section
- Professional summary
- Career goals
- Technical interests
- About image

### Skills Section
- Categorized skills
- Icon representations
- Proficiency levels
- Responsive grid layout

### Projects Section
- Project cards with images
- Technology badges
- GitHub and live demo links
- Feature lists
- Filter by category

### Certifications Section
- Certificate cards with icons
- Issuer and year information
- Achievement statistics
- Links to certificates

### Contact Section
- Contact form with validation
- Email notifications
- Contact information cards
- Social media links

### Dark Mode
- System preference detection
- Manual toggle
- Persistent storage
- Smooth transitions

## 🔒 Security Features

- Helmet headers
- CORS configuration
- Rate limiting
- Input sanitization
- Environment variables

## 📈 Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- CSS minification
- JavaScript minification
- Gzip compression

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**:
```bash
# Check if MongoDB is running
# For local: mongod
# For Atlas: check connection string
```

**Email Not Sending**:
- Verify Gmail 2FA is enabled
- Check app password is correct
- Verify email permissions

**CORS Error**:
- Check CLIENT_URL matches frontend URL
- Verify credentials: true setting

### Frontend Issues

**API Not Connected**:
- Verify VITE_API_URL is correct
- Check backend is running
- Verify network tab in DevTools

**Styling Issues**:
- Clear cache: `npm run build`
- Rebuild Tailwind: `npm install`

**Build Errors**:
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `rm -rf dist && npm run build`

## 📝 License

MIT License - Feel free to use this template for your portfolio

## 👤 Author

**Ayush Kamboj**
- Email: ayush.kamboj@example.com
- LinkedIn: [LinkedIn Profile](https://linkedin.com)
- GitHub: [GitHub Profile](https://github.com)

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)

---

Made with ❤️ by Ayush Kamboj
