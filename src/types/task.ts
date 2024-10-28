export interface TaskCompletion {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isCompleted: boolean;
    platformUserId?: string;
    userId: string;
    taskId: string;
    }
    
export interface Question {
    key: string;
    value: string;
    prompt: string;
}
    

export interface Task{
    id: string;
    categoryId: string;
    title: string | null; // Nullable
    description: string | null; // Nullable
    isUnderstand: boolean; // A flag to check understanding
    link: string | null; // Nullable URL
    reward: number; // Numeric reward for the task
    createdAt: Date; // Task creation timestamp
    updatedAt: Date; // Task last update timestamp
    completions: TaskCompletion[]; // Array of task completion records
    isCompleted: boolean; // Completion status
    categoryName: {name: string; }; // Object containing the category name
    ad1:string;
    ad2:string;
    ad3:string;
    track: string; // String field for tracking (assumed context)
    trackmin: string; // Minimum value for track (assumed context)
    track2: string; // Additional tracking field
    trackmin2: string; // Additional minimum value for tracking
    duration:number;
    ownerId:string;
    
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
            duration:number;
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
        duration: number;
        threshold: number;
    }

    export interface TaskSubmitData extends TaskFormData {
        isUnderstand: boolean;
        completionCount: number;
        isCompleted: boolean;
        ownerId: string;
      }
