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
import { useCallback } from 'react';

function App() {
  const URL_RECIPES =
    'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/recipes.json';
  const [modalAddRecipe, setModalSetRecipe] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const getRecipes = useCallback((recipes) => {
    //console.log(recipes);
    setRecipes(recipes);
  }, []);

  /* const getRecipes = (recipes) => {
    console.log(recipes);
    setRecipes(recipes);
  }; */
  //Cada que cambia algo aqui re renderiza como un useffect no?
  const { isLoading, error, sendRequest } = useFetch(getRecipes);

  const showModalHandler = () => {
    setModalSetRecipe((prevState) => !prevState);
  };
  const sendRecipesHook = (recipe) => {
    sendRequest({
      url: URL_RECIPES,
      method: 'POST',
      body: recipe,
    });
    getRecipesWithHook();
  };
  /**Por alguna razon misteriosa a veces manda al "use-fetch" el filtro vacio
   * cuando no deberia puesto que siempre deberia tener valores ya que en principio se
   * los estoy dando por default
   *
   * Descubrimiento 2: Parece que esto esta sucediendo puesto que el componente custom
   * no esta tomando valores por defecto la primera vez que renderiza, esto trae
   * como consecuencia que el estado incial del select sea "" cuando en realidad deberia ser
   * any o all
   */
  const getRecipesWithHook = (category = 'all', time = 'any') => {
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
    getRecipesWithHook();
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
      <AppHeader
        addRecipeHandler={showModalHandler}
        getFilterValues={getRecipesWithHook}
      />
      <AppMainPage cardToRender={recipes} />
      <AppFooter />
    </div>
  );
}

export default App;
