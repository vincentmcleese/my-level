import nextConnect from 'next-connect';
import middleware from '../../middlewares/middleware';
import { textToCharacters } from '../../lib/chinese-helper';


const handler = nextConnect();

handler
  .use(middleware)
  .get(async (req, res) => {
    const posts  = await req.db.collection('posts').find().toArray()
    res.status(200).json(posts)
   })
  .post(async (req, res) => {
      const { title, body } = req.body;
      console.log(req.body)
      const data = textToCharacters(body)
      console.log(data)
    await req.db.collection('posts').insertOne({
          title, body, parsedText: data[0], isChinese: data[1], onlyChinese: data[2]
        })
    res.json({msg: "success"})
  })


export const config = {
  api: {
    bodyParser: true,
  },
};

export default handler;
