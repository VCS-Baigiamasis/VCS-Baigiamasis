import { useEffect, useState } from "react";
import UserReservationList from "../components/UserReservationList"
import { useAuth } from "../hooks/useAuth"
import BaseAxios from "../hooks/axiosConfig";
// Is this path needed or is it now defunct?

const Reservation = () => {
 const { user } = useAuth()
  const [reservations, setReservations] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    BaseAxios.get('reservations')
      .then((req) => {
        console.log(req)
      })
       const fetchReservations = async () => {
      try {
        // When testing on your home network use the ip address of the computer thats hosting the api server otherwise use localhost
        const response = await fetch('http://192.168.0.21:3000/reservations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        
        const data = await response.json()
                setReservations(data.reservations)
      } catch (err) {setError(err.message)}
    }
    fetchReservations()
  }, [user.token]);

  return (
    <div className="container m-auto p-10 text-justify">
    <div className="bg-white border border-gray-100 rounded-[10px] shadow-lg transition-shadow overflow-hidden p-5">
    <h1 className="text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center">My reservations</h1>
    {error && <p>{error}</p>}
    <UserReservationList reservations={reservations} />
    </div>
  </div>
  )
}

export default Reservation
