
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/styles/commonStyles';
import { Task, Child } from '@/types/chore.types';
import { IconSymbol } from './IconSymbol';

interface TaskCardProps {
  task: Task;
  child?: Child;
  onComplete?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export function TaskCard({ task, child, onComplete, onDelete, showActions = true }: TaskCardProps) {
  const colors = useThemeColors();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      elevation: 2,
    },
    completedContainer: {
      backgroundColor: colors.highlight,
      opacity: 0.7,
    },
    leftSection: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    pointsBadge: {
      backgroundColor: colors.accent,
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 6,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginRight: 12,
    },
    completedBadge: {
      backgroundColor: colors.textSecondary,
      opacity: 0.5,
    },
    pointsText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
    },
    completedText: {
      color: colors.textSecondary,
      textDecorationLine: 'line-through',
    },
    taskInfo: {
      flex: 1,
    },
    taskName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    taskDescription: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    assignedContainer: {
      marginTop: 4,
    },
    assignedText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    completeButton: {
      padding: 4,
    },
    deleteButton: {
      padding: 4,
    },
    completedBadgeContainer: {
      marginLeft: 8,
    },
  });

  return (
    <View style={[styles.container, task.completed && styles.completedContainer]}>
      <View style={styles.leftSection}>
        <View style={[styles.pointsBadge, task.completed && styles.completedBadge]}>
          <IconSymbol
            ios_icon_name="star.fill"
            android_material_icon_name="star"
            size={14}
            color={task.completed ? colors.textSecondary : colors.accent}
          />
          <Text style={[styles.pointsText, task.completed && styles.completedText]}>
            {task.points}
          </Text>
        </View>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskName, task.completed && styles.completedText]}>
            {task.name}
          </Text>
          {task.description && (
            <Text style={[styles.taskDescription, task.completed && styles.completedText]}>
              {task.description}
            </Text>
          )}
          {child && (
            <View style={styles.assignedContainer}>
              <Text style={styles.assignedText}>
                {child.avatar} {child.name}
              </Text>
            </View>
          )}
        </View>
      </View>
      {showActions && !task.completed && (
        <View style={styles.actionsContainer}>
          {onComplete && (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={onComplete}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check_circle"
                size={32}
                color={colors.primary}
              />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onDelete}
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
        </View>
      )}
      {task.completed && (
        <View style={styles.completedBadgeContainer}>
          <IconSymbol
            ios_icon_name="checkmark.circle.fill"
            android_material_icon_name="check_circle"
            size={28}
            color={colors.primary}
          />
        </View>
      )}
    </View>
  );
}
