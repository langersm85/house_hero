
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/styles/commonStyles';
import { Task, Child } from '@/types/chore.types';
import { IconSymbol } from './IconSymbol';

interface TaskCardProps {
  task: Task;
  children?: Child[];
  onComplete?: (childId: string) => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export function TaskCard({ task, children, onComplete, onDelete, showActions = true }: TaskCardProps) {
  const colors = useThemeColors();

  const isMultipleAssignment = Array.isArray(task.assignedTo);
  const completedBy = task.completedBy || [];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      elevation: 2,
    },
    completedContainer: {
      backgroundColor: colors.highlight,
      opacity: 0.7,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
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
      marginTop: 8,
    },
    assignedLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 6,
    },
    childrenList: {
      gap: 8,
    },
    childRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 10,
    },
    childInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
    },
    childAvatar: {
      fontSize: 18,
    },
    childName: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    childCompleted: {
      opacity: 0.5,
    },
    completeButton: {
      padding: 4,
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    deleteButton: {
      padding: 4,
    },
    completedBadgeContainer: {
      marginLeft: 8,
    },
    singleChildContainer: {
      marginTop: 4,
    },
    singleChildText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

  return (
    <View style={[styles.container, task.completed && styles.completedContainer]}>
      <View style={styles.header}>
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
          </View>
        </View>
        {showActions && !task.completed && onDelete && (
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

      {isMultipleAssignment && children && children.length > 0 && (
        <View style={styles.assignedContainer}>
          <Text style={styles.assignedLabel}>Assigned to:</Text>
          <View style={styles.childrenList}>
            {children.map((child, index) => {
              const isCompleted = completedBy.includes(child.id);
              return (
                <React.Fragment key={index}>
                  <View style={[styles.childRow, isCompleted && styles.childCompleted]}>
                    <View style={styles.childInfo}>
                      <Text style={styles.childAvatar}>{child.avatar}</Text>
                      <Text style={styles.childName}>{child.name}</Text>
                    </View>
                    {showActions && !task.completed && (
                      <>
                        {isCompleted ? (
                          <IconSymbol
                            ios_icon_name="checkmark.circle.fill"
                            android_material_icon_name="check_circle"
                            size={24}
                            color={colors.primary}
                          />
                        ) : (
                          onComplete && (
                            <TouchableOpacity
                              style={styles.completeButton}
                              onPress={() => onComplete(child.id)}
                              activeOpacity={0.7}
                            >
                              <IconSymbol
                                ios_icon_name="circle"
                                android_material_icon_name="radio_button_unchecked"
                                size={24}
                                color={colors.textSecondary}
                              />
                            </TouchableOpacity>
                          )
                        )}
                      </>
                    )}
                    {task.completed && isCompleted && (
                      <IconSymbol
                        ios_icon_name="checkmark.circle.fill"
                        android_material_icon_name="check_circle"
                        size={24}
                        color={colors.primary}
                      />
                    )}
                  </View>
                </React.Fragment>
              );
            })}
          </View>
        </View>
      )}

      {!isMultipleAssignment && children && children.length === 1 && (
        <View style={styles.singleChildContainer}>
          <Text style={styles.singleChildText}>
            {children[0].avatar} {children[0].name}
          </Text>
        </View>
      )}
    </View>
  );
}
