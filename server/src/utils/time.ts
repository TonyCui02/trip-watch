function parseAtTime(timeString: string) {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const date = new Date(0); // Initialize with epoch time
  date.setUTCHours(hours);
  date.setUTCMinutes(minutes);
  date.setUTCSeconds(seconds);
  return date.getTime(); // Return milliseconds since epoch
}

export { parseAtTime };
