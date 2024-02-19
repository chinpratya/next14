import { RcFile } from 'antd/es/upload';

const convertBase64ToBlob = async (base64: string) => {
  const response = await fetch(base64);
  return await response.blob();
};

const convertRcFileBase64 = (
  file: RcFile
): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

export class FileUtils {
  static convertBase64ToBlob = convertBase64ToBlob;
  static convertRcFileBase64 = convertRcFileBase64;
}
