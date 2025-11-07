const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Function to save a file
const saveFile = (file) => {
    const filePath = path.join(uploadsDir, file.filename);
    fs.renameSync(file.path, filePath);
    return filePath;
};

// Function to delete a file
const deleteFile = (filePath) => {
    const fullPath = path.join(uploadsDir, filePath);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};

// Function to get all files in the uploads directory
const getAllFiles = () => {
    return fs.readdirSync(uploadsDir).map(file => ({
        name: file,
        path: path.join('uploads', file)
    }));
};

module.exports = {
    saveFile,
    deleteFile,
    getAllFiles
};