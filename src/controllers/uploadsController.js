import { bucket } from '../libs/firebase.js';
import { getStorage } from 'firebase-admin/storage';


const uploadUserImageToFirebase = async (req, res) => {
  console.log("Subiendo imagen de usuario");
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json('No file uploaded.');
  }
  const blob = bucket.file(`profile_images/${req.file.originalname}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
      predefinedAcl: 'publicRead'
    }
  });

  blobStream.on('error', err => {
    console.error("Error durante la subida del archivo:", err);
    return res.status(500).json({ message: 'Error uploading the file!', details: err.toString() });
  });

  blobStream.on('finish', () => {
    const publicImageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    console.log('URL en uploadUserImageToFirebase:', publicImageUrl);
    return res.status(200).json({ publicImageUrl });
  });

  blobStream.end(req.file.buffer);
};

/*------ SUBIR LA IMAGEN DEL USUARIO A FIREBASE ------
const uploadUserImageToFirebase = async (req, res) => {
  console.log("Subiendo imagen de usuario");
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json('No file uploaded.');
  }
  try {
    //crea un blob (contenedor de datos para el archivo)
    const blob = bucket.file(`profile_images/${req.file.originalname}`);
    //abre un flujo de escritura (blobStream) para ese archivo
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
        predefinedAcl: 'publicRead'
      }
    });

    //si hay un error durante la subida del archivo
    blobStream.on('error', err => {
      console.error(err);
      return res.status(500).json('Error uploading the file!');
    });

    //cuando el archivo se ha subido exitosamente
    blobStream.on('finish', () => {
      //ahora generamos la URL pública para acceder al archivo
      const publicImageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      console.log('URL en uploadUserImageToFirebase: ' + publicImageUrl);
      return res.status(200).json({ publicImageUrl });
    });

    //finaliza el flujo de datos y sube el contenido del archivo (que está en
    // req.file.buffer, donde multer almacena los datos del archivo en memoria) a Firebase.
    blobStream.end(req.file.buffer);
  } catch (error) {
    console.json('Error uploading to Firebase:', error);
    return res.status(500).json('Error uploading to Firebase');
  }
};*/

/*------ SUBIR LA IMAGEN DEL TRACK A FIREBASE ------*/
const uploadTrackImageToFirebase = async (req, res) => {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json('No file uploaded.');
    }
    try {
      //crea un blob (contenedor de datos para el archivo)
      const blob = bucket.file(`tracks/images/${req.file.originalname}`);
      //abre un flujo de escritura (blobStream) para ese archivo
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
          predefinedAcl: 'publicRead'
        }
      });
  
      //si hay un error durante la subida del archivo
      blobStream.on('error', err => {
        console.error(err);
        return res.status(500).json('Error uploading the file!');
      });
  
      //cuando el archivo se ha subido exitosamente
      blobStream.on('finish', () => {
        //ahora generamos la URL pública para acceder al archivo
        const publicImageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        console.log('URL en uploadTrackImageToFirebase: ' + publicImageUrl);
        return res.status(200).json({ publicImageUrl });
      });
  
      //finaliza el flujo de datos y sube el contenido del archivo (que está en
      // req.file.buffer, donde multer almacena los datos del archivo en memoria) a Firebase.
      blobStream.end(req.file.buffer);
    } catch (error) {
      console.json('Error uploading to Firebase:', error);
      return res.status(500).json('Error uploading to Firebase');
    }
};

/*------ SUBIR EL AUDIO DEL TRACK A FIREBASE ------*/
const uploadTrackAudioToFirebase = async (req, res) => {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json('No file uploaded.');
    }
    try {
      //crea un blob (contenedor de datos para el archivo)
      const blob = bucket.file(`tracks/audios/${req.file.originalname}`);
      //abre un flujo de escritura (blobStream) para ese archivo
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
          predefinedAcl: 'publicRead'
        }
      });
  
      //si hay un error durante la subida del archivo
      blobStream.on('error', err => {
        console.error(err);
        return res.status(500).json('Error uploading the file!');
      });
  
      //cuando el archivo se ha subido exitosamente
      blobStream.on('finish', () => {
        //ahora generamos la URL pública para acceder al archivo
        const publicAudioUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        console.log('URL en uploadTrackAudioToFirebase: ' + publicAudioUrl);
        return res.status(200).json({ publicAudioUrl });
      });
  
      //finaliza el flujo de datos y sube el contenido del archivo (que está en
      // req.file.buffer, donde multer almacena los datos del archivo en memoria) a Firebase.
      blobStream.end(req.file.buffer);
    } catch (error) {
      console.json('Error uploading to Firebase:', error);
      return res.status(500).json('Error uploading to Firebase');
    }
};

/*------ OBTENER EL PATH DEL ARCHIVO DE FIREBASE DESDE LA URL ------*/
const getFirebasePathFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    // La ruta completa incluye el nombre del bucket; necesitamos excluirlo
    let path = urlObj.pathname;
    // Eliminar el primer '/' si está presente y luego eliminar el nombre del bucket
    if (path.startsWith('/')) {
      path = path.substring(1); // Elimina el primer '/'
    }
    // Suponiendo que el nombre del bucket es parte del path, lo eliminamos
    const bucketName = "soundwave-rise.appspot.com";
    if (path.startsWith(bucketName)) {
      path = path.substring(bucketName.length + 1); // elimina el nombre del bucket y el siguiente '/'
    }
    return path;
  } catch (error) {
    console.error('Invalid URL:', url, error);
    return null;
  }
};


/*------ ELIMINAR UN ARCHIVO EN FIREBASE ------*/
const deleteFileInFirebase = async (filePath) => {
  const decodedFilePath = decodeURIComponent(filePath);
  console.log("Attempting to delete file at:", decodedFilePath);
  const file = bucket.file(decodedFilePath);
  try {
    await file.delete();
    console.log(`File at ${decodedFilePath} deleted successfully.`);
  } catch (error) {
    console.error('Failed to delete file:', decodedFilePath, error);
    throw new Error(`Failed to delete file at ${decodedFilePath}: ${error.message}`);
  }
};


export { 
    uploadUserImageToFirebase,
    uploadTrackImageToFirebase,
    uploadTrackAudioToFirebase,
    getFirebasePathFromUrl,
    deleteFileInFirebase
};
