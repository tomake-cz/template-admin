export const useByteFormat = (size: number) => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2).replace('.', ',')} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2).replace('.', ',')} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2).replace('.', ',')} GB`;
  }
};
