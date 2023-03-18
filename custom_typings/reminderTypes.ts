export interface Reminder {
  reminder: string;
  complete: boolean;
  is_agent?: boolean;
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
