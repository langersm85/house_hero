
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColors } from '@/styles/commonStyles';
import { useChores } from '@/contexts/ChoreContext';
import { TaskCard } from '@/components/TaskCard';
import { AddTaskTemplateModal } from '@/components/AddTaskTemplateModal';
import { EditTaskTemplateModal } from '@/components/EditTaskTemplateModal';
import { AssignTaskModal } from '@/components/AssignTaskModal';
import { IconSymbol } from '@/components/IconSymbol';
import { Task } from '@/types/chore.types';

export default function TasksScreen() {
  const colors = useThemeColors();
  const { taskTemplates, children, addTaskTemplate, updateTaskTemplate, deleteTaskTemplate, createTaskFromTemplate, isLoading } = useChores();
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [showEditTemplate, setShowEditTemplate] = useState(false);
  const [showAssignTask, setShowAssignTask] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Task | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Task | null>(null);

  const handleEditTemplate = (template: Task) => {
    setEditingTemplate(template);
    setShowEditTemplate(true);
  };

  const handleUpdateTemplate = (id: string, name: string, points: number, description?: string) => {
    updateTaskTemplate(id, name, points, description);
    setShowEditTemplate(false);
    setEditingTemplate(null);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const template = taskTemplates.find(t => t.id === templateId);
    if (!template) {
      console.log('Template not found');
      return;
    }

    Alert.alert(
      'Delete Task Template',
      `Are you sure you want to delete "${template.name}"? This won't affect any active tasks.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTaskTemplate(templateId),
        },
      ]
    );
  };

  const handleAssignTemplate = (template: Task) => {
    setSelectedTemplate(template);
    setShowAssignTask(true);
  };

  const handleCreateTask = (assignedTo?: string | string[]) => {
    if (selectedTemplate) {
      createTaskFromTemplate(selectedTemplate.id, assignedTo);
      setShowAssignTask(false);
      setSelectedTemplate(null);
      Alert.alert('Success', 'Task has been added to active tasks!');
    }
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      paddingTop: 16,
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
    templateCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      elevation: 2,
    },
    templateHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    templateInfo: {
      flex: 1,
    },
    templateName: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    templateDescription: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    pointsBadge: {
      backgroundColor: colors.accent,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginLeft: 12,
    },
    pointsText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text,
    },
    actionsContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 12,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
    },
    assignButton: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    assignButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.card,
    },
    editButton: {
      backgroundColor: colors.background,
      borderColor: colors.textSecondary,
    },
    editButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    deleteButton: {
      backgroundColor: colors.background,
      borderColor: colors.textSecondary,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoBox: {
      backgroundColor: colors.highlight,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      flexDirection: 'row',
      gap: 12,
    },
    infoText: {
      flex: 1,
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Task Library</Text>
            <Text style={styles.headerSubtitle}>Reusable task templates</Text>
          </View>

          <View style={styles.infoBox}>
            <IconSymbol
              ios_icon_name="lightbulb.fill"
              android_material_icon_name="lightbulb"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.infoText}>
              Create task templates here and assign them to children whenever needed. No need to recreate tasks every time!
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Task Templates</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddTemplate(true)}
                activeOpacity={0.7}
              >
                <IconSymbol
                  ios_icon_name="plus"
                  android_material_icon_name="add"
                  size={20}
                  color={colors.card}
                />
                <Text style={styles.addButtonText}>Add Template</Text>
              </TouchableOpacity>
            </View>

            {taskTemplates.length === 0 ? (
              <View style={styles.emptyState}>
                <IconSymbol
                  ios_icon_name="list.bullet.clipboard"
                  android_material_icon_name="assignment"
                  size={48}
                  color={colors.textSecondary}
                />
                <Text style={styles.emptyStateText}>No task templates yet</Text>
                <Text style={styles.emptyStateSubtext}>Create templates for recurring tasks!</Text>
              </View>
            ) : (
              taskTemplates.map((template, index) => (
                <React.Fragment key={index}>
                  <View style={styles.templateCard}>
                    <View style={styles.templateHeader}>
                      <View style={styles.templateInfo}>
                        <Text style={styles.templateName}>{template.name}</Text>
                        {template.description && (
                          <Text style={styles.templateDescription}>{template.description}</Text>
                        )}
                      </View>
                      <View style={styles.pointsBadge}>
                        <IconSymbol
                          ios_icon_name="star.fill"
                          android_material_icon_name="star"
                          size={14}
                          color={colors.accent}
                        />
                        <Text style={styles.pointsText}>{template.points}</Text>
                      </View>
                    </View>

                    <View style={styles.actionsContainer}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.assignButton]}
                        onPress={() => handleAssignTemplate(template)}
                        activeOpacity={0.7}
                      >
                        <IconSymbol
                          ios_icon_name="person.badge.plus"
                          android_material_icon_name="person_add"
                          size={18}
                          color={colors.card}
                        />
                        <Text style={styles.assignButtonText}>Assign</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => handleEditTemplate(template)}
                        activeOpacity={0.7}
                      >
                        <IconSymbol
                          ios_icon_name="pencil"
                          android_material_icon_name="edit"
                          size={18}
                          color={colors.text}
                        />
                        <Text style={styles.editButtonText}>Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDeleteTemplate(template.id)}
                        activeOpacity={0.7}
                      >
                        <IconSymbol
                          ios_icon_name="trash"
                          android_material_icon_name="delete"
                          size={18}
                          color={colors.textSecondary}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </React.Fragment>
              ))
            )}
          </View>
        </ScrollView>

        <AddTaskTemplateModal
          visible={showAddTemplate}
          onClose={() => setShowAddTemplate(false)}
          onAdd={addTaskTemplate}
        />

        <EditTaskTemplateModal
          visible={showEditTemplate}
          onClose={() => {
            setShowEditTemplate(false);
            setEditingTemplate(null);
          }}
          onUpdate={handleUpdateTemplate}
          template={editingTemplate}
        />

        <AssignTaskModal
          visible={showAssignTask}
          onClose={() => {
            setShowAssignTask(false);
            setSelectedTemplate(null);
          }}
          onAssign={handleCreateTask}
          childrenList={children}
          taskName={selectedTemplate?.name || ''}
        />
      </View>
    </SafeAreaView>
  );
}
