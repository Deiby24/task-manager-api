#  Task Manager API

API REST desarrollada con **Node.js + Express** para gestionar tareas.
Incluye validación de datos, manejo de errores, seguridad básica y funcionalidades adicionales como paginación y filtros.

---

##  Tecnologías

* Node.js
* Express
* Zod (validación de datos)
* Helmet (seguridad HTTP)
* express-rate-limit (limitación de solicitudes)
* dotenv

---

##  Estructura del proyecto

```
src/
│── app.js
│
├── routes/
│   └── tasks.routes.js
│
├── controllers/
│   └── tasks.controller.js
│
├── middlewares/
│   ├── validate.js
│   ├── errorHandler.js
│   └── logger.js
│
├── data/
│   └── store.js
```

---

##  Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd task-manager-api
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` o copia el.env.example para tu .env:

```env
PORT=3000
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

4. Ejecutar el proyecto:

```bash
npm run dev
```

o:

```bash
node src/app.js
```

---

##  Health Check

**GET** `/health`

```json
{
  "status": "ok"
}
```

---

##  Endpoints

### 🔹 Crear tarea

**POST** `/api/tasks`

```json
{
  "title": "Preparar informe",
  "description": "Informe semanal",
  "status": "pending"
}
```

**Respuestas:**

* `201 Created`
* `400 Bad Request`

---

### 🔹 Listar tareas

**GET** `/api/tasks`

**Parámetros opcionales:**

```
status=pending
page=1
limit=10
```

Ejemplo:

```
/api/tasks?status=pending&page=1&limit=10
```

**Respuesta:**

* `200 OK`

---

### 🔹 Obtener tarea por ID

**GET** `/api/tasks/:id`

**Respuestas:**

* `200 OK`
* `404 Not Found`

---

### 🔹 Actualizar estado

**PATCH** `/api/tasks/:id/status`

```json
{
  "status": "done"
}
```

**Respuestas:**

* `200 OK`
* `400 Bad Request`
* `404 Not Found`

---

### 🔹 Eliminar tarea

**DELETE** `/api/tasks/:id`

**Respuestas:**

* `204 No Content`
* `404 Not Found`

---

##  Validaciones

* `title`: obligatorio, entre 3 y 100 caracteres
* `description`: opcional, máximo 300 caracteres
* `status`: valores permitidos:

  * `pending`
  * `in_progress`
  * `done`
* `createdAt`: generado automáticamente

---

##  Seguridad

* Uso de **Helmet** para cabeceras HTTP seguras
* Rate limiting para prevenir abuso
* Validación de entradas con Zod
* No se exponen errores internos en producción

---

##  Funcionalidades adicionales

* ✅ Paginación
* ✅ Filtro por estado
* ✅ Logger de solicitudes
* ✅ Manejo global de errores
* ✅ Uso de variables de entorno
* ✅ Arquitectura modular

---

##  Ejemplos con cURL

### Crear tarea

```bash
curl -X POST http://localhost:3000/api/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Preparar informe","description":"Generar informe semanal"}'
```

---

### Listar tareas

```bash
curl http://localhost:3000/api/tasks
```

---

### Obtener por ID

```bash
curl http://localhost:3000/api/tasks/1
```

---

### Actualizar estado

```bash
curl -X PATCH http://localhost:3000/api/tasks/1/status \
-H "Content-Type: application/json" \
-d '{"status":"done"}'
```


---

### Eliminar tarea

```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

---

##  Estado del proyecto

*  Cumple todos los requerimientos de la prueba
*  Incluye mejoras adicionales

---

##  Autor

Desarrollado como prueba técnica backend con Node.js + Express.
