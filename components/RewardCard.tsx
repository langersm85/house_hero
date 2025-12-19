
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/styles/commonStyles';
import { Reward } from '@/types/chore.types';
import { IconSymbol } from './IconSymbol';

interface RewardCardProps {
  reward: Reward;
  onRedeem?: () => void;
  onDelete?: () => void;
  canRedeem?: boolean;
  showActions?: boolean;
}

export function RewardCard({ reward, onRedeem, onDelete, canRedeem = false, showActions = true }: RewardCardProps) {
  const colors = useThemeColors();

  const getRewardIcon = (type: Reward['type']) => {
    switch (type) {
      case 'cash':
        return 'attach_money';
      case 'privilege':
        return 'star';
      case 'item':
        return 'card_giftcard';
      default:
        return 'emoji_events';
    }
  };

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
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.highlight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    description: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    pointsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    pointsRequired: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    redeemButton: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    disabledButton: {
      backgroundColor: colors.textSecondary,
      opacity: 0.5,
    },
    redeemButtonText: {
      color: colors.card,
      fontSize: 14,
      fontWeight: '600',
    },
    disabledButtonText: {
      color: colors.card,
    },
    deleteButton: {
      padding: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <IconSymbol
          ios_icon_name="gift"
          android_material_icon_name={getRewardIcon(reward.type)}
          size={28}
          color={colors.secondary}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{reward.name}</Text>
        {reward.description && (
          <Text style={styles.description}>{reward.description}</Text>
        )}
        <View style={styles.pointsContainer}>
          <IconSymbol
            ios_icon_name="star.fill"
            android_material_icon_name="star"
            size={14}
            color={colors.accent}
          />
          <Text style={styles.pointsRequired}>{reward.pointsRequired} points</Text>
        </View>
      </View>
      {showActions && (
        <View style={styles.actionsContainer}>
          {onRedeem && (
            <TouchableOpacity
              style={[styles.redeemButton, !canRedeem && styles.disabledButton]}
              onPress={onRedeem}
              disabled={!canRedeem}
              activeOpacity={0.7}
            >
              <Text style={[styles.redeemButtonText, !canRedeem && styles.disabledButtonText]}>
                Redeem
              </Text>
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
    </View>
  );
}
