const express = require("express");
const router = express.Router();
const { get } = require("../redis");

router.get("/", async (req, res) => {
  const addedTodos = await get("added_todos");
  res.json({ added_todos: parseInt(addedTodos) || 0 });
});

module.exports = router;
