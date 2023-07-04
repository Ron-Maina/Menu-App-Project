document.addEventListener('DOMContentLoaded', () => {

    //Form event listener
    document.querySelector('form').addEventListener('submit', handleSubmit)

    //Submit handler 
    function handleSubmit(e){
        e.preventDefault()
        let searchItem = e.target.name.value
        console.log(searchItem)
        e.target.reset()
        renderCategoryItems(searchItem)
    }

    //Fetch Requests
    //Fetch best foods
    fetch('https://free-food-menus-api-production.up.railway.app/best-foods')
    .then(res => res.json())
    .then(data => renderBestFoods(data))

    //Fetch Menu Categories
    fetch('https://free-food-menus-api-production.up.railway.app/pagination')
    .then(res => res.json())
    .then(data => renderMenuCategories(data))

    
    
})