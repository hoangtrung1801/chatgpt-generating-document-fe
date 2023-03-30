import { Admin, EditGuesser, Resource, ShowGuesser, ListGuesser } from "react-admin";
// import "./App.css";
import {
    CategoryCreate,
    CategoryEdit,
    CategoryList,
} from "../components/admin/Categories";
import {
    ChatgptBriefEdit,
    ChatgptBriefList,
} from "../components/admin/ChatgptBrief";
import {
    QuestionCreate,
    QuestionEdit,
    QuestionList,
} from "../components/admin/Questions";
import dataProvider from "../utils/dataProvider";

// const dataProvider = dataJsonServer("http://localhost:3000/api");

function AdminPage() {
    return (
        <Admin dataProvider={dataProvider}>
            {/* <Resource name="categories" list={ListGuesser} edit={EditGuesser} /> */}
            <Resource
                name="categories"
                list={CategoryList}
                edit={EditGuesser}
                create={CategoryCreate}
                show={ShowGuesser}
                recordRepresentation="name"
            />
            <Resource
                name="questions"
                list={QuestionList}
                edit={QuestionEdit}
                create={QuestionCreate}
                recordRepresentation="name"
            />
            <Resource
                name="chatgpt/briefs"
                list={ChatgptBriefList}
                edit={ChatgptBriefEdit}
            />
        </Admin>
    );
}

export default AdminPage;
