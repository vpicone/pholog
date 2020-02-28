import formidable from "formidable";
import { upload } from "../../util/cloudinary";

const form = formidable({ multiples: true });

const parse = req =>
  new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err);
      }

      const imageInput = Array.of(files.multipleFiles).flat();

      const response = await Promise.all(
        imageInput.map(({ path, name }) =>
          upload(path, { upload_preset: "pholog-default" }).catch(error => {
            return { error: { name, message: error.message } };
          })
        )
      );

      resolve(response);
    });
  });

export default async (req, res) => {
  const result = await parse(req).catch(error => res.status(500).json(error));
  if (result) {
    res.status(200).json(result);
  }
};

export const config = {
  api: {
    bodyParser: false
  }
};
