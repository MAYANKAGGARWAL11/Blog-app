var express = require('express');
var router = express.Router();
const userModel = require("./users");
const port = 3000;
const uuid = require("uuid");
const cors = require("cors");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'C:\\Users\\Mayank\\Desktop\\BlogApp\\public\\images'); 
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });
router.use(cors());




router.get('/', function(req, res) {
  res.render('index');
});
router.get('/blog/data',async function (req, res, next) {
  const username = req.params.username ;
  try{
    const user = await userModel.find();
    res.json(user) ;
  }catch(error){
    console.error(error) ;
    return res.status(500).json({error:'internal error'}) ;
  }
});
router.get('/blog/data/:username', async function (req, res, next) {
  const bloguser = req.params.username;
  try {
    const user = await userModel.findOne({ username: bloguser });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal error' });
  }
});

router.post('/blog/post', upload.single('image'), async function (req, res, next) {
  try {
    if (!req.file) {
      throw new Error('No file uploaded'); 
    }

    const ans = await userModel.create({
      username: req.body.username,
      title: req.body.title,
      content: req.body.content,
      image:req.file.path
    });
    return res.json(ans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'internal error' });
  }
});
router.put('/blog/data/:username', async function(req, res, next) {
  const bloguser = req.params.username;

  try {
    
    const user = await userModel.findOne({ username: bloguser });

    if (user) {
      user.username = req.body.username;
      user.title = req.body.title;
      user.content = req.body.content;
      user.image = req.body.image;

      
      await user.save();

      res.json(user);
    } else {
     
      res.status(404).json({ error: 'Blog user with the given username not found' });
    }
  } catch (error) {
   //error during the process
    console.error(error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/blog/data/:username', async function (req, res, next) {
  const bloguser = req.params.username;

  try {
        const user = await userModel.findOne({ username: bloguser });

    
    if (!user) {
      return res.status(404).json({ error: 'Blog user not found' });
    }

    
    await userModel.deleteOne({ username: bloguser });

  
    res.status(200).json({ username: bloguser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message || 'Unknown error' });
  }
});

module.exports = router;
