import React, { useContext } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import AddPostScreen from './src/screens/AddPostScreen';
import VideoScreen from './src/screens/VideoScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AddRideScreen from './src/screens/AddRideScreen';
import { TouchableOpacity, StyleSheet, Platform, I18nManager } from 'react-native';
import { Avatar } from 'react-native-paper';
import kingOfRoads from './assets/fakeUserAvatar/kingOfRoads.png';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';
import { DirectionProvider, DirectionContext } from './src/context/DirectionContext';
import { useTranslation } from 'react-i18next';
import './src/config/i18n'; // Assurez-vous que i18n est importé

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="AddRide" component={AddRideScreen} />
    </Stack.Navigator>
  );
};

const AppWrapper = () => {
  return (
    <ThemeProvider>
      <DirectionProvider>
        <App />
      </DirectionProvider>
    </ThemeProvider>
  );
};

const App = () => {
  const { theme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const { isRTL, toggleDirection } = useContext(DirectionContext);
  const navigationRef = useNavigationContainerRef();

  // Changer la direction du layout en fonction de la langue
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    toggleDirection(language);
    if (language === 'ar' && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    } else if (language !== 'ar' && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.text,
            direction: isRTL ? 'rtl' : 'ltr', // Définir la direction du layout
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarLabel: t('home'),
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Explore"
            component={ExploreScreen}
            options={{
              tabBarLabel: t('explore'),
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="magnify" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="AddPost"
            component={AddPostScreen}
            options={{
              tabBarLabel: t('addPost'),
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="plus-box" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Video"
            component={VideoScreen}
            options={{
              tabBarLabel: t('videos'),
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="movie" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: t('profile'),
              tabBarIcon: ({ color, size }) => (
                <Avatar.Image
                  source={kingOfRoads}
                  size={24}
                  style={{ backgroundColor: 'transparent' }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3366',
    borderRadius: 50,
    width: 60,
    height: 60,
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default AppWrapper;
