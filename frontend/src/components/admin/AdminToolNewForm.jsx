import { Link } from "react-router-dom";
import { JsonEditor } from "json-edit-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BaseAxios from "../../hooks/axiosConfig";

function AdminToolNewForm() {
  const [itemEdit, setItemEdit] = useState({});
  const jsonTemplate = {
    toolType: "string",
    description: {
      nameRetail: "string",
      basePrice: 1,
      imageURIs: ["string"],
      details: {
        productType: "string",
        trademark: "string",
        warranty: 1,
        company_warranty: 1,
        origin_country: "string",
      },
    },
    isAvailable: false,
    isVisible: false,
    isDraft: true,
  };
/*
  useEffect(() => {
    console.log("First check", itemEdit);
  }, [itemEdit]);
*/
  function refreshPage() {
    window.location.reload()
  }
  const handleItemPost = async (e) => {
    e.preventDefault();
    console.log(itemEdit)
    BaseAxios.post('tools/', itemEdit, {method: "POST"})
      .then(() => {
        toast(`Tool created, page will refresh in 2 seconds to update tool list`)
        //setTimeout(refreshPage, 2500)
      })
      .catch((err) => {
        toast.error("Failed to create tool check logs")
        console.log(err)
      })
  };
/*
  useEffect(() => {
    console.log("Second check:", itemEdit);
  }, [itemEdit]);
*/

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">Kurti Įrankius</h3>
        <Link to="../">
          <div>X</div>
        </Link>
      </div>
      <form className="flex gap-6 ">
        <JsonEditor data={jsonTemplate} setData={setItemEdit} />
        <button onClick={handleItemPost}>Add new item</button>
      </form>
    </div>
  );
}

export default AdminToolNewForm;