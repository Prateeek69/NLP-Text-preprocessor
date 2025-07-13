# 📝 Text Preprocessor Web App

A full-stack machine learning web application that allows users to upload or paste text, and receive a cleaned, preprocessed version. It supports `.txt` file uploads or direct text input, all processed using a custom-trained Keras preprocessing model hosted on a FastAPI backend.

![Made with React](https://img.shields.io/badge/frontend-React-blue.svg)
![Backend FastAPI](https://img.shields.io/badge/backend-FastAPI-green.svg)
![Deployment](https://img.shields.io/badge/deployed-Vercel%20%26%20Render-purple.svg)

---
What is NLP text pre-processing : https://medium.com/@prateeek44/from-raw-text-to-ready-data-text-preprocessing-in-nlp-1608e08f750b

---
## 🚀 Features

- 📄 Upload `.txt` files or paste raw text  
- 🔄 Displays both raw and processed text side-by-side  
- 📋 Copy processed text or ⬇️ download as file  
- ⚡ Drag-and-drop support  
- 🔄 Live loading spinner & toast notifications  
- 🧑‍💻 GitHub link in UI for quick source access  

---

## 🧹 Preprocessing Pipeline (Model)

⚙️ All text is processed using a Keras `.keras` model trained with:

- 🧠 **Emoji Handling**  
- 💬 **Slang Expansion**  
- 📝 **Spelling Correction** via TextBlob  
- ✂️ **Stop Word Removal** using NLTK  
- 🔗 **URL Removal**  
- 🧼 **HTML Tag Stripping**  
- ❌ **Punctuation Removal**  
- 🔠 **Lowercasing**  
- 📏 **Extra Whitespace Cleanup**

> Text is cleaned and standardized before returning it in real-time.

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
## 👨‍💻 Author  
Made by [Prateeek69](https://github.com/Prateeek69) 😼
