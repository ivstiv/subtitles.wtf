import { router } from "../trpc";
import { moviesRouter } from "./movies";
import { subtitlesRouter } from "./subtitles";

export const appRouter = router({
  movies: moviesRouter,
  subtitles: subtitlesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
