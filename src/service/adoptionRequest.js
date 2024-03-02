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

export { postRequest };
