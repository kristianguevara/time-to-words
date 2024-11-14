const { convertTimeToWords } = require('./index');

describe('Time to words', () => {
  it('Handles midnight', () => {
    const timeInWords = convertTimeToWords('0:00');
    expect(timeInWords).toBe('midnight');
  });

  it('Handles 30 - 8:30', () => {
    const timeInWords = convertTimeToWords('8:30');
    expect(timeInWords).toBe('half past eight');
  });

  it('Handles times after 30 mins - 2:45', () => {
    const timeInWords = convertTimeToWords('2:45');
    expect(timeInWords).toBe('quarter to three');
  });

  it('Handles midday', () => {
    const timeInWords = convertTimeToWords('12:00');
    expect(timeInWords).toBe('midday');
  });

  it("Handles o'clock times - 2:00", () => {
    const timeInWords = convertTimeToWords('2:00');
    expect(timeInWords).toBe("two o'clock");
  });

  it('Handles simple past minutes - 2:03', () => {
    const timeInWords = convertTimeToWords('2:03');
    expect(timeInWords).toBe('three past two');
  });

  it('Handles past minutes - 2:11', () => {
    const timeInWords = convertTimeToWords('2:11');
    expect(timeInWords).toBe('eleven past two');
  });

  it('Handles quarter past - 2:15', () => {
    const timeInWords = convertTimeToWords('2:15');
    expect(timeInWords).toBe('quarter past two');
  });

  it('Handles half past - 2:30', () => {
    const timeInWords = convertTimeToWords('2:30');
    expect(timeInWords).toBe('half past two');
  });

  it('Handles minutes to the next hour - 2:33', () => {
    const timeInWords = convertTimeToWords('2:33');
    expect(timeInWords).toBe('twenty seven to three');
  });

  it('Handles twenty to the next hour - 2:40', () => {
    const timeInWords = convertTimeToWords('2:40');
    expect(timeInWords).toBe('twenty to three');
  });

  it('Handles five to the next hour - 2:55', () => {
    const timeInWords = convertTimeToWords('2:55');
    expect(timeInWords).toBe('five to three');
  });

  // Additional edge cases for validation

  it('Handles invalid format - missing minutes', () => {
    const timeInWords = convertTimeToWords('8');
    expect(timeInWords).toEqual({ error: 'Invalid time format' });
  });

  it('Handles invalid format - extra seconds', () => {
    const timeInWords = convertTimeToWords('8:30:00');
    expect(timeInWords).toEqual({ error: 'Invalid time format' });
  });

  it('Handles invalid hour range - 13:00', () => {
    const timeInWords = convertTimeToWords('13:00');
    expect(timeInWords).toEqual({ error: 'Invalid time value' });
  });

  it('Handles invalid minute range - 2:60', () => {
    const timeInWords = convertTimeToWords('2:60');
    expect(timeInWords).toEqual({ error: 'Invalid time value' });
  });

});
