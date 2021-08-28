document.getElementById('error-message').style.display='none'

const searchFood=()=>{
    const searchField=document.getElementById('search-field');
    const searchText=searchField.value;
    // clear data
    searchField.value='';
    document.getElementById('error-message').style.display='none'
    if(searchText==''){
        return 'please write something.'
    }
    else{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    // console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaySearchResult(data.meals))
    .catch(error =>displayError(error))
    } 
}
const displayError=error=>{
    document.getElementById('error-message').style.display='block'
}

const displaySearchResult=meals=>{
    // console.log(meals)
    const searchResult=document.getElementById('search-result')
    searchResult.textContent='';
    if(meals.length==0){
        
        return 'Result not found'
    }
    for (const meal of meals){
        // console.log(meal)
        const searchResult=document.getElementById('search-result');
        const div=document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`<div onclick="loadMealDetail(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0,150)}</div>
         
      </div>
        `
        searchResult.appendChild(div)
    }
}
const loadMealDetail=mealId=>{
    // console.log(mealId)
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    // console.log(url)s
    fetch(url)
    .then(res=>res.json())
    .then(data=> desplayMealDetail(data.meals[0]))
}
const desplayMealDetail=meal=>{
const mealDetals=document.getElementById('meal-details')
const div=document.createElement('div')
div.classList.add('card');
div.innerHTML=`<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title"> ${meal.strMeal}</h5>
  <p class="card-text">${meal.strInstructions.slice(0,100)}.</p>
  <a target="blank" href="${meal.strYoutube}" class="btn btn-primary">Youtube</a>
</div>`
mealDetals.appendChild(div)
}