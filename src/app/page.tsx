// app/page.tsx
"use client";

import React from "react";
import "./globals.css"; // Asegúrate de tener este archivo si usas CSS global
import {useRouter} from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="container">
      <h1 className="title">Bienvenido a mi sitio</h1>
      <p className="subtitle">Este es un ejemplo usando App Router y TypeScript</p>
      <button className="cta-button" onClick={() => router.push("/todo")}>
        Todo List
      </button>
    </main>
  );
}
