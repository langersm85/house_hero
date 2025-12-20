
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, Linking } from 'react-native';
import { useThemeColors } from '@/styles/commonStyles';
import { useChores } from '@/contexts/ChoreContext';
import { useTheme } from '@/contexts/ThemeContext';
import { IconSymbol } from '@/components/IconSymbol';

export default function ProfileScreen() {
  const colors = useThemeColors();
  const { children, tasks, rewards } = useChores();
  const { themeMode, setThemeMode } = useTheme();
  const [showThemeModal, setShowThemeModal] = useState(false);

  const totalPoints = children.reduce((sum, child) => sum + child.points, 0);
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const activeTasksCount = tasks.filter(t => !t.completed).length;

  const handleInfo = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  const getThemeLabel = () => {
    switch (themeMode) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'auto':
        return 'Auto (System)';
      default:
        return 'Auto (System)';
    }
  };

  const handleContactSupport = async () => {
    const email = 'support@househero.app';
    const url = `mailto:${email}`;
    
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Email Not Available', 'Please contact us at support@househero.app');
      }
    } catch (error) {
      console.log('Error opening email client:', error);
      Alert.alert('Email Not Available', 'Please contact us at support@househero.app');
    }
  };

  const handleSignIn = () => {
    Alert.alert('Sign In', 'Sign in functionality coming soon!');
  };

  const handleUpgrade = () => {
    Alert.alert('Upgrade', 'Upgrade functionality coming soon!');
  };

  const handleRestorePurchases = () => {
    Alert.alert('Restore Purchases', 'Restore purchases functionality coming soon!');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      paddingTop: 48,
      paddingHorizontal: 16,
      paddingBottom: 120,
    },
    header: {
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 24,
    },
    statCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      width: '48%',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      elevation: 2,
    },
    statIconContainer: {
      marginBottom: 8,
    },
    statValue: {
      fontSize: 28,
      fontWeight: '800',
      color: colors.text,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
    },
    leaderboardItem: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      elevation: 2,
    },
    rankBadge: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.highlight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    rankText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.primary,
    },
    childAvatar: {
      fontSize: 32,
      marginRight: 12,
    },
    childInfo: {
      flex: 1,
    },
    childName: {
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
    childPoints: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    crownBadge: {
      marginLeft: 8,
    },
    infoCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      elevation: 2,
    },
    infoText: {
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginLeft: 12,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyStateText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginTop: 12,
    },
    emptyStateSubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      width: '100%',
      maxWidth: 400,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
      elevation: 5,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderRadius: 12,
      marginBottom: 8,
      backgroundColor: colors.background,
    },
    themeOptionSelected: {
      backgroundColor: colors.highlight,
    },
    themeOptionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    themeOptionText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginLeft: 12,
    },
    closeButton: {
      marginTop: 16,
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    themeValueText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 'auto',
    },
    divider: {
      height: 1,
      backgroundColor: colors.textSecondary,
      opacity: 0.2,
      marginVertical: 16,
    },
    accountCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 12,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      elevation: 2,
    },
    accountText: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    primaryButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 12,
    },
    primaryButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    secondaryButton: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 12,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    secondaryButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.primary,
    },
    helperText: {
      fontSize: 13,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 18,
    },
    subscriptionCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 12,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      elevation: 2,
    },
    planText: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Family Stats</Text>
          <Text style={styles.headerSubtitle}>Track your family&apos;s progress</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <IconSymbol
                ios_icon_name="person.2.fill"
                android_material_icon_name="people"
                size={32}
                color={colors.primary}
              />
            </View>
            <Text style={styles.statValue}>{children.length}</Text>
            <Text style={styles.statLabel}>Children</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <IconSymbol
                ios_icon_name="star.fill"
                android_material_icon_name="star"
                size={32}
                color={colors.accent}
              />
            </View>
            <Text style={styles.statValue}>{totalPoints}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <IconSymbol
                ios_icon_name="checkmark.circle.fill"
                android_material_icon_name="check_circle"
                size={32}
                color={colors.primary}
              />
            </View>
            <Text style={styles.statValue}>{completedTasksCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <IconSymbol
                ios_icon_name="list.bullet"
                android_material_icon_name="list"
                size={32}
                color={colors.secondary}
              />
            </View>
            <Text style={styles.statValue}>{activeTasksCount}</Text>
            <Text style={styles.statLabel}>Active Tasks</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Children Leaderboard</Text>
          {children.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol
                ios_icon_name="person.2"
                android_material_icon_name="people"
                size={48}
                color={colors.textSecondary}
              />
              <Text style={styles.emptyStateText}>No children yet</Text>
              <Text style={styles.emptyStateSubtext}>Add children to see the leaderboard!</Text>
            </View>
          ) : (
            [...children]
              .sort((a, b) => b.points - a.points)
              .map((child, index) => (
                <React.Fragment key={index}>
                  <View style={styles.leaderboardItem}>
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankText}>#{index + 1}</Text>
                    </View>
                    <Text style={styles.childAvatar}>{child.avatar}</Text>
                    <View style={styles.childInfo}>
                      <Text style={styles.childName}>{child.name}</Text>
                      <View style={styles.pointsContainer}>
                        <IconSymbol
                          ios_icon_name="star.fill"
                          android_material_icon_name="star"
                          size={14}
                          color={colors.accent}
                        />
                        <Text style={styles.childPoints}>{child.points} points</Text>
                      </View>
                    </View>
                    {index === 0 && (
                      <View style={styles.crownBadge}>
                        <IconSymbol
                          ios_icon_name="crown.fill"
                          android_material_icon_name="emoji_events"
                          size={24}
                          color={colors.accent}
                        />
                      </View>
                    )}
                  </View>
                </React.Fragment>
              ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => setShowThemeModal(true)}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="paintbrush.fill"
              android_material_icon_name="palette"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.infoText}>Display Settings</Text>
            <Text style={styles.themeValueText}>{getThemeLabel()}</Text>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron_right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => handleInfo(
              'How It Works',
              'Parents create tasks with point values. When kids complete tasks, parents mark them as done and points are automatically added. Kids can redeem their points for rewards!'
            )}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="info.circle"
              android_material_icon_name="info"
              size={24}
              color={colors.secondary}
            />
            <Text style={styles.infoText}>How It Works</Text>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron_right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoCard}
            onPress={() => handleInfo(
              'Tips for Parents',
              '- Set clear expectations for each task\n- Be consistent with point values\n- Celebrate achievements\n- Make rewards meaningful\n- Adjust points as needed'
            )}
            activeOpacity={0.7}
          >
            <IconSymbol
              ios_icon_name="lightbulb"
              android_material_icon_name="lightbulb"
              size={24}
              color={colors.accent}
            />
            <Text style={styles.infoText}>Tips for Parents</Text>
            <IconSymbol
              ios_icon_name="chevron.right"
              android_material_icon_name="chevron_right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.accountCard}>
            <Text style={styles.accountText}>You&apos;re not signed in</Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSignIn}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Sign in</Text>
            </TouchableOpacity>
            <Text style={styles.helperText}>
              Sign in is required for subscriptions and restore purchases.
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          <View style={styles.subscriptionCard}>
            <Text style={styles.planText}>Current plan: Free</Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleUpgrade}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Upgrade</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleRestorePurchases}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Restore purchases</Text>
            </TouchableOpacity>
            <Text style={styles.helperText}>
              If you already subscribed, restore to unlock.
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleContactSupport}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Contact support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showThemeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowThemeModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowThemeModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Display Settings</Text>

              <TouchableOpacity
                style={[
                  styles.themeOption,
                  themeMode === 'light' && styles.themeOptionSelected,
                ]}
                onPress={() => setThemeMode('light')}
                activeOpacity={0.7}
              >
                <View style={styles.themeOptionContent}>
                  <IconSymbol
                    ios_icon_name="sun.max.fill"
                    android_material_icon_name="light_mode"
                    size={24}
                    color={colors.accent}
                  />
                  <Text style={styles.themeOptionText}>Light Mode</Text>
                </View>
                {themeMode === 'light' && (
                  <IconSymbol
                    ios_icon_name="checkmark.circle.fill"
                    android_material_icon_name="check_circle"
                    size={24}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.themeOption,
                  themeMode === 'dark' && styles.themeOptionSelected,
                ]}
                onPress={() => setThemeMode('dark')}
                activeOpacity={0.7}
              >
                <View style={styles.themeOptionContent}>
                  <IconSymbol
                    ios_icon_name="moon.fill"
                    android_material_icon_name="dark_mode"
                    size={24}
                    color={colors.secondary}
                  />
                  <Text style={styles.themeOptionText}>Dark Mode</Text>
                </View>
                {themeMode === 'dark' && (
                  <IconSymbol
                    ios_icon_name="checkmark.circle.fill"
                    android_material_icon_name="check_circle"
                    size={24}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.themeOption,
                  themeMode === 'auto' && styles.themeOptionSelected,
                ]}
                onPress={() => setThemeMode('auto')}
                activeOpacity={0.7}
              >
                <View style={styles.themeOptionContent}>
                  <IconSymbol
                    ios_icon_name="circle.lefthalf.filled"
                    android_material_icon_name="brightness_auto"
                    size={24}
                    color={colors.primary}
                  />
                  <Text style={styles.themeOptionText}>Auto (System)</Text>
                </View>
                {themeMode === 'auto' && (
                  <IconSymbol
                    ios_icon_name="checkmark.circle.fill"
                    android_material_icon_name="check_circle"
                    size={24}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowThemeModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.closeButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
