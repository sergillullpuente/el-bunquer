export interface Episode {
    id: string;
    title: string;
    published: string;
    description: string;
    content: string;
    episodeImage?: string;
    episodeNumber?: string;
    episodeSlug: string;
    audio: {
        src: string;
        type: string;
    };
}
