export interface GPTInterface {
  is_question?: boolean;
  is_agent?: boolean;
}

export interface Reminder {
  reminder: string;
  complete: boolean;
  gptinterface?: GPTInterface;
}

export interface ReminderWithID {
  reminder: Reminder;
  timestamp: string;
  id: string;
}

export interface ModifyReminder {
  reminderID: string;
  complete: boolean;
}

export interface ReminderHistory {
  reminderHistory: Array<ReminderWithID>;
}
