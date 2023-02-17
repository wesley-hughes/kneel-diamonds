import { getMetals, getTypes, setType, getOrders, getSizes, getStyles, getOrderBuilder } from "./dataAccess.js"

const buildOrderListItem = (order) => {
    const metals = getMetals()
    const styles = getStyles()
    const sizes = getSizes()
    const types = getTypes()


    const foundMetal = metals.find(
        (metal) => {
            return metal.id === order.metalId
        }
    )
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )
    const foundType = types.find(
        (type) => {
            return type.id === order.typeId
        }
    )
    
    let totalCost = foundMetal.price + foundSize.price + foundStyle.price

    totalCost *= foundType.priceMultiplier
 

    // const typeCalculator = (totalCost) => {
        
    //     return totalCost
    // }

    // let calculatedCost = typeCalculator(totalCost)

    const costString = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    return `<li>
            Order #${order.id} cost ${costString}
        </li>`
    /*
    return `<li>
        Order #${order.id} was placed on ${order.timestamp}
    </li>`
    */
}



document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "type") {
            setType(parseInt(event.target.value)
            )
        }
    }
)




export const TypeSelection = () => {
    const types = getTypes()
    let html = `<ul class="types__list">`
    const orderBuilder= getOrderBuilder()
    const listItems = types.map(type => {
        let checked = ""
        if (orderBuilder.typeId === type.id) {
            checked= "checked"
        }
        return `<li class="types__options">
        <input type="radio" name="type" value="${type.id}" ${checked}/> ${type.type}
    </li>`
    })
    html += listItems.join("")
    html += "</ul>"

    return html
}





export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */

    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)


    html += listItems.join("")
    html += "</ul>"

    return html
}