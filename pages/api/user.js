import '../../util/db';
import User from '../../models/user';

export default async function(req, res) {
  const { name, sub } = req.body;

  try {
    const user = await User.findOne({ sub }).exec();
    if (user) {
      res.status(200).json(user);
    } else {
      const newUser = await new User({ name, sub }).save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end({ error });
  }

  // res.status(200).json(user);
  // vince.save();
}
