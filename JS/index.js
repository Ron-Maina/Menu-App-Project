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

    
    //Fetch Handlers
    //Render best food cards
    function renderBestFoods(data){
        data.slice(0,6).forEach(item => {
            let bestFoods = document.createElement('div')
            bestFoods.className = 'best'
            bestFoods.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.dsc}</p>
            <P>Rating: ${item.rate}</p>`
            document.querySelector('#best-foods').appendChild(bestFoods)
        });
    }

    //Render Menu Categories
    function renderMenuCategories(data){
        let categories = Object.keys(data)
        categories.forEach(item => {
            let category = document.createElement('p')
            category.className = "category"
            category.innerText = item
            document.querySelector('#category-cards').appendChild(category)

            category.addEventListener('click', (e) => {
                console.log(e.target)
            })
        })
    }
    
})