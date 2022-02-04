const database = require("../db/dbConfig");

const getAllAnimes = async () => {
  try {
    const animes = await database.any("SELECT * FROM anime");
    return animes;
  } catch (err) {
    return err;
  }
};

const getOneAnime = async (id) => {
  try {
    const anime = await database.one("SELECT * FROM anime WHERE id=$1", id);

    return anime;
  } catch (error) {
    return error;
  }
};

const addNewAnime = async (newAnime) => {
  try {
    const animes = await database.any(
      "INSERT INTO anime (name, release) VALUES ($1, $2) RETURNING *",
      [newAnime.name, newAnime.release]
    );
    return animes;
  } catch (error) {
    return error;
  }
};

const deleteAnime = async (id) => {
  try {
    const anime = await database.one(
      "DELETE FROM anime WHERE id=$1 RETURNING *",
      id
    );

    return anime;
  } catch (error) {
    return error;
  }
};

const updateAnime = async (anime, id) => {
  const query = "UPDATE anime SET name=$1, release=$2 WHERE id=$3 RETURNING *";
  const values = [anime.name, anime.release, id];
  const updated = await database.one(query, values);

  return updated;
};

// here we are exporting our functions to use in our controllers
module.exports = {
  getAllAnimes,
  addNewAnime,
  getOneAnime,
  deleteAnime,
  updateAnime,
};
