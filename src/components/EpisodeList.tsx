import {useEffect, useState} from 'preact/hooks';
import FormattedDate from '../components/FormattedDate';
import FullPlayButton from '../components/FullPlayButton';
import {currentEpisode} from '../components/state';
import type {Episode} from "@/types.ts";

type Props = {
  episodes: Array<Episode>;
};

export default function EpisodeList({ episodes }: Props) {
  const seasons = ['1', '2', '3', '4', '5'];
  const [actualSeason, setActualSeason] = useState('5');
  const [nextPage, setNextPage] = useState('/api/season/5/episodes/2.json');
  const [prevPage, setPrevPage] = useState(null);
  const [recentEpisodes, setRecentEpisodes] = useState(episodes);
  const [canLoadMore, setCanLoadMore] = useState(true);

  async function fetchSeasonEpisodes() {
    const { episodes } = await fetch(`/api/season/${actualSeason}/episodes/1.json`).then((response)=>response.json());
    setNextPage(episodes.url.next)
    setPrevPage(episodes.url.prev)
    setCanLoadMore(!!episodes.url.next);
    setRecentEpisodes([...episodes.data]);
  }

  useEffect(() => {
    fetchSeasonEpisodes().then();
  }, [actualSeason]);

  async function fetchMoreEpisodes() {
    if (canLoadMore) {
      const {episodes } = await fetch(`${nextPage}`).then((response)=>response.json());
      setNextPage(episodes.url.next)
      setPrevPage(episodes.url.prev)
      setCanLoadMore(!!episodes.url.next);
      setRecentEpisodes([...recentEpisodes, ...episodes.data]);
    }
  }

  return (
    <>
      <div class="flex gap-2 mb-6 flex-wrap p-4">
        {/*<button*/}
        {/*    onClick={() => setActualSeason(null)}*/}
        {/*    class={`px-4 py-2 rounded-full transition-colors ${*/}
        {/*        actualSeason === null*/}
        {/*            ? 'bg-light-text-heading text-white'*/}
        {/*            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'*/}
        {/*    }`}*/}
        {/*>*/}
        {/*  Totes*/}
        {/*</button>*/}
        {seasons.map((season) => (
            <button
                key={season}
                onClick={() => setActualSeason(season)}
                class={`px-4 py-2 rounded-full transition-colors ${
                    actualSeason === season
                        ? 'bg-light-text-heading text-white'
                        : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
            >
              Temporada {season}
            </button>
        ))}
      </div>
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
                  class="object-cover mb-3 block h-32 w-32 rounded-md lg:mr-6 hover:scale-105 transition-transform"
                  height={80}
                  src={episode.episodeImage ?? '/images/www.png'}
                  width={80}
                />

                <div class="flex flex-col">
                  <FormattedDate date={new Date(episode.published)} />
                  <h2 class="my-2 text-lg font-bold text-light-text-heading dark:text-white hover:text-light-text-body transition-colors">
                    <a href={`/${episode.episodeSlug}`}>
                      {episode.episodeNumber ? `${episode.episodeNumber}:` : ''} {episode.title}
                    </a>
                  </h2>

                  <p class="mb-5">{episode.description.slice(0, 260)}...</p>

                  <div class="flex items-center gap-6 text-sm">
                    <FullPlayButton episode={episode} />

                    <a
                      class="font-bold text-light-text-heading dark:text-white hover:text-light-text-body transition-colors"
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
