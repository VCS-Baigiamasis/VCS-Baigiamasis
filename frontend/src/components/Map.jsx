import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Map = ({data, current_location, pickupAddress}) => {
  const [geolocation, setGeoLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function checkIfSelected() {
      setIsLoading(true);
      if(geolocation) {
        try {
          const recieved_addresses = await data.stores;
          const selectedCity = await current_location;
          if (!selectedCity || selectedCity.length === 0) {
              let emptyArray = []
              for(let index of recieved_addresses) {
                  emptyArray.push(index.stores_data)
              }
              let fixedArray = emptyArray.flat(Infinity)
              setGeoLocation(fixedArray)
          } else {
            recieved_addresses.forEach((address) => {
              if (selectedCity === address.location_city) {
                setGeoLocation(address.stores_data);
              }
            });
          }
        } catch (error) {
          console.log({ error: error.message });
        } finally {
          setIsLoading(false)
        }
      }
      }
    checkIfSelected()
  }, [current_location, data]);
const sendAddress = (address) => {
  pickupAddress(address)
}

  return (
    <>
      {!isLoading ? (
        <MapContainer
          className="w-full h-[400px] mt-6 z-0"
          center={[55.33231603179951, 23.988324513624136]}
          zoom={7}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <>
            {geolocation.map((store) => (
              <Marker key={store._id} position={store.geo_location}>
                <Popup>
                  {store.store_name} <br /> {store.address} <br />
                  <button className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800' name='pickupLocation' value={store.address} onClick={(e) => {e.preventDefault(); sendAddress(store.address); toast(`Selected pickup point: ${store.address}`, {position: "top-right",autoClose: 5000, hideProgressBar: false, closeOnClick: false, pauseOnHover: true, draggable: true, progress: undefined, theme: "light",})}}>Select this store</button>
                </Popup>
              </Marker>
            ))}
          </>
        </MapContainer>
      ) : (
        "This ain't working my friend"
      )}
    </>
  );
};
export default Map;