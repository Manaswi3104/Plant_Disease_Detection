# Portable Mobile Solution for Soyabean Leaf Disease Monitoring
# 🌱 Soybean Leaf Disease Detection App

A mobile application that uses Deep Learning to detect and classify diseases in soybean leaves. Built using **YOLOv5**, **PyTorch**, **React Native (Expo)**, and **FastAPI**.

## 📱 Features

- 📷 Upload or capture leaf images directly from your phone
- 🧠 Real-time disease detection using a YOLOv5 object detection model
- 🌐 FastAPI backend for serving predictions
- 🌾 Helps farmers easily monitor soybean plant health
- 🔁 Trained on a labeled dataset from **Kaggle**

---

## 🧠 Model Training

- Model: `YOLOv5s` (custom-trained)
- Framework: **PyTorch**, **Ultralytics YOLOv5**
- Dataset: Annotated soybean leaf disease dataset from [Kaggle](https://www.kaggle.com/)  
- Trained in: **Google Colab**
- Classes: Healthy, Rust, Bacterial Blight, etc.

---

## 📲 Mobile App (Frontend)

- Built using **React Native with Expo**
- Three screens: `Home`, `About`, and `Predict`
- Users can select or capture an image and get prediction results
- Responsive and mobile-friendly UI

---

## 🔙 Backend (FastAPI)

- Loads the trained YOLOv5 model (`best.pt`)
- Accepts image uploads via POST `/predict`
- Returns detected disease labels with bounding boxes and confidence scores

---

## 📂 Project Structure

SOYBEAN_LEAF_DETECTION/
│
├── soybean_backend/ # FastAPI Backend
│ ├── app/
│ │ ├── main.py
│ │ ├── model.py
│ │ ├── classes.py
│ ├── best.pt # Trained YOLOv5 model
│ └── requirements.txt
│
└── soybean_leaf_app/ # React Native App
├── screens/
│ ├── HomeScreen.tsx
│ ├── AboutScreen.tsx
│ └── PredictScreen.tsx
├── App.tsx
├── package.json
└── tsconfig.json
