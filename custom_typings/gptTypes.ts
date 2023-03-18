export enum GPTRoles {
  SYS = "system",
  USER = "user",
  ASS = "assistant",
}

export interface GPTMessage {
  role: GPTRoles;
  content: string;
}

export type GPTChatInput = Array<GPTMessage>;
