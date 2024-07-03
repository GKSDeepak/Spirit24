import User from "../models/User.js";

export async function createUser(req, res) {
  try {
    console.log("Here");
    const { name, email, mobile, college, password } = req.query;

    console.log(req.query);
    const newUser = await User.create({
      name,
      email,
      college,
      mobile,
      password,
    });
    res.status(201).json("success");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
