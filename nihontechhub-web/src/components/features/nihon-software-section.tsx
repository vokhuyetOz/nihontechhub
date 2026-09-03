'use client';

import { useAppLanguage } from '@/modules/hooks/use-app-language';

export function NihonSoftwareSection() {
  const { Strings } = useAppLanguage();
  return (
    <section className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-background to-muted/30 p-4 shadow-lg sm:p-6 md:p-8">
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4 text-center sm:mb-6">
          <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">{Strings.nihonTechHubSoftware}</h2>
          <p className="text-sm text-muted-foreground sm:text-base">{Strings.softwareDescription}</p>
        </div>

        <div className="group block">
          <div className="relative overflow-hidden rounded-lg border border-border bg-card p-4 shadow-md sm:p-6">
            {/* Icon */}
            <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary shadow-md sm:h-14 sm:w-14">
                <svg className="h-6 w-6 text-primary-foreground sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-lg font-bold text-foreground sm:whitespace-normal sm:text-xl">{Strings.driveDownloader}</h3>
                <p className="text-xs text-muted-foreground sm:text-sm">{Strings.downloadDescription}</p>
              </div>
            </div>

            {/* Description */}
            <p className="mb-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">{Strings.downloadDescriptionLong}</p>

            <div className="mb-4 grid grid-cols-2 gap-2 sm:gap-3">
              <div className="rounded-md border border-border bg-muted/50 p-2 text-center sm:p-3">
                <div className="mb-1 text-xs font-semibold text-primary">PDF</div>
                <div className="text-[10px] text-muted-foreground sm:text-xs">{Strings.supportedFormat}</div>
              </div>
              <div className="rounded-md border border-border bg-muted/50 p-2 text-center sm:p-3">
                <div className="mb-1 text-xs font-semibold text-primary">Docx</div>
                <div className="text-[10px] text-muted-foreground sm:text-xs">{Strings.supportedFormat}</div>
              </div>
            </div>
            {/* </CHANGE> */}

            <div className="space-y-3">
              <p className="text-center text-xs text-muted-foreground">{Strings.alsoAvailableInApp}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://play.google.com/store/apps/details?id=com.nihontechhub&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  {Strings.downloadAppOnGooglePlay}
                </a>
                <a
                  href="https://apps.apple.com/us/app/nihontechhub/id6755095185"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-primary px-4 py-3 text-sm font-medium text-primary shadow-md transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  {Strings.downloadAppOnAppStore}
                </a>
              </div>
            </div>
            {/* </CHANGE> */}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 sm:mt-6">
          <div className="text-center text-[10px] text-muted-foreground sm:text-xs">
            <span className="inline-flex items-center gap-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {Strings.availableFree}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
