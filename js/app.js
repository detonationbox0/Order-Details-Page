
/**
 * Import Pricing Grid
 */
import * as priceGrid from "./price-grid.js"
const pricing = priceGrid.getGrid();

console.log(pricing);

/**
 ___   ___   ___   _     _     
| |_) | |_) / / \ \ \_/ \ \_/
|_|   |_| \ \_\_/ /_/ \  |_| 
 */

/**
 * Let's use this
 * https://www.javascripttutorial.net/es6/javascript-proxy/
 * to update the Order Details area on the right side of the page.
 */

// ORDER OBJECT
const orderDetails = {
    //#region 
    qty:10000, // Quantity
    ppp:.32, /// Price per Piece
    tmc: 3200, // Total Mailing Cost
    date:"Week 18, 2021"
    //#endregion
}

// ORDER HANDLER
var orderDetailsHandler = {
    //#region
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

            // Update the button here.
            $("#week-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

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

            // Update the button here.
            $("#qty-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

            // if ($("#qty-next-button").text().includes("Continue")) {
            // };



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
    //#endregion
}

// ORDER PROXY
var orderProxy = new Proxy(orderDetails, orderDetailsHandler);
// Updating the properties of orderProxy updates the Order Details area on the right side of the page.

// Document is ready...
$(function() {
    //#region
    console.log( "ready!" );
    scrollToBottom();
    //Init
    
    /**
     * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
     * Brian didn't want to have a drop down for the Quantity question.
     * Removing this code.
     */
    //#region
    /*
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
    */
   //#endregion
    
//#endregion
});


/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Removed the drop down onChange event because
 * Brian doesn't want the quantities in a drop down.
 * It's a good idea but a chase for another day.
 */
/**
 * User chooses a new quantity
 */
//#region
/*
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
*/
//#endregion

/**
 * User is typing in their new quantity
 * We catch the keypress to give a live-subtotal
 */

$('#custom-price-input').keyup(function() {
    //#region
    var kInput = Number(this.value);
    customQuantity(kInput);
    //#endregion
});

/**
 * Instead of typing their new quantity, the user
 * changes the quantity in some other way, such as
 * the up / down arrows to the right of this
 * input element
 */

$('#custom-price-input').on("change", function() {
    //#region
    var kInput = Number(this.value);
    customQuantity(kInput);
    //#endregion
});

/** 
 * User clicks on the Continue button from the Quantity question.
 */
$("#qty-next-button").on("click", function() {
    //#region





    // Only if this button says "Continue" should we add
    // the next question
    console.log($(this).text());
    
    if ($(this).text().includes("Continue")) {
        // Build the In Home Week question, and add it to the dom

        /*
        The "date" type input does not work on Firefox or Safari.
        Why not??
        Jim used Drop Downs but I don't like it. He does have
        a datepicker though for the coupon expirations... it looks like
        he used https://angular-ui.github.io/bootstrap/versioned-docs/1.0.0/#/datepicker

        I do not know Angular (I shall learn it someday soon), but jQuery UI has one
        I'll use that instead.

            > Only show the available days ("Wednesdays")
        */

        var dom = `
        <!-- When would you like your first in-home week to be? -->
        <div class="question">
            <div class="question-text">When would you like your first in-home week to be?</div>
            <!-- Already got a nice drop down library, let's use that to pick the week --> 
            <div id="wk-select-area">` +
                //<input class="date-picker" id="wk-select" type="week" min="2021-W18"/>
                `
                <input type="text" id="datepicker" class="input-format">
            </div>
            <div class="question-set" id="week-next-button">
            Continue
            </div>
        </div>
        `

        addQuestion(dom, function() {
        // This callback was created for a reason which is no longer relevant
        // Might come in handy down the line, so I'll keep it for now.
            console.log("We added the next question...")
            // At this point, the next question (in-home week) will be displayed
            // It has a min value of May 1, 2021 (to prevent conflict with expiration dates)
            // Therefore, we should add the DOM elements for this and default it to May 1, 2021
            

            // Instantiate the datepicker
            $( "#datepicker" ).datepicker({
                inline: false,
                showWeek:true,
                beforeShowDay: function(day) {
                    var day = day.getDay();
                    var disableDays = [0,1,2,4,5,6]
                    if (disableDays.includes(day)) {
                        return [false, ""]
                    } else {
                        return [true, ""]
                    }
                 }
            });
            

            scrollToBottom();
        });

    }

    // Get the quantity from the input, and update the proxy with it.
    var chosenQty = $("#custom-price-input").val();
    var chosenPPP = $("#ppp").attr("value");

    // Update Proxys with values
    orderProxy.qty = Number(chosenQty);
    orderProxy.ppp = Number(chosenPPP);
    orderProxy.tmc = Number(chosenQty) * Number(chosenPPP);



    //#endregion
});

/** 
 * User chooses a date
 */
$(document).on("change", "#datepicker", function() {
    //#region


    // If #date doesn't exist yet, make it:
    if(!$("#date").length) {
        $("#qty").before(`
            <div class="summary-item" id="date">
                <div class="summary-item-text summary-item-title" id="date-title">First In-Home Week:</div>
                <div class="summary-item-text summary-item-value" id="date-value">Week 18, 2021</div>
            </div>
        `)
    }

    var newDate = $(this).val(); // Ex: 2021-07-29

    console.log(newDate);

    // Enable the button
    $("#week-next-button").removeClass("question-set").addClass("question-button");
    //orderProxy.date = newDate;

    if (!$("#week-next-button").text().includes("Continue")) {
        $("#week-next-button").text("Update");
    }

    /*
    // We need a pretty string, ex: May 1st, 2021.
    var prettyDate = moment(newDate).format("MMMM Do, YYYY");
    // console.log();

    // Update text below input with pretty date
    $("#in-home-day").text(prettyDate);

    // Update order details
    orderProxy.date = prettyDate;
    */
    //#endregion
})





/** 
 * User Clicks the Next button from the In Home Date question
 */
 $(document).on("click", "#week-next-button", function() {
    //#region

    // Update the week proxy with the chosen date
    var chosenDate = $("#datepicker").val();
    orderProxy.date = chosenDate;

    // Only add the next question if it's not there already...
    // console.log($("#wk-question").length);

    if(!$("#wk-question").length) {
        // console.log("If not " + $("#wk-question").length + " then add the question...");
        // Get the current subtotal "Total Mailing Cost"
        var totalCost = orderProxy.tmc;
        var weeks = "";

        for (var i = 1; i <= 10; i++) {
            // console.log(i);

            // Calculate price per week
            // Convert to currency
            var ppw = totalCost / i;
            var prettyPpw = ppw.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            // console.log(prettyPpw)

            var weeks = weeks + `
            <div class="num-week-choice">
                <div class="num-week-week">${i} Week${i == 1 ? "" : "s"}</div>
                <div class="num-week-cost">${prettyPpw}${i == 1 ? " Up Front" : " / Week"}</div>
            </div>
            `
        }


        // Create element to append to DOM
        var dom = `<div class="question" id="wk-question">
                        <div class="question-text">How many weeks would you like to mail and pay for?</div>
                        <div class="num-week">
                            ${weeks}
                        </div>
                        <div class="question-button" id="numweek-next-button">
                            Continue
                        </div>
                    </div>` 

        // console.log(dom);


        addQuestion(dom, function() {
            // This callback was created for a reason which is no longer relevant
            // Might come in handy down the line, so I'll keep it for now.
            console.log("We added the next question...")
            scrollToBottom();
        });
        $(this).removeClass("question-button").text("Saved!").addClass("question-set");
    }

    

    //#endregion
})

$(document).on("click", "#numweek-next-button", function() {
    //#region
    var dom = `<div class="question">
                    
                    <div class="question-button auto-fill">
                        Continue
                    </div>
                </div>`

    addQuestion(dom, function() {
        // This callback was created for a reason which is no longer relevant
        // Might come in handy down the line, so I'll keep it for now.
        console.log("We added the next question...")
        scrollToBottom();
    });

    $(this).removeClass("question-button").text("Saved!").addClass("question-set").off(); //.off() removes this listener

    //#endregion
});


$(document).on("click", ".auto-fill", function() {
    //#region
    var dom = `<div class="question">
                    <div class="question-button auto-fill">
                        Continue
                    </div>
                </div>`
    $(this).removeClass("question-button").text("Saved!").addClass("question-set").off(); //.off() removes this listener
    addQuestion(dom, function() {
        // This callback was created for a reason which is no longer relevant
        // Might come in handy down the line, so I'll keep it for now.
        console.log("We added the next question...")
        scrollToBottom();
    });
    //#endregion
});



/** ===--------------------------------------------------------------------------------------------===
 * CUSTOM FUNCTIONS ↓
 */


/**
 * Convert a number into a price, and update the sub total everywhere
 * @param {String | Number} newPrice The price to update the subtotal (.subTotal) to
 * @param {Bool} turnLocal If true, converts newPrice into a dollar string $X.XX
 */

function updateSubTotal (newPrice, turnLocal) {
    //#region
    if (turnLocal) {
        var st = newPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          });
        $(".subTotal").text(st);
    } else {
        $(".subTotal").text(newPrice);
    }
    //#endregion
}


