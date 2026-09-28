# Pruebas de la API con curl

> Base URL: `http://localhost:8081`  
> Asegúrate de tener el servidor corriendo con `npm start` antes de ejecutar estos comandos.

---

## 📋 CLIENTES (`/api/customer`)

### 1. Crear un cliente
```bash
curl -s -X POST http://localhost:8081/api/customer/create \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Diego",
    "apellido": "Rojas",
    "direccion": "Zona 1, Ciudad de Guatemala",
    "correo": "diego.rojas@correo.com",
    "telefono": "5555-1234",
    "ingreso": "2024-01-15",
    "status": true
  }' | python3 -m json.tool
```

### 2. Listar todos los clientes
```bash
curl -s http://localhost:8081/api/customer/ | python3 -m json.tool
```

### 3. Buscar clientes por nombre (filtro)
```bash
curl -s "http://localhost:8081/api/customer/?nombre=diego" | python3 -m json.tool
```

### 4. Listar solo clientes activos (status=true)
```bash
curl -s http://localhost:8081/api/customer/status | python3 -m json.tool
```

### 5. Obtener un cliente por ID
```bash
# Reemplaza 1 con el ID real devuelto al crear el cliente
curl -s http://localhost:8081/api/customer/1 | python3 -m json.tool
```

### 6. Actualizar un cliente
```bash
curl -s -X PUT http://localhost:8081/api/customer/update/1 \
  -H "Content-Type: application/json" \
  -d '{
    "telefono": "5555-9999",
    "direccion": "Zona 10, Ciudad de Guatemala"
  }' | python3 -m json.tool
```

### 7. Eliminar un cliente por ID
```bash
curl -s -X DELETE http://localhost:8081/api/customer/delete/1 | python3 -m json.tool
```

### 8. Eliminar TODOS los clientes
```bash
curl -s -X DELETE http://localhost:8081/api/customer/delete | python3 -m json.tool
```

---

## 🏭 PROVEEDORES (`/api/supplier`)

### 1. Crear un proveedor
```bash
curl -s -X POST http://localhost:8081/api/supplier/create \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "TechDistribuciones S.A.",
    "contacto": "Carlos López",
    "correo": "ventas@techdist.com",
    "telefono": "2222-3333",
    "direccion": "Zona 9, Guatemala",
    "status": true
  }' | python3 -m json.tool
```
> **Guarda el `id` devuelto** (ej: `1`), lo necesitarás para crear productos asociados.

### 2. Listar todos los proveedores
```bash
curl -s http://localhost:8081/api/supplier/ | python3 -m json.tool
```

### 3. Buscar proveedores por nombre (filtro)
```bash
curl -s "http://localhost:8081/api/supplier/?nombre=tech" | python3 -m json.tool
```

### 4. Listar solo proveedores activos
```bash
curl -s http://localhost:8081/api/supplier/status | python3 -m json.tool
```

### 5. Obtener un proveedor por ID (incluye sus productos)
```bash
curl -s http://localhost:8081/api/supplier/1 | python3 -m json.tool
```
> La respuesta incluirá el arreglo `"productos": [...]` con todos los productos del proveedor.

### 6. Listar solo los productos de un proveedor (endpoint extra)
```bash
curl -s http://localhost:8081/api/supplier/1/products | python3 -m json.tool
```

### 7. Actualizar un proveedor
```bash
curl -s -X PUT http://localhost:8081/api/supplier/update/1 \
  -H "Content-Type: application/json" \
  -d '{
    "contacto": "Ana García",
    "telefono": "2222-4444"
  }' | python3 -m json.tool
```

### 8. Eliminar un proveedor por ID
```bash
curl -s -X DELETE http://localhost:8081/api/supplier/delete/1 | python3 -m json.tool
```

### 9. Eliminar TODOS los proveedores
```bash
curl -s -X DELETE http://localhost:8081/api/supplier/delete | python3 -m json.tool
```

---

## 📦 PRODUCTOS (`/api/product`)

