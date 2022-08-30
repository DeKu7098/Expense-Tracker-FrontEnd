import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { authsliceactions } from "../Store";


const LogoutButton = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authsliceactions.deletetokenId());
        history.replace('/');
    }
    return (
        <header>
            <button onClick={logoutHandler}>Logout</button>
        </header>
    )
};

export default LogoutButton;