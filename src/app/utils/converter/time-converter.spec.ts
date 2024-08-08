import { convertToMinutes, convertToTimeString, isValidTimeString } from './time-converter';

describe('Time Conversion Functions', () => {

  describe('convertToMinutes', () => {
    it('should convert "2h" to 120 minutes', () => {
      expect(convertToMinutes('2h')).toBe(120);
    });

    it('should convert "2h43" to 163 minutes', () => {
      expect(convertToMinutes('2h43')).toBe(163);
    });

    it('should convert "45m" to 45 minutes', () => {
      expect(convertToMinutes('45m')).toBe(45);
    });

    it('should convert "32" to 32 minutes', () => {
      expect(convertToMinutes('32')).toBe(32);
    });

    it('should throw an error for invalid formats', () => {
      expect(() => convertToMinutes('2hours')).toThrow('Invalid time format.');
      expect(() => convertToMinutes('abc')).toThrow('Invalid time format.');
    });
  });

  describe('convertToTimeString', () => {
    it('should convert 65 minutes to "1h05"', () => {
      expect(convertToTimeString(65)).toBe('1h05');
    });

    it('should convert 120 minutes to "2h00"', () => {
      expect(convertToTimeString(120)).toBe('2h00');
    });

    it('should convert 45 minutes to "45m"', () => {
      expect(convertToTimeString(45)).toBe('45m');
    });

    it('should convert 0 minutes to "0m"', () => {
      expect(convertToTimeString(0)).toBe('0m');
    });

    it('should convert 15 minutes to "15m"', () => {
      expect(convertToTimeString(15)).toBe('15m');
    });
  });

  describe('isValidTimeString', () => {
    it('should return true for valid "2h43" format', () => {
      expect(isValidTimeString('2h43')).toBe(true);
    });

    it('should return true for valid "2h" format', () => {
      expect(isValidTimeString('2h')).toBe(true);
    });

    it('should return true for valid "45m" format', () => {
      expect(isValidTimeString('45m')).toBe(true);
    });

    it('should return true for valid "32" format', () => {
      expect(isValidTimeString('32')).toBe(true);
    });

    it('should return false for invalid "2hours" format', () => {
      expect(isValidTimeString('2hours')).toBe(false);
    });

    it('should return false for invalid "abc" format', () => {
      expect(isValidTimeString('abc')).toBe(false);
    });

    it('should return false for invalid "5h60" format', () => {
      expect(isValidTimeString('5h60')).toBe(false);
    });
  });

});
