# 📚 Cursos ENS — Fullstack App with Next.js, Prisma & Clerk

Una aplicación fullstack construida con tecnologías modernas para gestionar cursos y usuarios autenticados. Este proyecto combina un frontend dinámico con un backend robusto, todo en TypeScript.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Made with](https://img.shields.io/badge/made%20with-TypeScript-blue)

## 🚀 Stack Tecnológico

- **Frontend**: [Next.js](https://nextjs.org/) + [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: Next.js API Routes + [Prisma ORM](https://www.prisma.io/) + PostgreSQL
- **Auth**: [Clerk](https://clerk.dev/)
- **Validación**: [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Package Manager**: Yarn
- **Lenguaje**: TypeScript

## 📦 Instalación

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/cursos-ens.git
cd cursos-ens

# Instala dependencias
yarn install

# Configura variables de entorno
cp .env.example .env
```

## 🔐 Variables de entorno
Asegúrate de configurar correctamente tu archivo .env
```
CLERK_SECRET_KEY=5554454546541klmdcnijknDCVSIJKNdscvjiksD154654...EXAMPLE
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=5554454546541klmdcnijknDCVSIJKNdscvjiksD154654...EXAMPLE
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

DATABASE_URL=postgresql://your-database-url.com
```

## 🧪 Scripts útiles
```bash
# Ejecutar en desarrollo
yarn dev

# Generar cliente Prisma
yarn prisma generate

# Ejecutar migraciones
yarn prisma migrate dev

# Linting
yarn lint
```

## 🧱 Estructura del proyecto
├── prisma/              # Esquema y migraciones
├── src/
│   ├── app/             # Rutas y páginas Next.js
│   ├── components/      # Componentes UI reutilizables
│   ├── lib/             # Funciones utilitarias
│   ├── middleware.ts    # Clerk middleware
│   └── styles/          # Archivos Tailwind y globals
├── public/              # Assets públicos
├── .env                 # Variables de entorno
├── README.md

## 🧠 Filosofía del proyecto
Este proyecto prioriza:
- Escalabilidad: Arquitectura modular y mantenible
- Seguridad: Autenticación robusta con Clerk
- Estética: UI moderna con shadcn y Tailwind
- Validación estricta: Zod para inputs seguros

## 🛠️ Autor
Errold — Backend y frontend developer apasionado por entornos elegantes y eficientes.

## ✉️ Contacto
[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin)](https://linkedin.com/in/errold-núñez-sánchez) 
[![Email](https://img.shields.io/badge/Email-ErroldNúñezS-D14836?logo=gmail)](mailto:errold222@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Chat%20conmigo-25D366?logo=whatsapp&logoColor=white)](https://wa.me/50672117802)

## 📄 Licencia
Este proyecto está bajo la licencia MIT.
