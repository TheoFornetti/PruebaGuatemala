const QRCode = require('qrcode');
const fs = require('fs');

// Reemplaza con el número de teléfono deseado
const message = encodeURIComponent('Quiero abrir la barrera!!!!.');
const phoneNumber = '14155238886'; // Ejemplo: '34123456789' para Argentina
const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

// Generar el QR como una imagen PNG
QRCode.toFile('whatsapp-qr.png', whatsappURL, {
  color: {
    dark: '#000000', // Color del QR
    light: '#ffffff' // Color de fondos
  }
}, (err) => {
  if (err) throw err;
  console.log('QR generado y guardado como whatsapp-qr.png');
});
