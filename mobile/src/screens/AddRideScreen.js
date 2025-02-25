import 'react-native-get-random-values';
import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Text, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Appbar, IconButton } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import MapView, { Marker, Polyline } from 'react-native-maps'; // Importez MapView et Marker
import Modal from 'react-native-modal'; // Importez Modal
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';

const AddRideScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const [rideName, setRideName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startPoint, setStartPoint] = useState('');
  const [route, setRoute] = useState('');
  const [difficulty, setDifficulty] = useState('Facile');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false); // État pour afficher/masquer la carte
  const [markers, setMarkers] = useState([]); // Points de l'itinéraire
  const [region, setRegion] = useState({
    latitude: 36.8065, // Latitude de Tunis
    longitude: 10.1815, // Longitude de Tunis
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState([]);

  const handlePublish = () => {
    if (!rideName || !date || !startPoint || !route || !maxParticipants) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    console.log('Ride publiée:', {
      rideName,
      date,
      startPoint,
      route,
      difficulty,
      maxParticipants,
      description,
      photo,
    });

    Alert.alert('Succès', 'La ride a été publiée avec succès !');
    navigation.goBack();
  };

  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkers([...markers, coordinate]); // Ajoute un nouveau point à l'itinéraire
  };

  const handleSaveRoute = () => {
    if (markers.length < 2) {
      Alert.alert('Erreur', 'Veuillez sélectionner au moins deux points pour l\'itinéraire.');
      return;
    }

    // Convertir les points en une chaîne de caractères pour l'affichage
    const routeDescription = markers
      .map((marker, index) => `Point ${index + 1}: ${marker.latitude}, ${marker.longitude}`)
      .join('\n');
    setRoute(routeDescription);
    setIsMapVisible(false); // Ferme la carte modale
  };

  const fetchDirections = async (origin, destination) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      if (data.status === 'OK') {
        const route = data.routes[0].overview_polyline.points;
        const points = google.maps.geometry.encoding.decodePath(route);
        setDirections(points);
        setMarkers(points);
        setRegion({
          latitude: points[Math.floor(points.length / 2)].lat,
          longitude: points[Math.floor(points.length / 2)].lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des directions:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Organiser une Ride" />
      </Appbar.Header>

      {/* Contenu de la page */}
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.label, { color: theme.colors.text }]}>Nom de la Ride</Text>
        <TextInput
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
          placeholder="Ex: Ride au coucher de soleil"
          value={rideName}
          onChangeText={setRideName}
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>Date et Heure</Text>
        <TouchableOpacity
          style={[styles.datePickerButton, { borderColor: theme.colors.primary }]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: theme.colors.text }}>
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && Platform.OS === 'android' && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {Platform.OS === 'ios' && showDatePicker && (
          <View>
            <DateTimePicker
              value={date}
              mode="datetime"
              display="spinner"
              onChange={onChangeDate}
            />
            <Button onPress={() => setShowDatePicker(false)}>Fermer</Button>
          </View>
        )}

        <Text style={[styles.label, { color: theme.colors.text }]}>Point de départ</Text>
        <TextInput
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
          placeholder="Lieu de rassemblement"
          value={startPoint}
          onChangeText={setStartPoint}
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>Itinéraire et Destination</Text>
        <View style={styles.routeContainer}>
          <TextInput
            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary, flex: 1 }]}
            placeholder="Détails de l'itinéraire"
            value={route}
            onChangeText={setRoute}
          />
          <IconButton
            icon="map"
            size={24}
            color={theme.colors.primary}
            onPress={() => setIsMapVisible(true)} // Ouvre la carte modale
          />
        </View>

        <Text style={[styles.label, { color: theme.colors.text }]}>Niveau de difficulté</Text>
        <Picker
          selectedValue={difficulty}
          onValueChange={(itemValue) => setDifficulty(itemValue)}
          style={[styles.picker, { color: theme.colors.text }]}
        >
          <Picker.Item label="Facile" value="Facile" />
          <Picker.Item label="Intermédiaire" value="Intermédiaire" />
          <Picker.Item label="Avancé" value="Avancé" />
        </Picker>

        <Text style={[styles.label, { color: theme.colors.text }]}>Nombre de participants max</Text>
        <TextInput
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
          placeholder="Ex: 10"
          keyboardType="numeric"
          value={maxParticipants}
          onChangeText={setMaxParticipants}
        />

        <Text style={[styles.label, { color: theme.colors.text }]}>Description supplémentaire</Text>
        <TextInput
          style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.primary }]}
          placeholder="Informations importantes"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Button
          mode="contained"
          onPress={handlePublish}
          style={styles.publishButton}
          labelStyle={{ color: '#FFFFFF' }}
        >
          Publier la Ride
        </Button>
      </ScrollView>

      {/* Carte modale */}
      <Modal isVisible={isMapVisible} onBackdropPress={() => setIsMapVisible(false)}>
        <View style={styles.modalContent}>
          <GooglePlacesAutocomplete
            placeholder="Lieu de départ"
            onPress={(data, details = null) => {
              setStartPoint(data.description);
              if (destination) {
                fetchDirections(data.description, destination);
              }
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'fr',
            }}
            styles={{
              textInput: {
                height: 40,
                borderColor: theme.colors.primary,
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
                marginBottom: 8,
              },
            }}
          />
          <GooglePlacesAutocomplete
            placeholder="Destination"
            onPress={(data, details = null) => {
              setDestination(data.description);
              if (startPoint) {
                fetchDirections(startPoint, data.description);
              }
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'fr',
            }}
            styles={{
              textInput: {
                height: 40,
                borderColor: theme.colors.primary,
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
                marginBottom: 8,
              },
            }}
          />
          <MapView
            style={styles.map}
            region={region}
            onPress={handleMapPress}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker}
                title={`Point ${index + 1}`}
              />
            ))}
            {directions && (
              <Polyline
                coordinates={directions}
                strokeColor="#FF3366"
                strokeWidth={3}
              />
            )}
          </MapView>
          <Button
            mode="contained"
            onPress={handleSaveRoute}
            style={styles.saveButton}
            labelStyle={{ color: '#FFFFFF' }}
          >
            Enregistrer l'itinéraire
          </Button>
          <Button
            mode="outlined"
            onPress={() => setIsMapVisible(false)}
            style={styles.cancelButton}
            labelStyle={{ color: theme.colors.primary }}
          >
            Annuler
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  datePickerButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    justifyContent: 'center',
  },
  picker: {
    marginTop: 8,
  },
  publishButton: {
    marginTop: 24,
    backgroundColor: '#FF3366',
    paddingVertical: 12,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    height: '80%',
  },
  map: {
    flex: 1,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#FF3366',
    marginBottom: 8,
  },
  cancelButton: {
    borderColor: '#FF3366',
  },
});

export default AddRideScreen;