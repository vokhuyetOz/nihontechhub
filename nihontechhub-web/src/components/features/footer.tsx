import { Button } from '@/components/ui/button';
import { NewsAPI } from '@/modules/api/news';
import { NewssourceAPI } from '@/modules/api/newssource';
import { getSupportedLanguage } from '@/modules/i18n';
import { Mail, X } from 'lucide-react';
import Link from 'next/link';

export async function Footer() {
  const Strings = getSupportedLanguage();

  let categories = [
    { name: Strings.home, href: '/' },
    { name: 'TechCrunch（テッククランチ）', href: '/category/techcrunch' },
    { name: 'Google（グーグル）', href: '/category/9to5google' },
    { name: 'Apple（アップル）', href: '/category/9to5mac' },
  ];
  const sources = await NewssourceAPI.list();
  if (sources?.length) {
    categories = sources.map((item) => ({ name: item.label, href: `/category/${item.value}` }));
    categories.unshift({ name: Strings.home, href: '/' });
  }

  const fallbackTags = ['AI', 'Machine Learning', 'iOS', 'Android', 'Google'];
  const recentPosts = await NewsAPI.recent();
  const tagFrequency = new Map<string, number>();
  recentPosts?.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagFrequency.set(tag, (tagFrequency.get(tag) ?? 0) + 1);
    });
  });
  const trendingTags = Array.from(tagFrequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag]) => tag);
  const tags = trendingTags.length > 0 ? trendingTags : fallbackTags;

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">TS</div>
              <span className="text-xl font-bold">NihonTechHub</span>
            </div>
            <p className="text-sm text-muted-foreground">{Strings.footerDes}</p>
            <div className="flex space-x-2">
              <Link rel="noopener noreferrer" target="_blank" href="https://x.com/nihontechhub" className="text-sm text-muted-foreground hover:text-foreground">
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nihontechhub@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            nihontechhub@gmail.com
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{Strings.categories}</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{Strings.popularTags}</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag.toLowerCase().replace(' ', '-')}`} className="rounded-md bg-muted px-2 py-1 text-xs transition-colors hover:bg-muted/80">
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{Strings.newsletter}</h3>
            <p className="text-sm text-muted-foreground">{Strings.footerSub}</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href="https://play.google.com/store/apps/details?id=com.nihontechhub&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              📱 {Strings.downloadOnAndroid}
            </Link>
            <Link
              href="https://apps.apple.com/us/app/nihontechhub/id6755095185"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              🍎 {Strings.downloadOnIOS}
            </Link>
            {/* <Link
              href="https://drivedownloader.nihontechhub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              🛠️ {Strings.software}
            </Link> */}
          </div>
        </div>
        {/* </CHANGE> */}

        <div className="mt-8 flex flex-col items-center justify-between border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} NihonTechHub. All rights reserved.</p>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              {Strings.about}
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              {Strings.contactUs}
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              {Strings.terms}
            </Link>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">
              {Strings.privacyPolicy}
            </Link>
            <Link href="https://api.nihontechhub.com/api/sitemap/sitemap.xml" className="text-sm text-muted-foreground hover:text-foreground">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
