

export interface TaskCompletion {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isCompleted: boolean;
    platformUserId: string | null;
    userId: string;
    taskId: string;
    reward:number;
    }
    
export interface Question {
    key: string;
    value: string;
    prompt: string;
}
    

export interface Task{
    id: string;
    categoryId: string;
    description: string; // Nullable
    isUnderstand: boolean; // A flag to check understanding
    link: string | null; // Nullable URL
    reward: number; // Numeric reward for the task
    createdAt: Date; // Task creation timestamp
    updatedAt: Date; // Task last update timestamp
    completions: TaskCompletion[]; // Array of task completion records
    isCompleted: boolean; // Completion status
    category: {name: string; }; // Object containing the category name
    ad1:string;
    ad2:string;
    ad3:string;
    track: string; // String field for tracking (assumed context)
    trackmin: string; // Minimum value for track (assumed context)
    track2: string; // Additional tracking field
    trackmin2: string; // Additional minimum value for tracking
    duration:string;
    ownerId:string;
    countryCode:string;
    }

export interface TaskItemProps {
    description: string;
    id: string;
    link: string;
    reward: number;
    taskId: string;
    completions: TaskCompletion[];
    isCompleted: boolean;
    ad1:string;
    ad2:string;
    ad3:string;
    track: string;
    trackmin: string;
    track2: string;
    trackmin2: string;
    categoryName: string;
    duration:string;
    ownerId:string;
    }

    export interface Category {
        id: string;
        name: string;
    }

    export interface TaskFormData {
        categoryId: string;
        description: string;
        ad1: string;
        ad2: string;
        ad3: string;
        track: string;
        trackmin: string;
        track2: string;
        trackmin2: string;
        link: string;
        reward: number;
        duration: string;
        threshold: number;
    }

    export interface TaskSubmitData extends TaskFormData {
        isUnderstand: boolean;
        completionCount: number;
        isCompleted: boolean;
        ownerId: string;
      }


export type Role = "CHILD" | "CREATOR" | "ADMIN";

export type ApprovalStatus = "APPROVED" | "DECLINED" | "PENDING";

export interface TaskCompletion {
  id: string;
  userId: string;
  taskId: string;
  approvalStatus: ApprovalStatus;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  platformUserId: string | null;
  reward: number;
}

export interface UserMetadata {
  role?: Role;
}

export interface SessionClaims {
  metadata: UserMetadata;
}

export interface Adjust {
  ywatch:number;
  ylike:number;
  ysub:number;
  join:number;
  fee:number;
  mtask:number;
  mchild:number;
  mcreate:number;
  Account:String;
};