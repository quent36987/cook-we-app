export enum PopupType {
  Confirmation = 'Confirmation',
  Input = 'Input',
  CHOICE = 'CHOICE',
}

export interface PopupConfig {
  type: PopupType;
  title: string;
  description: string;
  inputValue?: string;
  confirmButton?: string;
  choiceButtons?: {
    text: string;
    callback: () => void;
  }[];
  callback?: (input?: string) => void;
}
