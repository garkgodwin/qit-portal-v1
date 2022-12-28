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
      console.log(res);
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
      let status = 500;
      let message = "";
      if (error.response) {
        let r = error.response;
        status = r.status;
        message = r.data.message;
      } else {
        result = {
          ...result,
          status: 500,
          message: "Something went wrong",
        };
      }
    });
  return result;
};

export const getStaffDetailsForUpdate = async (userID) => {
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
    .get(ROOT + `/${userID}`, config)
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

export const updateStaffDetails = async (userID, data) => {
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
    .put(ROOT + `/${userID}`, data, config)
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
