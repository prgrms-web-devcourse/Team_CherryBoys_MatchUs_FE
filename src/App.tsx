import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HiresPage from './pages/HiresPage';
import MatchesPage from './pages/MatchesPage';

const App = () => {
  return (
    <Switch>
      <Route path="/matches">
        <MatchesPage />
      </Route>
      <Route path="/hires">
        <HiresPage />
      </Route>
    </Switch>
  );
};

export default App;
