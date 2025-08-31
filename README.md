# Hecho por: Susana Feng - Aarón Vásquez - Ximena Molina 
# Taller paso a paso
## Descargamos los repositorios
Descargamos los repositorios de github, en su última versión, vamos a tener un repositorio de la siguiente manera:
```
tournament-manager/
│── tournament-api
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── tournament-ui/
    ├── Dockerfile
    └── docker-compose.yml

```

## Compilar las imagenes
### API
Nos movemos a la carpeta del api, y compilamos las imágenes mediante el siguiente comando:

```cmd
docker-compose build
```

Este comando hará dos cosas:
1. Descarga la imagen de mongo
2. Descarga la imagen de kafka y zookeper
3. Compila la aplicación del api

## UI
Nos movemos a la carpeta del ui.

```cmd
docker-compose build
```

Este comando hará dos cosas:
1. Compila la aplicación del IO

## Verificamos
En este momento, podemos realizar una verificación con el comando `docker container ls` y debemos tener 6 imágenes.

# Subir las aplicaciones
En las carpetas de UI y API podemos subir las aplicaciones utilizando el comando
```
docker-compose up
```
Además, se levantará el contenedor del Job.

El UI estará expuesto en el puerto 80 y el api en el 3000.

## Incluímos datos
Tomamos datos del archivo `data.ts` y utilizando Postman para insertar los datos en la base de datos.  Tenemos que importar el archivo `docs/Tournament.postman_collection.json`.

Posteriormente, enviamos la solicitud de `Create Tournament` para tener datos en la basde de datos.
Podemos verificar estos datos entrando a mongo directamente desde el pod o utilizando la solicitud de `Fetch Tournaments`.

## Verificación de envío de datos a la base de datos Mongo y Kafka
Deberíamos poder observar en la terminal del API los siguientes mensajes de confirmación:
```cmd
tournament-designer-api  | ✅ Se encolaron 1 torneos en Kafka
tournament-designer-api  | ✅ Se insertaron 1 torneos en MongoDB
```

## Verificación de desencolación de datos del topic de Kafka por medio del Job
Deberíamos poder observar en la terminal del API los siguientes mensajes de confirmación:
```cmd
consumer-job-1           | Registros encolados: {"title":"Senior Avanzados Hombres ✅","type":"single_elimination","roster":[{"id":93,"name":"93 - [Karate Patito] Juan Perez","weight":83,"age":45},{"id":94,"name":"94 - [Karate los pollitos] Pedro Picapiedra","weight":82,"age":44}]}
```
