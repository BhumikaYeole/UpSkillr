

export const allowInstructor = (req, res, next) => {
  if (req.user.role !== "instructor")
    return res.status(403).json({ msg: "Instructor only" });
  next();
};


export const allowLearner = (req, res, next) => {
  if (req.user.role !== "learner")
    return res.status(403).json({ msg: "Learner only" });
  next();
};
