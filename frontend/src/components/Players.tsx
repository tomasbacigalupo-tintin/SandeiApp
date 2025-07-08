import React from 'react';
import { usePlayers } from '@/hooks/usePlayers';
function Players() {
  const { data: players = [], isLoading, error } = usePlayers();

  if (isLoading) {
    return <p>Loading players...</p>;
  }

  if (error) {
    return <p>Error loading players</p>;
  }

  return (
    <ul>
      {players.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

export default Players;
