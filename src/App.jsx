import AppHeader from './components/AppHeader/AppHeader';
import AppMainPage from './components/AppMainPage/AppMainPage';
import AppFooter from './components/AppFooter/AppFooter';
import Modal from './components/UI/Modal/Modal';
import AddRecipeForm from './components/AddRecipeForm/AddRecipeForm';
import LoadingScreen from './components/UI/LoadingScreen/LoadingScreen';
import useFetch from './hooks/use-fetch';
import useInput from './hooks/use-input';
import { useEffect } from 'react';
import styles from './App.module.scss';
import { useState } from 'react';

function App() {
  const URL_RECIPES =
    'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/recipes.json';
  const [modalAddRecipe, setModalSetRecipe] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const getRecipes = (recipes) => {
    /*
    setRecipes((prevState) => {
      return { ...prevState, recipes };
    });
    */
    setRecipes(recipes);
  };
  //Cada que cambia algo aqui re renderiza como un useffect no?
  const { isLoading, error, sendRequest } = useFetch(getRecipes);

  const getRecipesHook = () => {
    sendRequest({
      url: URL_RECIPES,
      method: 'GET',
    });
  };
  const showModalHandler = () => {
    setModalSetRecipe((prevState) => !prevState);
  };
  const sendRecipesHook = (recipe) => {
    sendRequest({
      url: URL_RECIPES,
      method: 'POST',
      body: recipe,
    });
    getRecipesHook();
  };

  const filterRecipes = (category = 'all', time = 'any') => {
    sendRequest({
      url: URL_RECIPES,
      method: 'GET',
      filter: {
        byCategory: category,
        byTime: time,
      },
    });
  };
  useEffect(() => {
    //getRecipesHook();
    filterRecipes();
  }, []);
  return (
    <div className={`${styles['App']}`}>
      {isLoading && <LoadingScreen />}
      {modalAddRecipe && (
        <Modal onClose={showModalHandler}>
          <AddRecipeForm
            showModalHandler={showModalHandler}
            sendRecipesHook={sendRecipesHook}
          />
        </Modal>
      )}
      <AppHeader addRecipeHandler={showModalHandler} />
      <AppMainPage cardToRender={recipes} />
      <AppFooter />
    </div>
  );
}

export default App;
