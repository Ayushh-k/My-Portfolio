# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently, all endpoints are public. For production, implement JWT authentication.

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Optional success message",
  "data": {},
  "count": 0
}
```

## Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 📁 Projects Endpoints

### Get All Projects

```http
GET /projects
```

**Query Parameters:**
- `category` (optional): Filter by category (fullstack, frontend, backend)
- `featured` (optional): Filter featured projects (true/false)

**Example:**
```http
GET /projects?category=fullstack
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "project_id",
      "title": "Project Title",
      "shortDescription": "Brief description",
      "description": "Full description",
      "imageUrl": "https://...",
      "technologies": ["React", "Node.js"],
      "features": ["Feature 1", "Feature 2"],
      "githubLink": "https://github.com/...",
      "liveLink": "https://...",
      "category": "fullstack",
      "featured": false,
      "order": 0,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Single Project

```http
GET /projects/:id
```

**Parameters:**
- `id` (required): MongoDB ObjectId

**Response:**
```json
{
  "success": true,
  "data": { /* project object */ }
}
```

### Create Project

```http
POST /projects
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Project Title",
  "shortDescription": "Brief description",
  "description": "Full description",
  "imageUrl": "https://...",
  "technologies": ["React", "Node.js"],
  "features": ["Feature 1", "Feature 2"],
  "githubLink": "https://github.com/...",
  "liveLink": "https://...",
  "category": "fullstack",
  "featured": false
}
```

**Response:** *(201 Created)*
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": { /* created project */ }
}
```

### Update Project

```http
PUT /projects/:id
Content-Type: application/json
```

**Request Body:** *(Same as Create)*

**Response:**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": { /* updated project */ }
}
```

### Delete Project

```http
DELETE /projects/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully",
  "data": { /* deleted project */ }
}
```

---

## 🛠️ Skills Endpoints

### Get All Skills

```http
GET /skills
```

**Query Parameters:**
- `category` (optional): Filter by category

**Response:** *(Grouped by category)*
```json
{
  "success": true,
  "data": {
    "Programming Languages": [
      {
        "_id": "skill_id",
        "category": "Programming Languages",
        "name": "Java",
        "proficiency": "Advanced",
        "icon": "",
        "order": 0
      }
    ],
    "Frontend": [
      {
        "_id": "skill_id",
        "category": "Frontend",
        "name": "React.js",
        "proficiency": "Advanced",
        "icon": "",
        "order": 1
      }
    ]
  }
}
```

### Get Single Skill

```http
GET /skills/:id
```

### Create Skill

```http
POST /skills
Content-Type: application/json
```

**Request Body:**
```json
{
  "category": "Programming Languages",
  "name": "Java",
  "proficiency": "Advanced",
  "icon": "fas fa-code",
  "order": 0
}
```

**Valid Categories:**
- Programming Languages
- Frontend
- Backend
- Databases
- Tools
- Version Control

**Valid Proficiency Levels:**
- Beginner
- Intermediate
- Advanced
- Expert

### Update Skill

```http
PUT /skills/:id
```

### Delete Skill

```http
DELETE /skills/:id
```

---

## 🎓 Certificates Endpoints

### Get All Certificates

```http
GET /certificates
```

**Response:**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "cert_id",
      "title": "Full Stack Development",
      "issuer": "Udemy",
      "year": 2024,
      "certificateUrl": "https://...",
      "description": "Comprehensive training",
      "icon": "fas fa-certificate",
      "order": 0,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Get Single Certificate

```http
GET /certificates/:id
```

### Create Certificate

```http
POST /certificates
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Full Stack Development",
  "issuer": "Udemy",
  "year": 2024,
  "certificateUrl": "https://udemy.com/certificate/...",
  "description": "Comprehensive full stack training",
  "icon": "fas fa-certificate"
}
```

### Update Certificate

```http
PUT /certificates/:id
```

### Delete Certificate

```http
DELETE /certificates/:id
```

---

## 💬 Contact Endpoints

### Submit Contact Form

```http
POST /contact
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in discussing a project..."
}
```

