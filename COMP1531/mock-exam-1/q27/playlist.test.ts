import { describe, test, expect, beforeEach } from 'vitest';
import { findSong, addSong, setLiked, clear } from './playlist.ts';

const song1 = { title: 'Yellow', artist: 'Coldplay' };

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
      liked: false
    });
  });

  test('error > returns undefined for empty title', () => {
    expect(findSong('')).toBeUndefined();
  });

  test('error > returns undefined for unknown title', () => {
    addSong(song1);
    expect(findSong('Clocks')).toBeUndefined();
  });
});

describe('addSong()', () => {
  test('success > returns the songId if success', () => {
    expect(addSong(song1)).toStrictEqual({ songId: expect.any(Number) });
  });

  test('error > returns error for existing title', () => {
    addSong(song1);
    expect(addSong(song1)).toStrictEqual({ error: expect.any(String) });
  });
});

describe('setLiked()', () => {
  let songId1: { songId: number };
  beforeEach(() => {
    songId1 = addSong(song1) as { songId: number };
  });

  test('success > returns empty object', () => {
    expect(setLiked(songId1.songId, true)).toStrictEqual({});
  });

  test('error > returns error for invalid song id', () => {
    expect(setLiked(songId1.songId + 1, true)).toStrictEqual({ error: expect.any(String) });
  });
});
