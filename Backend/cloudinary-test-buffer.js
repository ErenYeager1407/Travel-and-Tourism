import dotenv from 'dotenv';
dotenv.config();

import cloudinary from 'cloudinary';
import streamifier from 'streamifier';
import fs from 'fs';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Testing upload_stream with buffer...");

try {
    const fileBuffer = fs.readFileSync('dummy.png');

    const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
            folder: 'travel-destinations-test',
            resource_type: 'auto'
        },
        (error, result) => {
            if (error) {
                console.error("Stream upload callback received error:");
                console.error(error);
                process.exit(1);
            }
            console.log("Stream upload callback success!");
            console.log("Secure URL:", result.secure_url);
            process.exit(0);
        }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
} catch (error) {
    console.error("Synchronous error during upload stream setup:");
    console.error(error);
    process.exit(1);
}
