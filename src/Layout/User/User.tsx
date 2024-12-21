import { Outlet } from "react-router-dom";
import UserHeader from "../../components/Header/UserHeader";
export default function User() {

    return (
        <>

            <UserHeader />
            <Outlet />


        </>

    );
}
