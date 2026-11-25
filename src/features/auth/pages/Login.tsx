import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>MDMS Login</h1>
      <h3>Select a Role</h3>

      <div>
        <Link to="/user/dashboard">End User</Link>
      </div>

      <div>
        <Link to="/zone/dashboard">Zone Admin</Link>
      </div>

      <div>
        <Link to="/enterprise/dashboard">Enterprise Admin</Link>
      </div>
    </div>
  );
};

export default Login;
