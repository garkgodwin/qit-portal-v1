const handleErrors = (error) => {
  let keyCount = 0;
  let message = "The ";
  const keyPattern = error.keyPattern;
  const keyValue = error.keyValue;
  for (let i in keyPattern) {
    let keyString = JSON.stringify(i).split('"')[1];
    keyCount += 1;
    if (keyString === "username") {
      keyString += " or email";
    }
    message += keyString + " ";
    if (keyPattern[i] === 1) {
      message += "'" + keyValue[i] + "' ";
    }
  }
  if (error.code === 11000) {
    if (keyCount === 0) {
      message = "Something went wrong with User Model";
    } else {
      if (keyCount > 1) {
        message += "are already in use";
      } else {
        message += "is already in use";
      }
    }
    return {
      message: message,
      status: 422,
    };
  } else {
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};

module.exports = handleErrors;
