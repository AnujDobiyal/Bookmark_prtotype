function createCategory(categoryName){
    let div_box = document.createElement('div')
    div_box.className = "box"
    div_box.id = categoryName

    let title = document.createElement('div')
    title.className = "title"
    title.innerHTML = categoryName    

    div_box.append(title)

    let input_box = document.createElement('div')
    input_box.className = 'inputBox'


    yt_name = document.createElement('input')
    yt_link = document.createElement('input')
    yt_name.className = "yt"
    yt_name.id = categoryName+"_ytname"
    yt_link.className = "yt"
    yt_link.id = categoryName+"_ytlink"

    let btn_box = document.createElement('div')

    yt_add = document.createElement('button')
    yt_add.innerHTML = "Add"
    let del = document.createElement('button')
    del.innerHTML = "Delete"

    input_box.append(yt_name)
    input_box.append(yt_link)

    
    btn_box.append(yt_add)
    btn_box.append(del)
    input_box.append(btn_box)

    div_box.append(input_box)

    if(JSON.parse(localStorage.getItem(categoryName)) !== null){
        for (let i = 0; i < JSON.parse(localStorage.getItem(categoryName)).length; i++) {
            addChannels(JSON.parse(localStorage.getItem(categoryName))[i]['name'], JSON.parse(localStorage.getItem(categoryName))[i]['link'], div_box, categoryName)
        }
    }
    yt_add.addEventListener('click', ()=>{
        addChannels(document.getElementById(categoryName+"_ytname").value, document.getElementById(categoryName+"_ytlink").value, div_box, categoryName)

        if(localStorage.getItem(categoryName) === 0){
            localStorage.setItem(key, "")
        }
        let value = localStorage.getItem(categoryName)
        if (value) {
            value = JSON.parse(value)
            console.log(value)
        }

        localStorage.setItem(categoryName, JSON.stringify([...value, {name: document.getElementById(categoryName+"_ytname").value,  link: document.getElementById(categoryName+"_ytlink").value}]))

        document.getElementById(categoryName+"_ytname").value = ""
        document.getElementById(categoryName+"_ytlink").value = ""
    })

    del.addEventListener('click', ()=>{
        localStorage.removeItem(categoryName)
        div_box.remove()
    })

    document.querySelector(".container").append(div_box)
}

function addChannels(channelName, channelLink, box, categoryName){
    let youtuber_div = document.createElement('div')
    youtuber_div.className = 'youtuber_box'

    let youtuber = document.createElement('a')
    youtuber.className = "youtuber"
    youtuber.innerHTML = channelName
    youtuber.href = channelLink
    youtuber.target = '_blank'

    let yt_del = document.createElement('button')
    yt_del.innerHTML = "Delete"

    yt_del.addEventListener('click', ()=>{
        let value = JSON.parse(localStorage.getItem(categoryName))
        localStorage.setItem(categoryName, JSON.stringify(value.filter(item => item.link != channelLink)))
        youtuber_div.remove()
    })

    youtuber_div.append(youtuber)
    youtuber_div.append(yt_del)
    box.append(youtuber_div)
}

function keyRemover(){
    for(i = 0; i< removeKey.length; i++){
        localStorage.removeItem(removeKey[i])
    }
    removeKey = []
}

let removeKey = []
for (let i = 0; i < localStorage.length; i++) {
    if(localStorage.getItem(localStorage.key(i)) !== '' && localStorage.getItem(localStorage.key(i)) !== '[]')
    {
        createCategory(localStorage.key(i));
    }
    else{
        removeKey.push(localStorage.key(i))
    }
}

keyRemover()

document.getElementById("addCategory").addEventListener('click', ()=>{
    let key = document.getElementById('category').value
    if(document.getElementById(key) === null){
        createCategory(key)
        localStorage.setItem(key, [""])
        document.getElementById('category').value = ""
    }
})