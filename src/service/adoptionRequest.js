import { api } from "./api";

const postRequest = async (
  id,
  {
    userId,
    dogId,
    adopterAge,
    hasExperience,
    dailyHoursAway,
    hasOtherPets,
    OtherPets,
    hasKids,
    hasGarden,
    numberOfTrips,
    monthlyMoney,
    numberOfPeople,
    adopterDescription,
  }
) => {
  try {
    const { data } = await api.post(`/request-dog/${id}`, {
      userId,
      dogId,
      adopterAge,
      hasExperience,
      dailyHoursAway,
      hasOtherPets,
      OtherPets,
      hasKids,
      hasGarden,
      numberOfTrips,
      monthlyMoney,
      numberOfPeople,
      adopterDescription,
    });
    console.log("final data", data);
    return data;
  } catch (error) {
    console.error("Error creating request: ", error);
  }
};

// const getPendingRequests = async () => {
//   const { data } = await api.get("/adoption-requests/pending");
//   return data;
// };

// const getApprovedRequests = async () => {
//   const { data } = await api.get("/adoption-requests/approved");
//   return data;
// };

// const getRejectedRequests = async () => {
//   const { data } = await api.get("/adoption-requests/rejected");
//   return data;
// };

const getAllRequests = async () => {
  const { data } = await api.get("/adoption-requests");
  return data;
};

const getRequestById = async (id) => {
  const { data } = await api.get(`/adoption-request/${id}`);
  return data;
};

const approveRequest = async (id) => {
  const { data } = await api.put(`/adoption-request/approve/${id}`);
  return data;
};

const denyRequest = async (id) => {
  const { data } = await api.put(`/adoption-request/deny/${id}`);
  return data;
};

export {
  postRequest,
  getAllRequests,
  getRequestById,
  approveRequest,
  denyRequest
};
