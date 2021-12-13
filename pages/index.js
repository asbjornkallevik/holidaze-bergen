import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <Layout page="home">
      <Head />
      <h1>Holidaze</h1>
      <div className="testBox"></div>
      <div className="testBox2 alignshort"></div>
    </Layout>
  );
}
