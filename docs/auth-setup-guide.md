# 🔐 Google & GitHub Login Setup Guide (Review)

## 📌 Prerequisites

1.  **Open this file in VS Code** (``) so you can read it easily.
2.  **Open your `.env.local` file** in VS Code. It is in the main folder of your project. create if not exist.docs/auth-setup-guide.md

---

## 🟢 Part 1: GitHub Login (Easiest)

**Step 1: Open the Page**
1.  Open this link in your browser: [**Register a new OAuth application**](https://github.com/settings/applications/new).
2.  If asked, log in to your GitHub account.

**Step 2: Fill the Form**
Only fill these 4 fields:
1.  **Application name**: Type `TalkToTaste`    
2.  **Homepage URL**: Type `http://localhost:3000`
3.  **Description**: (Leave blank)
4.  **Authorization callback URL**: Type `http://localhost:3000/api/auth/callback/github`
    *   *Note: This must be exact!*

**Step 3: Get the Keys**
1.  Click the green **Register application** button at the bottom.
2.  On the next page, you will see **Client ID**. It looks like `Ov23li...`.
    *   👉 **Copy this** and paste it into your `.env.local` file as `GITHUB_ID`.
3.  Click the button **Generate a new client secret**.
    *   A long string will appear (e.g., `a1b2c3...`).
    *   👉 **Copy this** immediately and paste it into your `.env.local` file as `GITHUB_SECRET`.

---

## 🔵 Part 2: Google Login

**Step 1: Open Google Cloud**
1.  Open this link: [**Google Cloud Console**](https://console.cloud.google.com/).
2.  Log in with your Google account.
3.  **Agree** to terms of service if asked.

**Step 2: Create a Project**
1.  In the top-left blue bar, click the dropdown next to the Google Cloud logo (it might say "Select a project").
2.  Click **New Project** in the popup top-right.
3.  **Project name**: Type `TalkToTaste`.
4.  Click **Create**.
5.  Wait a few seconds, then click **Select Project** in the notification.

**Step 3: Configure Consent Screen**
1.  In the Search bar at the very top, type `OAuth consent screen` and select the first result.
2.  Select **External** under "User Type".
3.  Click **Create**.
4.  **App Information**:
    *   **App name**: `TalkToTaste`
    *   **User support email**: Select your own email.
5.  Scroll down to **Developer contact information**:
    *   **Email address**: Enter your email again.
6.  Click **Save and Continue** at the bottom.
7.  Click **Save and Continue** again on the "Scopes" page (skip it).
8.  Click **Save and Continue** again on the "Test Users" page (skip it).
9.  Click **Back to Dashboard**.

**Step 4: Create Keys**
1.  On the left menu, click **Credentials**.
2.  Click **+ CREATE CREDENTIALS** at the top.
3.  Select **OAuth client ID**.
4.  **Application type**: Select **Web application**.
5.  **Name**: Leave as `Web client 1` or change to `TalkToTaste Web`.
6.  **Authorized JavaScript origins**:
    *   Click **ADD URI**.
    *   Type: `http://localhost:3000`
7.  **Authorized redirect URIs**:
    *   Click **ADD URI**.
    *   Type: `http://localhost:3000/api/auth/callback/google`
    *   *Note: This must be exact!*
8.  Click **Create**.

**Step 5: Get the Keys**
1.  A popup will appear with "Your Client ID" and "Your Client Secret".
2.  👉 **Copy Client ID** to `.env.local` as `GOOGLE_CLIENT_ID`.
3.  👉 **Copy Client Secret** to `.env.local` as `GOOGLE_CLIENT_SECRET`.

---

## 📝 Part 3: Update `.env.local`

Your `.env.local` file should look exactly like this (replace the values with what you copied):

```bash
# Security Key (Required)
# You can just mash your keyboard for this one, or type minimal "secret123"
AUTH_SECRET="random_string_here_like_super_secret_password_123"

# GitHub Keys
GITHUB_ID="Iv1..."
GITHUB_SECRET="54df..."

# Google Keys
GOOGLE_CLIENT_ID="1234...apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-..."

# Database
MONGODB_URI="your_mongodb_connection_string"
```

---

## ✅ Part 4: Test It

1.  Make sure your server is running: `npm run dev` (restart it if it was already running when you changed `.env.local`).
2.  Go to `http://localhost:3000/login`.
3.  Click **Sign in with GitHub** or **Google**.
4.  It should ask for permission and then log you in!
