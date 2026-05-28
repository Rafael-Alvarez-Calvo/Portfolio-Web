# Rafael.AC — Portfolio Personal

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Portfolio personal de Rafael Álvarez Calvo — Frontend Developer & AI Solutions**

[🌐 Ver en vivo](https://rafaelac.dev) · [💼 LinkedIn](https://www.linkedin.com/in/rafael-ac/) · [✉️ Contacto](mailto:rafael.alvarez@hotmail.es)

</div>

---

## 📸 Preview

> _Añade aquí una captura de pantalla del portfolio una vez desplegado_
> `screenshot.png` — reemplaza esta línea con: `![Preview](./screenshot.png)`

---

## ✨ Características

- ⚡ **Vite + React 18 + TypeScript** — stack moderno y rápido
- 🎨 **Tailwind CSS** — diseño dark theme premium con paleta personalizada
- 🔤 **Tipografía** — Syne (títulos) · DM Sans (cuerpo) · Fira Code (código)
- 🎭 **Animaciones scroll** — reveal con Intersection Observer nativo, sin librerías externas
- ⌨️ **Efecto typewriter** — rotación de roles con cursor animado
- 🌀 **Foto con anillo giratorio** — efecto conic-gradient animado
- 📊 **Contadores animados** — stats que cuentan al entrar en viewport
- 📱 **Responsive** — mobile-first, menú hamburguesa incluido
- 🔍 **SEO básico** — meta tags y Open Graph configurados

---

## 🗂️ Secciones

| Sección             | Descripción                                              |
| ------------------- | -------------------------------------------------------- |
| **Hero**            | Presentación con typewriter, foto, stats animados y CTAs |
| **Sobre mí**        | Bio + bloque de código estilo `rafael.config.ts`         |
| **Servicios**       | 6 servicios para clientes (incluida IA destacada)        |
| **Stack técnico**   | Skills organizadas por categoría con pills coloreadas    |
| **Experiencia**     | Timeline animado con CaixaBank, Pisos.com y más          |
| **Proyectos**       | Cards con links directos a proyectos en producción       |
| **Certificaciones** | Bootcamp + 6 certificados de Udemy                       |
| **Contacto**        | Formulario + datos de contacto directos                  |

---

## 🚀 Instalación y uso

### Requisitos

- Node.js `>= 18`
- npm `>= 9`

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/Rafael-Alvarez-Calvo/portfolio.git
cd portfolio

# 2. Instala las dependencias
npm install

# 3. Arranca el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo con HMR
npm run build     # Build para producción (genera /dist)
npm run preview   # Previsualiza el build de producción
```

---

## 📁 Estructura del proyecto

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── rafael.png              # Foto de perfil
│   ├── components/
│   │   ├── Navbar.tsx              # Navegación fija con scroll detection
│   │   ├── Hero.tsx                # Sección principal con typewriter
│   │   ├── About.tsx               # Bio + bloque de código animado
│   │   ├── Services.tsx            # Servicios para clientes
│   │   ├── Skills.tsx              # Stack técnico por categorías
│   │   ├── Experience.tsx          # Timeline de experiencia laboral
│   │   ├── Projects.tsx            # Proyectos destacados
│   │   ├── Certifications.tsx      # Formación y certificados
│   │   ├── Contact.tsx             # Formulario de contacto
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── useReveal.ts            # Hooks: useReveal + useCounter
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                   # Variables CSS + Tailwind + animaciones
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🛠️ Stack técnico

| Tecnología                                      | Uso                              |
| ----------------------------------------------- | -------------------------------- |
| [React 18](https://react.dev/)                  | UI y gestión de estado con hooks |
| [TypeScript 5](https://www.typescriptlang.org/) | Tipado estático                  |
| [Vite 5](https://vitejs.dev/)                   | Bundler y servidor de desarrollo |
| [Tailwind CSS 3](https://tailwindcss.com/)      | Estilos utility-first            |
| [Lucide React](https://lucide.dev/)             | Iconos SVG                       |
| Intersection Observer API                       | Animaciones de scroll nativas    |

---

## 🎨 Personalización

### Cambiar la foto de perfil

Reemplaza el archivo `src/assets/rafael.png` con tu imagen.

### Cambiar los proyectos

Edita el array `projects` en `src/components/Projects.tsx`:

```tsx
const projects = [
  {
    title: "Nombre del proyecto",
    desc: "Descripción breve",
    url: "https://tu-proyecto.com",
    type: "Frontend · React",
    icon: "🚀",
    // ...
  },
];
```

### Conectar el formulario de contacto

El formulario actualmente simula el envío. Para conectarlo en producción:

**Opción A — [EmailJS](https://www.emailjs.com/) (gratis, sin backend)**

```bash
npm install @emailjs/browser
```

```tsx
import emailjs from "@emailjs/browser";

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  await emailjs.sendForm("SERVICE_ID", "TEMPLATE_ID", e.target, "PUBLIC_KEY");
};
```

**Opción B — [Formspree](https://formspree.io/) (aún más simple)**

```tsx
// Cambia el action del form
<form action="https://formspree.io/f/TU_ID" method="POST">
```

### Paleta de colores

Las variables CSS están en `src/index.css`:

```css
:root {
  --bg: #040d1e;
  --blue: #3b82f6;
  --cyan: #06b6d4;
  --purple: #8b5cf6;
  /* ... */
}
```

---

## 🌍 Deploy

### Netlify _(recomendado)_

1. Sube el proyecto a GitHub
2. Ve a [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Configura:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. ✅ Deploy automático en cada push

### Vercel

1. Ve a [vercel.com](https://vercel.com) → **New Project** → importa tu repo
2. Detecta Vite automáticamente ✓
3. ✅ Deploy en segundos

---

## 📬 Contacto

**Rafael Álvarez Calvo**

- 🌐 [rafael.ac](https://rafaelac.dev)
- 💼 [linkedin.com/in/rafael-ac](https://www.linkedin.com/in/rafael-ac/)
- 🐙 [github.com/Rafael-Alvarez-Calvo](https://github.com/Rafael-Alvarez-Calvo)
- ✉️ rafael.alvarez@hotmail.es

---

<div align="center">
  Hecho con ❤️ y mucho React · Madrid, España
</div>
