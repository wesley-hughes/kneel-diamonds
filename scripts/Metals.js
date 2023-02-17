import { getMetals, setMetal, getOrderBuilder } from "./dataAccess.js"

const metals = getMetals()


document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "metal") {
            setMetal(parseInt(event.target.value)
            )
        }
    }
)

export const Metals = () => {
    let html = "<ul>"
    const orderBuilder= getOrderBuilder()
    const listItems = metals.map(metal => {
        let checked = ""
        if (orderBuilder.metalId === metal.id) {
            checked= "checked"
        }
        return `<li>
            <input type="radio" name="metal" value="${metal.id}" ${checked}/> ${metal.metal}
        </li>`
    })

    html += listItems.join("")
    html += "</ul>"

    return html
}

