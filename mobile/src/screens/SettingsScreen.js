import React, { useContext } from 'react';
import { View, StyleSheet, Switch, I18nManager, Text } from 'react-native';
import { List, Divider, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../context/ThemeContext';
import { DirectionContext } from '../context/DirectionContext';
import { useTranslation } from 'react-i18next';

const SettingsScreen = ({ navigation }) => {
  const { theme, toggleTheme, isDarkMode } = useContext(ThemeContext);
  const { isRTL, toggleDirection } = useContext(DirectionContext);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    toggleDirection(language);

    if (language === 'ar') {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }
  };

  const languageEmojis = {
    en: '🇺🇸',
    fr: '🇫🇷',
    ar: '🇸🇦',
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={{ backgroundColor: theme.colors.surface }}>
        {isRTL ? (
          <>
            <Appbar.Content title={t('settings')} titleStyle={{ textAlign: 'right' }} />
            <Appbar.Action
              icon={isRTL ? 'arrow-right' : 'arrow-left'}
              onPress={() => navigation.goBack()}
            />
          </>
        ) : (
          <>
            <Appbar.Action
              icon={isRTL ? 'arrow-right' : 'arrow-left'}
              onPress={() => navigation.goBack()}
            />
            <Appbar.Content title={t('settings')} titleStyle={{ textAlign: 'left' }} />
          </>
        )}
      </Appbar.Header>

      <List.Section>
        <List.Subheader style={{ color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' }}>
          {t('theme')}
        </List.Subheader>
        <List.Item
          title={isDarkMode ? t('darkMode') : t('lightMode')}
          titleStyle={{ color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' }}
          left={() => (
            <Text style={[styles.emoji, { marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0 }]}>
              {isDarkMode ? '🌙' : '☀️'}
            </Text>
          )}
          right={() => (
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              style={isRTL ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' }}
            />
          )}
        />
      </List.Section>
      <Divider style={styles.divider} />
      <List.Section>
        <List.Subheader style={{ color: theme.colors.text, textAlign: isRTL ? 'right' : 'left' }}>
          {t('language')}
        </List.Subheader>
        <List.Item
          title={t('english')}
          onPress={() => changeLanguage('en')}
          titleStyle={{ textAlign: isRTL ? 'right' : 'left' }}
          left={() => (
            <Text style={[styles.emoji, { marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0 }]}>
              {languageEmojis.en}
            </Text>
          )}
          right={() => (
            i18n.language === 'en' && <Icon name="check" size={24} color={theme.colors.primary} />
          )}
        />
        <List.Item
          title={t('french')}
          onPress={() => changeLanguage('fr')}
          titleStyle={{ textAlign: isRTL ? 'right' : 'left' }}
          left={() => (
            <Text style={[styles.emoji, { marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0 }]}>
              {languageEmojis.fr}
            </Text>
          )}
          right={() => (
            i18n.language === 'fr' && <Icon name="check" size={24} color={theme.colors.primary} />
          )}
        />
        <List.Item
          title={t('arabic')}
          onPress={() => changeLanguage('ar')}
          titleStyle={{ textAlign: isRTL ? 'right' : 'left' }}
          left={() => (
            <Text style={[styles.emoji, { marginRight: isRTL ? 0 : 16, marginLeft: isRTL ? 16 : 0 }]}>
              {languageEmojis.ar}
            </Text>
          )}
          right={() => (
            i18n.language === 'ar' && <Icon name="check" size={24} color={theme.colors.primary} />
          )}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#E0E0E0',
  },
  emoji: {
    fontSize: 24,
  },
});

export default SettingsScreen;
