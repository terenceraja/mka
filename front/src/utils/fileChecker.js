export const fileChecker = (event) => {
  const newFile = event.target.files[0];
  const fileType = newFile.type;
  const fileSize = newFile.size;
  if (
    newFile &&
    (fileType.toLowerCase().includes("image/png") ||
      fileType.toLowerCase().includes("image/jpeg") ||
      fileType.toLowerCase().includes("application/pdf")) &&
    fileSize < 5242880
  ) {
    return { state: true, message: "ok file", file: newFile };
  } else if (
    !(
      fileType.toLowerCase().includes("image/png") ||
      fileType.toLowerCase().includes("image/jpeg") ||
      fileType.toLowerCase().includes("application/pdf")
    )
  ) {
    return { state: false, message: "type" };
  } else if (!fileSize < 5242880) {
    return { state: false, message: "size" };
  }
};
