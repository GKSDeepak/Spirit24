import User from "../models/User.js";

const getScoreboard = async (req, res) => {
    try {

      const users = await User.findAll({
        attributes: ['username', 'points'], // Selecting username and points
        order: [['points', 'DESC']] // Order by points in descending order
      });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  module.exports = {
    getScoreboard
  };