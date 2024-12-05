import type { APIRoute } from 'astro';
import {adapter} from "@/utils/adapter.ts";
import {z} from "astro:schema";

const ApiResponse = z.object({
  resposta: z.object({
    status: z.string(),
    items: z.object({
      num: z.number(),
      item: z.array(z.object({
        entradeta: z.string(),
        "nom_friendly": z.string(),
        permatitle: z.string(),
        id: z.number(),
        titol: z.string(),
        audios: z.object({audio: z.array(z.object({text: z.string()}))}),
        imatges: z.object({imatge: z.array(z.object({text: z.string()}))}),
        "data_publicacio": z.string(),
      })),
    }),
    paginacio: z.object({
      "total_items": z.number(),
      "items_pagina": z.number(),
      "pagina_actual": z.number(),
      "total_pagines": z.number(),
    })
  }).required(),
});
type ApiResponse = z.infer<typeof ApiResponse>;
const episodesPerPage = 15;
const seasons = ["1", "2", "3", "4", "5"];
const episodeResponse: ApiResponse = await fetch('https://api.3cat.cat/audios?ordre=-data_publicacio&programaradio_id=1909&pagina=1&items_pagina=1000').then((response)=>response.json());
const episodes = episodeResponse.resposta.items.item.map((epi) => {
  return adapter(epi);
})

export async function getStaticPaths({ paginate }: { paginate: any }) {
  return seasons.flatMap((season) => {
    const filteredPosts = episodes.filter((episode) => episode.episodeNumber === season);
    return paginate(filteredPosts, {
      params: { season },
      pageSize: episodesPerPage
    });
  });
}

export const GET: APIRoute = async ({ props }) => {
  return new Response(JSON.stringify({ episodes: props.page }));
};
