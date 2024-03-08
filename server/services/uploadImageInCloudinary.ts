const cloudinary = require('cloudinary').v2;
cloudinary.config({
  secure: true
});

export const uploadImage = async (imagePath: String) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    upload_preset: "profile_preset"
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

//!SECTION --upload image on google drive

import { google } from "googleapis";
import fs from 'fs'
import path from "path";
const googleDriveOauth2client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_API_CLIENT_ID,
  process.env.GOOGLE_DRIVE_API_CLIENT_SECRET,
  process.env.GOOGLE_DRIVE_API_REDIRECT_URL
);

googleDriveOauth2client.setCredentials({
  refresh_token: process.env.GOOGLE_DRIVE_API_REFRESH_TOKEN
})
const googleDrive = google.drive(
  {
    version: 'v3',
    auth: googleDriveOauth2client
  }
)



export const uploadImageInGoogleDrive = async (fileName:String,mimeType:String,saveName:String) => {
  // console.log(googleDrive);
  try {
    const filePath = path.join(__dirname, `../uploads/${fileName}`)
    const response = await googleDrive.files.create({
      requestBody: {
        name: `${saveName}` + Date.now(),
        mimeType: `${mimeType}`,
      },
      media: {
        mimeType: `${mimeType}`,
        body: fs.createReadStream(filePath)
      }

    })
    // console.log(response.data.id);
    const fileId = response.data.id;
    if (!fileId || typeof fileId === "undefined") {
      throw new Error("Some thing wrong")
    }
    await googleDrive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone"
      }

    })
    fs.unlinkSync(filePath);
    return response.data;
  } catch (error) {

  }
}