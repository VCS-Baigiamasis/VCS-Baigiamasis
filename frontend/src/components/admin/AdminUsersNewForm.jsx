import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseAxios from '../../hooks/axiosConfig';

const AdminUsersNewForm = ({ onClose, refreshUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    BaseAxios.post('auth/signup', formData, {method: "POST"})
      .then((res) => {
        if (res.statusText === "Created") {
          toast.success('User created successfully!');
          refreshUsers();
          onClose();
        } else {
          toast.error(data.message || 'Failed to create user');
        }
      })
      .catch((err) => {toast.error('Error creating user'); console.log(err)})
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full py-2 border rounded " required />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full py-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full py-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full py-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-1">Date of Birth</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full py-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-1">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full py-2 border rounded" required />
        </div>

        <div>
          <label className="block mb-1">Role</label>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full py-2 border rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create User
          </button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUsersNewForm;
