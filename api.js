import axios from "axios";

const APIKit = axios.create({
  baseURL: "http://ec2-13-48-194-49.eu-north-1.compute.amazonaws.com:9000",
  timeout: 15000,
});

export const uploadReq = async (image) => {
  const formData = new FormData();
  formData.append("file", {
    uri: image.uri,
    type: image.type,
    size: image.fileSize,
    name: image.uri.substring(image.uri.lastIndexOf("/") + 1),
  });

  try {
    const result = await APIKit.post("/uploadImageAPI/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const resBody = result?.body?.data?.output;
    return resBody;
  } catch (error) {
    return null;
  }
};
