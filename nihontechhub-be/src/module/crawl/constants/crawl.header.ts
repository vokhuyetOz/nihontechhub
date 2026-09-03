export const techsumaiHeader = {
  accept: 'application/json, text/plain, /',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  priority: 'u=1, i',
  'sec-ch-ua':
    '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'cross-site',
  Referer: 'https://www.techsum.ai/',
};

export const techcrunchHeader = {
  accept: '*/*',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  'content-type': 'text/plain;charset=UTF-8',
  pragma: 'no-cache',
  priority: 'u=1, i',
  'sec-ch-ua':
    '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  cookie:
    '_gcl_au=1.1.1352462648.1750827687; _ga=GA1.1.146699424.1750827687; hubspotutk=8ddcf7307e2bf7f2e52ce10259a39e15; __hssrc=1; _parsely_session={%22sid%22:3%2C%22surl%22:%22https://techcrunch.com/latest/%22%2C%22sref%22:%22https://www.google.com/%22%2C%22sts%22:1750835583636%2C%22slts%22:1750830174668}; _parsely_visitor={%22id%22:%22pid=171f3623-6610-4e83-9a24-ad75de02c89c%22%2C%22session_count%22:3%2C%22last_session_ts%22:1750835583636}; __hstc=16024617.8ddcf7307e2bf7f2e52ce10259a39e15.1750827687903.1750830175692.1750835584749.3; sailthru_pageviews=5; __hssc=16024617.5.1750835584749; sailthru_content=307ab9190988e16f56f3e028e3237a90a1318fba4435107e454e07b40ffb07ec31e16f7e7f81fad73acf6b742f31adfe6bdef77567c1e02b7b5fc9d418add86393c17a169620e1e444772ecd46acec6f; sailthru_visitor=87f05662-2023-41ad-a754-05b69f77d3d1; _ga_KJR3C2ZQN6=GS2.1.s1750835583$o3$g1$t1750835876$j34$l0$h0',
  Referer: 'https://techcrunch.com/latest/',
  'Referrer-Policy': 'no-referrer-when-downgrade',
};

export const techcrunchDetailHeader = (link: string) => {
  return {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    priority: 'u=1, i',
    'sec-ch-ua':
      '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    cookie:
      '_gcl_au=1.1.1352462648.1750827687; _ga=GA1.1.146699424.1750827687; hubspotutk=8ddcf7307e2bf7f2e52ce10259a39e15; __hssrc=1; _parsely_session={%22sid%22:5%2C%22surl%22:%22https://techcrunch.com/latest/%22%2C%22sref%22:%22https://techcrunch.com/latest/%22%2C%22sts%22:1750845018154%2C%22slts%22:1750838547672}; _parsely_visitor={%22id%22:%22pid=171f3623-6610-4e83-9a24-ad75de02c89c%22%2C%22session_count%22:5%2C%22last_session_ts%22:1750845018154}; sailthru_pageviews=1; sailthru_content=307ab9190988e16f56f3e028e3237a90a1318fba4435107e454e07b40ffb07ec31e16f7e7f81fad73acf6b742f31adfe93c17a169620e1e444772ecd46acec6fe7aef87920fc249b021ece325637372ff1ed5cb6a8a338b30e24053f202c0156beb3f357565c6c775963fe2c2500ef056bdef77567c1e02b7b5fc9d418add863; sailthru_visitor=87f05662-2023-41ad-a754-05b69f77d3d1; __hstc=16024617.8ddcf7307e2bf7f2e52ce10259a39e15.1750827687903.1750845020812.1750848042829.5; __hssc=16024617.1.1750848042829; _parsely_slot_click={%22url%22:%22https://techcrunch.com/latest/%22%2C%22x%22:4%2C%22y%22:330%2C%22xpath%22:%22//*[@id=%5C%22wp--skip-link--target%5C%22]/div[2]/div[1]/div[1]/div[1]/ul[1]/li[1]/div[1]/h3[1]/a[1]%22%2C%22href%22:%22https://techcrunch.com/2025/06/24/how-synthflow-ai-is-cutting-through-the-noise-in-a-loud-ai-voice-category/%22}; _ga_KJR3C2ZQN6=GS2.1.s1750848040$o5$g1$t1750848328$j59$l0$h0',
    Referer: link,
    'Referrer-Policy': 'no-referrer-when-downgrade',
  };
};

export const nineto5googleHeader = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  priority: 'u=0, i',
  'sec-ch-ua':
    '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'none',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  cookie:
    '_gcl_au=1.1.1352462648.1750827687; _ga=GA1.1.146699424.1750827687; hubspotutk=8ddcf7307e2bf7f2e52ce10259a39e15; __hssrc=1; _parsely_visitor={%22id%22:%22pid=171f3623-6610-4e83-9a24-ad75de02c89c%22%2C%22session_count%22:13%2C%22last_session_ts%22:1751078700906}; __hstc=16024617.8ddcf7307e2bf7f2e52ce10259a39e15.1750827687903.1750992239198.1751078702209.12; _parsely_slot_click={%22url%22:%22https://techcrunch.com/latest/page/2/%22%2C%22x%22:375%2C%22y%22:2937%2C%22xpath%22:%22//*[@id=%5C%22wp--skip-link--target%5C%22]/div[2]/div[1]/div[1]/nav[1]/a[2]%22%2C%22href%22:%22https://techcrunch.com/latest/page/3/%22}; sailthru_content=a1318fba4435107e454e07b40ffb07ec31e16f7e7f81fad73acf6b742f31adfe93c17a169620e1e444772ecd46acec6ff1ed5cb6a8a338b30e24053f202c0156beb3f357565c6c775963fe2c2500ef05e7aef87920fc249b021ece325637372fb4a115b80cd7d5eb68b65fd95f312197c2ee7a53f4ab6c71fc43cdc1ae7a21a7d6ee310229f445a2252edec3fac7b367d6a5ab2111a9069ed970bed9400bd5ca307ab9190988e16f56f3e028e3237a90dd369697c8d0cd53802a792d99ca17cc6bdef77567c1e02b7b5fc9d418add863e53b6ca478ae4d6b1752d8328e5043fb2d7b2c72f00dd7c787bd871d193b6fa400fdfe69f3c4b074ba15c2bc497859ef; sailthru_visitor=87f05662-2023-41ad-a754-05b69f77d3d1; _ga_KJR3C2ZQN6=GS2.1.s1751078700$o11$g1$t1751080592$j37$l0$h0',
};

export const nineto5googleDetailHeader = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  priority: 'u=0, i',
  'sec-ch-ua':
    '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'none',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  cookie:
    'test; _sharedid=18375d3e-6b3a-4122-b0c3-a3f75fe2ac64; __qca=P1-cfa7fe30-23c6-4b51-87ba-26931e52d832; _cc_id=3a57e1cd9d0ceee1329e92f9ffaca66f; panoramaId_expiry=1751524854152; panoramaId=bdd9f4acf3e68b3ba6097d7bc1a84945a7028aedf0c199cca6b2dabc55a68dc5; panoramaIdType=panoIndiv; _sharedid_cst=VyxHLMwsHQ%3D%3D; FCNEC=%5B%5B%22AKsRol8wa46repCQJN8D5Lf6AbnZw3z4lpEwxGqWHWTFpJCPqq-0spMLUG_e7DLR_N9dTBja8HAsTrAevhphknYT7f2Xi04mfEquciHFGUzGw6yeRibdgM9-MJXiTaw8s_NmWsJ_h0uDoPbl9GIVSaU0LtH35TvFVQ%3D%3D%22%5D%5D; cto_bundle=BqH5jF9VRkJJRkJ6Q3M4OVglMkJ3MldzTUlEYk1EbUtFV01aJTJCUEwyUGZjNTJ4ZnFSWTVBRXRSdTRXNjNXa2NLNXhGb0p2djZDT21aM2NmJTJCSHdhYWR0V1dpbTJzMiUyQmJpYTY0NkQ0akxzVFVkaERxbnZyenhRd1A1Ym4xRkFHOGhZcmx2YUl2cWNtOW4lMkJ4ZXBPQlVkODBhWlIyRDcxbWo4ZTJra2c1c1JSM0xNREx6RUNZJTNE; cto_bidid=DaSQvF9tU3ppdjVJUW0wbWVQSXNSbjJzMzk5em9ZdGVjN1lNVGt5aGhsU2t4U21LVlNuJTJGN2EzQzNidnh2Sks2dnVmZ1BWc3JhWmYzd0V6Q09VZEt0b24lMkJGODNkVFAlMkY4UWNyOHJ2amVLakZMUEd3NHRXMHZNcWxZdXhrRXRIemh0ZU9taQ; __gads=ID=7ca5372a39d8646c:T=1750918599:RT=1750920368:S=ALNI_MaVuR2w3vQHejXg0JbF3bdFLfVeZQ; __gpi=UID=00001139e4ef589b:T=1750918599:RT=1750920368:S=ALNI_MY3LKYhEFKWrRJizoCM5IM8kFr1CA; __eoi=ID=d078bb0b826b5b16:T=1750918599:RT=1750920368:S=AA-AfjbwSTxJxddjkKWVxyTSKhje; _ga=GA1.2.1198936471.1750918523; _parsely_visitor={%22id%22:%22pid=70bde768-e0c2-4849-88f2-a7d2d2a4de4e%22%2C%22session_count%22:4%2C%22last_session_ts%22:1751079206056}; _ga_D2FJXCHD85=GS2.1.s1751079206$o2$g0$t1751079206$j60$l0$h0',
};

