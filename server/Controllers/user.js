exports.userAcessClient = (req, res, next) => {
  console.log("Asd");
  const datasubmit = req.body;
  const mode = req.query.mode;
  console.log(datasubmit, mode);
};
