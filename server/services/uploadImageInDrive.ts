

import { google } from "googleapis";
import fs from 'fs'
import path from "path";
import { NextFunction } from "express";


//SECTION - config the drive
// googleDriveOauth2client.setCredentials({
//   refresh_token: process.env.GOOGLE_DRIVE_API_REFRESH_TOKEN
// })
// const googleDrive = google.drive(
//   {
//     version: 'v3',
//     auth: googleDriveOauth2client
//   }
// )

//SECTION - upload image in drive

export const uploadImageInGoogleDrive = async (fileName: String, mimeType: String, saveName: String, parentsId: String, profilePhotoId: String | null) => {
  // console.log(googleDrive);
  // console.log("ch1");
  const filePath = path.join(__dirname, `../uploads/${fileName}`)
  try {
    //SECTION - conger authentication
    const googleDriveOauth2client = new google.auth.OAuth2(
      process.env.GOOGLE_DRIVE_API_CLIENT_ID,
      process.env.GOOGLE_DRIVE_API_CLIENT_SECRET,
      process.env.GOOGLE_DRIVE_API_REDIRECT_URL
    );

    googleDriveOauth2client.setCredentials({
      refresh_token: process.env.GOOGLE_DRIVE_API_REFRESH_TOKEN
    });

    const googleDrive = google.drive(
      {
        version: 'v3',
        auth: googleDriveOauth2client,

      }
    )


    if (profilePhotoId !== null) {
      await googleDrive.files.delete({
        fileId: `${profilePhotoId}`
      })

    }


    const response = await googleDrive.files.create({
      requestBody: {
        name: `${saveName}`,
        mimeType: `${mimeType}`,
        parents: [`${parentsId}`],

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
    fs.unlinkSync(filePath);
    console.log(error);

    throw new Error("Internal server Error")
    // return error;
    // next(error)
  }
}