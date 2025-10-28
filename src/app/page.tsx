// app/page.tsx

import React from "react";
import "./globals.css"; // Asegúrate de tener este archivo si usas CSS global

export default function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Bienvenido a mi sitio</h1>
      <p className="subtitle">Este es un ejemplo usando App Router y TypeScript</p>
      <button className="cta-button">Haz clic aquí</button>
    </main>
  );
}
