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
      }).then(res => res.json());

      console.log(res);
      return {};
    }),
});
