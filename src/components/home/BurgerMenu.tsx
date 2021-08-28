import { slide as Menu } from "react-burger-menu";
import { EnvLoader } from "../../utils/env-loader";
import LongActionButton from "../generic/LongActionButton";
import './BurgerMenu.css';



function BurgerMenu() {
    return (
        <Menu className="">
            <p className="text-blue-light text-4xl text-left ml-1">Perico Palotes</p>
            <p className="text-blue-light text-1xl text-left ml-1">pericoeldelospalotes</p>
            <div className="mt-5 -ml-10">
                <LongActionButton action={() => { }} label="Settings" ></LongActionButton>
            </div>
            <div className="absolute bottom-0 left-0 h-16 w-16 ">
                <LongActionButton action={() => {
                    console.log("Logout button clicked");
                    window.location.replace(EnvLoader.getInstance().loadedVariables.REACT_APP_GOOGLE_LOGOUT_ENDPOINT);
                }} label="Logout" ></LongActionButton>
            </div>
        </Menu>
    );

}
export default BurgerMenu;