import { AppInstallBanner } from '@/components/features/app-install-banner';
import { NihonSoftwareSection } from '@/components/features/nihon-software-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className="">
      <section className="flex h-full w-full items-center bg-white dark:bg-black">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight text-primary lg:text-9xl">404</h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-primary dark:text-white md:text-4xl">Something&apos;s missing.</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page. </p>
            <Button asChild>
              <Link href="/" className="bg-primary-600 hover:bg-primary-800 dark:focus:ring-primary-900 my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium">
                Back to Homepage
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <NihonSoftwareSection />
      <div className="mt-12">
        <AppInstallBanner />
      </div>
    </div>
  );
};
export default NotFound;
