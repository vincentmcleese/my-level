import nextConnect from 'next-connect';
import middleware from '../../../middlewares/middleware';
const ObjectID = require('mongodb').ObjectID;


const handler = nextConnect();

handler
  .use(middleware)
  .get(async (req, res) => {
    const {id} = req.query  
    try {
    const post = await req.db.collection('posts').findOne({ _id: ObjectID(id) });
    res.status(200).json(post)
    } catch (err) {
    console.log(err)
    }
    
   })

export const config = {
  api: {
    bodyParser: true,
  },
};

export default handler;
