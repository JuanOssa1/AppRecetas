import AppHeader from './components/AppHeader/AppHeader';
import AppMainPage from './components/AppMainPage/AppMainPage';
import AppFooter from './components/AppFooter/AppFooter';
import Modal from './components/UI/Modal/Modal';
import Input from './components/UI/Input/Input';
import Select from './components/UI/Select/Select';
import Button from './components/UI/Button/Button';
import useFetch from './hooks/use-fetch';
import * as constants from './constants/constants';
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
  const sendRecipesHook = (recipe) => {
    sendRequest({
      url: 'https://lasrecetasdejuan-d17ba-default-rtdb.firebaseio.com/recipes.json',
      method: 'POST',
      body: recipe,
    });
  };
  const showModalHandler = () => {
    setModalSetRecipe((prevState) => !prevState);
  };

  useEffect(() => {
    getRecipesHook();
  }, []);
  return (
    <div className={`${styles['App']}`}>
      {modalAddRecipe && (
        <Modal onClose={showModalHandler}>
          <section className={`${styles['modal-form']}`}>
            <div className={`${styles['modal-form__left']}`}>
              <Input
                className={`${styles['input-recipe']}`}
                label="Nombre de la receta"
              />

              <Select
                className={`${styles['select-category']}`}
                defaultOption="Choose category"
                id="categories"
                options={Object.values(constants.categories)}
              />
              <Select
                className={`${styles['select-time']}`}
                defaultOption="Choose time"
                id="CookingTime"
                options={Object.values(constants.cookingTime)}
              />
              <Input
                className={`${styles['input-image']}`}
                label="Link de imagen"
              />
            </div>
            <div className={`${styles['modal-form__left']}`}>
              <Input
                className={`${styles['input-steps']}`}
                label="Pasos de la receta"
              />
              <Button onClick={showModalHandler} content="Agregar" />
            </div>
          </section>
        </Modal>
      )}
      <AppHeader addRecipeHandler={showModalHandler} />
      <AppMainPage cardToRender={recipes} sendRecipes={sendRecipesHook} />
      <AppFooter />
    </div>
  );
}

export default App;
