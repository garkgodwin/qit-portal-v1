module.exports = ({ Schema, model }) => {
  const schema = Schema(
    {
      subjectCode: {
        type: String,
        required: true,
      },
      siss: {
        type: Schema.Types.ObjectId,
        ref: "siss",
      },
      room: {
        type: String, // room from constants only
      },
      day: {
        type: Number, //1 = monday, 2 = tuesday, 3 = wednesday, and so on
      },
      timeStart: {
        type: String, //24 hour format save
      },
      timeEnd: {
        type: String, //24 hour format save
      },
      schoolData: {
        type: Schema.Types.ObjectId,
        ref: "schoolData",
      },
      addedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
    { timestamps: true }
  );

  const Schedule = model("schedules", schema);

  return Schedule;
};
