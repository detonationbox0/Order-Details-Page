
/**
 * Import Pricing Grid
 */
import * as priceGrid from "./price-grid.js"
const pricing = priceGrid.getGrid();



$(function() {
    console.log( "ready!" );

    //Init
    
    // Load price points to "How many pieces?" question
    for (var i = 0; i < pricing.length; i++) {

        

        $("#qty-select").append(`
            <option value="${pricing[i].qty}" ${(pricing[i].qty == 10000 ? "selected" : "" )}>${pricing[i].qty.toLocaleString()}</option>
        `)


        // If we are on the last loop, add a "Choose a custom quantity" option
        // and set the max for the custom quantity input while we are at it
        if ((i + 1) == pricing.length) {
            $("#qty-select").append(`
                <option value="custom">Choose a Custom Quantity...</option>
            `)

            $("#custom-price-input").attr("max", pricing[i].qty);
        }
        console.log(pricing[i]);
    }


    // Create a nice drop down out of the quantity selection
    customSelect('#qty-select');

});

/**
 * User chooses a new quantity
 */
$("#qty-select").on("change", function() {

    // Get the quantity chosen
    var qty = $(this).val();
    console.log(qty);
    // As long as Custom wasn't chosen...
    if (qty != "custom") {
        $("#custom-price-input").slideUp();
        // Find the price per piece
        for (var i = 0; i < pricing.length; i++) {
            if (pricing[i].qty == qty){
                var ppp = pricing[i].ppp;
                continue;
            }
        }
    
        // Multiply price per piece by quantity, replace subtotal
        updateSubTotal((Number(qty) * ppp), true)
    
    } else {

        // Make Subtotal "-" for now until we enter a new quantity
        $("#st").text("-");

        // Show the input field
        $("#custom-price-input").slideDown();

        console.log("A custom price...")
    }
    
})

/**
 * User is typing in their new quantity
 * We catch the keypress to give a live-subtotal
 */
$('#custom-price-input').keyup(function() {

    var kInput = this.value;


    // Find this.value in pricing
    for (var i = 0; i < pricing.length; i++) {
        if (kInput >= pricing[i].qty && kInput <=pricing[i + 1].qty) {
            console.log(`${kInput} is greater than or equal to ${pricing[i].qty} and less than or equal to ${pricing[i + 1].qty}`);

            // Mutiply kInput by pricing[i].ppp, update subtotal
            updateSubTotal((Number(kInput) * pricing[i].ppp), true)

        } else if (kInput < pricing[0].qty) {
            console.log("Price is below minimum...")

            // Mutiply kInput by pricing[0].ppp, update subtotal
            updateSubTotal((Number(kInput) * pricing[0].ppp), true)
            

        } else if (kInput < pricing[pricing.length - 1].qty) {
            console.log("Price is above maximum...")

            // Mutiply kInput by pricing[pricing.length - 1].ppp, update subtotal
            updateSubTotal((Number(kInput) * pricing[pricing.length - 1].ppp), true)
        }
    }

    console.log(kInput);
});

/**
 * Convert a number into a price, and update the sub total everywhere
 * @param {String | Number} newPrice The price to update the subtotal (.subTotal) to
 * @param {Bool} turnLocal If true, converts newPrice into a dollar string $X.XX
 */

function updateSubTotal (newPrice, turnLocal) {
    if (turnLocal) {
        var st = newPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          });
        $(".subTotal").text(st);
    } else {
        $(".subTotal").text(newPrice);
    }
}