import dynamic from "next/dynamic";
import { NextPage } from "next";
const ResultEditor = dynamic(import("../result/index"), { ssr: false });

const Result: NextPage = () => {
    return (
        <div>
            <h1>Hello</h1>
            <ResultEditor />;
        </div>
    );
};
export default Result;
