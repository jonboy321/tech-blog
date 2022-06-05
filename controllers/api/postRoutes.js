const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    // Create a post
    try {
        const dbPostData = await Post.create({
            post_text: req.body.post_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
    
        // Set up sessions with a 'postPosted' variable set to `true`
        req.session.save(() => {
          req.session.postPosted = true;
    
          res.status(200).json(dbPostData);
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.put("/:id", withAuth, async (req, res) => {
    // Update a post
});

router.delete("/:id", withAuth, async (req, res) => {
    // Delete the post
});

module.exports = router;