
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
  assignedTo?: string;
  completed: boolean;
  completedAt?: Date;
}

export interface Reward {
  id: string;
  name: string;
  pointsRequired: number;
  description?: string;
  type: 'cash' | 'privilege' | 'item' | 'other';
}
