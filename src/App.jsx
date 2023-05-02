import AppHeader from './components/AppHeader/AppHeader';
import AppMainPage from './components/AppMainPage/AppMainPage';
import AppFooter from './components/AppFooter/AppFooter';
import Modal from './components/UI/Modal/Modal';
import AddRecipeForm from './components/AddRecipeForm/AddRecipeForm';
import AppLogin from './components/AppLogin/AppLogin';
import { useEffect } from 'react';
import styles from './App.module.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavoritesRecipes } from './store/favorites-actions';
import { fetchRecipes, addRecipe, editRecipe } from './store/recipes-actions';
import Transition from 'react-transition-group/Transition';
import NotificationToast from './components/UI/NotificationToast/NotificationToast';
import AppRegister from './components/AppRegister/AppRegister';

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
  const showRegisterHandler = () => {
    setRegister((prevState) => {
      return { ...prevState, toggleButton: !prevState.toggleButton };
    });
  };
  const userFavoriteRecipes = allRecipes.recipes.filter((recipe) =>
    favoriteRecipes.recipes.includes(recipe.id)
  );
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
  return (
    <div className={`${styles['App']}`}>
      {notification.notificationIsDeployed && (
        <NotificationToast
          title={notification.notificationInfo.title}
          status={notification.notificationInfo.status}
          isDeployed={notification.notificationIsDeployed}
        />
      )}

      {modalAddRecipe && (
        <Modal onClose={showModalHandler}>
          <AddRecipeForm
            showModalHandler={showModalHandler}
            sendRecipesHook={sendRecipesHook}
          />
        </Modal>
      )}

      {modalEditRecipe.toggleButton && (
        <Modal onClose={showModalEditHandler}>
          <AddRecipeForm
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
