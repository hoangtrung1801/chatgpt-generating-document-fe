import dynamic from "next/dynamic";
import { NextPage } from "next";
const ResultEditor = dynamic(import("../result/index"), { ssr: false });

const Result: NextPage = () => {
    return <ResultEditor />;
};
export default Result;
