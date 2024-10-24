# 📚 **Book Seller**  
_E-commerce de libros desarrollado con React, TypeScript, Node.js y MongoDB._

---

## 🛠️ **Tecnologías Utilizadas**
- **Frontend:** React + Vite + TypeScript  
- **Backend:** Node.js + Express  
- **Base de Datos:** MongoDB  
- **Estado Global:** Zustand  
- **Pagos:** Mercado Pago y PayPal (integración con webhooks)  
- **Correo:** EmailJS para envío de emails automáticos  

---

## 📋 **Características Principales**
- 🛒 **Carrito de compras:** Agrega, elimina y modifica productos en tiempo real.  
- 🔍 **Filtros avanzados:** Búsqueda por categorías, precios, editoriales, autores, y más.  
- 💳 **Pagos Seguros:** Integración con Mercado Pago y PayPal.  
- 🔔 **Webhooks:** Validación automática de pagos en tiempo real.  
- 📊 **Control de stock:** Actualización en MongoDB al confirmar una compra.  
- 📧 **Notificaciones por correo:** Envío de confirmaciones de compra con EmailJS.  

---

## 📂 **Dependencias del Proyecto**

### **Dependencias principales**
```json
{
  "@emailjs/browser": "^4.4.1",
  "@mercadopago/sdk-react": "^0.0.19",
  "@paypal/react-paypal-js": "^8.7.0",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.1",
  "mercadopago": "^2.0.15",
  "mongodb": "^6.9.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "zustand": "5.0.0-rc.2"
}

```
Dependencias de desarrollo

```json
{
  "@eslint/js": "^9.9.0",
  "@types/cors": "^2.8.17",
  "@types/express": "^4.17.21",
  "@types/node": "^22.7.0",
  "@types/react": "^18.3.3",
  "@types/react-dom": "^18.3.0",
  "@vitejs/plugin-react-swc": "^3.5.0",
  "eslint": "^9.9.0",
  "eslint-plugin-react-hooks": "^5.1.0-rc.0",
  "eslint-plugin-react-refresh": "^0.4.9",
  "globals": "^15.9.0",
  "typescript": "^5.6.2",
  "typescript-eslint": "^8.0.1",
  "vite": "^5.4.1"
}
```
🏗️ Instalación y Configuración
Clonar el Repositorio

git clone https://github.com/agus0505/book-seller.git
cd book-seller
Instalar Dependencias

npm install
Configurar Variables de Entorno
Crea un archivo .env en la carpeta del backend con las siguientes variables:

MONGODB_URI=<tu-URI-de-MongoDB>
MERCADOPAGO_ACCESS_TOKEN=<tu-token-de-acceso>
PAYPAL_CLIENT_ID=<tu-ID-de-cliente>
PAYPAL_CLIENT_SECRET=<tu-secreto-de-cliente>
EMAILJS_SERVICE_ID=<tu-service-id>
EMAILJS_TEMPLATE_ID=<tu-template-id>
EMAILJS_PUBLIC_KEY=<tu-public-key>
Iniciar el Proyecto

npm run dev
💼 Contacto
Agustín Pecelis

📧 Email: agustin.pecelis@gmail.com

🎉 Contribuciones
¡Las contribuciones son bienvenidas! Si encuentras algún error o tienes sugerencias, siéntete libre de crear un issue o enviar un pull request.

📄 Licencia
Este proyecto está bajo la Licencia MIT.


