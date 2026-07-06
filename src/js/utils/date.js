/**
 * Date utilities for countdown and anniversary counter.
 */

export function getNextAnniversary(month, day) {
  const now = new Date();
  let target = new Date(now.getFullYear(), month - 1, day);
  if (target <= now) {
    target = new Date(now.getFullYear() + 1, month - 1, day);
  }
  return target;
}

export function getTimeTo(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export function getElapsedSince(year, month, day) {
  const start = new Date(year, month - 1, day);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

export function pad(num) {
  return String(num).padStart(2, '0');
}
