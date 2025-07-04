# Portal de Supervisión Académica - Frontend

Este repositorio contiene el código fuente de la interfaz de usuario (frontend) del Sistema de Supervisión Académica. La aplicación permite gestionar y visualizar el proceso de revisión de secuencias didácticas, así como generar reportes y estadísticas relevantes.

## Tecnologías Utilizadas

*   Next.js
*   React
*   TypeScript
*   Tailwind CSS
*   Shadcn/ui
*   React PDF/Renderer (`@react-pdf/renderer`)
*   Recharts

## Cómo Descargar y Ejecutar el Repositorio (Paso a Paso)

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

a.  **Clonar el Repositorio:**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    ```

b.  **Navegar al Directorio del Proyecto:**
    ```bash
    cd frontend
    ```

c.  **Instalar Dependencias:**
    Utiliza pnpm (recomendado) o tu gestor de paquetes preferido (npm/yarn) para instalar las dependencias del proyecto:
    ```bash
    pnpm install
    # o npm install
    # o yarn install
    ```

d.  **Ejecutar el Servidor de Desarrollo:**
    Inicia el servidor de desarrollo:
    ```bash
    pnpm run dev
    # o npm run dev
    # o yarn dev
    ```

e.  **Acceder a la Aplicación:**
    Una vez que el servidor esté en funcionamiento, la aplicación estará disponible en tu navegador en:
    ```
    http://localhost:3000
    ```

## Estructura del Proyecto

El proyecto sigue una estructura modular para facilitar el desarrollo y mantenimiento:

*   `app/`: Contiene las rutas y el layout principal de la aplicación.
*   `components/`: Almacena los componentes reutilizables de la interfaz de usuario, organizados por módulos (e.g., `auth`, `dashboard`, `supervision`).
*   `utils/`: Incluye funciones de utilidad y helpers generales, como la lógica de generación de PDFs.
*   `lib/`: Contiene librerías y configuraciones compartidas, como `utils.ts` para funciones de uso común.