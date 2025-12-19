
export interface Child {
  id: string;
  name: string;
  points: number;
  avatar: string;
}

export interface Task {
  id: string;
  name: string;
  points: number;
  description?: string;
  assignedTo?: string | string[]; // Can be a single child ID or array of child IDs
  completed: boolean;
  completedAt?: Date;
  completedBy?: string[]; // Track which children have completed the task
  isTemplate?: boolean; // True if this is a reusable task template
}

export interface Reward {
  id: string;
  name: string;
  pointsRequired: number;
  description?: string;
  type: 'cash' | 'privilege' | 'item' | 'other';
}
