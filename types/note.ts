export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Other';

export interface Note {
  id: string;
  title: string;
  content?: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}
