# Quick Reference Guide

## 🚀 Start Development (One Command)

```bash
npm run dev
```

This runs both backend (port 5000) and frontend (port 3000) simultaneously.

---

## 📂 Useful Directory Paths

| Path | Purpose |
|------|---------|
| `backend/server.js` | Express server entry |
| `backend/config/database.js` | MongoDB connection |
| `backend/controllers/` | Business logic |
| `backend/models/` | MongoDB schemas |
| `frontend/src/App.jsx` | React app root |
| `frontend/src/components/` | React components |
| `frontend/src/api/axiosConfig.js` | API client |
| `frontend/index.html` | HTML template |

---

## 🔌 API Base URL

```
http://localhost:5000/api
```

---

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLIENT_URL=http://localhost:3000
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=your_gmail@gmail.com
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🛠️ Common Commands

| Command | Location | Purpose |
|---------|----------|---------|
| `npm run dev` | root | Start both servers |
| `npm run backend` | root | Backend only |
| `npm run frontend` | root | Frontend only |
| `npm run dev` | backend | Backend dev server |
| `npm start` | backend | Backend production |
| `npm run dev` | frontend | Frontend dev server |
| `npm run build` | frontend | Build for production |
| `npm run preview` | frontend | Preview production build |

---

## 📊 Test API Endpoints

### Using cURL

```bash
# Get all projects
curl http://localhost:5000/api/projects

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","subject":"Hello","message":"Great portfolio!"}'

# Get all skills
curl http://localhost:5000/api/skills

# Get all certificates
curl http://localhost:5000/api/certificates
```

### Using Postman

1. Create new request
2. Set method to GET/POST
3. URL: `http://localhost:5000/api/projects`
4. Send

---

## 🎨 Component Import Pattern

```javascript
import { Component } from './components';
// OR
import Component from './components/Component.jsx';
```

---

## 📦 Add NPM Package

### Backend
```bash
cd backend
npm install package-name
```

### Frontend
```bash
cd frontend
npm install package-name
```

---

## 🗄️ MongoDB Quick Commands

```bash
# Start MongoDB (local)
mongod

# Connect with MongoDB Shell
mongosh mongodb://localhost:27017/portfolio

# View collections
show collections

# View documents
db.projects.find()
db.skills.find()
db.certificates.find()
db.contacts.find()

# Count documents
db.projects.countDocuments()

# Delete all documents
db.projects.deleteMany({})
```

---

## 🔍 React DevTools

1. Install React DevTools browser extension
2. Open DevTools (F12)
3. Go to "Components" tab
4. Inspect component props and state

---

## 🔍 Network Debugging

1. Open DevTools (F12)
2. Go to "Network" tab
3. Make API call
4. Check request/response

---

## 📱 Responsive Testing

### DevTools Method
1. Press F12
2. Click device toggle toolbar
3. Select device or custom size

### Common Breakpoints
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px

---

## 🎯 File Organization Tips

```
Always follow:
frontend/src/components/ComponentName.jsx
backend/controllers/controllerName.js
backend/models/ModelName.js
backend/routes/routeName.js
```

---

## 🔧 Debug Mode

### Frontend Console
```javascript
// Check API response
fetch('http://localhost:5000/api/projects')
  .then(r => r.json())
  .then(d => console.log(d))

// Check localStorage
console.log(localStorage.getItem('darkMode'))
```

### Backend Console
```javascript
// In any controller
console.log('Variable:', variable)
```

---

## 🚨 Common Errors & Fixes

| Error | Solution |
|-------|----------|
| `ECONNREFUSED` | Backend not running |
| `CORS error` | Check CLIENT_URL in .env |
| `Module not found` | Run `npm install` again |
| `Port in use` | Change PORT in .env |
| `MongoDB error` | Start mongod or check URI |
| `Email not sending` | Check Gmail credentials |

---

## 🌐 Project URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |
| API Base | http://localhost:5000/api |
| Health Check | http://localhost:5000/api/health |
| MongoDB (local) | mongodb://localhost:27017 |

---

## 📋 Git Workflow

```bash
# Initialize (first time)
git init

# Stage changes
git add .

# Commit
git commit -m "Your message"

# Push (after adding remote)
git push origin main
```

---

## 🔑 Project Features Quick Reference

| Feature | Where | How |
|---------|-------|-----|
| Dark Mode | Navbar | Click sun/moon icon |
| Scroll Navigation | Navbar | Click nav links |
| Typing Animation | Hero | Auto displays |
| Contact Form | Contact | Fill & submit |
| Project Filter | Projects | Click filter buttons |
| Social Links | Footer, Hero | Click icons |
| Resume Download | Hero | Click Resume button |

---

## 📊 Component Props

Most components receive:
```javascript
props: {
  isDark: boolean  // Dark mode state
}
```

---

## 🎯 Key Files to Modify

### For Personal Info
- `Hero.jsx` - Name, intro, social links
- `Contact.jsx` - Email, phone, location
- `Footer.jsx` - Copyright, links

### For Content
- `Projects.jsx` - Add/edit projects
- `Skills.jsx` - Add/edit skills
- `Certifications.jsx` - Add/edit certificates

### For Styling
- `tailwind.config.js` - Colors, fonts
- `index.css` - Custom CSS

---

## 🔐 Security Reminders

✅ Never commit .env files
✅ Never share passwords
✅ Use environment variables
✅ Validate user input
✅ Keep dependencies updated

---

## 📈 Performance Tips

- Use React DevTools Profiler
- Check Network tab for slow requests
- Minimize bundle size
- Use lazy loading
- Cache API responses

---

## 🚀 Deployment Quick Links

- [Vercel](https://vercel.com) - Frontend hosting
- [Render](https://render.com) - Backend hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database

---

## 💡 Pro Tips

1. **Keep API errors in console** - Use for debugging
2. **Use Postman** - Test APIs before frontend
3. **MongoDB Compass** - Visualize database
4. **React DevTools** - Debug components
5. **Git commits** - Commit often with clear messages

---

## 📞 Getting Help

1. Check browser console for errors
2. Check backend console for errors
3. Review README.md
4. Review API_DOCUMENTATION.md
5. Check MongoDB connection
6. Verify .env files

---

## ✅ Pre-Deployment Checklist

- [ ] All env variables set
- [ ] Database configured
- [ ] Email working
- [ ] Frontend builds successfully
- [ ] Backend runs without errors
- [ ] API endpoints tested
- [ ] Contact form works
- [ ] Dark mode works
- [ ] Responsive on all devices
- [ ] No console errors

---

## 🎉 Ready to Go!

You have everything you need. Start building! 

```bash
npm run dev
```

---

**Last Updated**: 2024
**Version**: 1.0.0

