import { Group, ScrollArea } from "@mantine/core";
import type { FC, MouseEvent, TouchEvent } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback, useRef } from "react";
import { MovieCard } from "~/app/_components/movie-card/movie-card";
import { useAppContext } from "~/data/app-context";
import { type OMDBMovieType } from "~/server/api/routers/movie";
import classes from "./movie-results.module.css";

type Props = {
  movies: OMDBMovieType[];
};
export const MovieResults: FC<Props> = ({ movies }) => {
  const context = useAppContext();

  const selectMovie = useCallback(
    (id: string) => {
      context.setImdbID(id);
      context.setStep((prev) => prev + 1);
    },
    [context],
  );

  const resultsRef = useRef<HTMLDivElement>(null);
  const [scrollingInterval, setScrollingInterval] = useState<number>();
  const [isDown, setIsDown] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (resultsRef.current) {
        if (resultsRef.current.scrollWidth > resultsRef.current.scrollLeft) {
          resultsRef.current.scrollTo({
            behavior: "auto",
            left: resultsRef.current.scrollLeft + 1,
          });
        }
      }
    }, 20);
    setScrollingInterval(timer);

    return () => {
      clearInterval(timer);
      setScrollingInterval(undefined);
    };
  }, []);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    beginTouchScroll(e.pageX);
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.targetTouches[0]) {
      beginTouchScroll(e.targetTouches[0].pageX);
    }
  };

  const beginTouchScroll = (pageX: number) => {
    if (resultsRef.current) {
      setStartPos(pageX - resultsRef.current.offsetLeft);
      setScrollLeft(resultsRef.current.scrollLeft);
      setIsDown(true);
      clearInterval(scrollingInterval);
      setScrollingInterval(undefined);
    }
  };

  const onTouchEnd = useCallback(() => {
    setIsDown(false);
  }, []);

  const moveTouchScroll = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown || !resultsRef.current) {
      return;
    }
    const x = e.pageX - resultsRef.current.offsetLeft;
    const walk = x - startPos;
    resultsRef.current.scrollTo({
      behavior: "auto",
      left: scrollLeft - walk,
    });
  };

  return (
    <ScrollArea
      viewportRef={resultsRef}
      mt="md"
      style={{ width: "100%", height: "fit-content" }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseUp={onTouchEnd}
      onMouseLeave={onTouchEnd}
      onMouseMove={moveTouchScroll}
    >
      <Group
        mr="md"
        wrap="nowrap"
        className={isDown ? classes["wrapper-down"] : classes["wrapper-up"]}
      >
        {movies.map((movie, i) => (
          <MovieCard
            key={`${movie.imdbID}-${i}`}
            movie={movie}
            onSelect={selectMovie}
          />
        ))}
      </Group>
    </ScrollArea>
  );
};
