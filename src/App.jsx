import AppHeader from './components/AppHeader/AppHeader';
import AppMainPage from './components/AppMainPage/AppMainPage';
import AppFooter from './components/AppFooter/AppFooter';
import useFetch from './hooks/use-fetch';
import { useEffect } from 'react';
import './App.scss';
import { useState } from 'react';
function App() {
  const [recipes, setRecipes] = useState([]);
  const getRecipes = (recipes) => {
    setRecipes(Object.values(recipes));
  };
  const { isLoading, error, sendRequest } = useFetch(getRecipes);

  const getRecipesHook = () => {
    sendRequest({
      url: 'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/recipes.json',
      method: 'GET',
    });
  };
  const sendRecipesHook = (recipe) => {
    sendRequest({
      url: 'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/recipes.json',
      method: 'POST',
      body: recipe,
    });
  };

  useEffect(() => {
    getRecipesHook();
  }, []);
  return (
    <div className="App">
      <AppHeader />
      <AppMainPage cardToRender={recipes} sendRecipes={sendRecipesHook} />
      <AppFooter />
    </div>
  );
}

export default App;
