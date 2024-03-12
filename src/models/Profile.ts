export const isProfile = (obj: unknown): obj is Profile => {
  const record = obj as Record<string, unknown>;

  return (
    record &&
    typeof record === 'object' &&
    'id' in record &&
    typeof record.id === 'string' &&
    'name' in record &&
    typeof record.name === 'string' &&
    'email' in record &&
    typeof record.email === 'string' &&
    'username' in record &&
    typeof record.username === 'string' &&
    'pfp' in record &&
    typeof record.pfp === 'string' &&
    'game' in record &&
    typeof record.game === 'string' &&
    'clubs' in record &&
    Array.isArray(record.clubs) &&
    record.clubs.every((club) => typeof club === 'string')
  );
};

interface Profile {
  id: string;
  name: string;
  email: string;
  username: string;
  pfp: string;
  game: string;
  clubs: string[];
}

export default Profile;
