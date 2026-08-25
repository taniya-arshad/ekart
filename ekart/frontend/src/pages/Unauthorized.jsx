import { useNavigate } from "react-router-dom";

function Unauthorized() {

  const navigate = useNavigate();

  return (

    <div className="page-container">

      <div className="card">

        <h2>🔒 Authorization Required</h2>

        <p>
          You don't have permission to access this page.
        </p>

        <button
          className="btn-primary"
          onClick={() => navigate("/home")}
        >
          Go to Home
        </button>

      </div>

    </div>

  );
}

export default Unauthorized;