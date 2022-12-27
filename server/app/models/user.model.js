//AUTOMATICALLY CREATED BY THE SYSTEM | UPDATED BY THE OWNER
module.exports = ({ Schema, model }) => {
  const schema = Schema(
    {
      username: {
        type: String,
        // unique: true,
      },
      password: {
        type: String,
      },
      email: {
        type: String,
        required: true,
        // unique: true,
      },
      role: Number,
      otp: {
        type: String,
        default: null,
      },
      isFirstSetup: {
        type: Boolean,
        default: true,
      },
      activated: {
        type: Boolean,
        default: false,
      },
      locked: {
        type: Boolean,
        default: false,
      },
      person: {
        type: Schema.Types.ObjectId,
        ref: "persons",
      },
      //TODO: ADD REMOVED LATER
    },
    { timestamps: true }
  );

  // schema.method("toJSON", function () {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  // var handleMongooseErrors = function (error, res, next) {
  //   console.log(error);
  //   let keyCount = 0;
  //   let message = "The ";
  //   const keyPattern = error.keyPattern;
  //   const keyValue = error.keyValue;
  //   for (let i in keyPattern) {
  //     let keyString = JSON.stringify(i).split('"')[1];
  //     keyCount += 1;
  //     if (keyString === "username") {
  //       keyString += " or email";
  //     }
  //     message += keyString + " ";
  //     if (keyPattern[i] === 1) {
  //       message += "'" + keyValue[i] + "' ";
  //     }
  //   }
  //   if (error.code === 11000) {
  //     if (keyCount === 0) {
  //       message = "Something went wrong with User Model";
  //     } else {
  //       if (keyCount > 1) {
  //         message += "are already in use";
  //       } else {
  //         message += "is already in use";
  //       }
  //     }
  //     return next(new Error(message));
  //   } else {
  //     return next(new Error(message));
  //   }
  // };

  // schema.post("save", handleMongooseErrors);
  // schema.post("update", handleMongooseErrors);
  // schema.post("findOneAndUpdate", handleMongooseErrors);
  // schema.post("insertMany", handleMongooseErrors);

  const User = model("users", schema);
  return User;
};
