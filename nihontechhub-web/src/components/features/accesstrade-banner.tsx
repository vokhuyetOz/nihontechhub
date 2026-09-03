'use client';

interface AccessTradeBannerProps {
  variant?: 'sidebar' | 'inline';
  className?: string;
}

/**
 * AccessTrade Affiliate Banner
 * Chương trình affiliate của AccessTrade (アクセストレード)
 * Sử dụng nguyên code embed từ AccessTrade
 * @see https://www.accesstrade.ne.jp/
 *
 * - variant="sidebar" → Banner dọc 160x600 (rk=01002hbe00okle)
 * - variant="inline"  → Banner ngang (rk=0100nldw00okle)
 *
 * Để bổ sung chương trình khác, tạo file tương tự:
 * - a8net-banner.tsx       → A8.net
 * - valuecommerce-banner.tsx → ValueCommerce
 * - felmat-banner.tsx      → felmat
 */
export function AccessTradeBanner({ variant = 'inline', className = '' }: AccessTradeBannerProps) {
  // Banner dọc 160x600 cho sidebar
  if (variant === 'sidebar') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <a href="https://h.accesstrade.net/sp/cc?rk=01002hbe00okle" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
          <img src="https://h.accesstrade.net/sp/rr?rk=01002hbe00okle" alt="アフィリエイトのアクセストレード" style={{ border: 0 }} />
        </a>
      </div>
    );
  }

  // Banner ngang cho inline
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <a href="https://h.accesstrade.net/sp/cc?rk=0100nldw00okle" rel="nofollow" referrerPolicy="no-referrer-when-downgrade">
        <img src="https://h.accesstrade.net/sp/rr?rk=0100nldw00okle" alt="アクセストレード パートナーサイト募集" style={{ border: 0 }} />
      </a>
    </div>
  );
}
