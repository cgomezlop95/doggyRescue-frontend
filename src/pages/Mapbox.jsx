import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useQuery } from "@tanstack/react-query";
import { getPendingDogs } from "../service/dog";
import { Chip } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXZhbmVzdGViYW4iLCJhIjoiY2xvOXFiYXdnMGo0NDJqcXByMWp5eGt2NCJ9.M4IK9Cm2MPbyj26ZXeukug";

export function Mapbox() {
  const { data: dogData, isLoading } = useQuery({
    queryKey: ["dogs"],
    queryFn: getPendingDogs,
  });

  const [selectedDog, setSelectedDog] = useState(null);

  let tabs = [
    {
      id: "1",
      label: "Characteristics",
      content: [selectedDog?.dogBreed, `${selectedDog?.dogAge} years`, selectedDog?.dogSex],
    },
    {
      id: "2",
      label: "Description",
      content: [selectedDog?.dogDescription],
    },
  ];

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-3.7038, 40.4168], // Madrid's coordinates
      zoom: 12,
    });

    const dogsWithCoordinates = dogData?.dogs.filter(
      (dog) => dog.latitude && dog.longitude
    );

    dogsWithCoordinates?.forEach((dog) => {
      const dogCoordinates = [dog.longitude, dog.latitude];
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = `url(${dog.dogPhotoURL})`;
      el.style.backgroundRepeat = "no-repeat";
      el.style.width = "60px";
      el.style.height = "60px";
      el.style.backgroundSize = "100%";
      el.style.borderRadius = "50%";

      const popup = new mapboxgl.Popup().setHTML(
        `<div>
          <a href="/dog/${dog.id}" target="_blank">
            <p>${dog.dogName} - ${dog.dogBreed}</p>
            <p>${dog.dogAge} years</p>
          </a>
        </div>`
      );

      new mapboxgl.Marker(el)
        .setLngLat(dogCoordinates)
        .setPopup(popup)
        .addTo(map);

      popup.on("open", () => setSelectedDog(dog));
    });

    return () => map.remove();
  }, [dogData]); 

  return (
    <div style={{ display: "flex", height: "800px" }}>
      <div
        className="flex flex-col items-center p-5 bg-gray-100 overflow-y-auto"
        style={{ width: "300px" }}
      >
        {selectedDog ? (
          <>
            <Chip color="primary" size="lg" className="mb-4">
              {selectedDog.dogName}
            </Chip>
            <img
              src={selectedDog.dogPhotoURL}
              alt={selectedDog.dogName}
              className="max-w-full h-auto mb-4 rounded-lg shadow"
            />
            <div className="flex w-full flex-col">
              <Tabs aria-label="Dynamic tabs" items={tabs}>
                {(item) => (
                  <Tab key={item.id} title={item.label}>
                    <Card>
                      <CardBody>
                        {item.content.map((el) => (
                          <p>{el}</p>
                        ))}
                      </CardBody>
                    </Card>
                  </Tab>
                )}
              </Tabs>
            </div>
          </>
        ) : (
          <p>Select a dog to see details</p>
        )}
      </div>

      <div id="map" style={{ flexGrow: 1 }} />
    </div>
  );
}
