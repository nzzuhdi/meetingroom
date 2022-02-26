const errorHandler = async (err, req, res, next) => {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const msg = err.errors.map((el) => el.message);
    res.status(400).json({ message: msg });
  } else if (err.name === "InvalidEmail") {
    res.status(401).json({ message: "Insert Email" });
  } else if (err.name === "InvalidPassword") {
    res.status(401).json({ message: "Insert Password" });
  } else if (err.name === "CannotLogin") {
    res.status(401).json({ message: "Email or Password is incorrect!" });
  } else if (err.name === "wrongSchedule") {
    res.status(401).json({ message: "Chose another date and time!" });
  } else if (err.name === "Unauthorized" || err.name === "JsonWebTokenError") {
    res
      .status(401)
      .json({ message: "Must login first with registered account" });
  } else if (err.name === "notFound") {
    res.status(404).json({ message: "Page not found!" });
  } else {
    res.status(500).json({ message: "Internal server error!" });
  }
};
module.exports = errorHandler;
