# 📘 English Janala – Vocabulary Learning App

English Janala is an interactive vocabulary learning web application that helps users improve their English skills by exploring words level-by-level. Users can view meanings, pronunciation, examples, and save their favorite words.

---

## 🌐 Live Demo

🔗 https://swarna-saha324.github.io/english-jounala/

---





# Project Screenshot

![Project Screenshot](https://i.ibb.co.com/0R9dPG2g/Screenshot-2026-03-21-000730.png)

---

## ⚙️ Technologies Used

- HTML5  
- CSS3  
- JavaScript (ES6)  
- REST API  
- Browser SpeechSynthesis API  

---

## ✨ Key Features

- 📚 Dynamic Lesson Levels (Loaded from API)
- 🧠 Vocabulary Cards (Word, Meaning, Pronunciation)
- 🎯 Active Level Highlight
- 🔍 Search Functionality
- 📦 Word Details Modal (Example, Synonyms)
- ❤️ Save Words Feature
- 🔊 Voice Pronunciation
- ⏳ Loading Spinner
- ⚠️ Error Handling (No data / invalid values)

---

## 🔗 API Endpoints

#### Get All Levels                                                      https://openapi.programming-hero.com/api/levels/all       
#### Get Words by Level         https://openapi.programming-hero.com/api/level/{id}

Example:
https://openapi.programming-hero.com/api/level/5     
#### Get All Words     https://openapi.programming-hero.com/api/words/all 
---

## 📦 Dependencies

This project uses:
- Vanilla JavaScript (No external libraries)

---

## 🛠️ How to Run Locally

1. Clone the repository:git clone https://github.com/Swarna-Saha324/english-jounala.git
2. Navigate to the project folder: cd english-jounala 
3. Open `index.html` in your browser

---

## 🔊 Voice Pronunciation Function

```javascript
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
}
