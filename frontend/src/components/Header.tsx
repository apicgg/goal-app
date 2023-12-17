import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    // @ts-ignore
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center py-5 px-0 mb-[60px] border-b border-solid border-[#e6e6e6]">
      <div className="logo">
        <Link to="/">Goalsetter</Link>
      </div>
      <ul className="flex justify-between items-center">
        {user ? (
          <li className="ml-5 leading-[2.2]">
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li className="ml-5 leading-[2.2]">
              <Link className="flex items-center hover:text-[#777]" to="/login">
                <FaSignInAlt className="mr-[5px]" /> Login
              </Link>
            </li>
            <li className="ml-5 leading-[2.2]">
              <Link
                className="flex items-center hover:text-[#777]"
                to="/register"
              >
                <FaUser className="mr-[5px]" /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
