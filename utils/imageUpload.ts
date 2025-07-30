import cloudinary from "./cloudinary";

const uploadImageOnCloudinary = async (file: Express.Multer.File) => {
  const base64Image = Buffer.from(file.buffer).toString("base64");
  const dataURI = `data:${file.mimetype};base64,${base64Image}`;

  const upladResponse = await cloudinary.uploader.upload(dataURI);
  return upladResponse.secure_url;
};
export default uploadImageOnCloudinary;
