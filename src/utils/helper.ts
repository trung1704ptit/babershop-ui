export const getTimeRange = (time: number) => {
  if (!time) time = 8;
  let text = `${time}h - ${time}h:30`

  if (!Number.isInteger(time)) {
    text = `${time - 0.5}h:30 - ${time + 0.5}h`
  }
  return text;
}