const form = document.querySelector('#searchform');
form.addEventListener('submit', async function(e){
    e.preventDefault();
    const searchterm = form.elements.query.value;
    const config = { params: {q: searchterm} }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config );
    makeImages(res.data)
    form.elements.query.valuev = '';
})

const makeImages = (shows) =>{
    for(let result of shows){
        if(result.show.image){
            console.log(result)
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img)
        }    
    }
}

