const db = require("../models");
const PersonModel = db.persons;

exports.uploadImage = async (req, res) => {
  const { personId } = req.params;
  if (!req.file || !req.file.filename) {
    return res.status(400).send({ message: "Failed to upload image" });
  }
  // const url = req.protocol + "://" + req.get('host'); // TO GET THE PHOTO
  await PersonModel.findByIdAndUpdate(personId, {
    profileImage: req.file.filename,
  })
    .then((data) => {
      if (data) {
        return res
          .status(200)
          .send({ message: "Image uploaded", data: req.file.filename });
      } else {
        return res.status(500).send({ message: "Something went wrong" });
      }
    })
    .catch((error) => {
      return res.status(500).send({ message: "Something went wrong" });
    });
};

// exports.uploadPersonImage = async (req, res) => {
//   if (!req.file || !req.file.filename) {
//     return res.status(409).send({
//       message: "Failed to upload image",
//     });
//   }
//   const filter = { _id: req.body.personId };
//   const update = { profileImage: req.file.filename };
//   const person = await PersonModel.findeOneAndUpdate(filter, update);
//   if (!person) {
//     return res.status(500).send({
//       message: "Something went wrong",
//     });
//   }
//   return res
//     .status(200)
//     .send({ message: "Image uploaded", data: req.file.filename });
// };

exports.updateIamge = (req, res) => {};
