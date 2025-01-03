import { useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';



export const CreateRecipe = () =>{
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
        
    });


    const navigate = useNavigate()

    const handleChange = (event) => {
        const  { name, value } = event.target;
        setRecipe({...recipe, [name]: value });
    };


    const handleIngredientChange = (event, idx) => {
        const  { value } = event.target;
        const ingredients = [...recipe.ingredients];
        ingredients[idx] = value;
        setRecipe({ ...recipe, ingredients });
    };

    const addIngredient = () => {
        const ingredients = [...recipe.ingredients, ""];
        setRecipe({ ...recipe, ingredients });
    };

   const onSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post("http://3.137.63.137:5000/api/recipes", { ...recipe },
        { headers: { authorization: cookies.access_token }});
        alert ("Recipe Created");
        navigate("/");
     } catch (err){
            console.error(err);
    }
   };
    return (
    <div className = "create-recipe"> 
    <h2 className = "create-recipe-title">Create Recipe</h2> 
    <form onSubmit = {onSubmit}>
        <label htmlFor= "name">Name</label>
        <input type="text" id="name" className="textarea-create-recipe" name = "name"  onChange={handleChange}/>
        <label className="textarea-create-recipe" htmlFor= "ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
            <input key={idx} type="text" name="ingredients" value= {ingredient} onChange = {(event) => handleIngredientChange(event, idx)}
            />
        ))}
    <button onClick={addIngredient} type="button"> Add Ingredient</button>
        <label htmlFor= "instructions">Instructions</label>

        <textarea className="textarea-create-recipe" 
        id="instructions" name="instructions" value={recipe.instructions} onChange={handleChange}></textarea>

        <label className="textarea-create-recipe" htmlFor= "imageUrl">ImageURL</label>
        <input type="text" id="imageUrl" name="imageUrl" 
        onChange={handleChange}/>
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input className="textarea-create-recipe" type="number" id="cookingTime" name="cookingTime" 
        onChange={handleChange}/>
        <button className = "create-recipe-button" type="submit"> Create Recipe </button>
    </form>
    </div>
)};