export const bestlistaiHeader = {
  accept: '*/*',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
  'content-type': 'application/json',
  pragma: 'no-cache',
  priority: 'u=1, i',
  'sec-ch-ua':
    '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'trpc-accept': 'application/jsonl',
  'x-trpc-source': 'react',
  cookie:
    '_ga=GA1.1.550068522.1751266559; __Host-next-auth.csrf-token=c65b01de520053013a110ce78ade431a846741f82ff9bad48233361a60575e04%7C31a5af80ebcb578231e2accbe325aecedf970c3ab564c4ffd567632d1d600ba5; __Secure-next-auth.callback-url=https%3A%2F%2Fbestlist.ai; _ga_DXGT8ETS1X=GS2.1.s1751271596$o2$g1$t1751275786$j37$l0$h0',
  Referer: 'https://bestlist.ai/',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};
export const PromptNewsForJapanese = ({ title, content }) => {
  return [
    {
      role: 'system',
      content: `You are a professional Japanese journalist writing in the formal, objective style used by NHK. Translate and rewrite the article below into fluent, respectful Japanese, ensuring it follows the editorial standards of Japanese news reporting.

Follow these rules:

1. Write a リード文 (introductory paragraph) that summarizes the main point. Use 「〜したと発表しました」 instead of 「〜しました」 to reflect objectivity.
2. Use neutral expressions. For example, say 「インド政府」 instead of “New Delhi”.
3. Break up long sentences into shorter, clearer ones.
4. Clearly state corporate strategies and policy directions, such as goals for tech self-sufficiency.
5. Use objective reporting phrases like 「〜ということです」「〜としています」「〜方針です」.
6. Convert all monetary amounts (e.g. USD, EUR) into Japanese yen (JPY), and include the yen equivalent in parentheses. Use the approximate exchange rate:  
   - 1 USD ≈ 155 JPY  
   - 1 EUR ≈ 165 JPY  
   (Round to the nearest hundred million yen or appropriate unit.)
7. Make paragraph breaks clear and easy to read.
8. Avoid casual or overly technical language.

Also, generate:
- title_ja: concise, SEO-optimized Japanese headline
- summary_ja: 1–2 sentence objective meta description
- article_ja: full article rewritten in NHK-style Japanese
- keywords_ja: 5–10 SEO-relevant keywords in Japanese
- slug_ja: - Create a short, SEO-friendly slug in Japanese using kanji/kana, connected by hyphens. Avoid using romaji or punctuation. Example: メタ-AI-著作権-訴訟勝訴

Return everything in this JSON format:

{
  "title_ja": "...",
  "summary_ja": "...",
  "article_ja": "...",
  "keywords_ja": ["...", "..."],
  "slug_ja": "..."
}
`,
    },
    {
      role: 'user',
      content: `The original English title is:
  "${title}"
  
  The article content is:
  ${content}`,
    },
  ];
};
export const PromptTechsumAIForJapanese = ({ title, content }) => {
  return `
You are a Japanese news editor at NHK, specializing in technology. 
Translate and edit the following English news article into Japanese according to NHK’s style guide.

Rules:
1. Use a formal, neutral, and objective tone. 
2. Use neutral expressions. For example, say 「インド政府」 instead of “New Delhi”.
3. Break up long sentences into shorter, clearer ones.
4. Clearly state corporate strategies and policy directions, such as goals for tech self-sufficiency.
5. Use objective reporting phrases like 「〜ということです」「〜としています」「〜方針です」.
6. Convert all monetary amounts (USD, EUR, etc.) into Japanese yen (JPY).  
   - 1 USD ≈ 155 JPY  
   - 1 EUR ≈ 165 JPY  
   - Round to the nearest hundred million yen or appropriate unit.  
   Example: 2.5 billion USD → 約3,8800億円.
7. Make paragraph breaks clear and easy to read.
8. Avoid casual or overly technical language. Write in a way that is understandable for a general Japanese audience interested in technology.
9. The headline should be concise and emphasize the core technology aspect.
10. The news body should reflect the full information of the English source. Do not shorten excessively. 
    The Japanese text does not need to be exactly 200 words, but its length should reasonably match the English article length.

Additionally, generate SEO metadata:
- "title_ja": concise, SEO-optimized Japanese headline
- "article_ja": full article rewritten in NHK-style Japanese
- "keywords_ja": 5–10 SEO-relevant keywords in Japanese
- "slug_ja": Create a short, SEO-friendly slug in Japanese using kanji/kana, connected by hyphens. Avoid romaji or punctuation. 
  Example: メタ-AI-著作権-訴訟勝訴

Source data:

[Title]
${title}

[Content]
${content}

Output ONLY in the following JSON format:

{
  "title_ja": "...",
  "article_ja": "...",
  "keywords_ja": ["...", "..."],
  "slug_ja": "..."
}
`;
};
export const PromptNewsForIndo = ({ title, content }) => {
  return [
    {
      role: 'system',
      content: `
      You are a professional Indonesian journalist writing in a formal, objective style similar to Kompas or Tempo. 
      Translate and rewrite the article below into fluent, respectful Bahasa Indonesia, following the editorial standards of Indonesian news reporting.

      Follow these rules strictly:
      1. Start with a **lead paragraph (paragraf pembuka)** that objectively summarizes the main point of the article. Use neutral verbs such as "mengumumkan", "menyatakan", "menjelaskan", rather than casual ones like "meluncurkan" or "memperkenalkan".
      2. Use **formal Indonesian**. Avoid colloquial expressions and English borrowings where unnecessary.
      3. Split long sentences into **shorter, clear segments**. Ensure every paragraph focuses on one idea.
      4. Clearly explain **strategies, government policies, business goals**, or statements using phrases such as "menargetkan", "bertujuan untuk", "dijadwalkan", "berencana", "menurut pihak perusahaan".
      5. Use **objective phrasing** like: "menurut pemerintah", "dijelaskan oleh", "pihak perusahaan menyatakan", "berdasarkan laporan", etc.
      6. Convert all monetary amounts (USD, EUR) into **Indonesian Rupiah (IDR)**. Use this approximation:  
        - 1 USD ≈ 16,000 IDR
        - 1 EUR ≈ 17,500 IDR
        Round to the nearest **billion rupiah** or relevant unit. Example: "3 billion USD (sekitar Rp48 triliun)"
      7. Insert **paragraph breaks** every 2–3 sentences to maintain clarity.
      8. Do not use slang, idioms, or unnecessary jargon. Translate clearly and factually.
        Also generate:
        - title_id: Concise, SEO-optimized Bahasa Indonesia headline (under 60 characters if possible)
        - summary_id: 1–2 sentence neutral summary for meta description
        - article_id: Full article rewritten in formal Bahasa Indonesia
        - keywords_id: 5–10 relevant SEO keywords in Bahasa Indonesia
        - slug_id: Short, SEO-friendly slug using lowercase Indonesian words separated by hyphens
        
        Return the result in this JSON format:
        {
          "title_id": "...",
          "summary_id": "...",
          "article_id": "...",
          "keywords_id": ["...", "..."],
          "slug_id": "..."
          }
      `,
    },
    {
      role: 'user',
      content: `
      The original English title is:"${title}"
      The article content is: "${content}"
      `,
    },
  ];
};
export const PromptAiListForJapanese = (object: any) => {
  return [
    {
      role: 'system',
      content: `
    You are a professional Japanese translator and SEO expert.

    Your task is to:
    1. Translate English JSON content into fluent and grammatically correct Japanese.
    2. Generate an SEO-friendly 'slug' using Japanese kanji/kana only (no romaji or English), connected with hyphens. Slug should summarize the core ideas from the description or use cases. Avoid using punctuation or English. Do not translate the product name.

    Rules:
    - Preserve the original JSON structure.
    - Only translate the values of fields like "description", "useCases", and "tags".
    - Do NOT translate keys, URLs, or the "name" field.
    - The 'slug' must be short, meaningful, and optimized for Japanese search engines.

  `,
    },
    {
      role: 'user',
      content: `
      Translate the following JSON into Japanese and generate a Japanese SEO-friendly slug:
      ${object}
      `,
    },
  ];
};

export enum ESource {
  techcrunch = 'techcrunch',
  nineto5google = '9to5google',
  nineto5mac = '9to5mac',
  bestlistai = 'bestlistai',
}
