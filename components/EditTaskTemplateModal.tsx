
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useThemeColors } from '@/styles/commonStyles';
import { Task } from '@/types/chore.types';
import { IconSymbol } from './IconSymbol';

interface EditTaskTemplateModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (id: string, name: string, points: number, description?: string) => void;
  template: Task | null;
}

export function EditTaskTemplateModal({ visible, onClose, onUpdate, template }: EditTaskTemplateModalProps) {
  const colors = useThemeColors();
  const [name, setName] = useState('');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (template) {
      setName(template.name);
      setPoints(template.points.toString());
      setDescription(template.description || '');
    }
  }, [template]);

  const handleUpdate = () => {
    if (template && name.trim() && points.trim()) {
      onUpdate(template.id, name.trim(), parseInt(points), description.trim() || undefined);
      onClose();
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
    updateButton: {
      backgroundColor: colors.primary,
    },
    updateButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.card,
    },
    disabledButton: {
      opacity: 0.5,
    },
  });

  if (!template) {
    return null;
  }

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
            <Text style={styles.title}>Edit Task Template</Text>
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
              style={[styles.button, styles.updateButton, (!name.trim() || !points.trim()) && styles.disabledButton]}
              onPress={handleUpdate}
              disabled={!name.trim() || !points.trim()}
              activeOpacity={0.7}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
