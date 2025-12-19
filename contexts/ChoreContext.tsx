
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Child, Task, Reward } from '@/types/chore.types';

interface ChoreContextType {
  children: Child[];
  tasks: Task[];
  rewards: Reward[];
  addChild: (name: string, avatar: string) => void;
  updateChildPoints: (childId: string, points: number) => void;
  deleteChild: (childId: string) => void;
  addTask: (name: string, points: number, description?: string, assignedTo?: string) => void;
  completeTask: (taskId: string, childId: string) => void;
  deleteTask: (taskId: string) => void;
  addReward: (name: string, pointsRequired: number, type: Reward['type'], description?: string) => void;
  deleteReward: (rewardId: string) => void;
  redeemReward: (rewardId: string, childId: string) => boolean;
  isLoading: boolean;
}

const ChoreContext = createContext<ChoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CHILDREN: '@chore_tracker_children',
  TASKS: '@chore_tracker_tasks',
  REWARDS: '@chore_tracker_rewards',
};

export function ChoreProvider({ children: reactChildren }: { children: ReactNode }) {
  const [children, setChildren] = useState<Child[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      const [childrenData, tasksData, rewardsData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.CHILDREN),
        AsyncStorage.getItem(STORAGE_KEYS.TASKS),
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
        AsyncStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(rewards)),
      ]);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  }, [children, tasks, rewards]);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveData();
    }
  }, [children, tasks, rewards, isLoading, saveData]);

  const addChild = (name: string, avatar: string) => {
    const newChild: Child = {
      id: Date.now().toString(),
      name,
      points: 0,
      avatar,
    };
    setChildren(prev => [...prev, newChild]);
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
    setTasks(prev => prev.map(t => 
      t.assignedTo === childId ? { ...t, assignedTo: undefined } : t
    ));
  };

  const addTask = (name: string, points: number, description?: string, assignedTo?: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name,
      points,
      description,
      assignedTo,
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const completeTask = (taskId: string, childId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) {
      console.log('Task not found or already completed');
      return;
    }

    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? { ...t, completed: true, completedAt: new Date() }
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
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
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
        rewards,
        addChild,
        updateChildPoints,
        deleteChild,
        addTask,
        completeTask,
        deleteTask,
        addReward,
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
