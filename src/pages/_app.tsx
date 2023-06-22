import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AlertProvider } from "@/hooks/useAlert";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider>
      <Component {...pageProps} />
    </AlertProvider>
  );
}
