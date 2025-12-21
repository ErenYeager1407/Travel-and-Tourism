const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload to Cloudinary using buffer
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'travel-destinations',
                resource_type: 'auto'
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ message: 'Image upload failed', error: error.message });
                }

                res.json({
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }
        );

        // Pipe the buffer to Cloudinary
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Image upload failed', error: error.message });
    }
};

module.exports = {
    uploadImage
};
