const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

router.put("/:id", async (req, res) => {
  try {
    const { text, done } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { done },
      { new: true, runValidators: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
