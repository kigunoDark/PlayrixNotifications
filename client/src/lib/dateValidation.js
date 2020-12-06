export function formatStringToDate(duration) {
  const d = duration._data;
  let result = "";
  // Решил собрать так строку) может чтуь некрасиво, но пусть будет исключением
  const dateStr = `${d.days > 0 ? `${d.days}д` : ""} ${
    d.hours > 0 ? `${d.hours}ч` : ""
  } ${d.minutes > 0 ? `${d.minutes}мин` : ""}`;
  dateStr.trim() === "" && d.seconds <= 0
    ? (result = "Событие началось")
    : d.seconds > 0 && dateStr.trim() === ""
    ? (result = "Событие скоро начнется")
    : (result = dateStr);
  return result;
}
