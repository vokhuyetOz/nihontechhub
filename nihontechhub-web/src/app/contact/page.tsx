import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'お問い合わせ | NihonTechHub',
  description: 'NihonTechHubへのお問い合わせはこちらから。ご質問・ご指摘・修正のご依頼を承っております。',
};

export default function ContactPage() {
  const Section = ({ titleJP, titleEN, children }: { titleJP: string; titleEN: string; children: React.ReactNode }) => (
    <section className="mb-6 rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur transition-colors dark:border-gray-700 dark:bg-gray-900/60">
      <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-100">
        {titleJP}
        <span className="block text-sm text-gray-500 dark:text-gray-400">{titleEN}</span>
      </h2>
      <div className="space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">{children}</div>
    </section>
  );

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">お問い合わせ</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Contact NihonTechHub</p>
      </header>

      <Section titleJP="ご連絡方法" titleEN="How to Reach Us">
        <p>
          記事内容に関するご質問、誤りのご指摘、掲載内容の修正依頼などは、以下のメールアドレスまでご連絡ください。通常、数営業日以内にご返信いたします。
        </p>
        <p>
          Email:{' '}
          <a href="mailto:nihontechhub@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400">
            nihontechhub@gmail.com
          </a>
        </p>
        <p>
          X (Twitter):{' '}
          <a href="https://x.com/nihontechhub" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
            @nihontechhub
          </a>
        </p>
        <p className="pt-2 text-sm text-gray-500 dark:text-gray-400">
          For questions about an article, corrections, or general feedback, please email us above. We typically respond within a few business days.
        </p>
      </Section>

      <Section titleJP="編集ポリシーについて" titleEN="About Our Editorial Process">
        <p>
          当サイトの記事はAIによる要約・翻訳・統合を経て作成されています。詳しくは
          <Link href="/about" className="mx-1 text-blue-600 hover:underline dark:text-blue-400">
            NihonTechHubについて
          </Link>
          をご覧ください。
        </p>
        <p>
          Our articles are produced through AI summarization, translation, and cross-source synthesis. See{' '}
          <Link href="/about" className="text-blue-600 hover:underline dark:text-blue-400">
            About NihonTechHub
          </Link>{' '}
          for details.
        </p>
      </Section>
    </main>
  );
}
