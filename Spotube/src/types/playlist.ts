/**
 * Defines the TypeScript types used for playlist data in VYBE.
 * Specifies the expected structure and properties of playlist objects.
 */

export type Playlist = {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
};
