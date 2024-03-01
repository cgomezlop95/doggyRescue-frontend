import { api } from "./api";

const postRequest = async (
  id,
  {
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
  const { data } = await api.post(`/request-dog/${id}`, {
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
  return data;
};

export { postRequest };
