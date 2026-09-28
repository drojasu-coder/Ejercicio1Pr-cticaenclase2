Endpoints

Clientes (/api/customer)
POST /api/customer/create - Crear un nuevo cliente
GET /api/customer/ - Listar todos los clientes, acepta el parametro nombre
GET /api/customer/status - Listar solo clientes activos
GET /api/customer/:id - Obtener cliente por id
PUT /api/customer/update/:id - Actualizar cliente por id
DELETE /api/customer/delete/:id - Eliminar cliente por id
DELETE /api/customer/delete - Eliminar todos los clientes

Proveedores (/api/supplier)
POST /api/supplier/create - Crear un nuevo proveedor
GET /api/supplier/ - Listar todos los proveedores, acepta el parametro nombre
GET /api/supplier/status - Listar solo proveedores activos
GET /api/supplier/:id - Obtener proveedor con sus productos
GET /api/supplier/:id/products - Listar solo los productos del proveedor
PUT /api/supplier/update/:id - Actualizar proveedor por id
DELETE /api/supplier/delete/:id - Eliminar proveedor por id
DELETE /api/supplier/delete - Eliminar todos los proveedores

Productos (/api/product)
POST /api/product/create - Crear producto, requiere proveedorId
GET /api/product/ - Listar todos los productos con su proveedor incluido
GET /api/product/status - Listar solo productos disponibles
GET /api/product/:id - Obtener producto con los datos del proveedor
PUT /api/product/update/:id - Actualizar producto por id
DELETE /api/product/delete/:id - Eliminar producto por id
DELETE /api/product/delete - Eliminar todos los productos

Comparacion con FastAPI

Al trabajar con Sequelize me parecio mas directo definir los modelos, ya que todo queda en un solo archivo con sequelize.define y los tipos de dato se escriben de forma parecida a como se piensa la tabla en la base de datos. Con SQLAlchemy y Pydantic tuve que manejar dos capas distintas, una para el modelo de la base de datos y otra para la validacion de los datos que entran y salen de la API, lo cual al principio se sintio mas separado, pero despues entendi que esa separacion ayuda a mantener mejor organizado el proyecto cuando crece. En terminos de rapidez para escribir el codigo, Sequelize me resulto mas agil porque no tuve que declarar dos veces practicamente los mismos campos.

En cuanto al manejo de errores, en Node con Sequelize las operaciones son asincronas y se manejan con then y catch, lo que obliga a revisar el error dentro de cada catch y a repetir bastante codigo entre metodos del controlador. En Python con FastAPI el manejo con try y except se sintio mas natural para mi, porque el flujo del codigo se lee de arriba hacia abajo sin tantos callbacks anidados, y ademas las excepciones personalizadas de FastAPI permiten devolver el codigo de estado HTTP de una forma mas clara y con menos lineas repetidas. En ese sentido prefiero como Python organiza los errores.

Sobre el despliegue en Render, el proyecto de FastAPI me tomo menos tiempo desplegar, principalmente porque ya habia pasado por el proceso una vez con el ejercicio anterior y sabia de antemano que variables de entorno necesitaba configurar en el panel de Render. Con el proyecto de Node tuve que revisar de nuevo el Build Command y el Start Command, y perdi un poco de tiempo verificando que la conexion SSL a la base de datos quedara bien configurada antes de que el servicio pasara a estado Live. Aun asi, una vez que el primer despliegue funciono, hacer cambios y volver a desplegar fue igual de rapido en ambos casos.
