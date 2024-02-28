import { api } from "./api";

const getDogs = async () => {
  const { data } = await api.get("/dog/pending");
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
}) => {
  const { data } = await api.post("/create-new-dog", {
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

export { getDogs, getDogById, postDog };
