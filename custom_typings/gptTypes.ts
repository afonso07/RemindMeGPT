export enum GPTRoles {
  SYS = "system",
  USER = "user",
  ASS = "ass",
}

export interface GPTMessage {
  role: GPTRoles;
  content: string;
}

export type GPTChatInput = Array<GPTMessage>;
