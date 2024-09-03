import { z } from "zod";
import { env } from "~/env";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const OMDBAPI = {
  baseUrl: "https://www.omdbapi.com/",
  params: {
    apikey: env.OMDB_API_KEY,
  },
};

export const movieRouter = createTRPCRouter({
  getMovie: publicProcedure
    .input(z.object({ searchQuery: z.string().min(1) }))
    .query(async ({ input }) => {
      const url = new URL(OMDBAPI.baseUrl);
      url.searchParams.append("apikey", OMDBAPI.params.apikey);
      url.searchParams.append("s", input.searchQuery);

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      const parsedRes = OMDBResponse.parse(res);
      return parsedRes.Response === "False" ? [] : parsedRes.Search;
    }),
  getMovieDetails: publicProcedure
    .input(z.object({ imdbID: z.string().min(1) }))
    .query(async ({ input }) => {
      const url = new URL(OMDBAPI.baseUrl);
      url.searchParams.append("apikey", OMDBAPI.params.apikey);
      url.searchParams.append("i", input.imdbID);

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      return OMDBMovieDetails.parse(res);
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

const OMDBMovieDetails = z.object({
  Title: z.string(),
  Year: z.string(),
  Rated: z.string(),
  Released: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Writer: z.string(),
  Actors: z.string(),
  Plot: z.string(),
  Language: z.string(),
  Country: z.string(),
  Awards: z.string(),
  Poster: z.string(),
  Ratings: z.array(z.object({ Source: z.string(), Value: z.string() })),
  Metascore: z.string(),
  imdbRating: z.string(),
  imdbVotes: z.string(),
  imdbID: z.string(),
  Type: z.string(),
  DVD: z.string().optional(),
  BoxOffice: z.string().optional(),
  Production: z.string().optional(),
  Website: z.string().optional(),
  Response: z.literal("True"),
});

export type OMDBMovieDetailsType = z.infer<typeof OMDBMovieDetails>;
