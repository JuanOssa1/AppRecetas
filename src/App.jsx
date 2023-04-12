import AppHeader from './components/AppHeader/AppHeader';
import AppMainPage from './components/AppMainPage/AppMainPage';
import AppFooter from './components/AppFooter/AppFooter';
import Modal from './components/UI/Modal/Modal';
import AddRecipeForm from './components/AddRecipeForm/AddRecipeForm';
import useFetch from './hooks/use-fetch';
import { useEffect } from 'react';
import styles from './App.module.scss';
import { useState } from 'react';

function App() {
  const [modalAddRecipe, setModalSetRecipe] = useState(false);
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
  const showModalHandler = () => {
    setModalSetRecipe((prevState) => !prevState);
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
    <div className={`${styles['App']}`}>
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
