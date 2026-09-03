import { AppFCM } from '@/components/custom';
import OrganizationJsonLd from '@/components/custom/app-seo/organization-jsonld';
import { Footer, Header } from '@/components/features';
import { I18nProvider } from '@/modules/i18n';
import { QueryProvider } from '@/modules/queries';
import '@/modules/styles/app.css';
import '@/modules/styles/tailwind.css';
import { ThemeProvider } from '@/modules/theme';
import { TComponentChildrenProps } from '@/modules/types';
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Nihontech Hub - Technology News & Insights',
  description: 'Stay updated with the latest technology news, insights, and trends.',
  keywords: 'technology, news, tech, AI, software, hardware',
};

const roboto = Roboto({
  subsets: ['latin'],
  // weight: ['100', '300', '400', '500', '700', '900'],
});

export default async function RootLayout({ children }: TComponentChildrenProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="G-NKLPH0LXPW" />
      <head>
        <meta name="yandex-verification" content="f6cd430b5c1c8a8a" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <link rel="alternate" type="application/rss+xml" title="nihontechhub" href="https://api.nihontechhub.com/api/sitemap/rss.xml" />
        <OrganizationJsonLd />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <NextTopLoader color="#295ed9" showSpinner={false} />
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID! as string}>
          <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
            <I18nProvider>
              <QueryProvider>
                <div className="min-h-screen bg-background">
                  <Header />
                  <main className="container mx-auto px-4 py-8">{children}</main>
                  <Footer />
                </div>
              </QueryProvider>
            </I18nProvider>
            <Toaster position="top-right" />
          </ThemeProvider>
          <AppFCM />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
