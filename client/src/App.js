import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home/';
import PageDetail from './components/PageDetail/PageDetail';
import CreateRecipe from './components/CreateRecipe';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route path="/recipes/:id" component={PageDetail} />
      <Route path="/create" component={CreateRecipe} />
    </div>
  );
}

export default App;
