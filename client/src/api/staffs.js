import api from "../http-common";

const ROOT = "/staffs";

export const getAllInstructors = async () => {
  const token = localStorage.getItem("token");
  let result = {
    status: 0,
    message: "",
    data: null,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await api
    .get(ROOT + "/instructors", config)
    .then((res) => {
      const resData = res.data;
      const data = resData.data;
      const message = resData.message;
      const status = res.status;
      result = {
        ...result,
        status: status,
        message: message,
        data: data,
      };
    })
    .catch((error) => {
      const { data, status } = error.response;
      const message = data.message;
      result = {
        ...result,
        status: status,
        message: message,
      };
    });
  return result;
};
