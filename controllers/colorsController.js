const express = require("express");
const colors = express.Router();

const { getAllColors, getColor, createColor, deleteColor, updateColor } = require("../queries/color");

// middleware
const { checkName, checkBoolean } = require("../validations/checkColors.js");

// Index
colors.get("/", async (req, res) => {
  const allColors = await getAllColors();
  if (allColors[0]) {
    res.status(200).json(allColors);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// show
colors.get('/:id', async (req, res) => {
  const { id } = req.params;
  const color = await getColor(id);
  if (color) {
    res.json(color);
  } else {
      res.status(404).json({ error: 'not found'})
  }
})

// create color
colors.post('/', checkName, checkBoolean, async (req, res) =>  {
  const color = await createColor(req.body);
  res.json(color)
})

// delete color
colors.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deletedColor = await deleteColor(id)
  if (deletedColor.id) {
    res.json(deletedColor)
  } else {
    res.status(200).json({ id })
  }
})

// update color
colors.put('/:id', checkName, checkBoolean, async (req, res) => {
  const { id } = req.params
  try {
    const updatedColor = await updateColor(id)
    res.status(200).json(updatedColor)
  } catch (error) {
      res.status(404).json({error: `No color wth the id ${id} exists`})
  }
})

module.exports = colors;