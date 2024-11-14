// expecting time to be a string in the format like '8:15' or '12:30'

// Requirements
// 1. Function is convertTimeToWords
// 2. convertTimeToWords accepts time as string
// 3. Format would be HH:mm only. Strictly no seconds or miliseconds
// 4. The error handler for this should default to error string { error: '<what type of error>' }

// Put in the worded dictionary from numbers to words. Should be a library
const numberWords = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
  "twenty", "twenty one", "twenty two", "twenty three", "twenty four", "twenty five", "twenty six",
  "twenty seven", "twenty eight", "twenty nine", "thirty", "thirty one", "thirty two", "thirty three",
  "thirty four", "thirty five", "thirty six", "thirty seven", "thirty eight", "thirty nine", "forty",
  "forty one", "forty two", "forty three", "forty four", "forty five", "forty six", "forty seven",
  "forty eight", "forty nine", "fifty", "fifty one", "fifty two", "fifty three", "fifty four", "fifty five"
];


  /*

[x] - '0:00' > 'midnight'
[x] - '12:00' > 'midday'
[x] - '2:00' > 'two o'clock'

[x] - '2:03' > 'three past two'
[x] - '2:11' > 'eleven past two'
[x] - '2:15' > 'quarter past two' 
[x] - '2:30' > 'half past two'

- '2:33' > 'twenty seven to three'
- '2:40' > 'twenty to three'
- '2:45' > 'quarter to three' 
- '2:55' > 'five to three'
*/

  // TODO: real code goes here!


  // Requirements
  // 10:15 - base sample
  // 1. Parse firstly the minute (split method to be used)
  // 2. Compare the value
  // = If the minute lands less than 30, then calculate based on the current hour
  // = Else if equal or beyond 30, then calculate to the next hour
  // = Edge case: If minute goes less than zero or beyond 59, then it's invalid
  // 3. If the hour is less than zero or beyond 12, invalid date for now. 
  // 4. 12pm onwards would be invalid? *Specifically for the challenge

// Helper function to validate input format
function validateTimeFormat(time) {
  const timeFormat = /^\d{1,2}:\d{2}$/;
  if (!timeFormat.test(time)) {
    return { error: 'Invalid time format' };
  }
  const [hour, minute] = time.split(":").map(Number);

  // Ensure hour and minute are within valid ranges and are non-negative
  if (hour < 0 || hour > 12 || minute < 0 || minute >= 60) {
    return { error: 'Invalid time value' };
  }
  return { hour, minute };
}

// Helper function to get hour word
function getHourWord(hour) {
  if (hour === 0) return "twelve";
  return numberWords[hour];
}

// Helper function to get minute word
function getMinuteWord(minute) {
  if (minute === 15 || minute === 45) return "quarter";
  if (minute === 30) return "half";
  return numberWords[minute];
}

// Main function to convert time to words
function convertTimeToWords(time) {
  // Validate time format and values
  const validation = validateTimeFormat(time);
  if (validation.error) return validation;

  const { hour, minute } = validation;

  // Special cases
  if (hour === 0 && minute === 0) return 'midnight';
  if (hour === 12 && minute === 0) return 'midday';

  // Handle "o'clock" cases
  if (minute === 0) {
    return `${getHourWord(hour)} o'clock`;
  }

  // Handle "past" cases for minutes <= 30
  if (minute <= 30) {
    const minutesWord = getMinuteWord(minute);
    return minute === 15 || minute === 30
      ? `${minutesWord} past ${getHourWord(hour)}`
      : `${minutesWord} past ${getHourWord(hour)}`;
  }

  // Handle "to" cases for minutes > 30
  const minutesToNextHour = 60 - minute;
  const nextHour = hour === 12 ? 1 : hour + 1;
  const minutesWord = getMinuteWord(minutesToNextHour);
  return minutesToNextHour === 15
    ? `${minutesWord} to ${getHourWord(nextHour)}`
    : `${minutesWord} to ${getHourWord(nextHour)}`;
}

module.exports = { convertTimeToWords };