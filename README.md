# AI Resume Builder

The AI Resume Builder is a modern SaaS web app that simplifies resume creation using AI-powered generation. Built with **Next.js 15**, **React 19**, and **OpenAI**, it offers a seamless experience with smart features and real-time customization. Users can subscribe to different tiers and manage billing through **Stripe**.

<img src="/public/screen.jpg" alt="Next.js AI Resume Builder" />

## 🌟 Key Features

### ✨ Core Features

| Feature                   | Description                                                                                         |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| **Real-time Saving**      | Automatic saving of changes                                                                         |
| **Drag & Drop 🫳🫴**      | Easily reorder your education and work experience entries with intuitive drag & drop functionality. |
| **Resume Export 🖨️**      | Print or download resumes.                                                                          |
| **User Authentication🔐** | Secure user accounts with Clerk for login and sign up functionality.                                |
| **Form Validation**       | Robust user input validation powered by **Zod**, ensuring accurate and structured data.             |
| **Manage Subscription💲** | Upgrade, cancel, or resubscribe to a plan through the **Stripe** integration.                       |
| **Theme System 🎨**       | ☀️Light - 🌚Dark                                                                                    |

### 🔐 SaaS Subscription

| Section           | Free   | Pro       | Pro Plus   |
| ----------------- | ------ | --------- | ---------- |
| **Max Resumes**   | 1      | 3         | Unlimited  |
| **AI Generation** | ❌     | ✅        | ✅         |
| **Customization** | ❌     | ❌        | ✅         |
| **Price**         | **0$** | **9.99$** | **19.99$** |

### 🔐 AI Generation

| Section             | Description                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Work Experience** | Input a brief 20-character description, and the AI will generate a detailed work experience entry.                                   |
| **Education**       | Provide a short 20-character summary, and the AI will create a comprehensive education section.                                      |
| **Summary**         | The AI synthesizes your personal information, work experiences, education, and skills to generate a compelling professional summary. |

### 🔐 Customization

| Section                     | Description                                                        |
| --------------------------- | ------------------------------------------------------------------ |
| **Photo Styling**           | Customize the photo border (square, circle, semi-circle).          |
| **Skill Badge Styling**     | Customize the appearance of skill badges, similar to photo styling |
| **Primary Color Selection** | Change the primary color 🎨 of the resume.                         |

### 🏗️ Technical Stack

**Frontend**

- Next.js 15 (App Router)
- React 19 with Server Components
- TailwindCSS v4
- ShadCN UI
- vercel/blob for media uploads
- dnd-kit for drag & drop
- zod

**Backend**

- Prisma ORM
- PostgreSQL (NeonDB)
- clerk for authentication
- Server Actions
- OpenAI
- Stripe

## License

MIT License

Copyright (c) [2025] [Naser Almuhana]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall
