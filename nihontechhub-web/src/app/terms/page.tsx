import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: '利用規約 | NihonTechHub',
  description: 'NihonTechHubの利用規約ページです。ご利用前に必ずお読みください。',
};

export default function TermsOfUsePage() {
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
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">利用規約</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Terms of Use</p>
      </header>

      <Section titleJP="1. 適用範囲" titleEN="Scope of Application">
        <p>本利用規約（以下「本規約」）は、NihonTechHub（以下「当サイト」）が提供するすべてのサービス（以下「本サービス」）の利用条件を定めるものです。</p>
        <p>These Terms of Use (hereinafter referred to as “Terms”) set forth the conditions for using all services provided by NihonTechHub (“the Site”).</p>
      </Section>

      <Section titleJP="2. 禁止事項" titleEN="Prohibited Actions">
        <p>当サイトの利用にあたり、以下の行為を禁止します。</p>
        <ul className="list-inside list-disc space-y-1">
          <li>法令または公序良俗に違反する行為</li>
          <li>当サイトや第三者の権利を侵害する行為</li>
          <li>サーバーやネットワークに過度な負荷をかける行為</li>
          <li>不正アクセスや情報改ざんを試みる行為</li>
        </ul>
        <p>Users must not engage in acts that violate laws, public order, infringe on the rights of the Site or others, overload the system, or attempt unauthorized access.</p>
      </Section>

      <Section titleJP="3. 免責事項" titleEN="Disclaimer">
        <p>当サイトの情報は可能な限り正確な内容を掲載しておりますが、内容の正確性・安全性を保証するものではありません。</p>
        <p>
          We strive to provide accurate information but do not guarantee the accuracy or safety of the content. The Site is not responsible for any damages caused by the use of its
          information.
        </p>
      </Section>

      <Section titleJP="4. 著作権" titleEN="Copyright">
        <p>当サイトで掲載している文章・画像・動画等の著作権は、NihonTechHubまたは正当な権利を有する第三者に帰属します。無断転載・利用を禁止します。</p>
        <p>All content including text, images, and videos are owned by NihonTechHub or rightful owners. Unauthorized reproduction or reuse is prohibited.</p>
      </Section>

      <Section titleJP="5. サービスの変更・中断・終了" titleEN="Service Changes and Termination">
        <p>当サイトは、予告なく本サービスの内容を変更、または提供を中断・終了することがあります。</p>
        <p>The Site may change, suspend, or terminate services at any time without prior notice.</p>
      </Section>

      <Section titleJP="6. リンクについて" titleEN="External Links">
        <p>当サイトからリンクされた外部サイトの内容について、当サイトは一切の責任を負いません。</p>
        <p>We are not responsible for the content of any external sites linked from this website.</p>
      </Section>

      <Section titleJP="7. 改定" titleEN="Revisions">
        <p>本規約の内容は、必要に応じて予告なく変更することがあります。変更後の利用規約は、当サイトに掲載した時点で効力を発生します。</p>
        <p>These Terms may be updated without prior notice. The revised version will take effect upon publication on this site.</p>
      </Section>

      <Section titleJP="8. 準拠法" titleEN="Governing Law">
        <p>本規約は日本法に準拠します。また、本サービスに関して紛争が生じた場合、日本の裁判所を専属的な管轄裁判所とします。</p>
        <p>These Terms shall be governed by the laws of Japan, and any disputes shall be subject to the exclusive jurisdiction of the Japanese courts.</p>
      </Section>

      <Section titleJP="9. お問い合わせ" titleEN="Contact">
        <p>
          ご不明点やご質問は、以下までお問い合わせください。
          <br />
          Email:{' '}
          <a href="mailto:nihontechhub@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400">
            nihontechhub@gmail.com
          </a>
        </p>
      </Section>

      <Section titleJP="10. 改定日" titleEN="Revision Date">
        <p>2025年10月27日</p>
        <p>Last updated: October 27, 2025</p>
      </Section>
    </main>
  );
}
