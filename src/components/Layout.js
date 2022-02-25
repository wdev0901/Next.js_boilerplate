import Head from "next/head";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => (
    <>
        <Head>
            <title>Next.js</title>
        </Head>
        <Navbar />
        
        {children}
    </>
);