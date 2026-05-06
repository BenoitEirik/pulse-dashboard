interface TmdbTrendingResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  media_type: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
}

interface TmdbTrendingResponse {
  page: number;
  results: TmdbTrendingResult[];
  total_pages: number;
  total_results: number;
}
