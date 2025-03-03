// app/index.tsx
import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      // Navigate to the phone input screen after loading
      router.replace('/phoneInput');
    }, 2500); // 2.5 seconds delay for loading simulation
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/fallbackLogo.png')} // Adjust path to your logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.loadingText}>Sales Management App</Text>
      <Text style={styles.loadingSubtext}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  loadingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  loadingSubtext: {
    fontSize: 16,
    color: '#666',
  }
});