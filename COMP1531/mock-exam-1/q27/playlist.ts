type Song = {
  songId: number;
  title: string;
  artist: string;
  durationSeconds: number;
  liked: boolean;
};

type SongDetails = {
  title: string;
  artist: string;
  durationSeconds: number;
};

type SongId = {
  songId: number;
};

type ErrorMessage = {
  error: string;
};

type EmptyResponse = Record<string, never>;

let songs: Song[] = [];

/**
 * Find a song with the given title in the playlist
 * @param {string} title - The title of the song
 * @returns {?} If the song exists, it returns the song object that includes
 * songId(number), title(string), artist(string), durationSeconds(number) and liked(boolean).
 */
export function findSong(title: string): Song | undefined {
  return songs.find(s => s.title === title);
}

/**
 * Add a new song to the playlist.
 * @param {Song details object} details - The details of the new song
 * - Details object includes title(string), artist(string) and durationSeconds(number) values.
 * @returns {songId Object} - returns the songId as the number in the object,
 * or an error object that includes error(string).
 */
export function addSong(details: SongDetails): SongId | ErrorMessage {
  if (details.durationSeconds <= 0) {
    return { error: 'Duration must be positive' };
  }
  if (findSong(details.title)) {
    return { error: 'Song already exists' };
  }

  const songId = songs.length + 1;
  const newSong = {
    songId: songId,
    title: details.title,
    artist: details.artist,
    durationSeconds: details.durationSeconds,
    liked: false
  };
  songs.push(newSong);
  return { songId: songId };
}

/**
 * Like or unlike a song
 * @param {number} songId - the id of the song
 * @param {boolean} liked - whether the song should be marked as liked
 * @returns {} - empty object, or an error object that includes error(string).
 */
export function setLiked(songId: number, liked: boolean): EmptyResponse | ErrorMessage {
  const song = songs.find(s => s.songId === songId);
  if (!song) {
    return { error: 'Invalid song Id' };
  }
  song.liked = liked;
  return {};
}

/**
 * Total duration of all liked songs
 * @returns {number} - the total duration, in seconds
 */
export function likedDuration(): number {
  return songs.filter(s => s.liked).reduce((total, s) => total + s.durationSeconds, 0);
}

/**
 * clear the playlist
 * @returns {}
 */
export function clear(): EmptyResponse {
  songs = [];
  return {};
}
