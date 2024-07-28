function parseTimeString(timeString) {
    const now = new Date();
  
    if (timeString.includes("minute")) {
      const minutes = extractNumber(timeString);
      return new Date(now.getTime() - minutes * 60 * 1000);
    } else if (timeString.includes("hour")) {
      const hours = extractNumber(timeString);
      return new Date(now.getTime() - hours * 60 * 60 * 1000);
    } else if (timeString.includes("day")) {
      const days = extractNumber(timeString);
      return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    } else if (timeString.includes("on")) {
      return new Date(timeString.replace("on ", ""));
    } else {
      return null;
    }
  }
  
function extractNumber(inputString) {
    const regex = /\d+/;
    const result = inputString.match(regex);
    return result ? parseInt(result[0], 10) : null;
  }
  
function compareTimes(timeString1, timeString2) {
    const date1 = parseTimeString(timeString1);
    const date2 = parseTimeString(timeString2);
  
    if (!date1 || !date2) {
      throw new Error('Invalid time string format');
    }
  
    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
  }

module.exports={
  parseTimeString,
  extractNumber,
  compareTimes
}