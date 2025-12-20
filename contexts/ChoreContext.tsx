
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Child, Task, Reward } from '@/types/chore.types';

interface ChoreContextType {
  children: Child[];
  tasks: Task[];
  taskTemplates: Task[];
  rewards: Reward[];
  addChild: (name: string, avatar: string) => void;
  updateChild: (id: string, name: string, avatar: string) => void;
  updateChildPoints: (childId: string, points: number) => void;
  deleteChild: (childId: string) => void;
  addTask: (name: string, points: number, description?: string, assignedTo?: string | string[]) => void;
  addTaskTemplate: (name: string, points: number, description?: string) => void;
  createTaskFromTemplate: (templateId: string, assignedTo?: string | string[]) => void;
  updateTaskTemplate: (id: string, name: string, points: number, description?: string) => void;
  deleteTaskTemplate: (templateId: string) => void;
  completeTask: (taskId: string, childId: string) => void;
  deleteTask: (taskId: string) => void;
  resetTask: (taskId: string) => void;
  addReward: (name: string, pointsRequired: number, type: Reward['type'], description?: string) => void;
  updateReward: (id: string, name: string, pointsRequired: number, type: Reward['type'], description?: string) => void;
  deleteReward: (rewardId: string) => void;
  redeemReward: (rewardId: string, childId: string) => boolean;
  isLoading: boolean;
}

const ChoreContext = createContext<ChoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CHILDREN: '@chore_tracker_children',
  TASKS: '@chore_tracker_tasks',
  TASK_TEMPLATES: '@chore_tracker_task_templates',
  REWARDS: '@chore_tracker_rewards',
};

