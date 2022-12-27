module.exports = ({ Schema, model }) => {
  const schema = Schema(
    {
      subjectCode: {
        type: String,
        required: true,
      },
      subjectGroup: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      instructor: {
        type: Schema.Types.ObjectId,
        ref: "instructors",
      },
      student: {
        type: Schema.Types.ObjectId,
        ref: "students",
      },
      term: {
        type: Number,
      },
      type: {
        type: Number,
      }, // THIS WOULD BE: 1 - QUIZ, 2 - Activities, 3  - Performance, 4 - TERM EXAM
      achieved: {
        type: Number,
      },
      total: {
        type: Number,
      },
      description: {
        type: String,
      },
      schoolData: {
        type: Schema.Types.ObjectId,
        ref: "schoolData",
      },
    },
    { timestamps: true }
  );

  const Grade = model("grades", schema);

  return Grade;
};
