import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function convertToMinutes(timeStr: string): number {
  const hoursRegex = /^(\d+)h(?:([0-5]?\d))?$/;
  const minutesRegex = /^(\d+)m$/;
  const plainMinutesRegex = /^(\d+)$/;

  if (hoursRegex.test(timeStr)) {
    const match = timeStr.match(hoursRegex);
    const hours = parseInt(match![1], 10);
    const minutes = match![2] ? parseInt(match![2], 10) : 0;
    return hours * 60 + minutes;
  } else if (minutesRegex.test(timeStr)) {
    return parseInt(timeStr.match(minutesRegex)![1], 10);
  } else if (plainMinutesRegex.test(timeStr)) {
    return parseInt(timeStr.match(plainMinutesRegex)![1], 10);
  } else {
    return 0;
  }
}


export function convertToTimeString(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`;
  } else {
    return `${remainingMinutes}m`;
  }
}

export function isValidTimeString(timeStr: string): boolean {
  const validFormatRegex = /^(\d+h[0-5]?\d?|[0-5]?\d+m|\d+)$/;
  return validFormatRegex.test(timeStr);
}

export function timeFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validFormatRegex = /^(\d+h[0-5]?\d?|[0-5]?\d+m|\d+)$/;
    const value = control.value;

    if (!value || validFormatRegex.test(value)) {
      return null;
    }

    return { invalidTimeFormat: true };
  };
}

