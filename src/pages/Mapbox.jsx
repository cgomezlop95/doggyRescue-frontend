import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useQuery } from "@tanstack/react-query";
import { getPendingDogs } from "../service/dog";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXZhbmVzdGViYW4iLCJhIjoiY2xvOXFiYXdnMGo0NDJqcXByMWp5eGt2NCJ9.M4IK9Cm2MPbyj26ZXeukug";

export function Mapbox() {
  const { data: dogData, isLoading } = useQuery({
    queryKey: ["dogs"],
    queryFn: getPendingDogs,
  });

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
    // console.log("dogsWithCoordinates", dogsWithCoordinates);

    dogsWithCoordinates?.forEach((dog) => {
      // console.log("coordinates", dog.longitude, dog.latitude);
      // console.log(typeof dog.latitude);
      // console.log(typeof dog.longitude);
      // console.log(dog.dogPhotoURL)
      const dogCoordinates = [dog.longitude, dog.latitude];
      //Custom marker with dog icon//
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = `url(${dog.dogPhotoURL})`;
      el.style.backgroundRepeat = "no-repeat";
      el.style.width = "75px";
      el.style.height = "75px";
      el.style.backgroundSize = "100%";
      //Custom marker//
      new mapboxgl.Marker(el)
        .setLngLat(dogCoordinates)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div>
              <a href="/dog/${dog.id}" target="_blank">
                <p>${dog.dogName} - ${dog.dogBreed}</p>
                <p>${dog.dogAge} years</p>
              </a>
            </div>`
          )
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [dogData]);

  return <div id="map" style={{ width: "100%", height: "800px" }} />;
}
