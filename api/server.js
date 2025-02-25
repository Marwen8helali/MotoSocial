const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');

// Configurez les options de connexion MongoDB
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
};

// Fonction pour se connecter à MongoDB avec une reconnexion automatique
function connectToMongoDB() {
  mongoose
    .connect(process.env.MONGODB_URI, mongoOptions)
    .then(() => {
      console.log('Connexion à MongoDB réussie');
    })
    .catch((error) => {
      console.error('Erreur de connexion à MongoDB', error);
      setTimeout(
        connectToMongoDB,
        Math.min(
          process.env.MONGODB_RECONNECT_INTERVAL * Math.pow(2, attempts),
          process.env.MONGODB_RECONNECT_INTERVAL * process.env.MONGODB_RECONNECT_MAX_ATTEMPTS
        )
      );
    });
}

// Lancez la connexion à MongoDB
connectToMongoDB();

// Démarrez le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
}); 