**Response:** *(201 Created)*
```json
{
  "success": true,
  "message": "Your message has been sent successfully. I will get back to you soon!",
  "data": {
    "_id": "contact_id",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I'm interested...",
    "status": "new",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/...",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get All Messages (Admin)

```http
GET /contact
```

**Query Parameters:**
- `status` (optional): Filter by status (new, read, replied)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [ /* contact objects */ ]
}
```

### Get Single Message (Admin)

```http
GET /contact/:id
```

**Note:** Automatically marks message as "read"

### Update Message Status (Admin)

```http
PUT /contact/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "replied"
}
```

**Valid Status Values:**
- new
- read
- replied

### Delete Message (Admin)

```http
DELETE /contact/:id
```

---

## 🏥 Health Check

### Server Status

```http
GET /health
```

**Response:**
```json
{
  "status": "Server is running"
}
```

---

## 📝 Request Examples

### cURL

**Get all projects:**
```bash
curl -X GET http://localhost:5000/api/projects
```

**Create a project:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "shortDescription": "Description",
    "description": "Full description",
    "technologies": ["React"],
    "githubLink": "https://github.com/...",
    "category": "fullstack"
  }'
```

**Submit contact form:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "subject": "Hello",
    "message": "Great portfolio!"
  }'
```

### JavaScript/Axios

```javascript
import { projectAPI, skillAPI, certificateAPI, contactAPI } from './api/axiosConfig';

// Get projects
const projects = await projectAPI.getAll();

// Create project
const newProject = await projectAPI.create({
  title: "Project",
  // ... other fields
});

// Submit contact
const response = await contactAPI.submit({
  name: "John",
  email: "john@example.com",
  subject: "Hello",
  message: "Great work!"
});
```

### Postman

1. Import the API collection
2. Set baseUrl variable to `http://localhost:5000/api`
3. Use pre-built requests

---

## 🔐 Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Invalid request | Check request body format |
| 404 | Resource not found | Verify resource ID |
| 500 | Server error | Check backend logs |
| CORS Error | Origin not allowed | Update CLIENT_URL in .env |

---

## 📊 Data Models

### Project
```javascript
{
  title: String (required),
  shortDescription: String (required, max 150 chars),
  description: String (required, max 500 chars),
  imageUrl: String,
  technologies: [String] (required, min 1),
  features: [String],
  githubLink: String (required, valid URL),
  liveLink: String,
  category: String (fullstack, frontend, backend),
  featured: Boolean,
  order: Number,
  timestamps: true
}
```

### Skill
```javascript
{
  category: String (required, enum),
  name: String (required, max 50 chars),
  proficiency: String (Beginner, Intermediate, Advanced, Expert),
  icon: String,
  order: Number,
  timestamps: true
}
```

### Certificate
```javascript
{
  title: String (required, max 100 chars),
  issuer: String (required, max 100 chars),
  year: Number (required, min 2000),
  certificateUrl: String (required, valid URL),
  description: String (max 300 chars),
  icon: String,
  order: Number,
  timestamps: true
}
```

### Contact
```javascript
{
  name: String (required, max 100 chars),
  email: String (required, valid email),
  subject: String (required, max 100 chars),
  message: String (required, 10-1000 chars),
  status: String (new, read, replied),
  ipAddress: String,
  userAgent: String,
  timestamps: true
}
```

---

## 🔄 Rate Limiting

Default rate limit: **100 requests per 15 minutes per IP**

Response headers:
- `X-RateLimit-Limit`: 100
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Reset time in seconds

---

## 🆘 Troubleshooting

### Connection Refused
- Backend not running: `npm run dev` in backend directory
- Port in use: Change `PORT` in .env

### CORS Error
- Check `CLIENT_URL` matches your frontend
- Verify CORS configuration in server.js

### Database Error
- MongoDB not running
- Connection string incorrect
- Database name mismatch

### Email Not Sending
- Gmail credentials invalid
- 2FA not enabled
- App password incorrect

---

## 📮 Contact Support

For API support or questions:
- Email: ayush.kamboj@example.com
- GitHub Issues: [GitHub Repository](https://github.com/ayushkamboj/portfolio)

