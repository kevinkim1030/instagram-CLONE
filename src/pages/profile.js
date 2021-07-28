import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
  // destructure username using useParams. it'll pull from url via route constant
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const history = useHistory();
  // console.log('username', username);

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
        setUserExists(true);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
    // console.log('user', user);
  }, [username, history]);

  return userExists ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
