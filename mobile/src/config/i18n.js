import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        settings: 'Settings',
        theme: 'Theme',
        language: 'Language',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        english: 'English',
        french: 'French',
        arabic: 'Arabic',
        home: 'Home',
        explore: 'Explore',
        addPost: 'Add Post',
        videos: 'Videos',
        profile: 'Profile',
        favorites: 'Favorites',
        login: 'Login',
        email: 'Email',
        password: 'Password',
        signIn: 'Sign In',
      },
    },
    fr: {
      translation: {
        settings: 'Paramètres',
        theme: 'Thème',
        language: 'Langue',
        darkMode: 'Mode sombre',
        lightMode: 'Mode clair',
        english: 'Anglais',
        french: 'Français',
        arabic: 'Arabe',
        home: 'Accueil',
        explore: 'Explorer',
        addPost: 'Ajouter une publication',
        videos: 'Vidéos',
        profile: 'Profil',
        favorites: 'Favoris',
        login: 'Connexion',
        email: 'Email',
        password: 'Mot de passe',
        signIn: 'Se connecter',
      },
    },
    ar: {
      translation: {
        settings: 'الإعدادات',
        theme: 'السمة',
        language: 'اللغة',
        darkMode: 'الوضع المظلم',
        lightMode: 'الوضع الفاتح',
        english: 'الإنجليزية',
        french: 'الفرنسية',
        arabic: 'العربية',
        home: 'الرئيسية',
        explore: 'استكشف',
        addPost: 'إضافة منشور',
        videos: 'الفيديوهات',
        profile: 'الملف الشخصي',
        favorites: 'المفضلة',
        login: 'تسجيل الدخول',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        signIn: 'تسجيل الدخول',
      },
    },
  },
  lng: 'en', // Langue par défaut
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n; 