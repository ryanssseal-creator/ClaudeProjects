import { describe, test, expect, beforeEach } from 'vitest';
import { findSong, addSong, setLiked, likedDuration, clear } from './playlist.ts';

const song1 = { title: 'Yellow', artist: 'Coldplay', durationSeconds: 269 };
const song2 = { title: 'Clocks', artist: 'Coldplay', durationSeconds: 307 };

beforeEach(() => {
  clear();
});

describe('findSong()', () => {
  test('success > returns the right song if it exists', () => {
    addSong(song1);
    expect(findSong('Yellow')).toStrictEqual({
      songId: expect.any(Number),
      title: 'Yellow',
      artist: 'Coldplay',
      durationSeconds: 269,
      liked: false
    });
  });

  test('error > returns undefined for unknown title', () => {
    addSong(song1);
    expect(findSong('Clocks')).toBeUndefined();
  });
});

describe('addSong()', () => {
  test('success > returns the songId', () => {
    expect(addSong(song1)).toStrictEqual({ songId: expect.any(Number) });
  });

  test('error > duplicate title', () => {
    addSong(song1);
    expect(addSong(song1)).toStrictEqual({ error: expect.any(String) });
  });

  test('error > non-positive duration', () => {
    expect(addSong({ ...song1, durationSeconds: 0 })).toStrictEqual({ error: expect.any(String) });
  });
});

describe('setLiked()', () => {
  let id1: { songId: number };
  beforeEach(() => {
    id1 = addSong(song1) as { songId: number };
  });

  test('success > returns empty object', () => {
    expect(setLiked(id1.songId, true)).toStrictEqual({});
    expect(findSong('Yellow')?.liked).toBe(true);
  });

  test('error > invalid song id', () => {
    expect(setLiked(id1.songId + 1, true)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('likedDuration()', () => {
  test('is 0 with no liked songs', () => {
    addSong(song1);
    expect(likedDuration()).toBe(0);
  });

  test('sums only liked songs', () => {
    const a = addSong(song1) as { songId: number };
    const b = addSong(song2) as { songId: number };
    setLiked(a.songId, true);
    setLiked(b.songId, true);
    setLiked(b.songId, false);
    expect(likedDuration()).toBe(269);
  });
});
