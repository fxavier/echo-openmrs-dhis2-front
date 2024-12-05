import { Model } from '../types/models';

export const mockModels: Model[] = [
  {
    id: 1,
    name: 'Mensais',
    fields: [
      { name: 'username', type: 'string', required: true },
      { name: 'email', type: 'string', required: true },
      { name: 'is_active', type: 'boolean', required: true },
      { name: 'date_joined', type: 'date', required: true },
    ],
  },
  {
    id: 2,
    name: 'Trimestrais',
    fields: [
      { name: 'title', type: 'string', required: true },
      { name: 'content', type: 'string', required: true },
      { name: 'published', type: 'boolean', required: true },
      { name: 'created_at', type: 'date', required: true },
    ],
  },
  {
    id: 3,
    name: 'Semestrais',
    fields: [
      { name: 'title', type: 'string', required: true },
      { name: 'content', type: 'string', required: true },
      { name: 'published', type: 'boolean', required: true },
      { name: 'created_at', type: 'date', required: true },
    ],
  }
  
];