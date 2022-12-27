module.exports = ({ Schema, model }) => {
  const schema = Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      person: {
        type: Schema.Types.ObjectId,
        ref: "persons",
      },
      department: String,
    },
    { timestamps: true }
  );

  const Instructor = model("instructors", schema);

  return Instructor;
};
