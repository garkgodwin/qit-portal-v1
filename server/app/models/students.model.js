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
      studentUniqueID: {
        type: String,
      },
      schoolUniqueID: {
        type: String,
      },
      course: String,
      yearLevel: Number,
      section: String,
      schedules: [
        {
          type: Schema.Types.ObjectId,
          ref: "schedules",
        },
      ],
      studentType: Number, // 1 - college, 2 - Senior highschool, 3 - Junior Highschool
      guardians: [
        {
          type: Schema.Types.ObjectId,
          ref: "guardians",
        },
      ],
      currentSchoolData: {
        type: Schema.Types.ObjectId,
        ref: "schoolDatas",
      },
    },
    { timestamps: true }
  );

  const Student = model("students", schema);

  return Student;
};
