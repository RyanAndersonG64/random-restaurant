function SelectedMenu({selectedMenu, menuTitle}) {
    return (
        <div>
            <h1>{menuTitle}</h1>
            {selectedMenu.map(item => {
                return (
                    <div>
                        <div>
                            <h5>{ item.title }</h5> { item.price }
                        </div>
                        <div>
                            { item.description }
                            <br></br>
                            <br></br>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default SelectedMenu