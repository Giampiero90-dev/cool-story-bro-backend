const express = require("express");
const auth = require("../auth/middleware");
const Space = require("../models").space;
const User = require("../models").user;
const Story = require("../models").story;

const { Router } = express;
const router = new Router();

// router.get("/", (request, response) => response.send("Welcome to spaces!"));

router.get("/", async (req, res, next) => {
  try {
    console.log("I'm getting all spaces");
    const space = await Space.findAll({
      //   include: [Category],
    });
    res.send(space);
  } catch (e) {
    next(e);
  }
});

//GET a space by id
//OPEN AT THE BROWSER localhost:4000/spaces/id
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const space = await Space.findByPk(id, { include: [Story] });
    if (!space) {
      res.status(404).send("space not found");
    } else {
      res.send(space);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/:id/stories", auth, async (req, res) => {
  const space = await Space.findByPk(req.params.id);
  console.log(space);

  if (space === null) {
    return res.status(404).send({ message: "This space does not exist" });
  }

  if (!space.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to update this space" });
  }

  const { name, imageUrl, content } = req.body;

  if (!name) {
    return res.status(400).send({ message: "A story must have a name" });
  }

  const story = await Story.create({
    name,
    imageUrl,
    content,
    spaceId: space.id,
  });

  return res.status(201).send({ message: "Story created", story });
});

module.exports = router;
