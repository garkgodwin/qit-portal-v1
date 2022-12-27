module.exports = ({ Schema, model }) => {
  const schema = Schema(
    {
      subjectCode: {
        type: String,
        required: true,
      },
      instructor: {
        type: Schema.Types.ObjectId,
        ref: "instructors",
      },
      students: [
        {
          type: Schema.Types.ObjectId,
          ref: "students",
        },
      ],
      schedules: [
        {
          type: Schema.Types.ObjectId,
          ref: "schedules",
        },
      ],
      schoolData: {
        type: Schema.Types.ObjectId,
        ref: "schoolData",
      },
    },
    { timestamps: true }
  );

  const SISS = model("sisses", schema);

  return SISS;
};
