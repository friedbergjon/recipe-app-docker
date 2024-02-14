import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID} from '../hooks/useGetUserID.js';


export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);

    const userID = useGetUserID();
    useEffect(() => {


        const fetchSavedRecipe = async() => {
            try{
                const response = await axios.get(`http://localhost:5000/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
            };
    

    fetchSavedRecipe();

    }, []);


    return <div>
        <h1 className="recipes-home-title"> Saved Recipes </h1> 
        <ul>
            {savedRecipes.map((recipe) => (
                <li key = {recipe._id}>  
                    <div>
                      <h2>{recipe.name}</h2>  
                    </div>
                    <div className="ingredients">
              <p>{recipe.ingredients + ","}</p>
            </div>
                    <div className="instructions">
                    <p>{recipe.instructions}</p>
                    <img src = {recipe.imageUrl} alt = {recipe.name}></img>
                    <p> Cooking Time: {recipe.cookingTime} minutes </p>
                    </div>
                </li>
            ) )}</ul></div>;
}