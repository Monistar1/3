export function getNextAnniversary(weddingDate) {
  const now = new Date();
  const date = new Date(weddingDate);
  let target = new Date(now.getFullYear(), date.getMonth(), date.getDate());
  if (target <= now) {
    target = new Date(now.getFullYear() + 1, date.getMonth(), date.getDate());
  }
  return target;
}

export function getTimeTo(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  };
}
