# Ultimate Vercel Deployment Guide for MERN Portfolio

Because your project is a Monorepo containing both a dedicated Node/Express backend (`/backend`) and a Vite React frontend (`/frontend`), deploying both components correctly requires treating them as **two separate projects** in Vercel. This is the industry-standard approach to guarantee dependencies compile correctly!

I have automatically created the correct `vercel.json` configuration files inside both your frontend and backend directories to ensure smooth routing.

Follow these step-by-step instructions:

---

## Part 1: Deploy the Backend (API) first!
*We deploy the backend first so we can grab its live URL to pass to the frontend.*

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"**.
2. **Import** your connected GitHub repository containing this portfolio.
3. In the "Configure Project" screen, you must change the **Root Directory**. 
   - Click "Edit" next to Root Directory.
   - Select the `backend` folder.
   - Click "Save".
4. Expand the **Environment Variables** section. Add all the required variables securely from your local backend `.env`:
   - `MONGO_URI` = `your_mongodb_connection_string`
   - `JWT_SECRET` = `your_secret`
   - *Note: Leave `CLIENT_URL` empty for now until the frontend is deployed. You can update it later!*
5. Click **Deploy**. Vercel will detect the `backend/vercel.json` I created and automatically deploy your Express API as serverless functions.
6. Once deployed, copy the **live production URL** (e.g., `https://ayush-portfolio-backend.vercel.app`).

---

## Part 2: Deploy the Frontend (UI)

1. Return to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"** again.
2. **Import** the exact same GitHub repository.
3. In the "Configure Project" screen, change the **Root Directory**!
   - Click "Edit" next to Root Directory.
   - Select the `frontend` folder.
   - Click "Save".
4. Vercel will automatically detect that you are using **Vite** and configure the build settings correctly (`npm run build`).
5. Expand the **Environment Variables** section. Add the API connection variable so your UI can talk to your new live database:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url-from-part-one.vercel.app/api` **(Make sure to append /api!)**
6. Click **Deploy**. Vercel will build your React application using the `frontend/vercel.json` I created to handle your Client-Side Routing correctly.
7. Once completed, your frontend is beautifully live!

---

## Part 3: Final Security Handshake (CORS)

Now that both are live, your frontend is trying to talk to the backend, but the backend might block it due to CORS (Cross-Origin Resource Sharing).

1. Go back to your **Backend Project** in Vercel.
2. Navigate to **Settings** -> **Environment Variables**.
3. Add or update the variable:
   - Name: `CLIENT_URL`
   - Value: `https://your-new-frontend-url.vercel.app` *(No trailing slash!)*
4. Go to the **Deployments** tab and click the three dots next to the most recent deployment -> **"Redeploy"** so the new environment variable takes effect.

### Congratulations! Your Full Stack Cyber Portfolio is now online! 🚀
