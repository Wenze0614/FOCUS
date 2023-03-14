export interface TaskOnFocus {
  name: string;
  timeSpent: number;
  status: "onGoing" | "completed" | null;
  isEditing: boolean;
}

export interface AppBasicStates {
    shortCuts: ShortCuts
}

export interface ShortCuts {
  key_e_pressed: boolean
}