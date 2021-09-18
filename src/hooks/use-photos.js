import { useState, useEffect } from 'react';
import { getPhotos } from '../services/firebase';

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      // does the user follow other users?
      if (user?.following?.length > 0) {
        const followedUserPhotos = await getPhotos(user.userId, user.following);
        // sort array to show newest photos first(by date created)
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        setPhotos(followedUserPhotos);
      }
    }
    // console.log(userId);
    getTimelinePhotos();
  }, [user?.userId, user?.following]);

  return { photos };
}
