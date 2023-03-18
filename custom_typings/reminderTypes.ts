export interface Reminder {
  reminder: String;
  complete: boolean;
}

export interface ReminderWithID {
  reminder: Reminder;
  id: String;
}

export interface ModifyReminder {
  reminderID: String;
  complete: boolean;
}

export interface ReminderHistory {
  reminderHistory: Array<ReminderWithID>;
}
