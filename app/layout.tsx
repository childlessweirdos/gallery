import type { Metadata } from "next";
import { DM_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/content/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-ibm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteShell>{children}</SiteShell>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var q=new URLSearchParams(location.search);if(q.get("internal")==="1")document.cookie="cw_internal=1;path=/;max-age=31536000;samesite=lax";if(q.get("internal")==="0")document.cookie="cw_internal=;path=/;max-age=0;samesite=lax";if(document.cookie.indexOf("cw_internal=1")===-1)return;window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments);};window.gtag("set",{traffic_type:"internal"});}catch(e){}})();`,
          }}
        />
        <SiteAnalytics />
      </body>
    </html>
  );
}
