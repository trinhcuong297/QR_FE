import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Meta = ({ title, description, canonical }) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <meta charSet="UTF-8" key="charset" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                    key="viewport"
                />
                <link
                    rel="apple-touch-icon"
                    href={`${router.basePath}/vvc_logo.png`}
                    key="apple"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href={`${router.basePath}/vvc_logo.png`}
                    key="icon32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href={`${router.basePath}/vvc_logo.png`}
                    key="icon16"
                />
                <link
                    rel="icon"
                    href={`${router.basePath}/vvc_logo.ico`}
                    key="favicon"
                />
            </Head>
            <NextSeo
                title={title}
                description={description}
                canonical={canonical}
                openGraph={{
                    title: title,
                    description: description,
                    url: canonical,
                    locale: "vn",
                    site_name: "VVC Green",
                }}
            />
        </>
    );
};

export { Meta };