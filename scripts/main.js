let fullCharList = []
let fullHouseList = []
let characterList = document.querySelector(".accordion")
let count = 1

for(let i = 1; i <= 9; i++){
    fetch(`https://anapioficeandfire.com/api/houses?page=${i}&pageSize=50`)
    .then(response => response.json())
    .then(houseList => {
        fullHouseList = [...fullHouseList, ...houseList]
        if(fullHouseList.length > 440){
            console.log(fullHouseList);
        }
    })
}

for(let i = 1; i <= 43; i++){
    fetch(`https://www.anapioficeandfire.com/api/characters?page=${i}&pageSize=50`)
    .then(response => response.json())
    .then(charList => {
        // fullCharList.concat(charList) //? why does fullCharList.concat(charList) not concatinate the arrays?
        fullCharList = [...fullCharList, ...charList]
        if(fullCharList.length > 2130){
            fullCharList = fullCharList.sort((a, b)=>{
                return parseInt(a.url.slice(49)) - parseInt(b.url.slice(49))
            })
            console.log(fullCharList);
            for(character of fullCharList){
            createCharList(character)
            count++
            }
        }
    })
}

function createCharList(character){
    let accordionDiv = createEl("div", "accordion-item", undefined, undefined) // create outer accordion div
    let accordionH2 = createEl("h2", "accordion-header", undefined, undefined) // create inner accordion h2
    let accordionButton = document.createElement("button") // create innermost accordion button
    accordionButton.setAttribute("class", "accordion-button collapsed flex-column")
    accordionButton.setAttribute("type", "button")
    accordionButton.setAttribute("data-bs-toggle", "collapse")
    accordionButton.setAttribute("data-bs-target", `#id${count}`)
    accordionH2.append(accordionButton)
    accordionDiv.append(accordionH2)
    let collapseDiv = document.createElement("div")
    if(character.name.length != 0){
        let nameDiv = createEl("div", undefined, undefined, `Name: ${character.name}`)
        accordionButton.append(nameDiv)
    }
    if(character.aliases[0] != ""){
        let aliaseDiv = createEl("div", undefined, undefined, `Alias: ${character.aliases[0]}`)
        accordionButton.append(aliaseDiv)
        if(character.aliases.length > 1){
            let akaDiv = createEl("div", undefined, undefined, "AKA: ")
            // let akaDiv = document.createElement("div")
            // akaDiv.textContent = "AKA: "
            for(let i = 1; i <= character.aliases.length - 2; i++){
                akaDiv.textContent += `${character.aliases[i]}, `
            }
            akaDiv.textContent += character.aliases[character.aliases.length - 1]
            accordionButton.append(akaDiv)
        }
    }
    if(character.allegiances.length == 1){
        let j = parseInt((character.allegiances[0].slice(45) - 1))
        let houseDiv = createEl("div", undefined, undefined, `Allegiance: ${fullHouseList[j].name}`)
        accordionButton.append(houseDiv)
        collapseDiv.setAttribute("id", `id${count}`) 
        collapseDiv.setAttribute("class", "accordion-collapse collapse")
        let houseDataDiv = createEl("div", "accordion-body", undefined, undefined)
        let innerHouseDataDiv = document.createElement("div")
        // create divs to add region, coatOfArms, currentLord, heir, swornMembers,  overlord
        if(fullHouseList[j].region.length != 0){
            let regionDiv = createEl("div", undefined, undefined, `Region: ${fullHouseList[j].region}`)
            innerHouseDataDiv.append(regionDiv)
        }
        if(fullHouseList[j].coatOfArms.length != 0){
            let coatOfArmsDiv = createEl("div", undefined, undefined, `Coat of Arms: ${fullHouseList[j].coatOfArms}`)
            innerHouseDataDiv.append(coatOfArmsDiv)
        }
        if(fullHouseList[j].currentLord.length != 0){
            let currentLordURL = fullHouseList[j].currentLord
            let k = parseInt((currentLordURL.slice(45)-1))
            let currentLordDiv = createEl("div", undefined, undefined, `Lord: ${fullCharList[k].name}`)
            innerHouseDataDiv.append(currentLordDiv)
        }
        if(fullHouseList[j].heir.length != 0){
            let heirURL = fullHouseList[j].heir
            let k = parseInt((heirURL.slice(45)-1))
            let heirDiv = createEl("div", undefined, undefined, `Heir: ${fullCharList[k].name}`)
            innerHouseDataDiv.append(heirDiv)
        }
        if(fullHouseList[j].overlord.length != 0){
            let overlordURL = fullHouseList[j].overlord
            let k = parseInt((overlordURL.slice(41)-1))
            let overlordDiv = createEl("div", undefined, undefined, `Overlord: ${fullCharList[k].name}`)
            innerHouseDataDiv.append(overlordDiv)
        }
        let horizontalLine = document.createElement("hr")
        innerHouseDataDiv.append(horizontalLine)
        console.log(innerHouseDataDiv)
        houseDataDiv.append(innerHouseDataDiv)
        collapseDiv.append(houseDataDiv)
    }
    if(character.allegiances.length > 1){
        let houseDiv = createEl("div", undefined, undefined, "Allegiance: ")
        for(let i = 0; i <= character.allegiances.length - 2; i++){
            let j = parseInt((character.allegiances[i].slice(45) - 1))
            houseDiv.textContent += `${fullHouseList[j].name}, `
        }
        let lastIndex = character.allegiances.length - 1
        let j = parseInt((character.allegiances[lastIndex].slice(45) - 1))
        houseDiv.textContent += fullHouseList[j].name
        accordionButton.append(houseDiv)
        collapseDiv.setAttribute("id", `id${count}`) 
        collapseDiv.setAttribute("class", "accordion-collapse collapse")
        let houseDataDiv = createEl("div", "accordion-body", undefined, undefined)
        // create divs to add region, coatOfArms, currentLord, heir, swornMembers,  overlord
        for(let i = 0; i <= character.allegiances.length - 1; i++){
            let j = parseInt((character.allegiances[i].slice(45) - 1))
            let innerHouseDataDiv = document.createElement("div")
            let houseNameDiv = createEl("div", undefined, undefined, `${fullHouseList[j].name}`)
            innerHouseDataDiv.append(houseNameDiv)
            let lineBreak = document.createElement("br")
            innerHouseDataDiv.append(lineBreak)
            if(fullHouseList[j].region.length != 0){
                let regionDiv = createEl("div", undefined, undefined, `Region: ${fullHouseList[j].region}`)
                innerHouseDataDiv.append(regionDiv)
            }
            if(fullHouseList[j].coatOfArms.length != 0){
                let coatOfArmsDiv = createEl("div", undefined, undefined, `Coat of Arms: ${fullHouseList[j].coatOfArms}`)
                innerHouseDataDiv.append(coatOfArmsDiv)
            }
            if(fullHouseList[j].currentLord.length != 0){
                let currentLordURL = fullHouseList[j].currentLord
                let k = parseInt((currentLordURL.slice(45)-1))
                let currentLordDiv = createEl("div", undefined, undefined, `Lord: ${fullCharList[k].name}`)
                innerHouseDataDiv.append(currentLordDiv)
            }
            if(fullHouseList[j].heir.length != 0){
                let heirURL = fullHouseList[j].heir
                let k = parseInt((heirURL.slice(45)-1))
                let heirDiv = createEl("div", undefined, undefined, `Heir: ${fullCharList[k].name}`)
                innerHouseDataDiv.append(heirDiv)
            }
            if(fullHouseList[j].overlord.length != 0){
                let overlordURL = fullHouseList[j].overlord
                let k = parseInt((overlordURL.slice(41)-1))
                let overlordDiv = createEl("div", undefined, undefined, `Overlord: ${fullCharList[k].name}`)
                innerHouseDataDiv.append(overlordDiv)
            }
            let horizontalLine = document.createElement("hr")
            innerHouseDataDiv.append(horizontalLine)
            houseDataDiv.append(innerHouseDataDiv)
        }
        collapseDiv.append(houseDataDiv)
    }
    if(character.allegiances.length == 0){
        let houseDiv = createEl("div", undefined, undefined, "Allegiance: N/A")
        accordionButton.append(houseDiv)
    }
    characterList.append(accordionDiv)
    characterList.append(collapseDiv)
}

function createEl(type, classStyle="", id="", textContent=""){
    let element = document.createElement(type)
    element.setAttribute("class", classStyle)
    element.setAttribute("id", id)
    element.textContent = textContent
    return element
}