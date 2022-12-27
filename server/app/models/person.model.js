module.exports = ({ Schema, model }) => {
  const schema = Schema(
    {
      name: {
        title: String,
        first: {
          type: String,
          required: true,
        },
        middle: String,
        last: {
          type: String,
          required: true,
        },
        extension: String,
      },
      age: Number,
      birthDate: String,
      gender: Number,
      profileImage: {
        type: String,
        default: "",
      },
      address1: {
        unitNumber: String,
        houseNumber: String,
        streetNumber: String,
        streetName: String,
        barangay: String,
        city: String,
        province: String,
        postalCode: String,
        country: String,
      },
      address2: {
        unitNumber: String,
        houseNumber: String,
        streetNumber: String,
        streetName: String,
        barangay: String,
        city: String,
        province: String,
        postalCode: String,
        country: String,
      },
      mobileNumber: String,
      telephoneNumber: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      }, // if null or empty means account not created
    },
    { timestamps: true }
  );

  const Person = model("persons", schema);

  return Person;
};
