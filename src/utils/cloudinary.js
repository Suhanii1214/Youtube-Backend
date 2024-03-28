import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null

        //upload the file on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded
        console.log("File uploaded on cloudinary Successfully! ", response.url);
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        //remove the locally saved temporary file
        fs.unlinkSync(localFilePath)  
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export { uploadOnCloudinary }