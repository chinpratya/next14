export const getKeysOfObject = <T>(
  object: T,
  path?: string
): string[] => {
  let keys: string[] = [];

  for (const key in object) {
    const newPath = path ? `${path}.${key}` : key;
    if (
      typeof object[key] === 'object' &&
      object[key] !== null
    ) {
      keys = keys.concat(
        getKeysOfObject(object[key], newPath)
      );
    } else {
      keys.push(newPath);
    }
  }

  return keys;
};
