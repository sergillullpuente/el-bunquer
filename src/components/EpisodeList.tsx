import { useState } from 'preact/hooks';
import FormattedDate from '../components/FormattedDate';
import FullPlayButton from '../components/FullPlayButton';
import {currentEpisode} from '../components/state';
import type {Episode} from "@/types.ts";

type Props = {
  episodes: Array<Episode>;
};

export default function EpisodeList({ episodes }: Props) {
  const [recentEpisodes, setRecentEpisodes] = useState(episodes);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);

  async function fetchMoreEpisodes() {
    if (canLoadMore) {
      setIsLoading(true);
      const { canLoadMore, episodes } = await fetch(`/api/episodes/${page}.json`,).then((response)=>response.json());
      setIsLoading(false);
      setCanLoadMore(canLoadMore);
      setRecentEpisodes([...recentEpisodes, ...episodes.data]);
      setPage(page + 1);
    }
  }

  return (
    <>
      <ul aria-label="EpisodeList">
        {recentEpisodes.map((episode) => {
          const isCurrentEpisode = episode.id == currentEpisode.value?.id;

          return (
            <li class="border-b dark:border-dark-border">
              <div
                class="flex w-full flex-col py-12 lg:flex-row"
                aria-current={isCurrentEpisode}
              >
                <img
                  alt={`${episode.title} - episode art`}
                  aria-hidden="true"
                  class="object-cover mb-3 block h-32 w-32 rounded-md lg:mr-6"
                  height={80}
                  src={episode.episodeImage ?? '/images/www.png'}
                  width={80}
                />

                <div class="flex flex-col">
                  <FormattedDate date={new Date(episode.published)} />
                  <h2 class="my-2 text-lg font-bold text-light-text-heading dark:text-white">
                    <a href={`/${episode.episodeSlug}`}>
                      {episode.episodeNumber ? `${episode.episodeNumber}:` : ''} {episode.title}
                    </a>
                  </h2>

                  <p class="mb-5">{episode.description.slice(0, 260)}...</p>

                  <div class="flex items-center gap-6 text-sm">
                    <FullPlayButton episode={episode} />

                    <a
                      class="font-bold text-light-text-heading dark:text-white"
                      href={`/${episode.episodeSlug}`}
                    >
                      Veure més
                    </a>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {canLoadMore && (
        <div class="mt-8 flex justify-center pb-16">
          <button class="btn" onClick={fetchMoreEpisodes}>
            <span class="rounded-full px-8 py-4 text-center text-sm text-light-text-heading dark:text-white">
              Més capítols
            </span>
          </button>
        </div>
      )}
    </>
  );
}
