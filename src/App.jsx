import AppHeader from './components/AppHeader/AppHeader';
import AppMainPage from './components/AppMainPage/AppMainPage';
import AppFooter from './components/AppFooter/AppFooter';
import Modal from './components/UI/Modal/Modal';
import AddRecipeForm from './components/AddRecipeForm/AddRecipeForm';
import LoadingScreen from './components/UI/LoadingScreen/LoadingScreen';
import AppLogin from './components/AppLogin/AppLogin';
import { useEffect } from 'react';
import styles from './App.module.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavoritesRecipes } from './store/favorites-actions';
import { fetchRecipes, addRecipe } from './store/recipes-actions';

function App() {
  const [modalAddRecipe, setModalSetRecipe] = useState(false);
  const [favorites, setFavorites] = useState({
    toggleButton: false,
  });
  const dispatch = useDispatch();
  const logStatus = useSelector((state) => state.login);
  const allRecipes = useSelector((state) => state.recipes);
  const favoriteRecipes = useSelector((state) => state.favorites);

  const showModalHandler = () => {
    setModalSetRecipe((prevState) => !prevState);
  };
  const sendRecipesHook = (recipe) => {
    dispatch(addRecipe(recipe));
    getRecipesWithHook();
  };
  const getRecipesWithHook = (category = 'all', time = 'any') => {
    dispatch(
      fetchRecipes({
        byCategory: category,
        byTime: time,
      })
    );
  };
  useEffect(() => {
    getRecipesWithHook();
  }, []);

  const showFavoritesHandler = () => {
    setFavorites((prevState) => {
      return { ...prevState, toggleButton: !prevState.toggleButton };
    });
    dispatch(fetchFavoritesRecipes(logStatus.user.id));
  };
  const userFavoriteRecipes = allRecipes.recipes.filter((recipe) =>
    favoriteRecipes.recipes.includes(recipe.id)
  );
  const editRecipeHandler = (recipe) => {
    showModalHandler();
  };
  return (
    <div className={`${styles['App']}`}>
      {false && <LoadingScreen />}
      {modalAddRecipe && (
        <Modal onClose={showModalHandler}>
          <AddRecipeForm
            showModalHandler={showModalHandler}
            sendRecipesHook={sendRecipesHook}
          />
        </Modal>
      )}
      <AppHeader
        showFavoriteRecipesHandler={showFavoritesHandler}
        addRecipeHandler={showModalHandler}
        getFilterValues={getRecipesWithHook}
        isLogged={logStatus.isLogged}
        isAdmin={logStatus.isAdmin}
      />

      {!logStatus.isLogged && <AppLogin />}
      {logStatus.isLogged && (
        <AppMainPage
          //editRecipeHandler={showModalHandler}
          cardToRender={allRecipes.recipes}
          favoriteCards={userFavoriteRecipes}
          favoriteIsPressed={favorites.toggleButton}
        />
      )}

      <AppFooter />
    </div>
  );
}

export default App;
