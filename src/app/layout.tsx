import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miami Executive Roundtable | Express Analytics",
  description:
    "A private, off-the-record roundtable for senior Data, AI and Marketing leaders. Twelve seats at COTE Miami. October 2026.",
  keywords: [
    "Miami executive roundtable",
    "Express Analytics",
    "AI roundtable Miami",
    "enterprise AI dinner",
    "COTE Miami",
    "invitation-only executive dinner",
    "data and AI leaders",
  ],
  icons: {
    icon: [
      {
        url: "/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/logos/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/logos/favicon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
    apple:
      "/sites/www-growthforia-com-b1cbb1ee/root-8a5edab2/logos/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${inter.className} min-h-full bg-gf-bg text-white`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5P5JDKHG"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}var c='denied';try{if(localStorage.getItem('gf-cookie')==='granted')c='granted'}catch(e){}gtag('consent','default',{ad_storage:c,ad_user_data:c,ad_personalization:c,analytics_storage:c,wait_for_update:500});`}
        </Script>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5P5JDKHG');`}
        </Script>
      </body>
    </html>
  );
}




