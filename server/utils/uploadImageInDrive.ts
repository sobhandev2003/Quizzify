
import { google } from "googleapis";
import { Buffer } from "buffer";
import { Readable } from "stream";


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

  // console.log(googleDrive.permissions);
  try {

    //NOTE - If Pervious profile photo exit then Delete this photo
    // if (profilePhotoId !== null) {
  
    //   await googleDrive.files.delete({
    //     fileId: `${profilePhotoId}`
    //   })
    // }

    // Convert the image buffer to a readable stream
    const imageStream = new Readable();
    imageStream.push(buffer);
    imageStream.push(null); // Indicates the end of the stream

    //NOTE - Upload new Profile photo in drive
    const response = await googleDrive.files.create({
      requestBody: {
        name: `${fileName}`,
        mimeType: `${mimeType}`,
        parents: [`${parentsId}`],
      },
      media: {
        mimeType: `${mimeType}`,
        body: imageStream
      }
    })
    // console.log("FS= ",imageStream);

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
    // console.log("ch1");
    //NOTE - Return file Id.
    return fileId;

  } catch (error) {
    // console.error(error);
    throw new Error("Internal server Error")
  }
}