import formidable from 'formidable';
import { upload } from '../../util/cloudinary';
import Session from '../../models/session';
import User from '../../models/user';

const parse = req =>
  new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err);
      }

      const { userId, title } = fields;

      const CurrentUser = await User.findById(userId).exec();

      const NewSession = new Session({ title });

      const imageInput = Array.of(files.multipleFiles).flat();

      const uploadedImages = await Promise.all(
        imageInput.map(({ path, name }) =>
          upload(path, {
            upload_preset: 'pholog-default',
            folder: `/photocritique/${userId}/${NewSession.id}`,
          }).catch(error => {
            console.error(error);
            return { error: { name, message: error.message } };
          })
        )
      );

      NewSession.set('images', uploadedImages);

      CurrentUser.sessions.push(NewSession);

      CurrentUser.save();

      resolve(uploadedImages);
    });
  });

export default async (req, res) => {
  const result = await parse(req).catch(error => {
    console.error(error);
    res.status(500).json(error);
  });

  if (result) {
    res.status(200).json(result);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
