export const getTimeRange = (time: number) => {
  let text = `${time}h:00 - ${time}h:30`

  if (!Number.isInteger(time)) {
    text = `${time - 0.5}h:30 - ${time + 0.5}h:00`
  }
  return text;
}