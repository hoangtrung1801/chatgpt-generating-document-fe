// import App from "../admin/App";

import { NextPage } from "next";
import dynamic from "next/dynamic";

const App = dynamic(() => import("../admin/index"), { ssr: false });

const AdminPage: NextPage = () => {
    return <App />;
};

export default AdminPage;
