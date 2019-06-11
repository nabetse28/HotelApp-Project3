import icon from 'react-icons/lib/fa/bed';

export default {
  name: 'room',
  title: 'Room',
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
      name: 'photos',
      title: 'Photos',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'photo'
    }
  }
};
