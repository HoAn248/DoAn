let url= "https://6172867761ed900017c40927.mockapi.io/api-register/Css"
let list = document.querySelector('ul')
let test ;
fetch(url)
.then(rsp => rsp.json())
.then(data => {
    data.forEach(e => {
        list.innerHTML = list.innerHTML +  `<li> ${e.TieuDe} </li>`
    });
    list.onclick = (e)=>{
        test = e.target.innerText
        console.log(test)
        data.forEach((sc)=>{
            if(sc.TieuDe === test){
                document.querySelector('#lt').textContent = `${sc.LyThuyet}`
                document.querySelector('#video').src = `${sc.Video}`
            }
        })
    }
})

