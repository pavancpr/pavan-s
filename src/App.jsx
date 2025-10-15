
import React, { useState, useEffect, useMemo } from 'react';

const SAMPLE_GAMES = [
  { id: 1, title: 'Bloxd.io', category: 'Multiplayer', thumbnail: null, url: 'https://example.com/game/bloxd' },
  { id: 2, title: 'FrontWars', category: 'Strategy', thumbnail: null, url: 'https://example.com/game/frontwars' },
  { id: 3, title: 'PolyTrack', category: 'Racing', thumbnail: null, url: 'https://example.com/game/polytrack' },
  { id: 4, title: 'Holey.io', category: 'Battle Royale', thumbnail: null, url: 'https://example.com/game/holey' },
  { id: 5, title: 'Bit Gun', category: 'Shooter', thumbnail: null, url: 'https://example.com/game/bitgun' },
  { id: 6, title: 'Escape from Prison', category: 'Adventure', thumbnail: null, url: 'https://example.com/game/escape' },
  { id: 7, title: 'Poker (With Friends)', category: 'Card', thumbnail: null, url: 'https://example.com/game/poker' },
  { id: 8, title: 'Simply Prop Hunt', category: 'Party', thumbnail: null, url: 'https://example.com/game/prophunt' },
];

function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (e) {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {}
  }, [key, state]);
  return [state, setState];
}

function IconSearch() {
  return (
    <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  );
}

function GameCard({ game, onPlay, onToggleFav, isFav }) {
  // Random gradient background for thumbnail placeholder
  const bg = useMemo(() => {
    const grads = [
      'from-indigo-400 to-blue-400',
      'from-pink-400 to-yellow-300',
      'from-green-400 to-teal-300',
      'from-yellow-400 to-orange-400',
      'from-purple-400 to-pink-400',
    ];
    return grads[game.id % grads.length];
  }, [game.id]);

  return (
    <div className="bg-surface rounded-2xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700">
      <div className={`h-36 sm:h-40 w-full bg-gradient-to-r ${bg} flex items-center justify-center`}>
        {/* thumbnail area */}
        <div className="text-white font-bold text-lg drop-shadow-md text-center px-2">{game.title}</div>
      </div>
      <div className="p-3 flex items-center justify-between gap-2">
        <div>
          <div className="font-semibold truncate" title={game.title}>{game.title}</div>
          <div className="text-xs text-slate-500">{game.category}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPlay(game)}
            className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-500 transition"
          >
            Play
          </button>
          <button onClick={() => onToggleFav(game.id)} aria-label="favorite" className="p-2">
            {isFav ? (
              <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            ) : (
              <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>
            )}
          