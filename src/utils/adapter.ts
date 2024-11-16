export function adapter(episode) {
    const [datePart] = episode.data_publicacio.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return {
        id: episode.id,
        title: episode.titol,
        published: date.toISOString(),
        description: episode.entradeta,
        content: episode.entradeta,
        episodeImage: episode.imatges.imatge[0].text,
        episodeNumber: "",
        episodeSlug: episode.nom_friendly,
        audio: {
            src: `https://audios.3catvideos.cat/multimedia/${episode.audios.audio[0].text}`,
            type: "audio/mpeg"
        }
    }
}
