
/**
 * Import Pricing Grid
 */
import * as priceGrid from "./price-grid.js"
const pricing = priceGrid.getGrid();


/**
 * I'm always learning new things. Let's use something called a JavaScript Proxy
 * https://www.javascripttutorial.net/es6/javascript-proxy/ to update the 
 * Order Details area on the right side of the page.
 */
//#region 
// Order Data
const orderDetails = {
    qty:10000, // Quantity
    ppp:.32, /// Price per Piece
    tmc: 3200, // Total Mailing Cost
    date:"2021-05-01"
}

// Order Data Handler
// When any property of the orderDetails object changes, update the
// Order details DOM elements
var orderDetailsHandler = {
    set(target, property, value) {
        //`target` is the object
        //`property` is the property that has changed
        //`value` is the new value of the property

        /** ===---------------------------------------------------------------===
                 * Quantity has been updated ↓
                 */

        if (property === 'date') {
            // Value must be a string.
            if (typeof value !== 'string') {
                throw new Error('Date must be a string.');
            }
            // This item was added to DOM when the user clicked the next button on q1.
            // Update the DOM with locale string version of `value`
            $("#date-value").text(value);

            console.log(`date has been updated to ${value}`);

        }

        /** ===---------------------------------------------------------------===
         * Quantity has been updated ↓
         */

         if (property === 'qty') {
            // Value must be a number.
            if (typeof value !== 'number') {
                throw new Error('Quantity must be a number.');
            }
            // This item is in DOM from the start.
            // Update the DOM with locale string version of `value`
            $("#qty-value").text(value.toLocaleString());

            console.log(`qty has been updated to ${value}`);

        }

        /** ===---------------------------------------------------------------===
         * Price per Piece has been updated ↓
         */

         if (property === 'ppp') {
            // Value must be a number.
            if (typeof value !== 'number') {
                throw new Error('Price per Piece must be a number.');
            }
            // This item is in DOM from the start.
            // Update the DOM with locale string version of `value`
            $("#ppp-value").text(value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            }));

            console.log(`ppp has been updated to ${value}`);

        }


        /** ===---------------------------------------------------------------===
         * Total Mailing Cost has been updated ↓
         */

        if (property === 'tmc') {
            // Value must be a number.
            if (typeof value !== 'number') {
                throw new Error('Total Mailing Cost must be a number.');
            }
            // This item is in DOM from the start.
            // Update the DOM with locale string version of `value`
            $("#tmc-value").text(value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            }));

            console.log(`tmc has been updated to ${value}`);
        }


        /** ===---------------------------------------------------------------===
         * Price per Piece has been updated ↓
         */

        if (property === 'ppp') {
            // Value must be a number.
            if (typeof value !== 'number') {
                throw new Error('Total Mailing Cost must be a number.');
            }
            // This item is in DOM from the start.
            // Update the DOM with locale string version of `value`
            $("#ppp-value").text(value.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            }));

            console.log(`ppp has been updated to ${value}`);

        }

        /** ===---------------------------------------------------------------===
         * Clean Up ↓
         */

        target[property] = value;
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set
        return true;
    }
}

var orderProxy = new Proxy(orderDetails, orderDetailsHandler);

//#endregion







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
    // console.log(qty);
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
        console.log(ppp);
        updateSubTotal((Number(qty) * ppp), true)
        orderProxy.tmc = (Number(qty) * ppp); // Update proxy (updates Order Details to the right)
        orderProxy.ppp = ppp;
        orderProxy.qty = Number(qty);
    
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
    var kInput = Number(this.value);
    customQuantity(kInput);
});

/**
 * Instead of typing their new quantity, the user
 * changes the quantity in some other way, such as
 * the up / down arrows to the right of this
 * input element
 */

$('#custom-price-input').on("change", function() {
    var kInput = Number(this.value);
    customQuantity(kInput);
    
});

/** 
 * User clicks on the Next button from the Quantity question.
 */

