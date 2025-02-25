import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VideoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vidéos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default VideoScreen; 