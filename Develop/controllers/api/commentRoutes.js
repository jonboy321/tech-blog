const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
    // create a router to post comments to created posts
    try {
        const dbCommentData = await User.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
    
        // Set up sessions with a 'commentPosted' variable set to `true`
        req.session.save(() => {
          req.session.commentPosted = true;
    
          res.status(200).json(dbCommentData);
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;