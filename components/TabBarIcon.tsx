
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface TabBarIconProps {
  name: string;
  color: string;
  size?: number;
}

// Try to import SymbolView safely
let SymbolView: any = null;
try {
  const expoSymbols = require('expo-symbols');
  SymbolView = expoSymbols.SymbolView;
} catch (e) {
  console.log('expo-symbols not available, falling back to MaterialIcons');
}

// Mapping of SF Symbol names to Material Icons
const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  'house': 'home',
  'house.fill': 'home',
  'person': 'person',
  'person.fill': 'person',
  'list.bullet.clipboard': 'assignment',
  'list.bullet.clipboard.fill': 'assignment',
};

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color, size = 24 }) => {
  // Ensure color is never undefined - fallback to a visible color
  const resolvedColor = color || '#8E8E93';
  
  // If SymbolView is available, use it
  if (SymbolView) {
    return (
      <SymbolView
        name={name}
        tintColor={resolvedColor}
        size={size}
        resizeMode="scaleAspectFit"
        style={[styles.icon, { width: size, height: size }]}
      />
    );
  }

  // Otherwise, fall back to MaterialIcons
  const materialIconName = iconMap[name] || 'help-outline';
  
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <MaterialIcons name={materialIconName} size={size} color={resolvedColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    // Size applied dynamically
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabBarIcon;