export function ChoreProvider({ children: reactChildren }: { children: ReactNode }) {
  const [children, setChildren] = useState<Child[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTemplates, setTaskTemplates] = useState<Task[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const [childrenData, tasksData, taskTemplatesData, rewardsData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.CHILDREN),
        AsyncStorage.getItem(STORAGE_KEYS.TASKS),
        AsyncStorage.getItem(STORAGE_KEYS.TASK_TEMPLATES),
        AsyncStorage.getItem(STORAGE_KEYS.REWARDS),
      ]);

      if (childrenData) {
        setChildren(JSON.parse(childrenData));
      } else {
        // Set default data if no data exists
        setChildren([
          { id: '1', name: 'Emma', points: 15, avatar: '👧' },
          { id: '2', name: 'Liam', points: 22, avatar: '👦' },
        ]);
      }

      if (tasksData) {
        setTasks(JSON.parse(tasksData));
      } else {
        setTasks([
          { id: '1', name: 'Brush Teeth', points: 1, description: 'Morning and evening', assignedTo: '1', completed: false },
          { id: '2', name: 'Do Dishes', points: 3, description: 'Wash and dry all dishes', assignedTo: '1', completed: false },
          { id: '3', name: 'Weeding Garden', points: 5, description: 'Remove weeds from front yard', assignedTo: '2', completed: false },
          { id: '4', name: 'Clean Room', points: 4, description: 'Tidy up and vacuum', assignedTo: '2', completed: false },
          { id: '5', name: 'Take Out Trash', points: 2, description: 'Empty all bins', assignedTo: '1', completed: false },
        ]);
      }

      if (taskTemplatesData) {
        setTaskTemplates(JSON.parse(taskTemplatesData));
      } else {
        // Create default task templates from common chores
        setTaskTemplates([
          { id: 't1', name: 'Brush Teeth', points: 1, description: 'Morning and evening', completed: false, isTemplate: true },
          { id: 't2', name: 'Do Dishes', points: 3, description: 'Wash and dry all dishes', completed: false, isTemplate: true },
          { id: 't3', name: 'Weeding Garden', points: 5, description: 'Remove weeds from front yard', completed: false, isTemplate: true },
          { id: 't4', name: 'Clean Room', points: 4, description: 'Tidy up and vacuum', completed: false, isTemplate: true },
          { id: 't5', name: 'Take Out Trash', points: 2, description: 'Empty all bins', completed: false, isTemplate: true },
          { id: 't6', name: 'Make Bed', points: 1, description: 'Make your bed neatly', completed: false, isTemplate: true },
          { id: 't7', name: 'Homework', points: 3, description: 'Complete all homework assignments', completed: false, isTemplate: true },
          { id: 't8', name: 'Feed Pet', points: 2, description: 'Feed and water the pet', completed: false, isTemplate: true },
        ]);
      }

      if (rewardsData) {
        setRewards(JSON.parse(rewardsData));
      } else {
        setRewards([
          { id: '1', name: '$5 Cash', pointsRequired: 50, type: 'cash', description: 'Five dollars spending money' },
          { id: '2', name: 'Movie Night', pointsRequired: 100, type: 'privilege', description: 'Choose a movie for family night' },
          { id: '3', name: 'Extra Screen Time', pointsRequired: 30, type: 'privilege', description: '30 minutes extra device time' },
          { id: '4', name: 'New Toy', pointsRequired: 200, type: 'item', description: 'Small toy from the store' },
        ]);
      }
    } catch (error) {
      console.log('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveData = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(children)),
        AsyncStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks)),
        AsyncStorage.setItem(STORAGE_KEYS.TASK_TEMPLATES, JSON.stringify(taskTemplates)),
        AsyncStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(rewards)),
      ]);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  }, [children, tasks, taskTemplates, rewards]);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveData();
    }
  }, [children, tasks, taskTemplates, rewards, isLoading, saveData]);

  const addChild = (name: string, avatar: string) => {
    const newChild: Child = {
      id: Date.now().toString(),
      name,
      points: 0,
      avatar,
    };
    setChildren(prev => [...prev, newChild]);
  };

  const updateChild = (id: string, name: string, avatar: string) => {
    setChildren(prev =>
      prev.map(child =>
        child.id === id ? { ...child, name, avatar } : child
      )
    );
  };

  const updateChildPoints = (childId: string, points: number) => {
    setChildren(prev =>
      prev.map(child =>
        child.id === childId ? { ...child, points } : child
      )
    );
  };

  const deleteChild = (childId: string) => {
    setChildren(prev => prev.filter(c => c.id !== childId));
    // Also remove tasks assigned to this child
    setTasks(prev => prev.map(t => {
      if (Array.isArray(t.assignedTo)) {
        const newAssignedTo = t.assignedTo.filter(id => id !== childId);
        return { ...t, assignedTo: newAssignedTo.length > 0 ? (newAssignedTo.length === 1 ? newAssignedTo[0] : newAssignedTo) : undefined };
      } else if (t.assignedTo === childId) {
        return { ...t, assignedTo: undefined };
      }
      return t;
    }));
  };

  const addTask = (name: string, points: number, description?: string, assignedTo?: string | string[]) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name,
      points,
      description,
      assignedTo,
      completed: false,
      completedBy: [],
      isTemplate: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const addTaskTemplate = (name: string, points: number, description?: string) => {
    const newTemplate: Task = {
      id: `t${Date.now()}`,
      name,
      points,
      description,
      completed: false,
      isTemplate: true,
    };
    setTaskTemplates(prev => [...prev, newTemplate]);
  };

  const createTaskFromTemplate = (templateId: string, assignedTo?: string | string[]) => {
    const template = taskTemplates.find(t => t.id === templateId);
    if (!template) {
      console.log('Template not found');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      name: template.name,
      points: template.points,
      description: template.description,
      assignedTo,
      completed: false,
      completedBy: [],
      isTemplate: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTaskTemplate = (id: string, name: string, points: number, description?: string) => {
    setTaskTemplates(prev =>
      prev.map(template =>
        template.id === id ? { ...template, name, points, description } : template
      )
    );
  };

  const deleteTaskTemplate = (templateId: string) => {
    setTaskTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const completeTask = (taskId: string, childId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      console.log('Task not found');
      return;
    }

    // Check if task is assigned to multiple children
    const isMultipleAssignment = Array.isArray(task.assignedTo);
    
    if (isMultipleAssignment) {
      // For multiple assignments, track individual completions
      const completedBy = task.completedBy || [];
      
      if (completedBy.includes(childId)) {
        console.log('Task already completed by this child');
        return;
      }

      const newCompletedBy = [...completedBy, childId];
      const allChildrenCompleted = task.assignedTo.every((id: string) => newCompletedBy.includes(id));

      setTasks(prev =>
        prev.map(t =>
          t.id === taskId
            ? { 
                ...t, 
                completedBy: newCompletedBy,
                completed: allChildrenCompleted,
                completedAt: allChildrenCompleted ? new Date() : t.completedAt
              }
            : t
        )
      );

      // Award points to the child who completed it
      setChildren(prev =>
        prev.map(child =>
          child.id === childId
            ? { ...child, points: child.points + task.points }
            : child
        )
      );
    } else {
      // Single assignment - mark as complete
      if (task.completed) {
        console.log('Task already completed');
        return;
      }

      setTasks(prev =>
        prev.map(t =>
          t.id === taskId
            ? { ...t, completed: true, completedAt: new Date(), completedBy: [childId] }
            : t
        )
      );

      setChildren(prev =>
        prev.map(child =>
          child.id === childId
            ? { ...child, points: child.points + task.points }
            : child
        )
      );
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const resetTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t, completed: false, completedAt: undefined, completedBy: [] }
          : t
      )
    );
  };

  const addReward = (name: string, pointsRequired: number, type: Reward['type'], description?: string) => {
    const newReward: Reward = {
      id: Date.now().toString(),
      name,
      pointsRequired,
      type,
      description,
    };
    setRewards(prev => [...prev, newReward]);
  };

  const updateReward = (id: string, name: string, pointsRequired: number, type: Reward['type'], description?: string) => {
    setRewards(prev =>
      prev.map(reward =>
        reward.id === id ? { ...reward, name, pointsRequired, type, description } : reward
      )
    );
  };

  const deleteReward = (rewardId: string) => {
    setRewards(prev => prev.filter(r => r.id !== rewardId));
  };

  const redeemReward = (rewardId: string, childId: string): boolean => {
    const reward = rewards.find(r => r.id === rewardId);
    const child = children.find(c => c.id === childId);

    if (!reward || !child) {
      console.log('Reward or child not found');
      return false;
    }

    if (child.points < reward.pointsRequired) {
      console.log('Not enough points');
      return false;
    }

    setChildren(prev =>
      prev.map(c =>
        c.id === childId
          ? { ...c, points: c.points - reward.pointsRequired }
          : c
      )
    );

    return true;
  };

  return (
    <ChoreContext.Provider
      value={{
        children,
        tasks,
        taskTemplates,
        rewards,
        addChild,
        updateChild,
        updateChildPoints,
        deleteChild,
        addTask,
        addTaskTemplate,
        createTaskFromTemplate,
        updateTaskTemplate,
        deleteTaskTemplate,
        completeTask,
        deleteTask,
        resetTask,
        addReward,
        updateReward,
        deleteReward,
        redeemReward,
        isLoading,
      }}
    >
      {reactChildren}
    </ChoreContext.Provider>
  );
}

export function useChores() {
  const context = useContext(ChoreContext);
  if (context === undefined) {
    throw new Error('useChores must be used within a ChoreProvider');
  }
  return context;
}
