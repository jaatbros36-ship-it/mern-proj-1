import Goal from "../models/goalModel.js";

// Create new goal
export const setGoal = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const userId = req.userId;

    const newGoal = new Goal({
      userid: userId,
      title,
      desc,
    });

    await newGoal.save();

    return res
      .status(201)
      .json({ message: `Goal created successfully`, newGoal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all goals for a user
export const getGoals = async (req, res) => {
  try {
    const userid = req.userId;

    const goals = await Goal.find({ userid });

    if (goals.length === 0) {
      return res.status(404).json({ message: "no Goal found" });
    }
    return res.status(200).json({ count: goals.length, goals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user goal
export const updateGoal = async (req, res) => {
  try {
    const goalid = req.params.id;
    const { title, desc } = req.body;
    const userid = req.userId;

    const updateData = {};

    if (title) updateData.title = title;
    if (desc) updateData.desc = desc;

    const updategoal = await Goal.findOneAndUpdate(
      { _id: goalid, userid },
      updateData,
      {
        returnDocument: "after",
      },
    );

    if (!updategoal) {
      return res.status(404).json({
        message: "Goal not found or not yours",
      });
    }

    return res.json({
      message: "Goal updated successfully",
      Goal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user goal
export const deleteGoal = async (req, res) => {
  try {
    const goalid = req.params.id;
    const userid = req.userId;

    const goal = await Goal.findOneAndDelete({
      _id: goalid,
      userid,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found or not yours",
      });
    }

    return res.status(200).json({
      message: "Goal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
