import Layout from "../components/layout/Layout";
import Head from "../components/layout/Head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <Layout page="home">
      <Head />
      <h1>Well, start building you lazy-ass 🔨</h1>
      <Link href="/testpage">Testpage</Link>
    </Layout>
  );
}
