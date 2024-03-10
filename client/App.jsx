import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as Layouts from './layouts';
import * as Pages from './pages';
import { AuthProvider } from '../client/contexts/Auth';
import { UserProvider } from '../client/contexts/User';
function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <UserProvider>
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Routes location={location}>
              <Route element={<Layouts.auth />}>
                <Route path="login" element={<Pages.Login />} />
                <Route path="register" element={<Pages.Register />} />
              </Route>
              <Route path="/" element={<Layouts.main />}>
                <Route index element={<Pages.MainPage />} />
              </Route>
              <Route element={<Layouts.fight />}>
                <Route path="story" element={<Pages.StoryMode />} />
                <Route path="practice" element={<Pages.PracticeMode />} />
              </Route>
              <Route element={<Layouts.account />}>
                <Route path="account" element={<Pages.AccountPage />} />
              </Route>
              <Route element={<Layouts.leaderboard />}>
                <Route path="leaderboard" element={<Pages.Leaderboard />} />
              </Route>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </UserProvider>
    </AuthProvider>
  );
}
// changes

export default App;
