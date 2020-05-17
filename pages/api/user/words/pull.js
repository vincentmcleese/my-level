import nextConnect from 'next-connect';
import middleware from '../../../../middlewares/middleware';

const handler = nextConnect();
handler.use(middleware);


handler.patch(async (req, res) => {
  if (!req.user) {
    req.status(401).end();
    return;
  }

  const { word } = req.body;
  await req.db.collection('users').findOneAndUpdate({ _id: req.user._id, words: { $in: [word] } }, { $pull: { words: word } }, { returnOriginal: false }, (err, r) => {
    try {
        const words = r.value.words
        return res.json({ user: { words } });
    } catch (err) {
        return res.status(500).json({ msg: err })
    }
  });
});

export default handler;
