export const getTimeRange = (time: number) => {
  if (!time) time = 8;
  let text = `${time}h - ${time}h:30`

  if (!Number.isInteger(time)) {
    text = `${time - 0.5}h:30 - ${time + 0.5}h`
  }
  return text;
}

export const getQueryValue = (key: string) => {
  if (typeof window !== undefined) {
    const url = new URL(window.location.href);
    const search_params = url.searchParams;

    const value = search_params.get(key);
    if (value) return value;
    return '';
  }
  return '';
}