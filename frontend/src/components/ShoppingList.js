
import React, { useState, useEffect, useRef } from 'react';
import service from "../services/shoppinglist";
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/auth'
import { useNavigate } from 'react-router-dom'


const ShoppingList = (props) => {

    //lisää tänne lista statemuuttuja kato mallia myrecipes
    const [shopperList, setShopperList] = useState([]);
    const formRef = useRef()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const fetchData = async() => {

        try {
        
            const response = await service.getShoppingLIst(user.id);
            setShopperList(response.shoppingList)
      
        
            console.log(response)
        }
        catch (err){
            dispatch(logout())
            navigate('/')
            console.log(err)

        }
    }

    useEffect(() => {
        fetchData();
        }, []);


    const addToShoppingList = async(e) => {

        e.preventDefault();
        const elements = formRef.current.elements
        const newIngredient = {

            id: uuidv4(),
            amount: elements[0].value,
            unit: elements[1].value, 
            name: elements[2].value
        }

        console.log(newIngredient)

        
        elements[0].value = ""
        elements[1].value = ""
        elements[2].value = ""

        updateShoppingList(shopperList.concat(newIngredient))
    }

   

    const deleteIngredient = ({id}) => () => {
        //delete ingredient
        const newList = shopperList.filter((ingredient) => ingredient.id !== id)   

        setShopperList(newList);
        updateShoppingList(newList);
    } //then litania jossa poistetaan ingredient frontendista.




    const clearShoppingList = () => {

        
        updateShoppingList([]);

    }

    const updateShoppingList = (shoppinglist) => {
        
        if (user)
            service.update(user.id, shoppinglist);

        setShopperList(shoppinglist)
    }


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
                
                </tbody>
                
                
            </table>

                <div className="flex-row justify-center space-y-2 px-6">
                    <form className="flex-row text-right" onSubmit={addToShoppingList} ref={formRef}>
        
                        <input type= "text" placeholder="amount" />
                        <input type= "text" placeholder="unit" />
                        <input type= "text" placeholder="name" />
                        <button className="w-1/5"> + </button>
                    </form>
                </div>

                <button className="w-1/2" onClick={clearShoppingList}> Clear </button>
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