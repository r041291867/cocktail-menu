import { Annie_Use_Your_Telescope } from "next/font/google";
import localFont from "next/font/local";

export const metadata = {
  title: "The Mixology Nook",
  description:
    "Welcome to The Mixology Nook, your destination for all things home bar! Cheers to creating unforgettable moments, one drink at a time!",
};

const handwriteEn = Annie_Use_Your_Telescope({
  subsets: ["latin"],
  weight: "400",
  variable: "--handwrite-en",
  display: "swap",
});

const handwriteCh = localFont({
  src: "./../../public/fonts/851tegaki_zatsu_normal_0883.ttf",
  variable: "--handwrite-ch",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${handwriteEn.variable} ${handwriteCh.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
