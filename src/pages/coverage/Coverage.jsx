import { useState, useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import coverageData from "../../api/coverage";
// Leaflet marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Fly animation
const FlyToLocation = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (!location) return;
    map.flyTo(
      [location.latitude, location.longitude],
      10,
      { animate: true, duration: 1.5 }
    );
  }, [location, map]);

  return null;
};

const Coverage = () => {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();
    return coverageData.filter((item) =>
      item.district.toLowerCase().includes(q) ||
      item.city.toLowerCase().includes(q) ||
      item.covered_area.some((a) => a.toLowerCase().includes(q))
    );
  }, [search]);

 
  useEffect(() => {
    if (!search || filteredData.length === 0) return;

    const exactMatch = filteredData.find(
      (item) => item.district.toLowerCase() === search.toLowerCase()
    );

    if (exactMatch) {
      setSelectedLocation(exactMatch);
    } else {
      setSelectedLocation(filteredData[0]);
    }
  }, [search, filteredData]);

  return (
    <div className="min-h-screen bg-base-100 px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by district, city or area..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
       <div className="divider"></div>
      <div className="max-w-6xl mx-auto">
        <p className="text-3xl font-bold mb-5">We deliver almost all over Bangladesh</p>
        <div className="h-125 w-full rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={7}
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FlyToLocation location={selectedLocation} />

            {filteredData.map((item, index) => (
              <Marker
                key={index}
                position={[item.latitude, item.longitude]}
                eventHandlers={{
                  click: () => setSelectedLocation(item),
                }}
              >
                <Popup>
                  <h3 className="font-bold">{item.district}</h3>
                  <p className="text-sm">Region: {item.region}</p>
                  <p className="text-sm">
                    Areas: {item.covered_area.join(", ")}
                  </p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
