
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useThemeColors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';
import { Child } from '@/types/chore.types';

interface EditChildModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (id: string, name: string, avatar: string) => void;
  child: Child | null;
}

const AVATAR_OPTIONS = ['👧', '👦', '👶', '🧒', '👨', '👩', '🧑', '👴', '👵', '🙂', '😊', '🤗', '🌟', '⭐', '🎯', '🎨'];

export function EditChildModal({ visible, onClose, onUpdate, child }: EditChildModalProps) {
  const colors = useThemeColors();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👧');

  // Pre-populate form when child changes
  useEffect(() => {
    if (child) {
      setName(child.name);
      setSelectedAvatar(child.avatar);
    }
  }, [child]);

  const handleUpdate = () => {
    if (name.trim() && child) {
      onUpdate(child.id, name.trim(), selectedAvatar);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
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
    avatarGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    avatarOption: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedAvatar: {
      borderColor: colors.primary,
      backgroundColor: colors.highlight,
    },
    avatarText: {
      fontSize: 28,
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

  if (!child) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Edit Child</Text>
            <TouchableOpacity onPress={handleClose} activeOpacity={0.7}>
              <IconSymbol
                ios_icon_name="xmark"
                android_material_icon_name="close"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Child&apos;s Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g., Emma"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={styles.label}>Choose Avatar *</Text>
            <View style={styles.avatarGrid}>
              {AVATAR_OPTIONS.map((avatar, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    style={[
                      styles.avatarOption,
                      selectedAvatar === avatar && styles.selectedAvatar,
                    ]}
                    onPress={() => setSelectedAvatar(avatar)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.avatarText}>{avatar}</Text>
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.updateButton, !name.trim() && styles.disabledButton]}
              onPress={handleUpdate}
              disabled={!name.trim()}
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
