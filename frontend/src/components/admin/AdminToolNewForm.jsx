import { Link } from "react-router-dom";

function AdminToolNewForm() {
  return (
    <form className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold">Pridėti Įrankį</h3>
      <Link to="../">
        <div>X</div>
      </Link>
    </form>
  );
}

export default AdminToolNewForm;
