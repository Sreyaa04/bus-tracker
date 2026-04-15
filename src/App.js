import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

function App() {
  // Route 1
  const route1 = [
    [9.9312, 76.2673],
    [9.935, 76.27],
    [9.94, 76.275],
    [9.945, 76.28],
    [9.95, 76.285],
  ];

  // Route 2
  const route2 = [
    [9.92, 76.25],
    [9.925, 76.255],
    [9.93, 76.26],
    [9.935, 76.265],
    [9.94, 76.27],
  ];

  const [bus1Pos, setBus1Pos] = useState(route1[0]);
  const [bus2Pos, setBus2Pos] = useState(route2[0]);
  const [center, setCenter] = useState(route1[0]);

  useEffect(() => {
    let i = 0;
    let j = 0;

    const interval = setInterval(() => {
      i = (i + 1) % route1.length;
      j = (j + 1) % route2.length;

      setBus1Pos(route1[i]);
      setBus2Pos(route2[j]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col">

      {/* HEADER */}
      <div className="h-14 bg-slate-800 flex items-center px-6 shadow-md">
        <h1 className="text-lg font-semibold">Bus Tracking Dashboard 🚀</h1>
      </div>

      <div className="flex flex-1">

        {/* SIDEBAR */}
        <div className="w-64 bg-slate-800 p-4 space-y-4">
  <h2 className="text-gray-400 text-sm uppercase">Routes</h2>

  <div
    onClick={() => setCenter(bus1Pos)}
    className="bg-slate-700 p-3 rounded cursor-pointer hover:bg-slate-600"
  >
    <div className="flex justify-between items-center">
      <span>🚌 Bus 1</span>
      <span className="text-green-400 text-sm">On Time</span>
    </div>
  </div>

  <div
    onClick={() => setCenter(bus2Pos)}
    className="bg-slate-700 p-3 rounded cursor-pointer hover:bg-slate-600"
  >
    <div className="flex justify-between items-center">
      <span>🚌 Bus 2</span>
      <span className="text-yellow-400 text-sm">Delayed</span>
    </div>
  </div>
</div>

        {/* MAP */}
        <div className="flex-1">
          <MapContainer center={center} zoom={13} className="w-full h-full">

            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Routes */}
            <Polyline positions={route1} color="blue" />
            <Polyline positions={route2} color="green" />

            {/* Buses */}
            <Marker position={bus1Pos}>
              <Popup>🚌 Bus 1</Popup>
            </Marker>

            <Marker position={bus2Pos}>
              <Popup>🚌 Bus 2</Popup>
            </Marker>

          </MapContainer>
        </div>

      </div>
    </div>
  );
}

export default App;