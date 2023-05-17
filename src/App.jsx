import AppHeader from './components/AppHeader/AppHeader';
import AppMainPage from './components/AppMainPage/AppMainPage';
import AppFooter from './components/AppFooter/AppFooter';
import Modal from './components/UI/Modal/Modal';
import RecipeForm from './components/RecipeForm/RecipeForm';
import AppLogin from './components/AppLogin/AppLogin';
import NotificationToast from './components/UI/NotificationToast/NotificationToast';
import AppRegister from './components/AppRegister/AppRegister';
import LoadingScreen from './components/UI/LoadingScreen/LoadingScreen';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavoritesRecipes } from './store/favorites-actions';
import {
  fetchRecipes,
  addRecipe,
  editRecipe,
  deleteRecipe,
} from './store/recipes-actions';

import styles from './App.module.scss';

function App() {
  const [modalAddRecipe, setModalSetRecipe] = useState(false);
  const [modalEditRecipe, setModalEditRecipe] = useState({
    toggleButton: false,
    valueToShow: '',
  });

  const [favorites, setFavorites] = useState({
    toggleButton: false,
  });

  const [register, setRegister] = useState({
    toggleButton: false,
  });

  const dispatch = useDispatch();
  const logStatus = useSelector((state) => state.login);

  const allRecipes = useSelector((state) => state.recipes);
  const favoriteRecipes = useSelector((state) => state.favorites);
  const notification = useSelector((state) => state.notifications);

  const userFavoriteRecipes = allRecipes.recipes
    .filter((recipe) => favoriteRecipes.recipes.includes(recipe.id))
    .map((recipe) => ({ ...recipe, isFavorite: true }));
  /**
   * Chekea que recetas deberia marcar en la pagina principal como favoritas
   */
  const recipesWithFavStatus = allRecipes.recipes.map((recipe) => {
    if (favoriteRecipes.recipes.includes(recipe.id)) {
      return { ...recipe, isFavorite: true };
    } else {
      return { ...recipe, isFavorite: false };
    }
  });
  //console.log(allRecipes);
  console.log(recipesWithFavStatus);

  const showModalHandler = () => {
    setModalSetRecipe((modalPrevState) => !modalPrevState);
  };

  const sendRecipesHook = (recipe) => {
    dispatch(addRecipe(recipe));
    getRecipesWithHook();
  };

  const getRecipesWithHook = (byCategory = 'all', byTime = 'any') => {
    dispatch(
      fetchRecipes({
        byCategory,
        byTime,
      })
    );
  };

  const showFavoritesHandler = () => {
    setFavorites((prevState) => {
      return { ...prevState, toggleButton: !prevState.toggleButton };
    });
    dispatch(fetchFavoritesRecipes(logStatus.user.id));
  };
  const showRegisterHandler = () => {
    setRegister((prevState) => {
      return { ...prevState, toggleButton: !prevState.toggleButton };
    });
  };
  const showModalEditHandler = () => {
    setModalEditRecipe((prevState) => {
      return { ...prevState, toggleButton: !prevState.toggleButton };
    });
  };
  const infoModalEditHandler = (item) => {
    showModalEditHandler();
    setModalEditRecipe((prevState) => {
      return { ...prevState, valueToShow: item };
    });
  };

  const editRecipeHandler = (recipe) => {
    dispatch(editRecipe({ ...recipe, id: modalEditRecipe.valueToShow.id }));
    getRecipesWithHook();
  };

  const deleteOneRecipeHandler = (recipeId) => {
    dispatch(deleteRecipe(recipeId));
    getRecipesWithHook();
  };
  useEffect(() => {
    getRecipesWithHook();
  }, []);
  /*   useEffect(() => {
    dispatch(fetchFavoritesRecipes(logStatus.user.id));
    //addFavoriteStatusToRecipes();
  }, [logStatus.isLogged]); */
  return (
    <div className={`${styles['App']}`}>
      {notification.notificationIsDeployed && (
        <NotificationToast
          title={notification.notificationInfo.title}
          status={notification.notificationInfo.status}
          isDeployed={notification.notificationIsDeployed}
        />
      )}
      {notification.isLoading && <LoadingScreen />}

      {modalAddRecipe && (
        <Modal onClose={showModalHandler}>
          <RecipeForm
            showModalHandler={showModalHandler}
            sendRecipesHook={sendRecipesHook}
          />
        </Modal>
      )}

      {modalEditRecipe.toggleButton && (
        <Modal onClose={showModalEditHandler}>
          <RecipeForm
            setEditValues={modalEditRecipe.valueToShow}
            sendRecipesHook={editRecipeHandler}
            showModalHandler={showModalEditHandler}
          />
        </Modal>
      )}
      <AppHeader
        showFavoriteRecipesHandler={showFavoritesHandler}
        addRecipeHandler={showModalHandler}
        getFilterValues={getRecipesWithHook}
        favoriteIsPressed={favorites.toggleButton}
        isLogged={logStatus.isLogged}
        isAdmin={logStatus.isAdmin}
      />

      {!logStatus.isLogged && !register.toggleButton && (
        <AppLogin setRegister={showRegisterHandler} />
      )}
      {register.toggleButton && (
        <AppRegister setRegister={showRegisterHandler} />
      )}

      {logStatus.isLogged && (
        <AppMainPage
          editRecipeHandler={infoModalEditHandler}
          deleteRecipeHandler={deleteOneRecipeHandler}
          cardToRender={logStatus.isLogged ? recipesWithFavStatus : []}
          favoriteCards={userFavoriteRecipes}
          favoriteIsPressed={favorites.toggleButton}
        />
      )}

      <AppFooter />
    </div>
  );
}

export default App;
