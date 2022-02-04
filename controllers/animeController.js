const express = require("express");
const reviewsController = require("./reviewsController");
const {
  getAllAnimes,
  addNewAnime,
  getOneAnime,
  deleteAnime,
  updateAnime,
} = require("../queries/animes");

const anime = express.Router();

anime.use("/:id/reviews", reviewsController);
// here we use the function we wrote inside of our queries.
// we have to await it because we dont want this file to move
// on to the next lines of code without this one finishing,
//  even though we are already using await in the queries file
anime.get("/", async (req, res) => {
  console.log("GET to /anime");
  const animes = await getAllAnimes();
  res.status(200).json(animes);
});

anime.get("/:id", async (request, response) => {
  console.log("GET to /anime/:id");
  const anime = await getOneAnime(request.params.id);
  response.status(200).json(anime);
});

anime.post("/new", async (req, res) => {
  console.log("POST to /anime/new");
  const newAnime = req.body;
  console.log(newAnime);
  const animes = await addNewAnime(newAnime);
  res.status(200).json(animes);
});

anime.delete("/:id", async (request, response) => {
  console.log("DELETE to /anime/:id");
  try {
    const updated = await updateAnime(anime, id);

    response.status(200).json(updated);
  } catch (_) {
    response.status(500).json({ error: "server error" });
  }
});

anime.put("/:id", async (request, response) => {
  console.log("PUT to /anime/:id");
  const { id } = request.params;
  const anime = request.body;
  console.log(id);
  console.log(anime);

  try {
    const updated = await updateAnime(anime, id);

    response.status(200).json(updated);
  } catch (error) {
    return error;
  }
});

module.exports = anime;
