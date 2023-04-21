const K_UNIT = 1024;
const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

const convert = (size: number) => {
  const decimals = 2;

  return {
    toFlexible: () => {
      if (size === 0) return "0 Byte";
      const i = Math.floor(Math.log(size) / Math.log(K_UNIT));
      const resp = `${parseFloat(
        (size / Math.pow(K_UNIT, i)).toFixed(decimals)
      )} ${SIZES[i]}`;
      return resp;
    },
    toBytes: () => `${size} Bytes`,
    toMb: () => {
      const sizeInMB = (size / (1024 * 1024)).toFixed(decimals);
      return `${sizeInMB} "MB"`;
    },
  };
};

export default convert;
