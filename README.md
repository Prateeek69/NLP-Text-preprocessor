# 📝 Text Preprocessor Web App

A full-stack machine learning web application that allows users to upload or paste text, and receive a cleaned, preprocessed version. It supports `.txt` file uploads or direct text input, all processed using a custom-trained Keras preprocessing model hosted on a FastAPI backend.

![Made with React](https://img.shields.io/badge/frontend-React-blue.svg)
![Backend FastAPI](https://img.shields.io/badge/backend-FastAPI-green.svg)
![Deployment](https://img.shields.io/badge/deployed-Vercel%20%26%20Render-purple.svg)

---

## 🚀 Features

- 📄 Upload `.txt` files or paste raw text
- ⚙️ Processes text using a deep learning model (`.keras`) trained with:
  - Emoji handling
  - Slang expansion
  - TextBlob + NLTK cleaning
- 🔄 Displays both raw and processed text side-by-side
- 📋 Copy processed text or ⬇️ download as file
- ⚡ Drag-and-drop support
- 🔄 Live loading spinner & toast notifications
- 🧑‍💻 GitHub link in UI for quick source access

---

## 🛠️ Tech Stack

### Frontend
- **React** (with `axios`, `react-toastify`, `react-icons`, `react-spinners`)
- Hosted on **Vercel**

### Backend
- **FastAPI**
- Keras `.keras` text preprocessing model
- Hosted on **Render**

---

## 🧪 Try It Out

- **Live App**: [text-preprocessor.vercel.app](https://text-preprocessor.vercel.app)
- **API Docs**: [text-preprocessor-api.onrender.com/docs](https://text-preprocessor-api.onrender.com/docs)

---

## 📦 .env Setup

In your React project root, create a `.env` file:

```env
REACT_APP_API_BASE_URL= your own api's link
```
Don't forget to add this to Vercel's Environment Variables tab for deployments!

⚙️ Setup & Run Locally
```bash
npm install
npm start
```
