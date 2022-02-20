import "../styles/styles.scss";
import { AuthProvider } from "../context/AuthContext";
import NextProgress from "next-progress";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NextProgress />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
