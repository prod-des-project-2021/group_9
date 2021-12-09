
import React, { useState, useEffect } from 'react';

const ShoppingList = () => {

    //lisää tänne lista statemuuttuja kato mallia myrecipes
    const [shopperList, setShopperList] = useState([{id:0, amount:1, unit:"tbsp", name:"test"}, {id:0, amount:1, unit:"", name:"laakerinlehti"}]);
    

    const fetchData = async() => {
    
        const response = await fetch("");
        response
            .json();
    }

    useEffect(() => {
        fetchData();
        }, []);
//useeffect

//fetch data

    const addToShoppingList = async(name, amount, unit) => {
        try {

        const response= await fetch("", { 
            method:"POST", 
            body: JSON.stringify({
                name: name,
                amount: amount,
                unit: unit,
            }),

            headers: {
                "Content-type": "application/json",
            },
        });
 
        let data = await response.json();
        alert("Ingredient added to shopping list");
        } catch (err) {
            alert("Something went wrong.")
        }
    }

   /*  const removeFromShoppingList = async(name, amount, unit) => {
        try {
            const response = await fetch("", {
                method: "DELETE",
                /* body: JSON.stringify({ 
                    name:name,
                    amount:amount,
                    unit:unit, */
            /* });

            await response.json()
            fetchData();
            props.history.push("/");
            } catch (err) {
            alert("Error: somethingwent wrong");
        }
    }  */

    const deleteIngredient = (ingredient) => () => {
        //delete ingredient
        console.log(ingredient)
    } //then litania jossa poistetaan ingredient frontendista.


    return(
        <div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-auto bg-yellow-100 shadow-xl ">
            
            <table className="table-auto w-full">
                <tbody className="divide-y">
                {shopperList.map((ingredient)=>(
                        
                        <tr className="w-full bg-blue-200" key={ingredient.id}>
                        <td className="w-1/5 p-2 text-right">{ingredient.amount} {ingredient.unit}</td>
                        <td className="w-3/5 p-2">{ingredient.name}</td>
                        <td className="w-1/5"> <button className="text-right" type="submit" onClick={deleteIngredient(ingredient)}> Remove </button></td>
                        </tr>
                
                ))}
                </tbody>s
            </table>
            </div>
        </div>
    );
};

//popupkoodi tailwind.css
//add ingredient
//remove ingredient
//statemuuttuja ingredient-listalle

//delete shoppinglist

export default ShoppingList;