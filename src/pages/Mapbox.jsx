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
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-3.7038, 40.4168], // Madrid's coordinates [lng, lat]
      zoom: 12, // Adjust zoom level as needed
    });

    dogData?.dogs.forEach((dog) => {
      if (dog.latitude && dog.longitude) {
        const coordinates = [dog.longitude, dog.latitude];
        console.log(coordinates);
        const dogId = dog.id;
        const newMarker = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(dogId))
          .addTo(map);
        console.log(newMarker);
      }
    });

    // Clean up
    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: "100%", height: "800px" }} />;
}
