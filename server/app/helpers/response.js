const sendStatus = (res, statusCode, text) => {
  res.status(statusCode).send({ message: text });
};
