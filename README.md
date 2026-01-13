# 📅 Reservation - Restaurant Frontend Application

A modern, responsive restaurant frontend application built with React, TypeScript, and Tailwind CSS. This application provides an elegant dining experience interface for **Everest Dining** restaurant, featuring menu browsing, table reservations, and restaurant information.

> **Note:** This repository contains the **frontend application only**. The backend API is currently in development and will be integrated in future updates.

---

## ✨ Features

- **Home Page**: Hero section, About Us, Restaurant Qualities, Popular Dishes carousel, Team section, Customer Reviews, and Reservation CTA
- **Menu Page**: Category filtering (Breakfast, Starters, Main Course, Snacks, Desserts, Drinks) with responsive grid layout
- **Reservation System**: Multi-step form with date/time selection, table selection, contact details, form validation, and payment options
- **Add to Calendar**: Integration ready for adding reservations to Google Calendar (coming soon)
- **Fully Responsive**: Mobile-first design with modern UI and smooth animations

---

## 🛠️ Tech Stack

### Core Technologies

- **React 19.1.1** - Modern UI library
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.1.7** - Fast build tool and dev server
- **React Router DOM 7.9.5** - Client-side routing

### UI & Styling

- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **shadcn/ui** - Re-usable components built with Radix UI and Tailwind CSS
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **React Icons** - Additional icon support

### Form Management

- **React Hook Form 7.69.0** - Performant form library
- **Zod 4.2.1** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Additional Libraries

- **Axios 1.13.2** - HTTP client (ready for API integration)
- **date-fns 4.1.0** - Date utility library
- **react-day-picker 9.13.0** - Calendar component
- **embla-carousel-react** - Carousel functionality
- **react-hot-toast** - Toast notifications

---

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/     # Reusable components
│   │   ├── ui/        # shadcn/ui components
│   │   └── ...        # Custom components
│   ├── pages/         # Page components
│   ├── types/         # TypeScript definitions
│   └── lib/           # Utility functions
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd restroApp/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist/` directory.

---

## 🔮 Upcoming Features

- **Backend API Integration**: Full backend connectivity for real-time reservations
- **Email Notifications**: Automated confirmation emails
- **Reservation Management**: View and modify existing reservations

---

## 📝 Development Notes

The backend API is currently in development. The frontend is designed to be API-ready with Axios configured for HTTP requests and type definitions prepared for API responses.

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and shadcn/ui**
