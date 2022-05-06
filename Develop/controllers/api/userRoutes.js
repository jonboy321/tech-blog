const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const dbUserData = await User.create({
            user_text: req.body.user_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
    
        // Set up sessions with a 'userPosted' variable set to `true`
        req.session.save(() => {
          req.session.userPosted = true;
    
          res.status(200).json(dbUserData);
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.post("/login", async (req, res) => {
    // User login
});

router.post("/logout", async (req, res) => {
    // User logout
});

module.exports = router;