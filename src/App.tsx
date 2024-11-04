import * as React from 'react';
import Header from './components/Header';
import PlayerModal from './components/PlayerModal';
import {useAppDispatch} from './hooks';
import Navigation from './navigation';
import {setUser} from './redux/user/slice';
export default function App() {
  // const [role, setRole] = React.useState<{role: string}>({role: 'user'});
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    // LogRocket.init('mz9fcc/ojogo');
    // LogRocket.identify('123456', {
    //   name: 'Jane Smith',
    //   email: 'janesmith@logrocket.com',
    //   age: 43,
    //   favoriteColor: 'blue',
    //   currentSubscription: 'professional-plan',
    // });
    (() => {
      try {
        fetch('http://192.168.100.33:3000/roles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: 'italo2@gmail.com'}),
        })
          .then(res => res.json())
          .then(result => {
            dispatch(setUser(result));
          })
          .catch(error => console.log('error', error));
      } catch (error) {
        console.log('error', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Navigation />
      <PlayerModal />
    </>
  );
}
