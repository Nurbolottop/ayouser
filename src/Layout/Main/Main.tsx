import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
export default function Main() {

    return (
        <>

            <Header />
            <Outlet />


        </>

    );
}
