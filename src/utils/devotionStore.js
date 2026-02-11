const STORAGE_KEY = "devotions";

const seedDevotions = {
};

export function loadDevotions() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return { ...seedDevotions };
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDevotions));
  return { ...seedDevotions };
}

export function saveDevotions(devotions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(devotions));
}

export function upsertDevotion(dateKey, payload) {
  const current = loadDevotions();
  const next = {
    ...current,
    [dateKey]: payload
  };
  saveDevotions(next);
  return next;
}

export function getDevotionForDate(devotions, dateKey) {
  return devotions[dateKey];
}
