import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | NihonTechHub',
  description: 'NihonTechHubのプライバシーポリシー。Google Analyticsや個人情報保護に関する詳細。',
};

export default function PrivacyPolicyPage() {
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
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">プライバシーポリシー</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Privacy Policy of NihonTechHub</p>
      </header>

      <Section titleJP="1. 個人情報の利用目的" titleEN="Purpose of Using Personal Information">
        <p>
          当サイト（NihonTechHub）では、お問い合わせやコメントの際に名前やメールアドレス等の個人情報を入力いただく場合があります。
          これらの個人情報は、質問への回答や必要な情報を電子メールでご連絡するために使用し、それ以外の目的では利用しません。
        </p>
        <p>
          We may ask you to enter personal information such as your name or email address when you contact us. The information will be used only for responding to inquiries and
          will not be used for any other purpose.
        </p>
      </Section>

      <Section titleJP="2. アクセス解析ツールについて" titleEN="About Analytics Tools">
        <p>当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。</p>
        <p>
          This site uses Google Analytics to analyze traffic. Google Analytics uses cookies to collect anonymous data. You can refuse the collection by disabling cookies in your
          browser settings.
        </p>
      </Section>

      <Section titleJP="3. 個人情報の第三者への開示" titleEN="Disclosure to Third Parties">
        <p>当サイトは、法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供することはありません。</p>
        <p>We will not disclose personal information to third parties without consent unless required by law.</p>
      </Section>

      <Section titleJP="4. 免責事項" titleEN="Disclaimer">
        <p>当サイトに掲載する情報は正確な内容を心がけていますが、誤情報や情報の古さにより生じた損害等については一切の責任を負いかねます。</p>
        <p>While we strive for accuracy, we are not responsible for any damages caused by errors or outdated information.</p>
      </Section>

      <Section titleJP="5. 著作権" titleEN="Copyright">
        <p>当サイトの文章・画像・デザイン等の著作権はNihonTechHubに帰属します。無断転載・使用を禁止します。</p>
        <p>All contents on this site are copyrighted by NihonTechHub. Unauthorized reproduction is prohibited.</p>
      </Section>

      <Section titleJP="6. お問い合わせ" titleEN="Contact">
        <p>
          ご意見・ご質問は以下までご連絡ください。
          <br />
          Email:{' '}
          <a href="mailto:nihontechhub@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400">
            nihontechhub@gmail.com
          </a>
        </p>
      </Section>

      <Section titleJP="7. 改定日" titleEN="Revision Date">
        <p>2025年10月27日</p>
        <p>Last updated: October 27, 2025</p>
      </Section>
    </main>
  );
}
