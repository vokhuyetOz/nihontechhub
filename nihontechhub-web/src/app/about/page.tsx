import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'NihonTechHubについて | About',
  description: 'NihonTechHubはAIが複数の情報源を横断的に分析し、最新テクノロジーニュースを厳選してお届けするメディアです。',
};

export default function AboutPage() {
  const Section = ({ titleJP, titleEN, children }: { titleJP: string; titleEN: string; children: React.ReactNode }) => (
    <section className="mb-6 rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm backdrop-blur transition-colors dark:border-gray-700 dark:bg-gray-900/60">
      <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-gray-100">
        {titleJP}
        <span className="block text-sm text-gray-500 dark:text-gray-400">{titleEN}</span>
      </h2>
      <div className="space-y-2 leading-relaxed text-gray-700 dark:text-gray-300">{children}</div>
    </section>
  );

  const sources = [
    { name: 'TechCrunch（テッククランチ）', href: '/category/techcrunch' },
    { name: 'Google（9to5Google）', href: '/category/9to5google' },
    { name: 'Apple（9to5Mac）', href: '/category/9to5mac' },
    { name: 'おすすめAIツール', href: '/category/bestlistai' },
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">NihonTechHubについて</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">About NihonTechHub</p>
      </header>

      <Section titleJP="サイトについて" titleEN="About This Site">
        <p>
          NihonTechHubは、最新のテクノロジーニュース、インサイト、トレンドをお届けする信頼の情報源です。TechCrunch、9to5Mac、9to5Googleをはじめとする海外の主要テックメディアと、AIツールの最新情報を継続的に追跡しています。
        </p>
        <p>
          NihonTechHub is your trusted source for the latest technology news, insights, and trends — continuously tracking major outlets like TechCrunch, 9to5Mac, and 9to5Google, along with the latest in AI tools.
        </p>
      </Section>

      <Section titleJP="AIキュレーションについて" titleEN="About Our AI Curation">
        <p>
          記事本文はAIが原文を要約・翻訳して作成しています。「AI厳選ハイライト」および「テックタイムライン」では、複数の情報源にまたがる関連ニュースをAIが横断的に分析し、一つの時系列サマリーへと統合しています。いずれの記事にも、元となった情報源への出典リンクを明記しています。
        </p>
        <p>
          Article bodies are AI-summarized and translated from original source reporting. Our AI Highlights and Tech Timeline sections go further — cross-referencing related coverage across multiple outlets into a single, verified summary. Every synthesized piece links back to its original sources.
        </p>
      </Section>

      <Section titleJP="追跡している情報源" titleEN="Sources We Track">
        <ul className="list-inside list-disc space-y-1">
          {sources.map((source) => (
            <li key={source.href}>
              <Link href={source.href} className="text-blue-600 hover:underline dark:text-blue-400">
                {source.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section titleJP="お問い合わせ" titleEN="Contact">
        <p>
          ご質問・ご指摘・修正のご依頼は
          <Link href="/contact" className="mx-1 text-blue-600 hover:underline dark:text-blue-400">
            お問い合わせページ
          </Link>
          よりご連絡ください。
        </p>
        <p>
          For questions, corrections, or feedback, please reach out via our{' '}
          <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
            Contact page
          </Link>
          .
        </p>
      </Section>
    </main>
  );
}
