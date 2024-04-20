"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageInGoogleDrive = exports.googleDrive = exports.googleDriveOauth2client = void 0;
const googleapis_1 = require("googleapis");
const fs_1 = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp = require('sharp');
//Check file path exists or not
function exists(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.promises.access(path);
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
//NOTE -   configure google OAuth2  authentication
exports.googleDriveOauth2client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_DRIVE_API_CLIENT_ID, process.env.GOOGLE_DRIVE_API_CLIENT_SECRET, process.env.GOOGLE_DRIVE_API_REDIRECT_URL);
exports.googleDriveOauth2client.setCredentials({
    refresh_token: process.env.GOOGLE_DRIVE_API_REFRESH_TOKEN
});
//NOTE - Give google drive authorization
exports.googleDrive = googleapis_1.google.drive({
    version: 'v3',
    auth: exports.googleDriveOauth2client,
});
//SECTION - upload image in drive
const uploadImageInGoogleDrive = (fileName, mimeType, buffer, parentsId, profilePhotoId) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(googleDrive.permissions);
    const imageType = mimeType.split("/")[1];
    //NOTE - create local file path
    const localFilePath = path_1.default.join(__dirname, `../uploads/${fileName}.${imageType}`);
    try {
        //NOTE -  save buffer data in local. 
        yield sharp(buffer).toFile(localFilePath);
        // console.log("ch1");
        //NOTE - If Pervious profile photo exit then Delete this photo
        if (profilePhotoId !== null) {
            yield exports.googleDrive.files.delete({
                fileId: `${profilePhotoId}`
            });
        }
        //NOTE - Upload new Profile photo in drive
        const response = yield exports.googleDrive.files.create({
            requestBody: {
                name: `${fileName}`,
                mimeType: `${mimeType}`,
                parents: [`${parentsId}`],
            },
            media: {
                mimeType: `${mimeType}`,
                body: fs_1.default.createReadStream(localFilePath)
            }
        });
        // console.log("ch2");
        const fileId = response.data.id;
        if (!fileId || typeof fileId === "undefined") {
            throw new Error("Some thing wrong");
        }
        //NOTE - Give permission to Viewer anyone
        yield exports.googleDrive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        });
        // console.log("ch1");
        //NOTE - Delete file from Uploads folder after upload drive
        fs_1.default.unlinkSync(localFilePath);
        //NOTE - Return file Id.
        return fileId;
    }
    catch (error) {
        if (yield exists(localFilePath)) {
            fs_1.default.unlinkSync(localFilePath);
        }
        // console.error(error);
        throw new Error("Internal server Error");
    }
});
exports.uploadImageInGoogleDrive = uploadImageInGoogleDrive;
//# sourceMappingURL=uploadImageInDrive.js.map