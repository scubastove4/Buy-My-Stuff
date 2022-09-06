const Multer = require('multer')
const FirebaseStorage = require('multer-firebase-storage')
require('dotenv').config()

const multer = Multer({
  storage: FirebaseStorage({
    bucketName: `${process.env.FIREBASE_BUCKET_NAME}`,
    credentials: {
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      projectId: process.env.FIREBASE_PROJECT_ID
    },
    public: true,
    hooks: {
      beforeUpload(req, file) {
        file.originalname = new Date().toISOString() + file.originalname
        console.log('before upload:', file)
      }
    }
  })
})

module.exports = {
  multer
}
