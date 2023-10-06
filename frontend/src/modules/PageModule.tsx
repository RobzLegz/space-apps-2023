import React from "react";
import Head from "next/head";

const PageModule: React.FC<{
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
}> = ({
  children,
  title = "NASA Terminal",
  description = "NASA terminal",
  keywords = "NASA, terminal",
  ogImage = "/hero.jpg",
  ogImageAlt = "NASA terminal",
}) => {
  return (
    <main>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <meta name="og:image" content={ogImage} />
        <meta property="og:image:alt" content={ogImageAlt} />
        <meta property="twitter:image:alt" content={ogImageAlt} />
      </Head>

      <div className="w-full flex items-start justify-center max-w-[1200px]">
        {children}
      </div>
    </main>
  );
};

export default PageModule;
