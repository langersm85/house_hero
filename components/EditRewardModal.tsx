
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useThemeColors } from '@/styles/commonStyles';
import { Reward } from '@/types/chore.types';
import { IconSymbol } from './IconSymbol';

interface EditRewardModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (id: string, name: string, pointsRequired: number, type: Reward['type'], description?: string) => void;
  reward: Reward | null;
}

export function EditRewardModal({ visible, onClose, onUpdate, reward }: EditRewardModalProps) {
  const colors = useThemeColors();
  const [name, setName] = useState('');
  const [pointsRequired, setPointsRequired] = useState('');
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState<Reward['type']>('cash');

  const rewardTypes: { type: Reward['type']; label: string; icon: string }[] = [
    { type: 'cash', label: 'Cash', icon: 'attach_money' },
    { type: 'privilege', label: 'Privilege', icon: 'star' },
    { type: 'item', label: 'Item', icon: 'card_giftcard' },
    { type: 'other', label: 'Other', icon: 'emoji_events' },
  ];

  useEffect(() => {
    if (reward) {
      setName(reward.name);
      setPointsRequired(reward.pointsRequired.toString());
      setDescription(reward.description || '');
      setSelectedType(reward.type);
    }
  }, [reward]);

  const handleUpdate = () => {
    if (reward && name.trim() && pointsRequired.trim()) {
      onUpdate(reward.id, name.trim(), parseInt(pointsRequired), selectedType, description.trim() || undefined);
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
    textArea: {
      height: 80,
      textAlignVertical: 'top',
    },
    typesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    typeOption: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderWidth: 2,
      borderColor: 'transparent',
      minWidth: '45%',
    },
    selectedTypeOption: {
      borderColor: colors.secondary,
      backgroundColor: colors.highlight,
    },
    typeName: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    selectedTypeName: {
      color: colors.secondary,
      fontWeight: '600',
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
      backgroundColor: colors.secondary,
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
            <Text style={styles.title}>Edit Reward</Text>
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
            <Text style={styles.label}>Reward Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g., $5 Cash"
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={styles.label}>Points Required *</Text>
            <TextInput
              style={styles.input}
              value={pointsRequired}
              onChangeText={setPointsRequired}
              placeholder="e.g., 50"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Add details about the reward..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Reward Type *</Text>
            <View style={styles.typesContainer}>
              {rewardTypes.map((rewardType, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity
                    style={[
                      styles.typeOption,
                      selectedType === rewardType.type && styles.selectedTypeOption,
                    ]}
                    onPress={() => setSelectedType(rewardType.type)}
                    activeOpacity={0.7}
                  >
                    <IconSymbol
                      ios_icon_name="gift"
                      android_material_icon_name={rewardType.icon}
                      size={24}
                      color={selectedType === rewardType.type ? colors.secondary : colors.textSecondary}
                    />
                    <Text style={[
                      styles.typeName,
                      selectedType === rewardType.type && styles.selectedTypeName,
                    ]}>
                      {rewardType.label}
                    </Text>
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
              style={[styles.button, styles.updateButton, (!name.trim() || !pointsRequired.trim()) && styles.disabledButton]}
              onPress={handleUpdate}
              disabled={!name.trim() || !pointsRequired.trim()}
              activeOpacity={0.7}
            >
              <Text style={styles.updateButtonText}>Update Reward</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
