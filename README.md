# API REST de Gestión de Espacios de Trabajo

## Descripción

Esta API REST permite crear **espacios de trabajo**, **tableros**, **tarjetas** y **tareas**, emulando la funcionalidad principal de Trello. Proporciona endpoints para gestionar espacios de trabajo, tableros y tarjetas, permitiendo organizar sus proyectos de manera eficiente.

---

## Características

- CRUD de **Espacios de Trabajo**.
- CRUD de **Tableros** dentro de los espacios de trabajo.
- CRUD de **Tarjetas** en los tableros.
- CRUD de **Tareas** en las tarjetas.
- Organización jerárquica:
- **Espacios de Trabajo** → **Tableros** → **Tarjetas** → **Tareas**.
- Gestión de estados de las tareas (To Do, Doing, Done).
- Integración con PostgreSQL para almacenamiento de datos.

---

## Tecnologías Utilizadas

- **Node.js** con Express.js
- **PostgreSQL** como base de datos relacional

---

## Instalación

### Requisitos Previos
- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn instalado

### Pasos

1. Clona este repositorio:
   git clone https://github.com/usuario/api-trello.git
2. Entra en el directorio del proyecto:
   cd server
3. Instala las dependencias:
   npm install
4. Crea un archivo .env en la raíz del proyecto y configura las siguientes variables:
   HOST=localhost
   DATABASE=nombre_base
   DB_PORT=5432
   USER=nombre_usuario
   PASSWORD=contraseña_usuario
5. Inicia el servidor:
   npm start