document.addEventListener('DOMContentLoaded', () => {

    //Form event listener
    document.querySelector('form').addEventListener('submit', handleSubmit)

    //Submit handler 
    function handleSubmit(e){
        e.preventDefault()
        let searchItem = e.target.name.value
        console.log(searchItem)
        e.target.reset()
        renderSelectedCategory(searchItem)
    }

    //Fetch Requests
    //Fetch best foods
    fetch('https://free-food-menus-api-production.up.railway.app/best-foods')
    .then(res => res.json())
    .then(bestFoodsData => renderBestFoods(bestFoodsData))

    //Fetch Menu Categories
    fetch('https://free-food-menus-api-production.up.railway.app/pagination')
    .then(res => res.json())
    .then(menuCategoriesData => renderMenuCategories(menuCategoriesData))

    
    
    
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
            
            category.addEventListener('click', () => {
                let selection = category.innerText
                renderSelectedCategory(selection)
            })
            
            
        })
    }

    //Render the menu items for the selected category
    function renderSelectedCategory(selection){
        let content = document.querySelector('#content')
        content.innerHTML=''
        content.innerHTML='<button>To Home</button>'
        //Fetch meals from selected category
        fetch(`https://free-food-menus-api-production.up.railway.app/${selection}`)
        .then(res => res.json())
        .then(data => data.slice(0,10).forEach(item => {
            let meals = document.createElement('div')
            meals.className = 'meals'
            meals.innerHTML=`
            <h3>${item.name}</h3>
            <p>Description: ${item.dsc}</p>
            <p>From: ${item.country}</p>
            <p>Price: $${item.price}</p>
            <hr>`
            document.querySelector('#content').appendChild(meals)
        }))
        document.querySelector('button').addEventListener('click', () => {
            document.querySelector('#content').innerHTML=''
            renderBestFoods(bestFoodsdata)
            renderMenuCategories(menuCategoriesdata)
        })
        
    }

    
})