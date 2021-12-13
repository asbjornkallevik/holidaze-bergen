import NextHead from "next/head";

function Head({ title }) {
  return (
    <NextHead>
      <title>
        {title}
        {title ? " | " : ""}Holidaze
      </title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Find your perfect stay in bergen."
      ></meta>
    </NextHead>
  );
}

Head.defaultProps = {
  title: "",
};
export default Head;
