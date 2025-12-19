
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useThemeColors } from '@/styles/commonStyles';
import { Child } from '@/types/chore.types';
import { IconSymbol } from './IconSymbol';

interface AssignTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAssign: (assignedTo?: string | string[]) => void;
  childrenList: Child[];
  taskName: string;
}

export function AssignTaskModal({ visible, onClose, onAssign, childrenList, taskName }: AssignTaskModalProps) {
  const colors = useThemeColors();
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [assignToAll, setAssignToAll] = useState(false);

  const handleAssign = () => {
    let assignedTo: string | string[] | undefined = undefined;
    
    if (assignToAll) {
      assignedTo = childrenList.map(c => c.id);
    } else if (selectedChildren.length > 0) {
      assignedTo = selectedChildren.length === 1 ? selectedChildren[0] : selectedChildren;
    }
    
    onAssign(assignedTo);
    setSelectedChildren([]);
    setAssignToAll(false);
  };

  const toggleChild = (childId: string) => {
    if (assignToAll) {
      setAssignToAll(false);
    }
    
    setSelectedChildren(prev => {
      if (prev.includes(childId)) {
        return prev.filter(id => id !== childId);
      } else {
        return [...prev, childId];
      }
    });
  };

  const toggleAssignToAll = () => {
    if (!assignToAll) {
      setAssignToAll(true);
      setSelectedChildren([]);
    } else {
      setAssignToAll(false);
    }
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 20,
      paddingHorizontal: 20,
      paddingBottom: 40,
      maxHeight: '70%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
    },
    taskNameContainer: {
      backgroundColor: colors.highlight,
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
    },
    taskNameLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 4,
    },
    taskName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    form: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    assignmentContainer: {
      gap: 8,
    },
    allChildrenOption: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 2,
      borderColor: 'transparent',
      marginBottom: 8,
    },
    selectedAllOption: {
      borderColor: colors.primary,
      backgroundColor: colors.highlight,
    },
    allChildrenText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 12,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: colors.textSecondary,
      opacity: 0.3,
    },
    dividerText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textSecondary,
      marginHorizontal: 12,
    },
    childrenContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    childOption: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedChildOption: {
      borderColor: colors.primary,
      backgroundColor: colors.highlight,
    },
    childAvatar: {
      fontSize: 20,
    },
    childName: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.textSecondary,
    },
    cancelButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    assignButton: {
      backgroundColor: colors.primary,
    },
    assignButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.card,
    },
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Assign Task</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <IconSymbol
                ios_icon_name="xmark"
                android_material_icon_name="close"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.taskNameContainer}>
            <Text style={styles.taskNameLabel}>Task</Text>
            <Text style={styles.taskName}>{taskName}</Text>
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Assign To</Text>
            <View style={styles.assignmentContainer}>
              <TouchableOpacity
                style={[
                  styles.allChildrenOption,
                  assignToAll && styles.selectedAllOption,
                ]}
                onPress={toggleAssignToAll}
                activeOpacity={0.7}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <IconSymbol
                    ios_icon_name="person.2.fill"
                    android_material_icon_name="people"
                    size={24}
                    color={assignToAll ? colors.primary : colors.text}
                  />
                  <Text style={styles.allChildrenText}>All Children</Text>
                </View>
                {assignToAll && (
                  <IconSymbol
                    ios_icon_name="checkmark.circle.fill"
                    android_material_icon_name="check_circle"
                    size={24}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.childrenContainer}>
                {childrenList.map((child, index) => (
                  <React.Fragment key={index}>
                    <TouchableOpacity
                      style={[
                        styles.childOption,
                        selectedChildren.includes(child.id) && styles.selectedChildOption,
                      ]}
                      onPress={() => toggleChild(child.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.childAvatar}>{child.avatar}</Text>
                      <Text style={styles.childName}>{child.name}</Text>
                      {selectedChildren.includes(child.id) && (
                        <IconSymbol
                          ios_icon_name="checkmark"
                          android_material_icon_name="check"
                          size={20}
                          color={colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  </React.Fragment>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.assignButton]}
              onPress={handleAssign}
              activeOpacity={0.7}
            >
              <Text style={styles.assignButtonText}>Assign Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
