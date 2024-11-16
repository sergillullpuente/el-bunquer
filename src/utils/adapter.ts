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
        episodeNumber: calculateSeason(date),
        episodeSlug: dasher(episode.permatitle),
        audio: {
            src: `https://audios.3catvideos.cat/multimedia/${episode.audios.audio[0].text}`,
            type: "audio/mpeg"
        }
    }
}

function calculateSeason(date: Date) {
    if (date <= new Date(Date.UTC(2021,6,16))) {
        return "1";
    }
    if (date <= new Date(Date.UTC(2022,6,15))) {
        return "2";
    }
    if (date <= new Date(Date.UTC(2023,6,7))) {
        return "3";
    }
    if (date <= new Date(Date.UTC(2024,7,30))) {
        return "4";
    }
    return "5"
}

function dasher(string: string) {
    return string
        .replace(
            /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,.\/:;<=>?@\[\]^_`{|}~]/g,
            ''
        )
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}
