import { slide as Menu } from "react-burger-menu";
import { CURRENT_USER_DATA } from "../../consts/global_session_keys";
import { EnvLoader } from "../../utils/env-loader";
import { deleteSessionValue, getSessionValue } from "../../utils/storage-utils";
import LongActionButton from "../generic/LongActionButton";
import { UserDbObject } from "allotr-graphql-schema-types"
import './BurgerMenu.css';
import * as serviceWorkerRegistration from '../../serviceWorkerRegistration';
import { useHistory } from "react-router-dom";



function BurgerMenu() {
    const { name, surname, username } = getSessionValue<UserDbObject>(CURRENT_USER_DATA);
    const history = useHistory();
    return (
        <Menu>
            <p className="text-blue-light text-4xl text-left ml-1">{`${name} ${surname}`}</p>
            <p className="text-blue-light text-1xl text-left ml-1">{`${username}`}</p>
            <div className="mt-5 -ml-10">
                <LongActionButton action={() => {
                    history.push("/settings")
                }} label="Settings" ></LongActionButton>
            </div>
            <div className="absolute bottom-0 left-0 h-16 w-16 ">
                <LongActionButton action={() => {
                    deleteSessionValue(CURRENT_USER_DATA);
                    serviceWorkerRegistration.unregister()
                    window.location.replace(EnvLoader.getInstance().loadedVariables.REACT_APP_GOOGLE_LOGOUT_ENDPOINT);
                }} label="Logout" ></LongActionButton>
            </div>
        </Menu>
    );

}
export default BurgerMenu;