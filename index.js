// expecting time to be a string in the format like '8:15' or '12:30'

// Requirements
// 1. Function is convertTimeToWords
// 2. convertTimeToWords accepts time as string
// 3. Format would be HH:mm only. Strictly no seconds or miliseconds
// 4. The error handler for this should default to error string { error: '<what type of error>' }

// Put in the worded dictionary from numbers to words. Should be a library
const numberWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
  "twenty one",
  "twenty two",
  "twenty three",
  "twenty four",
  "twenty five",
  "twenty six",
  "twenty seven",
  "twenty eight",
  "twenty nine",
  "thirty",
  "thirty one",
  "thirty two",
  "thirty three",
  "thirty four",
  "thirty five",
  "thirty six",
  "thirty seven",
  "thirty eight",
  "thirty nine",
  "forty",
  "forty one",
  "forty two",
  "forty three",
  "forty four",
  "forty five",
  "forty six",
  "forty seven",
  "forty eight",
  "forty nine",
  "fifty",
  "fifty one",
  "fifty two",
  "fifty three",
  "fifty four",
  "fifty five"
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

function buildHours(hour) {
  if (hour === 0) return "twelve";
  return numberWords[hour];
}

function buildMinutes (min) {
  if (min === 15 || min === 45) return "quarter";
  if (min === 30) return "half";

  return numberWords[min];
}

function convertTimeToWords(time) {
  // Happy path

  const hour = time.split(":")[0];
  const minutes = time.split(":")[1];

  if (hour === '0' && minutes === '00') {
    return 'midnight';
  }

  if (hour === '12' && minutes === '00') {
    return 'midday';
  }

  if (hour === '12' && minutes === '00') {
    return 'midday';
  }

  const hourInt = parseInt(hour);

  if (minutes === '00') {
    let str = buildHours(hourInt)
    return `${str} o'clock`;
  }

  // If 15 then it's a quarter
  // If 30 then it's a half
  if (minutes <= 30) {
    // Build the phrase
    const numberMinutes = 30 - minutes;
    const wordedNumberMinutes = buildMinutes(numberMinutes);

    return `${buildHours(hourInt)} past ${wordedNumberMinutes}`
  }

  if (minutes > 30) {
    // Build the phrase. To continue building this part
    const numberMinutes = 30 - minutes;
    console.log("numberMinutes: ", numberMinutes);
    const wordedNumberMinutes = buildMinutes(numberMinutes);

    return `${buildHours(hourInt)} past ${wordedNumberMinutes}`
  }


  if (time === '0:00') {
    return 'midnight';
  }

  return 'half past eight';
}

module.exports = { convertTimeToWords };