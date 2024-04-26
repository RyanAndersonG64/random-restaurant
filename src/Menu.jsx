import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react"
import SelectedMenu from "./SelectedMenu"

async function getMenu({ getFullMenu, getBreakfast, getLunch, getDinner, getApps, getDrinks}){
    try {
        let menuItems = await axios.get("https://raw.githubusercontent.com/bootcamp-students/random-restaurant-json/main/foodList.json");
        const data = await menuItems.data;
        getFullMenu(data)
        const breakfast = await menuItems.data.filter(item => item.category === 'Breakfast')
        getBreakfast(breakfast)
        const lunch = await data.filter(item => item.category === 'Lunch')
        getLunch(lunch)
        const dinner = await data.filter(item => item.category === 'Dinner')
        getDinner(dinner)
        const appetizers = await data.filter(item => item.category === 'Appetizer')
        getApps(appetizers)
        const drinks = await data.filter(item => item.category === 'Drink')
        getDrinks(drinks)
    } catch (error) {
        ;
    }
};

function Menu() {
  const [menu, getFullMenu] = useState([])
  const [breakfastMenu, getBreakfast] = useState([])
  const [lunchMenu, getLunch] = useState([])
  const [dinnerMenu, getDinner] = useState([])
  const [appMenu, getApps] = useState([])
  const [drinkMenu, getDrinks] = useState([])
  const [selectedMenu, setSelectedMenu] = useState([])
  useEffect(() => {
    getMenu({getFullMenu, getBreakfast, getLunch, getDinner, getApps, getDrinks})
  }, [])


    return (
      <div className="p-5">
        
        <button
          onClick = {() => setSelectedMenu(breakfastMenu)}
        >
          Breakfast
        </button>
        
        <button
          onClick = {() => setSelectedMenu(lunchMenu)}
        >
          Lunch
        </button>

        <button
          onClick = {() => setSelectedMenu(dinnerMenu)}
        >
          Dinner
        </button>
        
        <button
          onClick = {() => setSelectedMenu(appMenu)}
        >
          Appetizers
        </button>
        
        <button
          onClick = {() => setSelectedMenu(drinkMenu)}
        >
          Drinks
        </button>
        
        {selectedMenu.length > 0 ? (
          <SelectedMenu selectedMenu = {selectedMenu} menuTitle={selectedMenu[0].category + ' Menu'}/>
        ) : null}
      </div>
    )
  }

export default Menu

