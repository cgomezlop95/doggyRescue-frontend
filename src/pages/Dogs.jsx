import { useQuery } from "@tanstack/react-query";
import { getDogs } from "../service/dog";

export function Dogs() {
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
