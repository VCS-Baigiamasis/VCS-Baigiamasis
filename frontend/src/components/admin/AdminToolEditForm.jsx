import { Link, useOutletContext } from "react-router-dom";
import { JsonEditor } from "json-edit-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseAxios from "../../hooks/axiosConfig";

function AdminToolEditForm() {
  const [product] = useOutletContext();
  const [itemEdit, setItemEdit] = useState({ product });
  const token = localStorage.token;
  const handleItemPatch = async (e) => {
    e.preventDefault();
    BaseAxios.patch(`tools/${itemEdit._id}`, itemEdit, {method:"PATCH"})
      .then(() => {
        toast.success("Reformed tool, page refresh in 2 seconds")
        setTimeout(() => {
          window.location.reload()
        }, 2500);
      })
      .catch((err) => {
     console.error("Patch failed:", err);
     toast.error("Failed to update tool")
      })
  };
  const handleItemDelete = async (e) => {
    e.preventDefault();
    BaseAxios.delete(`tools/${itemEdit._id}`, itemEdit, {method:"DELETE"})
      .then(() => {
         //console.log("Delete success:", response);
        toast.success("Eradication successfull, page refresh in 2 seconds")
        setTimeout(() => {
          window.location.reload()
        }, 2500);
      })
      .catch((err) => {
      console.log("Delete failed:", err);
      toast.error("Something went wrong, tool was not updated!")
      })
  };

  useEffect(() => {
    setItemEdit(product.tool);
  }, [product]);

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Koreguoti Įrankius</h3>
        <Link to="../">
          <div>X</div>
        </Link>
      </div>
      <form className="flex gap-6 ">
        <JsonEditor
          data={itemEdit}
          setData={setItemEdit}
          restrictEdit={({ key, level }) => key === "_id" && level === 0}
        />
        <button onClick={handleItemPatch}>Save changes</button>
        <button onClick={handleItemDelete}>Delete</button>
      </form>
    </div>
  );
}

export default AdminToolEditForm;
