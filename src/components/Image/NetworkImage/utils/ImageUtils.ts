export type CreateBlobUrlReturn = { url: string; clear: () => void };

export const createBlobUrl = (
  blob: Blob | MediaSource
): CreateBlobUrlReturn => {
  const url = URL.createObjectURL(blob);
  return {
    url,
    clear: () => URL.revokeObjectURL(url),
  };
};

export const convertBlobToBase64 = (value: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onload = async () => {
      try {
        resolve(reader.result);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
