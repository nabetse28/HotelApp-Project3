import icon from 'react-icons/lib/md/room-service';

export default {
  name: 'service',
  title: 'Service',
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
