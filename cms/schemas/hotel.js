import icon from 'react-icons/lib/md/room-service';

export default {
  name: 'hotel',
  title: 'Hotel',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'welcome',
      title: 'Welcome',
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
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true
      }
    }
  ],
  preview: {
    select: {
      title: 'title',

      media: 'photos.0'
    }
  }
};
