import type { APIRoute } from 'astro';
import {adapter} from "@/utils/adapter.ts";

const episodesPerPage = 15;
const episodeResponse = await fetch('https://api.3cat.cat/audios?ordre=-data_publicacio&programaradio_id=1909&pagina=1&items_pagina=1000').then((response)=>response.json());
const episodes = episodeResponse.resposta.items.item.map((epi) => {
  return adapter(epi);
})

export async function getStaticPaths({ paginate }: { paginate: any }) {
  return paginate(episodes, { pageSize: episodesPerPage });
}

export const GET: APIRoute = async ({ props }) => {
  const page = props.page.currentPage;
  const canLoadMore = page * episodesPerPage < episodes.length;
  return new Response(JSON.stringify({ canLoadMore, episodes: props.page }));
};
