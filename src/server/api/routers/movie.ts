import { z } from "zod";
import { env } from "~/env";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const movieRouter = createTRPCRouter({
  getMovie: publicProcedure
    .input(z.object({ searchQuery: z.string().min(1) }))
    .query(async ({ input }) => {
      const url = `https://www.omdbapi.com/?apikey=${env.OMDB_API_KEY}&s=${encodeURIComponent(input.searchQuery)}`;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const res = await fetch(url).then((res) => res.json());
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
const OMDBResponse = z.union([OMDBSuccessResponse, OMDBErrorResponse]);
