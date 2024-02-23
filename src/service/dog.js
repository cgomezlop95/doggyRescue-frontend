import { api } from "./api";

const getDogs = async () => {
  const { data } = await api.get("/dog/pending");
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
  });
  return data;
};

export { getDogs, postDog };
