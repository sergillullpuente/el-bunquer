import type { APIRoute } from 'astro';

const episodesPerPage = 15;
const episodeResponse = await fetch('https://api.3cat.cat/audios?ordre=-data_publicacio&programaradio_id=1909&pagina=1&items_pagina=220&data_publicacio=31/08/2023-15/07/2024').then((response)=>response.json());
const episodes = episodeResponse.resposta.items.item.map((epi) => {
  const [datePart] = epi.data_publicacio.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return {
    id: epi.id,
    title: epi.titol,
    published: date.toISOString(),
    description: epi.entradeta,
    content: epi.entradeta,
    episodeImage: epi.imatges.imatge[0].text,
    episodeNumber: "",
    episodeSlug: epi.nom_friendly,
    audio:{
      src: `https://audios.3catvideos.cat/multimedia/${epi.audios.audio[0].text}`,
      type: "audio/mpeg"
    }
  }
})

export async function getStaticPaths({ paginate }: { paginate: any }) {
  return paginate(episodes, { pageSize: episodesPerPage });
}

export const GET: APIRoute = async ({ props }) => {
  const page = props.page.currentPage;
  const canLoadMore = page * episodesPerPage < episodes.length;
  return new Response(JSON.stringify({ canLoadMore, episodes: props.page }));
};
