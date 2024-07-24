import { Link } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react"
import SelectedMenu from "./SelectedMenu"


const NewAllergen = ({ getAllergens })

async function getAllergens({ setAllergen, setMenu }) {
    try {
        const allergenApi = await axios.get("http://127.0.0.1:8000/allergens/");
        const menuApi = await axios.get("http://127.0.0.1:8000/menuitems/");
        const allergenData = await allergenApi.data
        const menuData = await menuApi.data
        setAllergen(allergenData)
        setMenu(menuData)
    } catch (error) {
        ;
    }
}

function AllergenInfo() {
    const [selectedAllergen, setAllergen] = useState([])
    const [menu, setMenu] = useState([])
    const [selectedMenu, setSelectedMenu] = useState([])
    const [menuTitle, setMenuTitle] = useState([])

    useEffect(() => {
        getAllergens({ setAllergen, setMenu })
    }, [])

    return (
        <div className="p-5">
            <label htmlFor="allergens">Select an allergen:</label>
            <select id="allergens" name="allergens" onChange={(e) => {
 
                setSelectedMenu(menu.filter(menuItem => !menuItem.allergens.includes(e.target.value)))
                if (e.target.value === 'None') {
                    setMenuTitle('All Items with Allergens')
                } else {
                    setMenuTitle(e.target.value + '-free Items')
                }
            }
            }
            >
                {selectedAllergen.map(item => {
                    return (
                        <option key={item.id} value={item.name}>{item.name}</option>
                    )
                })}
            </select>
            {selectedMenu.length > 0 ? (
                <SelectedMenu selectedMenu={selectedMenu} menuTitle={menuTitle} />
            ) : <SelectedMenu selectedMenu={menu} menuTitle={'Full Menu'} />}
        </div>
    )
}

export default AllergenInfo