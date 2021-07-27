import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getPhotos } from '../services/firebase';

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      // does the user follow other users?
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }
      // sort array to show newest photos first(by date created)
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
    // console.log(userId);
    getTimelinePhotos();
  }, [userId]);

  return { photos };
}
