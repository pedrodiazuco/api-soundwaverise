//MULTER ES UN MIDDLEWARE PARA EXPRESS QUE SE UTILIZA PARA MANEJAR
//LOS DATOS DE FORMULARIOS 'multipart/form-data', QUE ES EL TIPO DE
//FORMULARIO QUE NECESITAS CUANDO QUIERES SUBIR ARCHIVOS DESDE EL NAVEGADOR
import multer from 'multer';

// Configuración del almacenamiento
const storage = multer.memoryStorage();  // Almacenamos los archivos en la memoria del servidor

// Filtro de archivo para validar si el archivo es una imagen o un archivo de audio
const fileFilter = (req, file, cb) => {
  // Permite tipos de archivo específicos
  const allowedTypes = ['image/jpeg', 'audio/mp3'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PNG and MP3 are allowed.'));
  }
};

// Configuración simple de Multer para manejar la subida de archivos
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export { upload };