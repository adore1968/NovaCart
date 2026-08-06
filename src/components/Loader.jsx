import { CgSpinner } from "react-icons/cg";

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <CgSpinner className="spinner text-primary" size={60} />
    </div>
  );
}

export default Loader;
