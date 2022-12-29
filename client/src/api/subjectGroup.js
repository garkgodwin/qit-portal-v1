import api from "../http-common";

const ROOT = "/subject-groups";
export const createNewClass = async (data) => {
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
    .post(ROOT + "/", data, config)
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
      console.log(error);
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

export const getClassesOfThisSubject = async (code) => {
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
    .post(ROOT + `/${code}/classes`, config)
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
      console.log(error);
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

export const removeSubjectGroup = async (subjectGroupID) => {
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
    .delete(ROOT + `/${subjectGroupID}`, config)
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
      console.log(error);
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

export const getClassDetails = async (subjectGroupID) => {
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
    .get(ROOT + `/${subjectGroupID}`, config)
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
      console.log(error);
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
