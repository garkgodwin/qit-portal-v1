module.exports = ({ Schema, model }) => {
  const schema = Schema(
    {
      sy: String, // 21-22
      sem: Number, // 1 or 2
      current: Boolean, // if this is current, then this is the current data being used overall
      startDate: String, // new Date().toISOString().split("T")[0]
      endDate: String, // new Date().toISOString().split("T")[0]
      locked: Boolean, // if this is false and is current, then users cannot post anything more
    },
    { timestamps: true }
  );

  const SchoolData = model("schoolDatas", schema);

  return SchoolData;
};
