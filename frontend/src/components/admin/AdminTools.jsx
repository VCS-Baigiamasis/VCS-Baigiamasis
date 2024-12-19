import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminToolCard from "./AdminToolCard";
import BaseAxios from "../../hooks/axiosConfig";
import { toast } from "react-toastify";

function AdminTools() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    BaseAxios.get('tools')
      .then((req) => {
        setProducts(req.data.tools || []);
      })
      .catch((err) => {toast.error("Failed loading tools, check console");console.log(err)})
  }, []);
  return (
    <>
      <div className="sticky top-0">
        <Outlet context={[product]} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 space-y-4 bg-white p-6 rounded-lg shadow">
        <Link to="new">
          {" "}
          <div className="border  p-2 h-22 border-gray-100 rounded-[10px] h-22 mt-4 text-center">
            Įkelti naują
          </div>{" "}
        </Link>
        {products.map((item) => {
          return (
            <AdminToolCard item={item} passItem={setProduct} key={item._id} />
          );
        })}
      </div>
    </>
  );
}

export default AdminTools;
