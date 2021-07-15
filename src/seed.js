export function seedDatabase(firebase) {
  const users = [
    {
      userId: 'xUqdYP2PSuMNA8Y3RubfCNofxPU2',
      username: 'kevin',
      fullName: 'Kevin Kim',
      emailAddress: 'kevin.kim1030@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['xUqdYP2PSuMNA8Y3RubfCNofxPU2'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['xUqdYP2PSuMNA8Y3RubfCNofxPU2'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['xUqdYP2PSuMNA8Y3RubfCNofxPU2'],
      dateCreated: Date.now()
    }
  ];

  // eslint-disable-next-line prefer-const
  /*eslint-disable */
  for (let i = 0; i < users.length; i++) {
    /* eslint-enable */
    firebase.firestore().collection('users').add(users[i]);
  }

  // eslint-disable-next-line prefer-const
  /*eslint-disable */
  for (let i = 1; i <= 5; ++i) {
    /* eslint-enable */
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}
