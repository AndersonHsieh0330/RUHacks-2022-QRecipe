import React, { useState, useEffect, useContext } from 'react';
import CookingMethodList from '../Cooking/CookingMethodsList';
import NewMethod from '../Cooking/NewMethod.js';
import Recipe from '../Cooking/Recipe';
import QRCodeGenerator from '../QRCode/QRCodeGenerator.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const INITIAL_METHODS = [
  {
    id: "e1",
    name: "Toilet Paper",
    ingredients: "crab, lobster, fish"
   
  },
  { id: "e2", name: "New TV",  ingredients: "crab, lobster, fish" },
  {
    id: "e3",
    name: "Car Insurance",
    ingredients: "crab, lobster, fish",
  },
  {
    id: "e4",
    name: "New Desk (Wooden)",
    ingredients: "crab, lobster, fish",
  },
];

const Layout = (props) => {
  
  const OS_API_KEY = "FybBxfdAZ9tshVCkr2";
  const OS_API_SECRET = "i0rMx21izP3OGslQ5k8iwSYd";
  const OS_PROJECT_ID = "95786b59-0362-4afb-a909-33a641fc8a53";
  const [accessToken, editAccessToken] = useState("");
  const [methods,setMethods] = useState([]);
  const [recipeName,setRecipeName] = useState('')
  const [id,setID] = useState('');
  const [isLoaded,setIsLoaded] = useState(false);
  
  if(Object.entries(useParams()).length!=0 && isLoaded == false){
      setID(useParams().id);
      let base = 'http://localhost:3001/';
      let url = base.concat(useParams().id);
      console.log(url);
      axios.get(url)
      .then((res)=>{
        setMethods(res.data.cooking_methods);
        setRecipeName(res.data.recipe_name);
      })
      .catch((err)=>{
        setRecipeName('No Recipe Found')
      })
      setIsLoaded(true);
  }
  
  
  const addMethodHandler = (newMethodData) =>{
    setMethods((prevMethods)=>{
        return [...methods,newMethodData];
    });
  };

  const deleteMethodHandler = (methodId) =>{
    console.log('bob')
    setMethods((prevMethods)=>{
      return methods.filter(method=>method.id!=methodId);
    })
  }

  const recipeNameHandler = (recipeName) =>{
    setRecipeName(recipeName);
  }
  return (
    <div>
      <Recipe methods={methods} recipe={recipeName} deleteMethod={deleteMethodHandler} recipeNameHandler= {recipeNameHandler} />
      <NewMethod onAddMethod={addMethodHandler}/>
      <QRCodeGenerator methods={methods} recipe={recipeName}/>
      
    </div>
  );
}


export default Layout;