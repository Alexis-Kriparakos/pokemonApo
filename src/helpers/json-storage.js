export function get(key, { storage }) {
  const value = storage.getItem(key);
  if ([undefined, 'undefined', '', 'null'].includes(value)) return undefined;
  return JSON.parse(value);
}

export function set(key, value, { storage }) {
  storage.setItem(key, JSON.stringify(value));
}

export function remove(key, { storage }) {
  storage.removeItem(key);
}

export function update(key, transformCb, { storage }) {
  const oldValue = storage.get(key);
  const newValue = transformCb(oldValue);
  storage.set(key, newValue);
  return newValue;
}

export function shallowChange(key, transformCb, { storage }) {
  const oldValue = storage.get(key);
  const newValue = { ...oldValue, ...transformCb(oldValue) };
  storage.set(key, newValue);
  return newValue;
}

export default {
  get,
  set,
  remove,
  update,
  shallowChange,
};