/**
 * Takes a new Quantity number, figures out the price level in the price grid
 * and updates the properties of our orderDetails proxy and Subtotal values
 *     * This is a hold-over from when I had a drop down with a "custom" option.
 *     * This is now being run any time the user updates the quantity.
 * 
 * @param {Number} kInput The new quantity number
 */

function customQuantity (kInput) {
    //#region
    // This logic was written largely before I implemented the Proxy object.
    // Could probably be improved upon, but I've got a deadline

    // Find this.value in pricing
    for (var i = 0; i < pricing.length; i++) {

        if (kInput >= pricing[i].qty && kInput <=pricing[i + 1].qty) {
            console.log(`${kInput} is greater than or equal to ${pricing[i].qty} and less than or equal to ${pricing[i + 1].qty}`);

            // Mutiply kInput by pricing[i].ppp, update subtotal
            updateSubTotal((kInput * pricing[i].ppp), true)
            
            // Update the Price per Piece with the new .ppp value
            $("#ppp").text(intToPrice(pricing[i].ppp)).attr("value", pricing[i].ppp);

            // This is allowed. Hide warning to the user
            $("#qty-warning").slideUp("fast");
            $("#custom-price-input").removeClass("input-warn");

            // Enable the Continue button
            $("#qty-next-button").removeClass("question-set").addClass("question-button");
            // If the button's text isn't Continue, change to Update
            if (!$("#qty-next-button").text().includes("Continue")) {
                $("#qty-next-button").text("Update");
            }

            //The proxy should update when the user clicks Continue or Save.
            /*
            orderProxy.tmc = (kInput * pricing[i].ppp); // Update proxy (updates Order Details to the right)
            orderProxy.ppp = pricing[i].ppp;
            orderProxy.qty = kInput;
            */
            break;

        } else if (kInput < pricing[0].qty) {
            console.log(`${kInput} is below minimum...`)

            // Mutiply kInput by pricing[0].ppp, update subtotal
            updateSubTotal((kInput * pricing[0].ppp), true)
            $("#ppp").text(intToPrice(pricing[0].ppp)).attr("value", pricing[i].ppp);

            // This is not allowed. Show warning to the user
            $("#qty-warning").slideDown("fast");
            $("#custom-price-input").addClass("input-warn");

            // If the Continue button states "Saved!", simply update the text to "Update"
            if ($("#qty-next-button").text() == "Saved!") {
                $("#qty-next-button").text("Update")
            } else {
                // Disable the Continue button
                $("#qty-next-button").removeClass("question-button").addClass("question-set");

            }

            //The proxy should update when the user clicks Continue or Save.

            break;

        } else if (kInput > pricing[pricing.length - 1].qty) {
            console.log(`${kInput} is above maximum...`)
            // Mutiply kInput by pricing[pricing.length - 1].ppp, update subtotal
            updateSubTotal((kInput * pricing[pricing.length - 1].ppp), true)
            $("#ppp").text(intToPrice(pricing[pricing.length - 1].ppp)).attr("value", pricing[i].ppp);

            // This is allowed. Hide warning to the user
            $("#qty-warning").slideUp("fast");
            $("#custom-price-input").removeClass("input-warn");
            // Enable the Continue button
            $("#qty-next-button").removeClass("question-set").addClass("question-button");
            if (!$("#qty-next-button").text().includes("Continue")) {
                $("#qty-next-button").text("Update");
            }

            //The proxy should update when the user clicks Continue or Save.
            /*
            orderProxy.tmc = (kInput * pricing[pricing.length - 1].ppp); // Update proxy (updates Order Details to the right)
            orderProxy.ppp = pricing[pricing.length - 1].ppp;
            orderProxy.qty = kInput;
            */
            break;
            
        }
    }

    console.log(kInput);
    //#endregion
}

/**
 * Logic for the buttons
 */
$(document).on("change", ".q", function() {
    
    console.log("Changed...")
});

/**
 * Logic for the buttons
 */

/**
 * Add a Question to the DOm
 * @param {String} dom Dom elements to append to the questions area
 * @callback {*} Returns nothing
 */

function addQuestion(dom, callback){
    //#region
    $("#detail-questions").append(dom);

    callback();
    //#endregion
}

function scrollToBottom() {
    //#region
    // https://stackoverflow.com/questions/270612/scroll-to-bottom-of-div
    $("#detail-questions").animate({
        scrollTop: $('#detail-questions')[0].scrollHeight}, "slow"); // Scroll to bottom
    $(".question").last().fadeIn('slow');
    //#endregion
}

/**
 * Formats a Number object as a US currency string ($0.00)
 * @param {Number} int The number to convert to a USD price.
 * @returns {String} The number converted to a USD price.
 */
function intToPrice(int) {
    if (typeof int !== 'number') {
        throw new Error('You are trying to convert NAN to a price.');
    }
    return int.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    
}


