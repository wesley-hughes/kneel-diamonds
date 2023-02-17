import { getStyles , setStyle, getOrderBuilder } from "./dataAccess.js"


const styles = getStyles()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "style") {
            setStyle(parseInt(event.target.value))
        }
    }
)

export const JewelryStyles = () => {
    let html = "<ul>"
    const orderBuilder= getOrderBuilder()
    const listItems = styles.map(style => {
        let checked = ""
        if (orderBuilder.styleId === style.id) {
            checked= "checked"
        }
        return `<li>
        <input type="radio" name="style" value="${style.id}" ${checked}/> ${style.style}
    </li>`
    })

    html += listItems.join("")
    html += "</ul>"

    return html
}
