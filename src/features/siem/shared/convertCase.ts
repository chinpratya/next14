const convertTbToBytes = (terabytes: number) => {
  const bytesInTB = 1099511627776; // 1 terabyte in bytes
  return terabytes * bytesInTB;
};

const convertGbToBytes = (gigabytes: number) => {
  const bytesInGB = 1073741824; // 1 gigabyte in bytes
  return gigabytes * bytesInGB;
};

const convertMbToBytes = (megabytes: number) => {
  const bytesInMB = 1048576; // 1 megabyte in bytes
  return megabytes * bytesInMB;
};

export const convertCase = {
  convertTbToBytes,
  convertGbToBytes,
  convertMbToBytes,
};
