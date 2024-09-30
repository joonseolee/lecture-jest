export function after3Days() {
  const now = new Date();
  now.setDate(now.getDate() + 3);
  return now;
}
