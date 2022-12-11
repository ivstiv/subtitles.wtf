import { z } from "zod";
import { env } from "../../../env/server.mjs";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),

  getMovie: publicProcedure
    .input(z.object({ searchQuery: z.string().min(1) }))
    .query(async ({ input }) => {
      const url = `http://www.omdbapi.com/?apikey=${env.OMDB_API_KEY}&s=${encodeURIComponent(input.searchQuery)}`;
      const res = await fetch(url).then(res => res.json());
      const parsedRes = OMDBResponse.parse(res);
      return parsedRes.Response === "False" ? [] : parsedRes.Search;
    }),
});



export type OMDBMovieType = z.infer<typeof OMDBMovie>;
const OMDBMovie = z.object({
  Title: z.string().min(1),
  Year: z.string().min(1),
  imdbID: z.string().min(1),
  Type: z.string().min(1),
  Poster: z.string().min(1),
});
const OMDBSuccessResponse = z.object({
  Search: z.array(OMDBMovie),
  totalResults: z.string().min(1),
  Response: z.literal("True"),
});

const OMDBErrorResponse = z.object({
  Error: z.string().min(1),
  Response: z.literal("False"),
});
const OMDBResponse = z.union([
  OMDBSuccessResponse,
  OMDBErrorResponse,
]);
