export interface Video {
  videoId: number;
  youtubeVideoId: String;
  title: String;
  description: String;
  category: CategoryVideo;
  completeAt: Date;
}
export enum CategoryVideo {
  GRAMMAR = 'grammar',
  VOCAB = 'vocabulary',
  KANJI = 'kanji',
}
