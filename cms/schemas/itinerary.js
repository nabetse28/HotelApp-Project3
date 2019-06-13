import icon from 'react-icons/lib/md/assignment';

export default {
  name: 'itinerary',
  title: 'Itinerary',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'hour',
      tittle: 'Hour',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
};