$("#qty-next-button").on("click", function() {

    // If the chosen value is less than the smallest price in the grid,
    // We should yell at the user... End of day, but hopefully I remember
    // to come back and put that here.

    // Build the In Home Week question, and add it to the dom
    var dom = `
        <!-- When would you like your first in-home week to be? -->
        <div class="question">
            <div class="question-text">When would you like your first in-home week to be?</div>
            <!-- Already got a nice drop down library, let's use that to pick the week --> 
            <div id="wk-select-area">
                <input class="date-picker" id="wk-select" type="date" value="2021-05-01" min="2021-05-01"/>
                <div class="q-description">Your pieces will hit homes the week of <span id="in-home-day">May 1st, 2021.</span></div>
            </div>
            <div class="question-button" id="week-next-button">
            Continue
            </div>
        </div>
    `

    addQuestion(dom, function() {
        // This callback was created for a reason which is no longer relevant
        // Might come in handy down the line, so I'll keep it for now.
        console.log("We added the next question...")

    });

    // Shall we disable (or hide) the next button?
    // Let's change it to a message letting the user know they can still change it

    $(this).removeClass("question-button").addClass("question-set").off(); //.off() removes this listener

    // At this point, the next question (in-home week) will be displayed
    // It has a min value of May 1, 2021 (to prevent conflict with expiration dates)
    // Therefore, we should add the DOM elements for this and default it to May 1, 2021
    $("#qty").before(`
        <div class="summary-item" id="date">
            <div class="summary-item-text summary-item-title" id="date-title">First In-Home Week:</div>
            <div class="summary-item-text summary-item-value" id="date-value">2021-05-01</div>
        </div>
    `)

});

/** 
 * User chooses a date
 */
$(document).on("change", "#wk-select", function() {
    var newDate = $(this).val(); // Ex: 2021-07-29

    // We need a pretty string, ex: May 1st, 2021.
    var prettyDate = moment(newDate, "YYYY-MM-DD").format("MMMM Do, YYYY");

    // Update text below input with pretty date
    $("#in-home-day").text(prettyDate);

    // Update order details
    orderProxy.date = newDate;

    // alert(newDate);
})

/** 
 * User Clicks the Next button from the In Home Date question
 */
 $(document).on("click", "#week-next-button", function() {
    
})


/** ===--------------------------------------------------------------------------------------------===
 * CUSTOM FUNCTIONS ↓
 */


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

/**
 * Takes a new Quantity number, figures out the price level in the price grid
 * and updates the properties of our orderDetails proxy and Subtotal values
 * @param {Number} kInput The new quantity number
 */

function customQuantity (kInput) {

    // This logic was written largely before I implemented the Proxy object.
    // Could probably be improved upon, but I've got a deadline

    // Find this.value in pricing
    for (var i = 0; i < pricing.length; i++) {

        if (kInput >= pricing[i].qty && kInput <=pricing[i + 1].qty) {
            console.log(`${kInput} is greater than or equal to ${pricing[i].qty} and less than or equal to ${pricing[i + 1].qty}`);

            // Mutiply kInput by pricing[i].ppp, update subtotal
            updateSubTotal((kInput * pricing[i].ppp), true)
            orderProxy.tmc = (kInput * pricing[i].ppp); // Update proxy (updates Order Details to the right)
            orderProxy.ppp = pricing[i].ppp;
            orderProxy.qty = kInput;
            break;

        } else if (kInput < pricing[0].qty) {
            console.log(`${kInput} is below minimum...`)

            // Mutiply kInput by pricing[0].ppp, update subtotal
            updateSubTotal((kInput * pricing[0].ppp), true)
            orderProxy.tmc = (kInput * pricing[0].ppp); // Update proxy (updates Order Details to the right)
            orderProxy.ppp = pricing[i].ppp;
            orderProxy.qty = kInput;
            break;

        } else if (kInput > pricing[pricing.length - 1].qty) {
            console.log(`${kInput} is above maximum...`)
            // Mutiply kInput by pricing[pricing.length - 1].ppp, update subtotal
            updateSubTotal((kInput * pricing[pricing.length - 1].ppp), true)
            orderProxy.tmc = (kInput * pricing[pricing.length - 1].ppp); // Update proxy (updates Order Details to the right)
            orderProxy.ppp = pricing[pricing.length - 1].ppp;
            orderProxy.qty = kInput;
            break;
        }
    }

    console.log(kInput);
}

function addQuestion(dom, callback){
    $("#detail-questions").append(dom);

    callback();
}