export * from "./task.types";

/* 🛢️ Barrel File (index.ts)
---------------------------------------------------
📘 Qué es:
   → Archivo que reexporta módulos/tipos de una carpeta.

🎯 Objetivo:
   → Centralizar y simplificar importaciones.

💡 Ventajas:
   ✅ Importaciones más limpias
   ✅ Mantenimiento más fácil
   ✅ Organización clara

📦 Ejemplo:
   // index.ts
   export * from "./task.types";
   export * from "./user.types";

   // En otro archivo
   import { Task, User } from "../types";
--------------------------------------------------- */
