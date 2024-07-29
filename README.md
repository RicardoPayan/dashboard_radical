# ExamenRadical: Gestión de Datos y Visualización de Información

Esta aplicación web permite cargar un archivo `.xlsx`, visualizar y analizar datos, así como obtener información adicional como el tipo de cambio y la temperatura actual de la ciudad. La aplicación proporciona funcionalidades de paginación, gráficos, y validación de datos. Realizada con Angular 18.

## Requisitos
1. Node.js y npm.
2. Angular 18.

## Instalación

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/RicardoPayan/dashboard_radical.git
   cd dashboard_radical
2. **Instala dependencias**:
   ```bash
   npm install
3. **Correr Proyecto**:
   ```bash
   ng serve
    ```

## Funcionalidades
- **Cargar Archivo xlsx**: Permite cargar una hoja de calculo con extensión `.xlsx`, que debe contener datos con las siguientes columnas:
  - `PRIMER_NOMBRE`
  - `SEGUNDO_NOMBRE`
  - `APELLIDO_PATERNO`
  - `APELLIDO_MATERNO`
  - `FECHA_DE_NACIMIENTO`
  - `RFC`
  - `COLONIA_O_POBLACION`
  - `DELEGACION_O_MUNICIPIO`
  - `CIUDAD`
  - `ESTADO`
  - `C.P.`
  - `DIRECCION_CALLE_NUMERO`
  - `SALDO_ACTUAL`
  - `LIMITE_DE_CREDITO`
  - `SALDO_VENCIDO`
  

 **Visualización de Datos**:
  - **Tabla**: Muestra el contenido del archivo `.xlsx` con paginación y responsividad.
  - **Nombre Completo con Menor Saldo**: Muestra el nombre completo de la persona con el menor `SALDO_ACTUAL`.
  - **Nombre Completo con Mayor Saldo**: Muestra el nombre completo de la persona con el mayor `SALDO_ACTUAL`.
  - **Sumas Totales**: Calcula y muestra la suma de `SALDO_ACTUAL`, `LIMITE_DE_CREDITO`, `SALDO_VENCIDO` y `SALDO_DISPONIBLE` (donde `SALDO_DISPONIBLE` = `LIMITE_DE_CREDITO` - `SALDO_ACTUAL`).
  - **Total de Registros**: Muestra el número total de registros en el archivo `.xlsx`.
  - **Gráfica de Barras**: Muestra una gráfica de barras con `ESTADO` en el eje X y `SALDO_ACTUAL` en el eje Y.
  - **Gráfica de Pie**: Muestra una gráfica de pie con `LIMITE_DE_CREDITO` como 100%, mostrando `SALDO_ACTUAL` y `SALDO_DISPONIBLE`.


    ![inicio]('imagenes_readme/inicio.png')
    ![grafica]('imagenes_readme/grafica.png')
    ![cambio]('imagenes_readme/cambio.png')


 **Datos Adicionales**:
  - **Temperatura Actual**: Muestra la temperatura actual de la ciudad utilizando una Web API del clima (OpenWeatherMap).
  - **Tipo de Cambio FIX**: Permite consultar el tipo de cambio FIX de Banxico para un rango de fechas proporcionado. Requiere un token de autenticación que se puede obtener en [Banxico API Token](https://www.banxico.org.mx/SieAPIRest/service/v1/token).

 **Librerias adicionales**:
  - **[chart.js](https://www.chartjs.org)**: Biblioteca para el despligue de diferente tipos de graficas.
  - **[xlsx](https://www.npmjs.com/package/xlsx)**: Biblioteca para el manejo de archivos tipo `.xlsx`.
  - **[ngx-pagination](https://www.npmjs.com/package/ngx-pagination)**: Biblioteca para crear paginaciones.
  