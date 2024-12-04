import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminReservationsNewForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    tool: '',
    userId: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    pickupLocation: '',
    dateRange: {
      from: '',
      to: ''
    },
    quantity: 1
  });
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [isManualEntry, setIsManualEntry] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        toast.error('Failed to fetch users');
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/stores', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('Stores data:', data);
        setLocations(data.stores);
      })
      .catch((err) => {
        toast.error('Failed to fetch locations');
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/tools', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('Tools data:', data);
        setTools(data.tools);
        setLoading(false);
      })
      .catch((err) => {
        toast.error('Failed to fetch tools');
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      productId: formData.tool,
      userId: formData.userId,
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      pickupLocation: formData.pickupLocation,
      dateRange: formData.dateRange,
      quantity: formData.quantity
    };

    console.log('Sending reservation data:', requestData);

    try {
      const response = await fetch('http://localhost:3000/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        toast.success('Reservation created successfully');
        navigate('/admin/reservations');
      } else {
        throw new Error(data.message || 'Failed to create reservation');
      }
    } catch (error) {
      console.log('Error details:', error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('dateRange')) {
      const dateField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        dateRange: {
          ...prev.dateRange,
          [dateField]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tool</label>
          <select name="tool" value={formData.tool} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select a tool</option>
            {tools.map((tool) => (
              <option key={tool._id} value={tool._id}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">User (Optional)</label>
          <select name="userId" value={formData.userId} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Contact Name</label>
          <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-1">Contact Email</label>
          <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-1">Contact Phone</label>
          <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-1">Pickup Location</label>
          <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select a location</option>
            {locations.map((city) => (
              <optgroup key={city._id} label={city.location_city}>
                {city.stores_data.map((store) => (
                  <option key={store._id} value={store.address}>
                    {store.address}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Start Date</label>
          <input type="date" name="dateRange.from" value={formData.dateRange.from} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-1">End Date</label>
          <input type="date" name="dateRange.to" value={formData.dateRange.to} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-1">Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" className="w-full p-2 border rounded" required />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create Reservation
          </button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminReservationsNewForm;
