import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";
import Section1 from "../components/section1";

export default function format({ children }) {
  return (
    <>
      <Head>
        <title>BlogSite</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
