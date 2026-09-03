import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';

const templates = [
  (link: string, source?: string) =>
    `${source ? `${source}\n\n` : ''}ソース記事全文はこちら↓\n${link}\nアプリ/ウェブで通知ONにすると即届くよ🔥`,

  (link: string, source?: string) =>
    `${source ? `${source}\n` : ''}もっと詳しく知りたい人はこれ→\n${link}\n毎日最新テックニュース届くよ🚀`,

  (link: string, source?: string) =>
    `${source ? `${source}\n\n` : ''}気になった人、続きはここでチェック！\n${link}\n通知設定すると楽すぎる…😎`,

  (link: string, source?: string) =>
    `${source ? `${source}\n` : ''}全文＋関連ニュース全部まとめてる↓\n${link}\nブックマーク必須です🙏`,

  (link: string, source?: string) =>
    `${source ? `${source}\n\n` : ''}こんなニュース見逃したくないよね？\n${link}\nプッシュ通知で全部来るよ✨`,

  (link: string, source?: string) =>
    `${source ? `${source}\n` : ''}詳細記事はこちら↓\n${link}\nテック好きなら入れておくと捗る🤖`,

  (link: string, source?: string) =>
    `${source ? `${source}\n\n` : ''}続きが気になる人はウェブ見てね！\n${link}\nリアルタイム更新中🔥`,

  (link: string, source?: string) =>
    `${source ? `${source}\n` : ''}最新情報全部ここに集めてる↓\n${link}\nお気に入り登録してね😇`,

  (link: string, source?: string) =>
    `${source ? `${source}\n\n` : ''}アプリじゃなくてもウェブで全部見れるよ↓\n${link}\n無料だから試してみて！🚀`,

  (link: string, source?: string) =>
    `${source ? `${source}\n` : ''}ソース元＋最新ニュースはここ→\n${link}\n通知ON推奨です！📱`,
];

@Injectable()
export class XApiService {
  private twitterClient: TwitterApi;
  constructor(private readonly configService: ConfigService) {
    this.twitterClient = new TwitterApi({
      appKey: configService.get('cfg.xapi.consumer_key'),
      appSecret: configService.get('cfg.xapi.consumer_secret'),
      accessToken: configService.get('cfg.xapi.access_token'),
      accessSecret: configService.get('cfg.xapi.access_token_secret'),
    });
  }

  // Hàm đăng post chính (text only hoặc text + link)
  async postToX(content: string, replyToTweetId?: string) {
    try {
      const tweet = await this.twitterClient.v2.tweet({
        text: content,
        ...(replyToTweetId && {
          reply: { in_reply_to_tweet_id: replyToTweetId },
        }),
      });

      console.log(
        'Đăng X thành công:',
        `https://x.com/user/status/${tweet.data.id}`,
      );
      return tweet.data.id;
    } catch (error: any) {
      console.error('Lỗi đăng X:', error);
      throw error;
    }
  }
  // Nếu muốn đăng kèm ảnh (từ URL)
  async postWithImage(content: string, imageUrl: string) {
    try {
      // Bước 1: Upload media
      const mediaId = await this.twitterClient.v1.uploadMedia(imageUrl);

      // Bước 2: Đăng tweet kèm media
      const tweet = await this.twitterClient.v2.tweet({
        text: content,
        media: { media_ids: [mediaId] },
      });

      console.log('Đăng X + ảnh thành công:', tweet.data.id);
      return tweet.data.id;
    } catch (error) {
      console.error('Lỗi đăng X + ảnh:', error);
      throw error;
    }
  }

  /**
   * Đăng post chính + tự động reply first comment (có link app)
   * @param mainContent Nội dung post chính (từ Grok: content_x)
   * @param firstComment Nội dung comment đầu (nguồn + link app)
   */
  async postWithFirstComment(mainContent: string, link: string) {
    try {
      // Bước 1: Đăng tweet chính
      const tweet = await this.twitterClient.v2.tweet({
        text: mainContent,
      });

      const tweetId = tweet.data.id;
      console.log(
        'Post chính thành công:',
        `https://x.com/any/status/${tweetId}`,
      );
      const firstComment = this.getRandomFirstComment(link);
      // Bước 2: Nếu có firstComment thì reply ngay lập tức
      if (firstComment && firstComment.trim() && tweetId) {
        const reply = await this.twitterClient.v2.reply(
          firstComment.trim(),
          tweetId,
        );

        console.log(
          'First comment thành công:',
          `https://x.com/user/status/${reply.data.id}`,
        );
        return reply.data.id;
      }

      return tweetId;
    } catch (error: any) {
      console.error('Lỗi đăng X hoặc reply:', error?.data || error);
      throw error;
    }
  }
  private getRandomFirstComment(link: string, source?: string) {
    const randomTemplate =
      templates[Math.floor(Math.random() * templates.length)];
    return randomTemplate(link.trim(), source?.trim());
  }
}
