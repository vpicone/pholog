import { subFolders } from "../../../util/cloudinary";

export default async function me(req, res) {
  try {
    const folders = await subFolders(`/photocritique/${req.query.sub}`);
    res.status(200).json(folders);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
