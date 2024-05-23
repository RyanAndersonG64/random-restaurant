function SelectedMenu({selectedMenu, menuTitle}) {
    return selectedMenu.length > 0 ? (
        <div>
            <h1>{menuTitle}</h1>
            {selectedMenu.map(item => {
                console.log('Menu Item =  ' + item.item)
                return (
                    <div key = {item.id}>
                        <div>
                            <h5>{ item.item }</h5>
                            {/* add price to above line (right of h5)*/}
                        </div>
                        <div>
                            {/* { item.description } */}
                            Spice level: {item.spice} <br></br>
                            Allergens: {item.allergens. join(', ')}
                            <br></br>
                            <br></br>
                        </div>
                    </div>
                )
            })}
        </div>
    ) : (
            <div><img src = 'https://http.cat/102'></img></div>
          )
}
// const MenuItemsList = ({ MenuItems }) => {
//   return MenuItems.length > 0 ? (
//     <div>
//       <h2>Menu</h2>
//       {MenuItems.map (inst => {
//         return (
//           <div key={inst.id}>
//             {inst.id} - {inst.name}
//           </div>
//         )
//       })}
//     </div>
//   ) : (
//     <div><img src = 'https://http.cat/102'></img></div>
//   )
// }


export default SelectedMenu