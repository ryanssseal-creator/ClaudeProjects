let songs = [];

/**
 * Find a song with the given title in the playlist
 * @param {string} title - The title of the song
 * @returns {?} If the song exists, it returns the song object that includes
 * songId(number), title(string), artist(string) and liked(boolean).
 */
export function findSong(title: number) {
  return songs.find((s) => s.title === title);
}

/**
 * Add a new song to the playlist.
 * @param {Song Object} song - The song is the song object
 * - Song object includes title(string) and artist(string) values.
 * @returns {songId Object} - returns the songId as the number in the object
 */
export function addSong(song): string {
  if (findSong(song.title)) {
    return { error: 'Song already exists' };
  }

  const songId = songs.length + 1;
  const newSong = {
    songId: songId,
    title: song.title,
    artist: song.artist,
    liked: false
  };
  songs.push(newSong);
  return { songId: songId };
}

/**
 * Update the liked status of a song
 * @param {number} songId - the id of the song
 * @param {boolean} liked - the liked status to be updated
 * @returns {} - empty object
 */
export function setLiked(songId, liked){
  const song = songs.find((s) => s.songId === songId);
  if (!song) {
    return { error: 'Invalid song Id' };
  }
  song.liked = liked;
  return {};
}

/**
 * clear the playlist
 * @returns {}
 */
export function clear() {
  songs = [];
  return {};
}
