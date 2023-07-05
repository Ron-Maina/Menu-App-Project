document.addEventListener('DOMContentLoaded', () => {
    let original = document.querySelector('main').innerHTML
   

    //Form event listener
    function searchBar(){
        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault()
            let searchItem = e.target.name.value
            console.log(searchItem)
            e.target.reset()
            renderSelectedCategory(searchItem)
        })
    }
    searchBar()


    //Fetch Requests
    //Fetch best foods
    const fetchBestFoods = function (){
        fetch('https://free-food-menus-api-production.up.railway.app/best-foods')
        .then(res => res.json())
        .then(bestFoodsData => renderBestFoods(bestFoodsData))
    }
    fetchBestFoods()

    //Fetch Menu Categories
    function fetchMenuCategories(){
        fetch('https://free-food-menus-api-production.up.railway.app/pagination')
        .then(res => res.json())
        .then(menuCategoriesData => renderMenuCategories(menuCategoriesData))

    }
    fetchMenuCategories()
    
    
    
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
        //Fetch meals of selected category
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
            <div class="rating">
            <i class="inactive fa fa-star-o" style="font-size:24px"></i>
            <i class="inactive fa fa-star-o" style="font-size:24px"></i>
            <i class="inactive fa fa-star-o" style="font-size:24px"></i>
            <i class="inactive fa fa-star-o" style="font-size:24px"></i>
            <i class="inactive fa fa-star-o" style="font-size:24px"></i>
            </div>
            <hr>`
            document.querySelector('#content').appendChild(meals)

            let stars = meals.querySelectorAll('.inactive');
            let ratingStars = Array.from(stars);
            console.log(ratingStars)
            addRating(ratingStars)
        }))
        BackToHome()  
    }

    //Function to handle rating of meals
    function addRating(stars){
        const inactiveStar = "inactive fa fa-star-o" 
        const activeStar = "active fa fa-star-o"
        const length = stars.length
        let i
        stars.map(star => star.addEventListener('click', () => {
            i = stars.indexOf(star)
            if (star.className===inactiveStar){
                for(i; i>=0; --i){
                    stars[i].className = activeStar;
                } 
            }else{
                for(i; i < length; ++i){
                    stars[i].className = inactiveStar
                }
            }
        }))
    }



    //Render home page after selecting back button
    function BackToHome(){
        document.querySelector('button').addEventListener('click', () => {
            document.querySelector('header').remove()
            document.querySelector('#content').remove()
            let DefaultPage = document.querySelector('main')
            DefaultPage.className = "default"
            DefaultPage.innerHTML = `${original}`
            fetchBestFoods()
            fetchMenuCategories() 
            searchBar()   
        })
    }

    
})