import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";

export const OpenSubtitles = {
  baseUrl: "https://api.opensubtitles.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Api-Key": env.OPEN_SUBS_API_KEY,
    "User-Agent": "subtitles.wtf v2.0",
  },
};

export const subtitlesRouter = createTRPCRouter({
  getSubtitles: publicProcedure
    .input(
      z.object({
        languages: z.string().min(2),
        imdbID: z.string().min(1),
        page: z.number().min(1).max(10),
        includeAITranslated: z
          .boolean()
          .transform((v) => (v ? "include" : "exclude")),
      }),
    )
    .query(async ({ input }) => {
      const url = [
        `${OpenSubtitles.baseUrl}/subtitles`,
        `?ai_translated=${input.includeAITranslated}`,
        `&imdb_id=${encodeURIComponent(input.imdbID)}`,
        `&languages=${encodeURIComponent(input.languages)}`,
        "&order_by=download_count",
        `&page=${input.page}`,
      ].join("");
      const response = await fetch(url, { headers: OpenSubtitles.headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = (await response.json()) as OpenSubtitlesResponse;

      // res.data.sort(
      //   (a, b) => b.attributes.download_count - a.attributes.download_count,
      // );

      return res;
    }),

  downloadSubtitle: publicProcedure
    .input(
      z.object({
        fileId: z.number().int().positive(),
      }),
    )
    .mutation(async ({ input }) => {
      const response = await fetch(`${OpenSubtitles.baseUrl}/download`, {
        method: "POST",
        headers: OpenSubtitles.headers,
        body: JSON.stringify({ file_id: input.fileId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return (await response.json()) as DownloadResponse;
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

interface DownloadResponse {
  link: string;
  file_name: string;
  requests: number;
  remaining: number;
  message: string;
  reset_time: string;
  reset_time_utc: string;
}
