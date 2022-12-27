import api from "../http-common";

const ROOT = "/users";

export const getAllUsers = async () => {
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
    .get(ROOT + "/all", config)
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

export const getAllStaffs = async () => {
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
    .get(ROOT + "/staffs", config)
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
