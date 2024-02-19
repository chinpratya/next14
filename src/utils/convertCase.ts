type OriginalObject = Record<string, unknown>;

type ConvertedObject = Record<string, unknown>;

export function convertSnakeToCamel(
  originalObj: OriginalObject
): ConvertedObject {
  const newObject: ConvertedObject = {};
  for (const key in originalObj) {
    const words = key.split('_');
    const camelWords = words.map((word, index) => {
      if (index === 0) {
        return word;
      } else {
        return (
          word.charAt(0).toUpperCase() + word.slice(1)
        );
      }
    });
    const camelKey = camelWords.join('');
    newObject[camelKey] = originalObj[key];
  }
  return newObject;
}

export const convertCamelToSnake = (
  originalObj: OriginalObject
): ConvertedObject => {
  const newObject: ConvertedObject = {};
  for (const key in originalObj) {
    const words = key.split(/(?=[A-Z])/);
    const snakeWords = words.map((word, index) => {
      if (index === 0) {
        return word;
      } else {
        return word.toLowerCase();
      }
    });
    const snakeKey = snakeWords.join('_');
    newObject[snakeKey] = originalObj[key];
  }
  console.log(newObject);
  return newObject;
};

export const toFixedNoRound = (value: number) => {
  return Math.floor(value * 100) / 100;
};

export function convertBytesToSize(
  bytes: number
): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes <= 0) return '0';
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes.length - 1
  );
  if (i === 0) return `${bytes} ${sizes[i]}`;

  return `${toFixedNoRound(bytes / 1024 ** i)} ${
    sizes[i]
  }`;
}

export function bytesToUnit(
  bytes: number
): [number, string] {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;
  const TB = GB * 1024;

  if (bytes >= TB) {
    return [Math.floor(bytes / TB), 'TB'];
  } else if (bytes >= GB) {
    return [Math.floor(bytes / GB), 'GB'];
  } else if (bytes >= MB) {
    return [Math.floor(bytes / MB), 'MB'];
  } else if (bytes >= KB) {
    return [Math.floor(bytes / KB), 'KB'];
  } else {
    return [bytes, 'bytes'];
  }
}
