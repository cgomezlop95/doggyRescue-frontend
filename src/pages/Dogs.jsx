import { useQuery } from "@tanstack/react-query";
import { api } from "../service/api";

export function Dogs() {
  const getDogs = async () => {
    const { data } = await api.get("/dog/pending");
    return data;
  };

  const { data: dogData, isLoading } = useQuery({
    queryKey: ["dogs"],
    queryFn: getDogs,
  });

  if (isLoading) {
    return <h1>Loading dogs</h1>;
  }

  return (
    <>
      <h1>Dogs pending adoption</h1>
      {dogData.dogs.map((singleDog) => {
        return (
          <li key={singleDog.id}>
            {singleDog.dogName} - {singleDog.dogAge}
          </li>
        );
      })}
    </>
  );
}
