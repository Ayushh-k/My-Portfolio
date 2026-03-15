# MongoDB Atlas & JWT Security Setup Guide

To deploy your backend to Vercel, you need a cloud database (MongoDB Atlas) and a secure JWT Secret. Here is how to get both in minutes.

---

## Part 1: How to get your `MONGODB_URI` from MongoDB Atlas

Since Vercel is in the cloud, it cannot connect to your computer's `localhost`. You need a free cloud database.

1. **Create an Account / Login**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up (using Google makes this fast).
2. **Build a Database**:
   - Once logged in, click **"Build a Database"**.
   - Select the **FREE (M0)** tier.
   - Choose a cloud provider (AWS is fine) and a region closest to you.
   - Click **"Create"**.
3. **Security Setup (Crucial!)**:
   - Create a database user. Enter a **Username** and click "Generate Secure Password" (or type your own). **Copy this password! You will need it in step 5.** Click "Create User".
   - Under "Network Access" or "Where would you like to connect from?", select **"My Local Environment"** but change the IP Address to `0.0.0.0/0`. This tells MongoDB to accept requests from anywhere, which is required because Vercel Serverless functions change IP addresses constantly.
   - Click "Finish and Close".
4. **Get your Connection String**:
   - Go to your database deployment dashboard.
   - Click the **"Connect"** button next to your cluster name.
   - Choose **"Drivers"** (Connect your application).
   - Under step 3, you will see your connection string. It looks like this:
     `mongodb+srv://<username>:<pwd>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. **Format the String**:
   - Replace `<username>` with the username you created in step 3.
   - Replace `<pwd>` with the password you copied in step 3. 
   - **Important**: Do not include the `<` or `>` brackets.
   - **Important**: If your password contains an `@` symbol (or other special characters like `#` or `?`), you MUST URL-encode it, otherwise MongoDB will cut off the connection string early. For example, replace `@` with `%40`. If your password is `Ak@123`, you must type `Ak%40123`.
   - *Optional:* Add `/portfolio` right before the `?` so it creates a specific database called "portfolio". Example:
     `mongodb+srv://ayush:MyPassword123@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

**This entire modified string is your `MONGODB_URI` for Vercel.**

---

## Part 2: Your `JWT_SECRET`

A JSON Web Token (JWT) secret is basically a highly secure password that your server uses to encrypt and verify user logins. It should never be guessed. 

I just generated a cryptographically secure 64-character hex string for you to use in production.

**Copy this exact string and paste it into Vercel for your `JWT_SECRET`:**
`6ae7a3c9ca1b1ce2550c4593bac813fff481c7615134397b2a529bb79a2bffa65fcc1fa2ac643d2dc12a6e3044ff52a2e92af611f069efa9cb0e24e6bb74ea03`

---

Once you have both of these, go back to the `DEPLOYMENT_VERCEL.md` guide and paste them into your Vercel Backend Project's Environment Variables!
