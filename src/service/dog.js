import { api } from "./api";

const getPendingDogs = async () => {
  const { data } = await api.get("/dogs/pending");
  return data;
};

const getAdoptedDogs = async () => {
  const { data } = await api.get("/dogs/adopted");
  return data;
};

const getDogById = async (id) => {
  const { data } = await api.get(`/dog/${id}`);
  return data;
};

const postDog = async ({
  dogName,
  dogAge,
  dogWeight,
  dogSex,
  dogBreed,
  suitableForKids,
  suitableForOtherPets,
  dogDescription,
  potentiallyDangerousDog,
  isVaccinated,
  isSterilized,
  dogPhotoURL,
  latitude,
  longitude,
}) => {
  const { data } = await api.post("/create-new-dog", {
    dogName,
    dogAge,
    dogWeight,
    dogSex,
    dogBreed,
    suitableForKids,
    suitableForOtherPets,
    dogDescription,
    potentiallyDangerousDog,
    isVaccinated,
    isSterilized,
    dogPhotoURL,
    latitude,
    longitude,
  });
  return data;
};

const updateDog = async (
  id,
  {
    dogName,
    dogAge,
    dogWeight,
    dogSex,
    dogBreed,
    dogAdopted,
    suitableForKids,
    suitableForOtherPets,
    dogDescription,
    potentiallyDangerousDog,
    isVaccinated,
    isSterilized,
    dogPhotoURL,
    latitude,
    longitude,
  }
) => {
  const { data } = await api.put(`/update-dog/${id}`, {
    dogName,
    dogAge,
    dogWeight,
    dogSex,
    dogBreed,
    dogAdopted,
    suitableForKids,
    suitableForOtherPets,
    dogDescription,
    potentiallyDangerousDog,
    isVaccinated,
    isSterilized,
    dogPhotoURL,
    latitude,
    longitude,
  });
  return data;
};

export { getPendingDogs, getAdoptedDogs, getDogById, postDog, updateDog };
