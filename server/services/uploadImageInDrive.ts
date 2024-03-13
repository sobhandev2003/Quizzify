
import { google } from "googleapis";
import fs, { promises as Fs } from 'fs'
import path from "path";
const sharp = require('sharp');
import { Buffer } from "buffer";
//Check file path exists or not
async function exists(path: string) {
  try {
    await Fs.access(path)
    return true
  } catch {
    return false
  }
}

//NOTE -   configure google OAuth2  authentication
export const googleDriveOauth2client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_API_CLIENT_ID,
  process.env.GOOGLE_DRIVE_API_CLIENT_SECRET,
  process.env.GOOGLE_DRIVE_API_REDIRECT_URL
);

googleDriveOauth2client.setCredentials({
  refresh_token: process.env.GOOGLE_DRIVE_API_REFRESH_TOKEN
});

//NOTE - Give google drive authorization
export const googleDrive = google.drive({
  version: 'v3',
  auth: googleDriveOauth2client,
})


//SECTION - upload image in drive

export const uploadImageInGoogleDrive = async (
  fileName: String,
  mimeType: String,
  buffer: Buffer,
  parentsId: String,
  profilePhotoId: String | null) => {

  const imageType = mimeType.split("/")[1]
  //NOTE - create local file path
  const localFilePath = path.join(__dirname, `../uploads/${fileName}.${imageType}`);

  try {

    //NOTE -  save buffer data in local. 
    await sharp(buffer).toFile(localFilePath);

    //NOTE - If Pervious profile photo exit then Delete this photo
    if (profilePhotoId !== null) {
      await googleDrive.files.delete({
        fileId: `${profilePhotoId}`
      })
    }

    //NOTE - Upload new Profile photo in drive
    const response = await googleDrive.files.create({
      requestBody: {
        name: `${fileName}`,
        mimeType: `${mimeType}`,
        parents: [`${parentsId}`],
      },
      media: {
        mimeType: `${mimeType}`,
        body: fs.createReadStream(localFilePath)
      }
    })

    const fileId = response.data.id;
    if (!fileId || typeof fileId === "undefined") {
      throw new Error("Some thing wrong")
    }

    //NOTE - Give permission to Viewer anyone
    await googleDrive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone"
      }
    })
    console.log();
    //NOTE - Delete file from Uploads folder after upload drive
    fs.unlinkSync(localFilePath);

    //NOTE - Return file Id.
    return fileId;

  } catch (error) {
    if (await exists(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw new Error("Internal server Error")
  }
}