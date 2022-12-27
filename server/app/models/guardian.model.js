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
      students: [
        {
          type: Schema.Types.ObjectId,
          ref: "students",
        },
      ],
      guardianType: Number, //? 1 - Father, 2 - Mother, 3 - Other
    },
    { timestamps: true }
  );

  const Guardians = model("guardians", schema);

  return Guardians;
};
