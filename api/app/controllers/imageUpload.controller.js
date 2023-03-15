import multer from 'multer'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png'

      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export default multer({ storage: storage })