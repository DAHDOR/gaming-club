export const isGame = (obj: unknown): obj is Game => {
  const record = obj as Record<string, unknown>;

  return (
    record &&
    typeof record === 'object' &&
    'id' in record &&
    typeof record.id === 'string' &&
    'name' in record &&
    typeof record.name === 'string' &&
    'genre' in record &&
    typeof record.genre === 'string' &&
    'description' in record &&
    typeof record.description === 'string'
  );
};

interface Game {
  id: string;
  name: string;
  genre: string;
  description: string;
}

export default Game;
