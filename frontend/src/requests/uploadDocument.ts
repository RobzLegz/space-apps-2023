import axios from "axios";

export const uploadDocument = async ({ file }: { file: File }) => {
  const formData = new FormData();
  formData.append("file", file);

  let data = null;

  await axios
    .post("http://localhost:5000/api/engine/upload_pdf", formData)
    .then((response) => {
      data = response.data;
      console.log("File uploaded successfully:", response.data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error uploading file:", error);
    });

  return data;
};
