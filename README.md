🚀 Live Demo: [https://miniarchi.vercel.app]((https://mini-archi.vercel.app/chat))
# 🏛️ MiniArchi

**Your AI-powered architectural assistant**

MiniArchi is a web-based AI assistant designed to help architects, builders, and designers with ideas, guidance, and structural insight. From tiny sheds to ambitious megastructures, MiniArchi assists with creativity, technical clarity, and inspiration.

## 🚀 Live Demo

👉 [Visit MiniArchi on Vercel](https://mini-archi.vercel.app/chat)

## ✨ Features

- 🤖 AI chat powered by OpenAI API (via `@ai-sdk/react`)
- 🌐 Modern animated UI using Framer Motion and Tailwind CSS
- 🎨 Particle-based background with tsParticles
- 📱 Fully responsive and mobile-friendly
- 🏗️ Deep architectural knowledge, contextual answers, and design tips

## 🛠️ Built With

- **Next.js (App Router)**
- **TypeScript**
- **React**
- **Tailwind CSS**
- **Framer Motion**
- **@ai-sdk/react**
- **tsParticles**

## 📁 Project Structure
app/
├── components/
│ └── ChatComponent.tsx # Main chat interface
│ └── DotParticles.tsx # Animated background
├── page.tsx # Landing page
├── chat/page.tsx # Chat page
public/
├── icon.png # Custom logo

bash
Copy
Edit

## ⚙️ Setup

```bash
git clone https://github.com/yourusername/miniarchi.git
cd miniarchi
npm install
Create a .env.local file:

env
Copy
Edit
OPENAI_API_KEY=your-api-key-here
Then run the app:

bash
Copy
Edit
npm run dev
📦 Deployment
Deployed via Vercel. Push to main and Vercel handles the rest.

📸 Screenshots
<img src="public/screenshot.png" width="600" alt="MiniArchi screenshot">
🧠 Inspiration
This project aims to make architectural ideation easier and more accessible. MiniArchi encourages creativity, realism, and inclusive design.
