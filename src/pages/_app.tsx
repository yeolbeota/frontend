import "@/styles/globals.css";
import "@/styles/fonts.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useUserInfo } from "@/hooks/useUserData";
import Guard from "@/components/Guard";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const whiteList = ["/login", "/logout"];

  return (
    <QueryClientProvider client={queryClient}>
      {whiteList.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <Guard>
          <Component {...pageProps} />
        </Guard>
      )}
    </QueryClientProvider>
  );
}
