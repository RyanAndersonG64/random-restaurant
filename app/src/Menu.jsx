import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react"
import SelectedMenu from "./SelectedMenu"


let fullMenu = true
const NewMenuItem = ({ getMenu })


async function getMenu({ setFullMenu, setSoupMenu, setSaladMenu, setEntreeMenu, setAppMenu, setDrinkMenu, setSideMenu, setDessertMenu, setKidsMenu}){
    try {
        let menuItems = await axios.get("http://127.0.0.1:8000/menuitems/");
        const data = await menuItems.data;

        setFullMenu(data)
        const soup = await data.filter(item => item.category === 'Soup')
        setSoupMenu(soup)
        const salad = await data.filter(item => item.category === 'Salad')
        setSaladMenu(salad)
        const entrees = await data.filter(item => item.category === 'Entree')
        setEntreeMenu(entrees)
        const appetizers = await data.filter(item => item.category === 'Appetizer')
        setAppMenu(appetizers)
        const drinks = await data.filter(item => item.category === 'Drink')
        setDrinkMenu(drinks)
        const sides = await data.filter(item => item.category === 'Side')
        setSideMenu(sides)
        const desserts = await data.filter(item => item.category === 'Dessert')
        setDessertMenu(desserts)
        const kids = await data.filter(item => item.category === "Kid's Entree")
        setKidsMenu(kids)
    } catch (error) {
        ;
    }
};

function Menu() {
  const [fullMenu, setFullMenu] = useState([])
  const [soupMenu, setSoupMenu] = useState([])
  const [saladMenu, setSaladMenu] = useState([])
  const [entreeMenu, setEntreeMenu] = useState([])
  const [appMenu, setAppMenu] = useState([])
  const [drinkMenu, setDrinkMenu] = useState([])
  const [sideMenu, setSideMenu] = useState([])
  const [dessertMenu, setDessertMenu] = useState([])
  const [kidsMenu, setKidsMenu] = useState([])
  const [menuTitle, setMenuTitle] = useState([])
  
  const [selectedMenu, setSelectedMenu] = useState([])

  useEffect(() => {
    getMenu({setFullMenu, setSoupMenu, setSaladMenu, setEntreeMenu, setAppMenu, setDrinkMenu, setSideMenu, setDessertMenu, setKidsMenu})
  }, [])


    return (
      <div className="p-5">
        <button>
        <a href = './OrderScreen'>Place an Order</a>
        </button>
        <br></br><br></br><br></br>

        <button
          onClick = {() => {
            setSelectedMenu([])
            setMenuTitle('Full Menu')
          }}
        >
          Full Menu
        </button>

        <br></br>

        <button
          onClick = {() => {
            setSelectedMenu(drinkMenu)
            setMenuTitle('Drinks')
          }}
        >
          Drinks
        </button>

        <button
          onClick = {() => {
            setSelectedMenu(appMenu)
            setMenuTitle('Appetizers')
          }}
        >
          Appetizers
        </button>

        <button
          onClick = {() => {
            setSelectedMenu(soupMenu)
            setMenuTitle('Soup')
          }}
        >
          Soup
        </button>
        
        <button
          onClick = {() => {
            setSelectedMenu(saladMenu)
            setMenuTitle('Salad')
          }}
        >
          Salad
        </button>

        <br></br>

        <button
          onClick = {() => {
            setSelectedMenu(entreeMenu)
            setMenuTitle('Entrees')
          }}
        >
          Entrees
        </button>
        
        <button
          onClick = {() => {
            setSelectedMenu(sideMenu)
            setMenuTitle('Sides')
          }}
        >
          Sides
        </button>

        <button
          onClick = {() => {
            setSelectedMenu(dessertMenu)
            setMenuTitle('Dessert')
          }}
        >
          Dessert
        </button>

        <button
          onClick = {() => {
            setSelectedMenu(kidsMenu)
            setMenuTitle('Kids Menu')
          }}
        >
          Kids Menu
        </button>


        
        
        {selectedMenu.length > 0 ? (
          <SelectedMenu selectedMenu = {selectedMenu} menuTitle={menuTitle}/>
        ) : <SelectedMenu selectedMenu = {fullMenu} menuTitle={'Full Menu'}/>}
      </div>
    )
  }

export default Menu

