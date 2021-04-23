import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Page Title</title>
      </Head>

      <main >
        <div id="root"></div>
        <script src="./firbasetest.js"></script>
      </main>
    </div>
  );
}
