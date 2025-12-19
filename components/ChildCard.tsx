
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/styles/commonStyles';
import { Child } from '@/types/chore.types';
import { IconSymbol } from './IconSymbol';

interface ChildCardProps {
  child: Child;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export function ChildCard({ child, onPress, onEdit, onDelete, showActions = false }: ChildCardProps) {
  const colors = useThemeColors();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      elevation: 2,
    },
    avatarContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.highlight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    avatar: {
      fontSize: 32,
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    pointsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    points: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    actionButton: {
      padding: 4,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{child.avatar}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{child.name}</Text>
        <View style={styles.pointsContainer}>
          <IconSymbol
            ios_icon_name="star.fill"
            android_material_icon_name="star"
            size={16}
            color={colors.accent}
          />
          <Text style={styles.points}>{child.points} points</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        {showActions && onEdit && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="pencil"
              android_material_icon_name="edit"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
        {showActions && onDelete && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="trash"
              android_material_icon_name="delete"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
        {onPress && !showActions && (
          <IconSymbol
            ios_icon_name="chevron.right"
            android_material_icon_name="chevron_right"
            size={24}
            color={colors.textSecondary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
