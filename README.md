# 🐷 OinkPlan

**Free Trading Strategy Platform**

OinkPlan is an open-source frontend application built with React that helps you plan your future investments easily and securely. Select time ranges and explore various options to define your strategies in a modern and responsive interface.

> 🎓 **Educational Purpose:** This open-source project is fundamentally built with educational objectives at its core. It serves as a practical example of modern frontend web development practices.

🔗 **Live Demo:** [https://oink-plan.pages.dev](https://oink-plan.pages.dev)

---

## 🛠️ Tech Stack & Architecture

This project is built using a modern, lightweight, and highly optimized tech stack:

- **React** (v19) - Core library for building the user interface.
- **TypeScript** - Strongly typed programming language.
- **Vite** - Lightning-fast build tool and development server.
- **Tailwind CSS** (v4) - Utility-first CSS framework for rapid UI styling.
- **DaisyUI** - Tailwind CSS components plugin.
- **Zustand** - Minimalist, fast, and scalable state management.

### ⚡ Performance Optimization: Granular Selectors

A major architectural focus of this project is learning and implementing performance optimizations. Specifically, we heavily emphasize the use of **granular selectors** when consuming global state with Zustand.

By strategically subscribing only to the exact slices of state that a component requires, we prevent unnecessary re-renders across the React component tree. This ensures the application remains highly performant and responsive, serving as an excellent educational showcase of efficient state management.

---

## 🤝 Contributing

Contributions are warmly welcomed and encouraged! Because this project prioritizes learning and education, it is a great environment to practice your skills, propose improvements, and collaborate with others.

If you have ideas to improve the platform, refactor code, or add new features, please don't hesitate to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📦 Available Scripts

In the project directory, you can run:

- **`pnpm dev`** - Start the development server with hot-reload.
- **`pnpm build`** - Build the app for production to the `dist` folder.
- **`pnpm preview`** - Locally preview the production build.
- **`pnpm lint`** - Run ESLint to maintain code quality.
