# Frontend Products and Users

Este proyecto es una aplicación web desarrollada con React que permite la gestión de productos y usuarios. Incluye funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) para ambos recursos y la posibilidad de exportar los productos a PDF.

## Funcionalidades principales

- Listado, creación, edición y eliminación de productos.
- Listado, creación, edición y eliminación de usuarios.
- Exportación de la lista de productos a PDF.
- Interfaz moderna utilizando React Bootstrap.

## Requisitos previos

- Node.js (recomendado v16 o superior)
- npm o yarn

## Instalación y ejecución

1. Clona el repositorio o descarga el código fuente.
2. Abre una terminal en la carpeta del proyecto.
3. Instala las dependencias:

   ```sh
   npm install
   # o
   yarn install
   ```

4. Inicia la aplicación en modo desarrollo:

   ```sh
   npm start
   # o
   yarn start
   ```

5. Accede a la aplicación en tu navegador en [http://localhost:3000](http://localhost:3000)

## Estructura principal

- `src/components/ProductosCRUD.jsx`: Gestión de productos.
- `src/components/UsuariosCRUD.jsx`: Gestión de usuarios.
- `src/components/Tabs.jsx`: Navegación entre productos y usuarios.

## Notas

- Asegúrate de tener corriendo el backend correspondiente en `/api/productos` y `/api/usuarios` para que la app funcione correctamente.
- Puedes modificar o extender las funcionalidades según tus necesidades.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
