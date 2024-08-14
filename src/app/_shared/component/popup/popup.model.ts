export enum PopupType {
  Confirmation = 'Confirmation',
  Input = 'Input'
}

export interface PopupConfig {
  type: PopupType;
  title: string;
  description: string;
  inputValue?: string;
  confirmButton?: string;
  callback?: (input?: string) => void;
}
