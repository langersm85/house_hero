
import { StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export const useThemeColors = () => {
  const { isDark } = useTheme();
  
  if (isDark) {
    return {
      background: '#121212',
      text: '#FFFFFF',
      textSecondary: '#B0B0B0',
      primary: '#66BB6A',
      secondary: '#42A5F5',
      accent: '#FFD54F',
      card: '#1E1E1E',
      highlight: '#2C3E2F',
    };
  }
  
  return {
    background: '#F9F9F9',
    text: '#333333',
    textSecondary: '#777777',
    primary: '#4CAF50',
    secondary: '#2196F3',
    accent: '#FFC107',
    card: '#FFFFFF',
    highlight: '#E8F5E9',
  };
};

// Default light theme colors for static usage
export const colors = {
  background: '#F9F9F9',
  text: '#333333',
  textSecondary: '#777777',
  primary: '#4CAF50',
  secondary: '#2196F3',
  accent: '#FFC107',
  card: '#FFFFFF',
  highlight: '#E8F5E9',
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.textSecondary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});
