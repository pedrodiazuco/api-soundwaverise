const { bucket } = require('../api-soundwaverise/src/libs/firebase.js');

async function uploadFile() {
  const filename = './LOGO TOZZO.png'; // Cambia esto a la ruta del archivo que quieres subir

  // Sube un archivo al bucket
  await bucket.upload(filename, {
    // Usa este para establecer permisos de acceso público
    predefinedAcl: 'publicRead'
  })
  .then((data) => {
    const file = data[0];
    console.log('Archivo subido con éxito:', file.name);
    console.log('URL pública:', getPublicUrl(file.name));
  })
  .catch((error) => {
    console.error('Error al subir el archivo:', error);
  });
}

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${bucket.name}/${filename}`;
}

uploadFile(); // Ejecuta la función de prueba
