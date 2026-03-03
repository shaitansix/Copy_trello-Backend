# Mi Trello

Sistema de gestión de tareas basado en metodología Kanban, diseñado bajo arquitectura desacoplada React-Express con modelado relacional en PostgreSQL y exposición de API REST para administración estructurada de espacios de trabajo, tableros, tarjetas y tareas.

---

## Proyecto Completo

Este repositorio corresponde únicamente al `backend` del sistema.

Aquí se implementa la API REST encargada de gestionar espacios de trabajo, tableros, tarjetas y tareas, así como la persistencia de datos en PostgreSQL.

Video demostración: [Mi Trello - Video](https://www.youtube.com/watch?v=it5sgFNkJ3w)  
Repositorio Backend: [Mi Trello - Backend](https://github.com/shaitansix/Copy_trello-Backend)  
Repositorio Frontend: [Mi Trello - Frontend](https://github.com/shaitansix/Copy_trello-Frontend)  
Demo en producción: [Mi Trello](https://copy-trello-frontend.vercel.app)

---

## Arquitectura del Sistema

Descripción general de la arquitectura del proyecto:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express (API REST)
- **Base de datos:** PostgreSQL
- **DevOps / Herramientas:** Docker, Git, GitHub

### Descripción adicional

El sistema sigue una arquitectura desacoplada cliente–servidor donde el frontend desarrollado en React consume los endpoints expuestos por el backend mediante solicitudes HTTP.

La información se modela en una base de datos relacional (PostgreSQL), donde cada entidad del sistema (espacio de trabajo, tablero, tarjeta y tarea) corresponde a una tabla con relaciones estructuradas.

El frontend gestiona el estado de la interfaz y renderiza dinámicamente los datos obtenidos desde la API, manteniendo separación clara de responsabilidades entre capa de presentación y lógica de negocio.

---

## Funcionalidades Principales

- Exposición de API REST segmentada por recursos (Workspace, Board, Card, Task).
- Implementación de operaciones CRUD completas por entidad.
- Modelado relacional con asociaciones 1:N entre las entidades principales.
- Persistencia estructurada de datos en PostgreSQL.
- Validación básica de datos en operaciones de creación y actualización.
- Organización modular del código por dominio (rutas, controladores y modelos).
- Manejo de solicitudes HTTP y respuestas estructuradas en formato JSON.

---

## Aspectos Técnicos Destacados

- Diseño de API REST desacoplada bajo arquitectura cliente-servidor.
- Modelado relacional estructurado con integridad referencial entre entidades (Workspace → Board → Card → Task).
- Organización modular del backend por capas (rutas, controladores y modelos).
- Segmentación de endpoints por dominio, manteniendo separación clara de responsabilidades.
- Persistencia de datos en PostgreSQL con correspondencia directa entre modelos y tablas.
- Definición de múltiples endpoints por entidad (5 para Workspace, 6 para Board, 7 para Card y 9 para Task).
- Manejo estructurado de solicitudes y respuestas HTTP en formato JSON.
- Preparación del entorno para despliegue mediante configuración de variables de entorno.

---

## Opciones de Despliegue

### Usando Docker

```bash
```

### Usando git clone

```bash
```
