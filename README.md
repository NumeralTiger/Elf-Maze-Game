# 🧝‍♂️ Elf Maze Game

A festive, time-based maze game built with HTML, CSS, and JavaScript specifically created for the AWS Game Challenge.

## 🎮 Gameplay

![Gameplay Screenshot](https://github.com/user-attachments/assets/bb266e45-5feb-4fbb-b17c-06050d70d488)

You play as **Eli**, a lost elf far from Santa's Workshop on Christmas Eve. Your job? Guide Eli through three tricky and randomly generated mazes before time runs out. Each maze gets harder. You've got **2 minutes total** to save Christmas.

**Features:**

* 🎲 Random maze generation using Depth-First Search (DFS)
* ⏱️ Countdown timer 
* 🧠 Increasing maze complexity (10×10 → 14×14 → 20×20)
* 🧝 Custom elf character
* 🎇 Festive background with fireworks
* 📱 Click-through story

---

## 📂 Project Structure

```
Elf-Maze-Game/
├── fun-elf-maze-game/
│   ├── images/
│   │   ├── elf.png
│   │   └── fireworks.webp
│   ├── index.html        # Game HTML
│   ├── script.js         # Game logic
│   └── styles.css        # Styling
└── README.md  
```

---

## ⚙️ How It Works

* Maze is generated with a recursive DFS backtracking algorithm.
* Movement is via arrow keys and blocked by walls unless paths are open.
* Player sprite is drawn on the canvas.
* Timer is synced with gameplay and ends the game if time runs out.
* Clicks initiate the narrative intro before gameplay begins.

---

## 💡 Inspiration

This project was designed around the idea of blending complex algorithms (DFS maze generation) with a festive experience to make something fun, challenging, and technical. 

---

## 🚀 How to Run

1. Clone the repo
2. Open `index.html` in your browser
3. Click to progress through the intro
4. Use arrow keys to move Eli through the maze
5. (MOST IMPORTANTLY) Have Fun :)

---

## 📌 Tech Stack

* **JavaScript** (Core game logic)
* **HTML** (For drawing maze and character)
* **CSS** (Beautiful design and theming)

---

## 🔪 Status

🔜 Features to add in the future: mobile controls, score history, sound effects
