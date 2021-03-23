const { Router } = require("express");
const auth = require("../auth/middleware");
const Space = require("../models").space;
const Story = require("../models").story;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("I'm getting all stories");
    const story = await Space.findAll({
      //   include: [Category],
    });
    res.send(story);
  } catch (e) {
    next(e);
  }
});

router.delete("/:storyId", async (req, res, next) => {
  try {
    const storyId = parseInt(req.params.storyId);
    const storyToDelete = await Story.findByPk(storyId);
    //check if this spaceId belongs to the person
    const space = await Space.findOne({ where: { userId: req.user.id } });
    if (storyToDelete.spaceId !== space.id) {
      return res
        .status(400)
        .send("You don't have authorization to delete this story");
    }

    if (!storyToDelete) {
      return res.status(400).send("Story with the ID not found");
    }
    const deleted = await storyToDelete.destroy();
    res.send(deleted);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
