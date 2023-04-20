import AppHeader from './components/AppHeader/AppHeader';
import AppMainPage from './components/AppMainPage/AppMainPage';
import AppFooter from './components/AppFooter/AppFooter';
import Modal from './components/UI/Modal/Modal';
import AddRecipeForm from './components/AddRecipeForm/AddRecipeForm';
import LoadingScreen from './components/UI/LoadingScreen/LoadingScreen';
import AppLogin from './components/AppLogin/AppLogin';
import useFetch from './hooks/use-fetch';
import { useEffect } from 'react';
import styles from './App.module.scss';
import { useState } from 'react';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavoritesRecipes } from './store/favorites-actions';

function App() {
  const URL_RECIPES =
    'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/recipes.json';
  const [modalAddRecipe, setModalSetRecipe] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const getRecipes = useCallback((recipes) => {
    setRecipes(recipes);
  }, []);

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

  const dispatch = useDispatch();
  const favoriteRecipes = useSelector((state) => state.favorites);
  useEffect(() => {
    dispatch(fetchFavoritesRecipes());
  }, [dispatch]);

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
