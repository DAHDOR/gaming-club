export const isClub = (obj: unknown): obj is Club => {
  const record = obj as Record<string, unknown>;

  return (
    record &&
    typeof record === 'object' &&
    'id' in record &&
    typeof record.id === 'string' &&
    'name' in record &&
    typeof record.name === 'string' &&
    'description' in record &&
    typeof record.description === 'string' &&
    'games' in record &&
    Array.isArray(record.games) &&
    record.games.every((club) => typeof club === 'string')
  );
};

interface Club {
  id: string;
  name: string;
  description: string;
  games: string[];
}

export default Club;
