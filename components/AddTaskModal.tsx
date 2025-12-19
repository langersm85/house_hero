
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useThemeColors } from '@/styles/commonStyles';
import { Child } from '@/types/chore.types';
import { IconSymbol } from './IconSymbol';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, points: number, description?: string, assignedTo?: string | string[]) => void;
  onAddTemplate?: (name: string, points: number, description?: string) => void;
  childrenList: Child[];
}

export function AddTaskModal({ visible, onClose, onAdd, onAddTemplate, childrenList }: AddTaskModalProps) {
  const colors = useThemeColors();
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [assignToAll, setAssignToAll] = useState(false);

  const handleAdd = () => {
    if (name.trim() && points.trim()) {
      let assignedTo: string | string[] | undefined = undefined;
      
      if (assignToAll) {
        assignedTo = childrenList.map(c => c.id);
      } else if (selectedChildren.length > 0) {
        assignedTo = selectedChildren.length === 1 ? selectedChildren[0] : selectedChildren;
      }
      
      // Add the task
      onAdd(name.trim(), parseInt(points), description.trim() || undefined, assignedTo);
      
      // Automatically save as template if onAddTemplate is provided
      if (onAddTemplate) {
        onAddTemplate(name.trim(), parseInt(points), description.trim() || undefined);
        console.log('Task automatically saved as template:', name.trim());
      }
      
      setName('');
      setPoints('');
      setDescription('');
      setSelectedChildren([]);
      setAssignToAll(false);
      onClose();
    }
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
      maxHeight: '80%',
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
    form: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
      marginTop: 12,
    },
    input: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.textSecondary,
    },
    textArea: {
      height: 80,
      textAlignVertical: 'top',
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
    addButton: {
      backgroundColor: colors.primary,
    },
    addButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.card,
    },
    disabledButton: {
      opacity: 0.5,
    },
    infoBox: {
      backgroundColor: colors.highlight,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    infoText: {
      flex: 1,
      fontSize: 13,
      color: colors.text,
      lineHeight: 18,
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
            <Text style={styles.title}>Add New Task</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <IconSymbol
                ios_icon_name="xmark"
                android_material_icon_name="close"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            {onAddTemplate && (
              <View style={styles.infoBox}>
                <IconSymbol
                  ios_icon_name="info.circle.fill"
                  android_material_icon_name="info"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.infoText}>
                  This task will be automatically saved as a template for future use.
                </Text>
              </View>
            )}

            <Text style={styles.label}>Task Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g., Brush Teeth"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={styles.label}>Points *</Text>
            <TextInput
              style={styles.input}
              value={points}
              onChangeText={setPoints}
              placeholder="e.g., 5"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Add details about the task..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Assign To (Optional)</Text>
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
              style={[styles.button, styles.addButton, (!name.trim() || !points.trim()) && styles.disabledButton]}
              onPress={handleAdd}
              disabled={!name.trim() || !points.trim()}
              activeOpacity={0.7}
            >
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
