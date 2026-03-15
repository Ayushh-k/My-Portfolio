# 🚀 Getting Started Guide

## Quick Start

Follow these steps to get your portfolio website up and running:

### Step 1: Prerequisites Installation

1. **Install Node.js**: Download from [nodejs.org](https://nodejs.org) (v16 or higher)
   - Verify installation: `node --version` and `npm --version`

2. **Install MongoDB**:
   - Option A: [Local MongoDB](https://docs.mongodb.com/manual/installation/)
   - Option B: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Recommended)

3. **Gmail Setup** (for contact notifications):
   - Enable 2-factor authentication
   - Generate [App Password](https://myaccount.google.com/apppasswords)

### Step 2: Clone & Setup

```bash
# Navigate to your portfolio directory
cd c:\B-tech\Portfolio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 3: Environment Configuration

**Backend (.env)**:
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
CLIENT_URL=http://localhost:3000
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=your_gmail@gmail.com
JWT_SECRET=your_secret_key_12345
JWT_EXPIRE=7d
```

**Frontend (.env)**:
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Database Setup

**If using Local MongoDB**:
```bash
# Start MongoDB
mongod

# In another terminal, you can use MongoDB Compass to view data
```

**If using MongoDB Atlas**:
1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Replace `MONGODB_URI` in `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### Step 5: Run the Application

**Terminal 1 - Backend**:
```bash
cd backend
npm run dev
# Backend will run on http://localhost:5000
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
# Frontend will run on http://localhost:3000
```

**Terminal 3 - MongoDB** (if local):
```bash
mongod
```

### Step 6: Verify Everything Works

1. Open browser: `http://localhost:3000`
2. You should see your portfolio website
3. Test dark mode toggle
4. Test contact form (check console for messages)
5. Verify API call in browser DevTools Network tab

## 📝 Customization

### Update Personal Information

Edit `frontend/src/components/Hero.jsx`:
```javascript
// Update name, title, introduction
// Update social media links
// Replace profile image URL
```

Edit `frontend/src/components/Contact.jsx`:
```javascript
// Update email address
// Update phone number
// Update location
// Update social links
```

### Add Your Projects

**Option 1: Via API** (Recommended for production):

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your Project",
    "shortDescription": "Brief description",
    "description": "Full description",
    "technologies": ["React", "Node.js"],
    "features": ["Feature 1", "Feature 2"],
    "githubLink": "https://github.com/yourusername/project",
    "liveLink": "https://project-demo.com",
    "category": "fullstack",
    "imageUrl": "https://via.placeholder.com/400x250"
  }'
```

**Option 2: Modify Default Data** (Quick for development):

Edit `frontend/src/components/Projects.jsx` - update the `defaultProjects` array

### Update Skills

Edit `frontend/src/components/Skills.jsx` - update the default skills object

### Update Certifications

Edit `frontend/src/components/Certifications.jsx` - update the default certificates array

### Customize Colors

Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#your_color',
  secondary: '#your_color',
}
```

### Update Images

1. Replace placeholder URLs with your images
2. Update in each component file

## 🔧 Useful Commands

### Backend
```bash
npm run dev          # Start with nodemon (auto-refresh)
npm start           # Start server
npm test            # Run tests
```

### Frontend
```bash
npm run dev         # Start dev server
npm run build       # Create production build
npm run preview     # Preview production build
npm run lint        # Check code quality
```

## 📊 Database Management

### MongoDB Compass (GUI)

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to your database
3. View and manage collections
4. Test queries

### MongoDB Shell (CLI)

```bash
# Connect to local database
mongosh mongodb://localhost:27017/portfolio

# View collections
show collections

# View documents
db.projects.find()
db.skills.find()
db.certificates.find()
db.contacts.find()
```

## 🚀 Deployment

### Deploy Backend

**Option 1: Render.com**
1. Push code to GitHub
2. Connect GitHub to Render
3. Add environment variables
4. Deploy

**Option 2: Heroku**
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_url
```

**Option 3: Railway.app**
1. Connect GitHub
2. Add MongoDB plugin
3. Set environment variables
4. Deploy

### Deploy Frontend

**Option 1: Vercel**
```bash
npm install -g vercel
vercel
```

**Option 2: Netlify**
1. Connect GitHub to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

**Option 3: GitHub Pages**
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 🐛 Common Issues & Solutions

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill process
kill -9 <PID>
```

### MongoDB Connection Failed
- Check if MongoDB is running
- Verify connection string in .env
- Check firewall settings

### CORS Errors
- Verify CLIENT_URL matches frontend
- Check backend CORS configuration

### Email Not Working
- Verify Gmail 2FA enabled
- Check App Password is correct
- Check SMTP settings

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Tutorial](https://www.mongodb.com/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

## 💡 Tips & Best Practices

1. **Regular Commits**: Commit changes frequently
2. **Environment Variables**: Never commit .env files
3. **API Documentation**: Keep API docs updated
4. **Code Reviews**: Review code before merging
5. **Testing**: Test locally before deploying
6. **Backups**: Backup MongoDB regularly

## 🆘 Getting Help

1. Check [README.md](./README.md) for detailed documentation
2. Review component code comments
3. Check browser console for errors
4. Use MongoDB Compass to inspect data
5. Use Postman to test API endpoints

## ✅ Checklist

- [ ] Node.js installed and verified
- [ ] MongoDB installed and running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] Backend running on :5000
- [ ] Frontend running on :3000
- [ ] Portfolio loads in browser
- [ ] Dark mode works
- [ ] Contact form works
- [ ] API calls successful

---

You're all set! 🎉 Start customizing your portfolio and showcasing your skills!

