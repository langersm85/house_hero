
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useThemeColors } from '@/styles/commonStyles';
import { useChores } from '@/contexts/ChoreContext';
import { ChildCard } from '@/components/ChildCard';
import { TaskCard } from '@/components/TaskCard';
import { RewardCard } from '@/components/RewardCard';
import { AddTaskModal } from '@/components/AddTaskModal';
import { AddRewardModal } from '@/components/AddRewardModal';
import { EditRewardModal } from '@/components/EditRewardModal';
import { AddChildModal } from '@/components/AddChildModal';
import { EditChildModal } from '@/components/EditChildModal';
import { IconSymbol } from '@/components/IconSymbol';
import { Child, Reward } from '@/types/chore.types';

export default function HomeScreen() {
  const colors = useThemeColors();
  const { children, tasks, rewards, completeTask, deleteTask, resetTask, addTask, addTaskTemplate, deleteReward, updateReward, addReward, redeemReward, addChild, updateChild, deleteChild, isLoading } = useChores();
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddReward, setShowAddReward] = useState(false);
  const [showEditReward, setShowEditReward] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [showAddChild, setShowAddChild] = useState(false);
  const [showEditChild, setShowEditChild] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [selectedTab, setSelectedTab] = useState<'tasks' | 'rewards'>('tasks');

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const getTaskChildren = (task: any) => {
    if (!task.assignedTo) {
      return [];
    }
    
    if (Array.isArray(task.assignedTo)) {
      return children.filter(c => task.assignedTo.includes(c.id));
    } else {
      const child = children.find(c => c.id === task.assignedTo);
      return child ? [child] : [];
    }
  };

  const handleCompleteTask = (taskId: string, childId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      Alert.alert('Error', 'Task not found');
      return;
    }

    const child = children.find(c => c.id === childId);
    if (!child) {
      Alert.alert('Error', 'Child not found');
      return;
    }

    const isMultipleAssignment = Array.isArray(task.assignedTo);
    const completedBy = task.completedBy || [];

    if (isMultipleAssignment) {
      if (completedBy.includes(childId)) {
        Alert.alert('Already Completed', `${child.name} has already completed this task.`);
        return;
      }

      Alert.alert(
        'Complete Task',
        `Mark "${task.name}" as complete for ${child.name}? They will earn ${task.points} points.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Complete',
            onPress: () => completeTask(taskId, childId),
          },
        ]
      );
    } else {
      Alert.alert(
        'Complete Task',
        `Mark "${task.name}" as complete for ${child.name}? They will earn ${task.points} points.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Complete',
            onPress: () => completeTask(taskId, childId),
          },
        ]
      );
    }
  };

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(taskId),
        },
      ]
    );
  };

  const handleDeleteCompletedTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      console.log('Task not found');
      return;
    }

    Alert.alert(
      'Delete Completed Task',
      `Delete "${task.name}"? This can't be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(taskId);
            console.log(`Completed task ${taskId} deleted from database`);
          },
        },
      ]
    );
  };

  const handleResetTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      console.log('Task not found');
      return;
    }

    Alert.alert(
      'Reset Task',
      `Reset "${task.name}" to active status? This will not affect points already earned.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          onPress: () => resetTask(taskId),
        },
      ]
    );
  };

  const handleEditChild = (child: Child) => {
    setEditingChild(child);
    setShowEditChild(true);
  };

  const handleUpdateChild = (id: string, name: string, avatar: string) => {
    updateChild(id, name, avatar);
    setShowEditChild(false);
    setEditingChild(null);
  };

  const handleDeleteChild = (childId: string) => {
    const child = children.find(c => c.id === childId);
    if (!child) {
      console.log('Child not found');
      return;
    }

    Alert.alert(
      'Delete Child',
      `Are you sure you want to remove ${child.name}? Their tasks will be unassigned.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteChild(childId),
        },
      ]
    );
  };

  const handleEditReward = (reward: Reward) => {
    setEditingReward(reward);
    setShowEditReward(true);
  };

  const handleUpdateReward = (id: string, name: string, pointsRequired: number, type: Reward['type'], description?: string) => {
    updateReward(id, name, pointsRequired, type, description);
    setShowEditReward(false);
    setEditingReward(null);
  };

  const handleRedeemReward = (rewardId: string, childId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    const child = children.find(c => c.id === childId);

    if (!reward || !child) {
      console.log('Reward or child not found');
      return;
    }

    if (child.points < reward.pointsRequired) {
      Alert.alert('Not Enough Points', `${child.name} needs ${reward.pointsRequired - child.points} more points to redeem this reward.`);
      return;
    }

    Alert.alert(
      'Redeem Reward',
      `Redeem "${reward.name}" for ${child.name}? This will cost ${reward.pointsRequired} points.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Redeem',
          onPress: () => {
            const success = redeemReward(rewardId, childId);
            if (success) {
              Alert.alert('Success!', `${child.name} has redeemed ${reward.name}!`);
            }
          },
        },
      ]
    );
  };

  const handleDeleteReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) {
      console.log('Reward not found');
      return;
    }

    Alert.alert(
      'Delete Reward',
      `Delete "${reward.name}"? This can't be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteReward(rewardId);
            console.log(`Reward ${rewardId} deleted from database`);
          },
        },
      ]
    );
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
    section: {
      marginBottom: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
    },
    addButton: {
      backgroundColor: colors.secondary,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
    },
    addButtonText: {
      color: colors.card,
      fontSize: 14,
      fontWeight: '600',
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 4,
      marginBottom: 20,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 8,
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    activeTabText: {
      color: colors.card,
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
    rewardItem: {
      marginBottom: 12,
    },
    redeemContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
      paddingHorizontal: 4,
    },
    childRedeemButton: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 10,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.textSecondary,
    },
    childRedeemButtonActive: {
      borderColor: colors.primary,
      backgroundColor: colors.highlight,
    },
    childRedeemAvatar: {
      fontSize: 20,
      marginBottom: 4,
    },
    childRedeemText: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    childRedeemTextActive: {
      color: colors.primary,
      fontWeight: '600',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    completedTaskWrapper: {
      marginBottom: 12,
    },
    completedTaskActions: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    resetButton: {
      flex: 1,
      backgroundColor: colors.secondary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      minHeight: 44,
    },
    resetButtonText: {
      color: colors.card,
      fontSize: 14,
      fontWeight: '600',
    },
    deleteButton: {
      backgroundColor: colors.card,
      borderWidth: 2,
      borderColor: '#FF3B30',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      minHeight: 44,
      minWidth: 44,
    },
    deleteButtonText: {
      color: '#FF3B30',
      fontSize: 14,
      fontWeight: '600',
    },
  });

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>House Hero</Text>
          <Text style={styles.headerSubtitle}>Earn points by completing tasks!</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Children</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddChild(true)}
              activeOpacity={0.7}
            >
              <IconSymbol
                ios_icon_name="plus"
                android_material_icon_name="add"
                size={20}
                color={colors.card}
              />
              <Text style={styles.addButtonText}>Add Child</Text>
            </TouchableOpacity>
          </View>
          {children.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol
                ios_icon_name="person.2"
                android_material_icon_name="people"
                size={48}
                color={colors.textSecondary}
              />
              <Text style={styles.emptyStateText}>No children yet</Text>
              <Text style={styles.emptyStateSubtext}>Add a child to get started!</Text>
            </View>
          ) : (
            children.map((child, index) => (
              <React.Fragment key={index}>
                <ChildCard 
                  child={child} 
                  showActions={true}
                  onEdit={() => handleEditChild(child)}
                  onDelete={() => handleDeleteChild(child.id)}
                />
              </React.Fragment>
            ))
          )}
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'tasks' && styles.activeTab]}
            onPress={() => setSelectedTab('tasks')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, selectedTab === 'tasks' && styles.activeTabText]}>
              Tasks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'rewards' && styles.activeTab]}
            onPress={() => setSelectedTab('rewards')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, selectedTab === 'rewards' && styles.activeTabText]}>
              Rewards
            </Text>
          </TouchableOpacity>
        </View>

        {selectedTab === 'tasks' ? (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Active Tasks</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setShowAddTask(true)}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    ios_icon_name="plus"
                    android_material_icon_name="add"
                    size={20}
                    color={colors.card}
                  />
                  <Text style={styles.addButtonText}>Add Task</Text>
                </TouchableOpacity>
              </View>
              {activeTasks.length === 0 ? (
                <View style={styles.emptyState}>
                  <IconSymbol
                    ios_icon_name="checkmark.circle"
                    android_material_icon_name="check_circle"
                    size={48}
                    color={colors.textSecondary}
                  />
                  <Text style={styles.emptyStateText}>No active tasks</Text>
                  <Text style={styles.emptyStateSubtext}>Add a task to get started!</Text>
                </View>
              ) : (
                activeTasks.map((task, index) => {
                  const taskChildren = getTaskChildren(task);
                  return (
                    <React.Fragment key={index}>
                      <TaskCard
                        task={task}
                        assignedChildren={taskChildren}
                        onComplete={(childId) => handleCompleteTask(task.id, childId)}
                        onDelete={() => handleDeleteTask(task.id)}
                      />
                    </React.Fragment>
                  );
                })
              )}
            </View>

            {completedTasks.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Completed Tasks</Text>
                {completedTasks.map((task, index) => {
                  const taskChildren = getTaskChildren(task);
                  return (
                    <React.Fragment key={index}>
                      <View style={styles.completedTaskWrapper}>
                        <TaskCard
                          task={task}
                          assignedChildren={taskChildren}
                          showActions={false}
                        />
                        <View style={styles.completedTaskActions}>
                          <TouchableOpacity
                            style={styles.resetButton}
                            onPress={() => handleResetTask(task.id)}
                            activeOpacity={0.7}
                          >
                            <IconSymbol
                              ios_icon_name="arrow.counterclockwise"
                              android_material_icon_name="refresh"
                              size={18}
                              color={colors.card}
                            />
                            <Text style={styles.resetButtonText}>Reset Task</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteCompletedTask(task.id)}
                            activeOpacity={0.7}
                          >
                            <IconSymbol
                              ios_icon_name="trash"
                              android_material_icon_name="delete"
                              size={18}
                              color="#FF3B30"
                            />
                            <Text style={styles.deleteButtonText}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </React.Fragment>
                  );
                })}
              </View>
            )}
          </>
        ) : (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Available Rewards</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddReward(true)}
                activeOpacity={0.7}
              >
                <IconSymbol
                  ios_icon_name="plus"
                  android_material_icon_name="add"
                  size={20}
                  color={colors.card}
                />
                <Text style={styles.addButtonText}>Add Reward</Text>
              </TouchableOpacity>
            </View>
            {rewards.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol
                  ios_icon_name="gift"
                  android_material_icon_name="card_giftcard"
                  size={48}
                  color={colors.textSecondary}
                />
                <Text style={styles.emptyStateText}>No rewards yet</Text>
                <Text style={styles.emptyStateSubtext}>Add rewards for kids to work towards!</Text>
              </View>
            ) : (
              rewards.map((reward, index) => (
                <React.Fragment key={index}>
                  <View style={styles.rewardItem}>
                    <RewardCard
                      reward={reward}
                      onEdit={() => handleEditReward(reward)}
                      onDelete={() => handleDeleteReward(reward.id)}
                      showActions={true}
                    />
                    <View style={styles.redeemContainer}>
                      {children.map((child, childIndex) => (
                        <React.Fragment key={childIndex}>
                          <TouchableOpacity
                            style={[
                              styles.childRedeemButton,
                              child.points >= reward.pointsRequired && styles.childRedeemButtonActive,
                            ]}
                            onPress={() => handleRedeemReward(reward.id, child.id)}
                            activeOpacity={0.7}
                          >
                            <Text style={styles.childRedeemAvatar}>{child.avatar}</Text>
                            <Text style={[
                              styles.childRedeemText,
                              child.points >= reward.pointsRequired && styles.childRedeemTextActive,
                            ]}>
                              {child.name}
                            </Text>
                          </TouchableOpacity>
                        </React.Fragment>
                      ))}
                    </View>
                  </View>
                </React.Fragment>
              ))
            )}
          </View>
        )}
      </ScrollView>

      <AddTaskModal
        visible={showAddTask}
        onClose={() => setShowAddTask(false)}
        onAdd={addTask}
        onAddTemplate={addTaskTemplate}
        childrenList={children}
      />

      <AddRewardModal
        visible={showAddReward}
        onClose={() => setShowAddReward(false)}
        onAdd={addReward}
      />

      <EditRewardModal
        visible={showEditReward}
        onClose={() => {
          setShowEditReward(false);
          setEditingReward(null);
        }}
        onUpdate={handleUpdateReward}
        reward={editingReward}
      />

      <AddChildModal
        visible={showAddChild}
        onClose={() => setShowAddChild(false)}
        onAdd={addChild}
      />

      <EditChildModal
        visible={showEditChild}
        onClose={() => {
          setShowEditChild(false);
          setEditingChild(null);
        }}
        onUpdate={handleUpdateChild}
        child={editingChild}
      />
    </View>
  );
}
