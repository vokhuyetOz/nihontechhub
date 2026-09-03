import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getSupportedLanguage } from '@/modules/i18n';
import { Smartphone, Download, Zap, Bell, TrendingUp } from 'lucide-react';

export function AppInstallBanner() {
  const Strings = getSupportedLanguage();
  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent to-secondary">
      <div className="flex flex-col items-center gap-6 p-6 md:flex-row md:p-8">
        {/* Left: Icon and Text */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <div className="rounded-full bg-gradient-to-br from-primary to-primary/80 p-3">
              <Smartphone className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-2xl font-bold text-transparent">{Strings.downloadApp}</h3>
          </div>

          <p className="max-w-xl leading-relaxed text-muted-foreground">{Strings.appInstallBanner}</p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-1.5">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{Strings.realTimeUpdates}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-1.5">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{Strings.pushNotifications}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-1.5">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{Strings.personalizedNewsFeeds}</span>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <a href="https://play.google.com/store/apps/details?id=com.nihontechhub&pcampaignid=web_share" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="w-full rounded-full border-0 bg-primary px-6 py-6 text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-xl sm:w-auto"
              >
                <Download className="mr-2 h-5 w-5" />
                {Strings.downloadAppOnGooglePlay}
              </Button>
            </a>
            <a href="https://apps.apple.com/us/app/nihontechhub/id6755095185" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full border-2 border-primary bg-transparent px-6 py-6 text-primary shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:shadow-xl sm:w-auto"
              >
                <Download className="mr-2 h-5 w-5" />
                {Strings.downloadAppOnAppStore}
              </Button>
            </a>
          </div>
        </div>

        {/* Right: Phone Mockup */}
        <div className="relative flex-shrink-0">
          <div className="relative h-64 w-48 rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-1 shadow-2xl">
            <div className="h-full w-full overflow-hidden rounded-[22px] bg-card">
              {/* Phone Screen Content */}
              <div className="h-full space-y-3 bg-gradient-to-br from-primary/5 to-accent p-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span className="text-sm font-bold text-foreground">NihonTechHub</span>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-lg border border-border bg-card p-2 shadow-sm">
                      <div className="mb-1 h-2 w-3/4 rounded bg-primary/30"></div>
                      <div className="h-2 w-full rounded bg-muted"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Floating badge */}
          <div className="absolute -right-2 -top-2 animate-pulse rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground shadow-lg">{Strings.free}</div>
        </div>
      </div>
    </Card>
  );
}
