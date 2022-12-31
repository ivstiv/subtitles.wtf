import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { router, publicProcedure } from "../trpc";



export const subtitlesRouter = router({
  getSubtitles: publicProcedure
    .input(z.object({
      languages: z.string().min(2),
      imdbID: z.string().min(1),
    }))
    .query(async ({ input }) => {
      const url = `https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${encodeURIComponent(input.imdbID)}&languages=${encodeURIComponent(input.languages)}`;
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": env.OPEN_SUBS_API_KEY,
        },
      }).then(res => res.json()) as OpenSubtitlesResponse;

      return res;
    }),
});



interface Uploader {
  uploader_id: number;
  name: string;
  rank: string;
}

interface FeatureDetails {
  feature_id: number;
  feature_type: string;
  year: number;
  title: string;
  movie_name: string;
  imdb_id: number;
  tmdb_id: number;
}

interface RelatedLink {
  label: string;
  url: string;
  img_url: string;
}

interface File {
  file_id: number;
  cd_number: number;
  file_name: string;
}

interface Attributes {
  subtitle_id: string;
  language: string;
  download_count: number;
  new_download_count: number;
  hearing_impaired: boolean;
  hd: boolean;
  fps: number;
  votes: number;
  points: number;
  ratings: number;
  from_trusted: boolean;
  foreign_parts_only: boolean;
  ai_translated: boolean;
  machine_translated: boolean;
  upload_date: Date;
  release: string;
  comments: string;
  legacy_subtitle_id: number;
  uploader: Uploader;
  feature_details: FeatureDetails;
  url: string;
  related_links: RelatedLink[];
  files: File[];
}

interface Datum {
  id: string;
  type: string;
  attributes: Attributes;
}

interface OpenSubtitlesResponse {
  total_pages: number;
  total_count: number;
  page: number;
  data: Datum[];
}
