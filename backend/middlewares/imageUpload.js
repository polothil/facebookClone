const fs = require('fs');

module.exports = async function (req, res, next) {
  try {
    // To get array of objects -> Object.values(req.files).flat()
    if (!req.files || Object.values(req.files).flat().length === 0) {
      return res.status(400).json({ message: 'No files selected.' });
    }
    let files = Object.values(req.files).flat();
    files.forEach((file) => {
      if (
        file.mimetype !== ('image/jpeg' || 'image/png' || 'image/gif' || 'image/webp')
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: 'Unsupported format.' });
      }
      if (file.size > 1024 * 1024 * 5) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ message: 'File size exceeds 5mb.' });
      }
    });
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