> ⚠️ **Antes de crear productos**, debes tener al menos un proveedor creado.  
> Usa el `id` del proveedor creado anteriormente como valor de `proveedorId`.

### 1. Crear un producto asociado al proveedor ID=1
```bash
curl -s -X POST http://localhost:8081/api/product/create \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Laptop HP 15",
    "descripcion": "Laptop con procesador Intel Core i5, 8GB RAM, 256GB SSD",
    "precio": 4500.00,
    "stock": 10,
    "status": true,
    "proveedorId": 1
  }' | python3 -m json.tool
```

### 2. Crear un segundo producto para el mismo proveedor
```bash
curl -s -X POST http://localhost:8081/api/product/create \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Mouse Inalámbrico Logitech",
    "descripcion": "Mouse ergonómico con receptor USB nano",
    "precio": 150.00,
    "stock": 50,
    "status": true,
    "proveedorId": 1
  }' | python3 -m json.tool
```

### 3. Listar todos los productos (con datos del proveedor incluidos)
```bash
curl -s http://localhost:8081/api/product/ | python3 -m json.tool
```
> Cada producto incluirá un objeto `"proveedor": { ... }` con los datos del proveedor.

### 4. Buscar productos por nombre
```bash
curl -s "http://localhost:8081/api/product/?nombre=laptop" | python3 -m json.tool
```

### 5. Listar solo productos disponibles (status=true)
```bash
curl -s http://localhost:8081/api/product/status | python3 -m json.tool
```

### 6. Obtener un producto por ID (incluye datos del proveedor)
```bash
curl -s http://localhost:8081/api/product/1 | python3 -m json.tool
```

### 7. Actualizar un producto (cambiar precio y stock)
```bash
curl -s -X PUT http://localhost:8081/api/product/update/1 \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 4200.00,
    "stock": 8
  }' | python3 -m json.tool
```

### 8. Eliminar un producto por ID
```bash
curl -s -X DELETE http://localhost:8081/api/product/delete/1 | python3 -m json.tool
```

### 9. Eliminar TODOS los productos
```bash
curl -s -X DELETE http://localhost:8081/api/product/delete | python3 -m json.tool
```

---

## 🔗 FLUJO COMPLETO: Relación Proveedor → Productos

Secuencia recomendada para probar la relación 1:N completa:

```bash
# Paso 1: Crear un proveedor
PROV=$(curl -s -X POST http://localhost:8081/api/supplier/create \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Importadora GT","contacto":"Luis Pérez","correo":"info@importadora.gt","telefono":"4444-5555","direccion":"Zona 3, Xela"}')
echo "Proveedor creado:" && echo $PROV | python3 -m json.tool

# Paso 2: Anotar el ID del proveedor (ej: 1) y crear productos
curl -s -X POST http://localhost:8081/api/product/create \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Teclado Mecánico","descripcion":"Teclado RGB switches azules","precio":350.00,"stock":20,"proveedorId":1}' \
  | python3 -m json.tool

# Paso 3: Ver el proveedor con TODOS sus productos incluidos
curl -s http://localhost:8081/api/supplier/1 | python3 -m json.tool

# Paso 4: Ver solo los productos del proveedor
curl -s http://localhost:8081/api/supplier/1/products | python3 -m json.tool

# Paso 5: Ver un producto con los datos de su proveedor
curl -s http://localhost:8081/api/product/1 | python3 -m json.tool
```

---

## ❌ Pruebas de validación y errores

### Intentar crear un producto sin nombre (debe responder 400)
```bash
curl -s -X POST http://localhost:8081/api/product/create \
  -H "Content-Type: application/json" \
  -d '{"descripcion":"Sin nombre","precio":100,"proveedorId":1}' | python3 -m json.tool
```

### Intentar crear un producto con un proveedorId inexistente (debe responder 400)
```bash
curl -s -X POST http://localhost:8081/api/product/create \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Producto Huérfano","precio":100,"proveedorId":9999}' | python3 -m json.tool
```

### Buscar un cliente que no existe (debe responder 404)
```bash
curl -s http://localhost:8081/api/customer/9999 | python3 -m json.tool
```
