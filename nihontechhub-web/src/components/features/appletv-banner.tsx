'use client';

interface AppleTvBannerProps {
  className?: string;
}

/**
 * Apple TV+ Affiliate Banner
 * Chương trình affiliate của AccessTrade (アクセストレード) cho Apple TV+
 * Kích thước:
 * - Desktop: 728x90 (rk=0100q42g00okle)
 * - Mobile: 300x250 (rk=0100q42f00okle)
 */
export function AppleTvBanner({ className = '' }: AppleTvBannerProps) {
  return (
    <div className={`my-4 flex flex-col items-center justify-center ${className}`}>
      {/* Banner ngang 728x90 cho Desktop */}
      <div className="hidden md:block">
        <a href="https://h.accesstrade.net/sp/cc?rk=0100q42g00okle" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
          <img src="https://h.accesstrade.net/sp/rr?rk=0100q42g00okle" alt="Apple TV+" style={{ border: 0 }} />
        </a>
      </div>

      {/* Banner vuông 300x250 cho Mobile */}
      <div className="block md:hidden">
        <a href="https://h.accesstrade.net/sp/cc?rk=0100q42f00okle" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
          <img src="https://h.accesstrade.net/sp/rr?rk=0100q42f00okle" alt="Apple TV+" style={{ border: 0 }} />
        </a>
      </div>
    </div>
  );
}
