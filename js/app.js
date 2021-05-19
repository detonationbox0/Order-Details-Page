/**
 * In a hurry to finish this up, the code got a bit messy.
 * Sorry!
 */


/**
 * Import Pricing Grid
 */
import * as priceGrid from "./price-grid.js"
const pricing = priceGrid.getGrid();

console.log(pricing);

// Create pricing table DOM

/*
        <div class="price-headers tablerow">Quantity</div>
        <div class="tier tablerow">500</div>
        <div class="tier tablerow">1,000</div>
        <div class="tier tablerow">1,500</div>
*/

/*
        <div class="price-headers tablerow">Cost</div>
        <div class="cost tablerow">$0.32</div>
        <div class="cost tablerow">$0.79</div>
        <div class="cost tablerow">$0.69</div>
*/

var tableQty = "";
var tableCosts = "";
for (var i = 0; i < pricing.length; i++) {
    tableQty = tableQty + `<div class="row-wrapper"><div class="tier tablerow">${pricing[i].qty.toLocaleString()}</div></div>`
    
    tableCosts = tableCosts + `<div class="row-wrapper"><div class="tier tablerow">${intToPrice(pricing[i].ppp)}</div></div>`
}

const myTable = `<div class="toggler">
    <div class="price-guide">
        <div class="price-tiers">
        <div class="row-wrapper price-headers"><div class="tablerow">Quantity</div></div>
            ${tableQty}
        </div>
        <div class="price-costs">
        <div class="row-wrapper price-headers"><div class="tablerow">Price Per Piece</div></div>
            ${tableCosts}
        </div>
    </div>
</div>`

// console.log(myTable);

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
    ppp:.32, // Price per Piece
    date:"-", // In Home Date
    weeks:1, // Mailing Weeks
    tmc: 3200, // Total Mailing Cost
    tc:3200, // Total Cost
    wmc:3200, // Weelky Mailing Cost
    ship:"-", // Extras Quantity
    shipp:"$65.99",
    eq:10000, // Extras Quantity
    pm:"Card ending in... 0000",
    eppp:.32, // Extras Price Per Piece
    tpc:.32, // Total Print Cost
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
            checkForCartQuestion();
            // if ($("#qty-next-button").text().includes("Continue")) {
            // };



            console.log(`qty has been updated to ${value}`);
            checkForCartQuestion();
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
            $("#ppp-value").text(intToPrice(value));

            console.log(`ppp has been updated to ${value}`);

        }

                /** ===---------------------------------------------------------------===
         * Date has been updated ↓
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
            checkForCartQuestion();
            console.log(`date has been updated to ${value}`);

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
            $("#tmc-value").text(intToPrice(value));

            console.log(`tmc has been updated to ${value}`);
        }


        /** ===---------------------------------------------------------------===
         * Mailing Weeks has been updated ↓
         */

         if (property === 'weeks') {
            // Value must be a number.
            if (typeof value !== 'number') {
                throw new Error('Price per Piece must be a number.');
            }
            // This item is in DOM from the start.
            // Update the DOM with locale string version of `value`
            $("#weeks-value").text(value);

            console.log(`weeks has been updated to ${value}`);

            // Any time the week is changed, re-enable the button
            $("#numweek-next-button").removeClass("question-button").text("Saved!").addClass("question-set");
            checkForCartQuestion();
        }

        /** ===---------------------------------------------------------------===
         * Total Cost has been updated ↓
         */

         if (property === 'tc') {
            // Value must be a number.
            if (typeof value !== 'number') {
                throw new Error('Total Cost must be a number.');
            }
            // This item is in DOM from the start.
            // Update the DOM with locale string version of `value`
            $("#tc-value").text(intToPrice(value));

            console.log(`tc has been updated to ${value}`);

        }

        /** ===---------------------------------------------------------------===
         * Weekly Mailing Cost has been updated ↓
         */

         if (property === 'wmc') {
            // Value must be a number.
            if (typeof value !== 'number') {
                throw new Error('Weekly Mailing Price must be a number.');
            }
            // This item is in DOM from the start.
            // Update the DOM with locale string version of `value`
            $("#wmc-value").text(intToPrice(value));

            console.log(`wmc has been updated to ${value}`);

        }

                /** ===---------------------------------------------------------------===
         * Date has been updated ↓
         */

        if (property === 'ship') {
        // Value must be a string.
        if (typeof value !== 'string') {
            throw new Error('Ship To must be a string.');
        }
        // This item was added to DOM when the user clicked the next button on q1.
        // Update the DOM with locale string version of `value`
        if (value != "-") {
            $("#ship-value").text(value);

            // Update the button here.
            $("#ship-next-button").removeClass("question-button").text("Saved!").addClass("question-set");
            checkForCartQuestion();
            console.log(`Ship to has been updated to ${value}`);
        }


    }
    /** ===---------------------------------------------------------------===
             * Extras Price per Piece has been updated ↓
             */
    if (property === 'shipp') {
        // Value must be a number.
        if (typeof value !== 'number') {
            throw new Error('Quantity must be a number.');
        }
        // This item is in DOM from the start.
        // Update the DOM with locale string version of `value`
        $("#shipp-value").text(intToPrice(value));

        // Update the button here.
        // $("#extras-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

        // if ($("#qty-next-button").text().includes("Continue")) {
        // };



        console.log(`shipping has been updated to ${value}`);

    }
        /** ===---------------------------------------------------------------===
         * Extras Price per Piece has been updated ↓
         */
        if (property === 'eppp') {
            // Value must be a number.
            if (typeof value !== 'number') {
                throw new Error('Quantity must be a number.');
            }
            // This item is in DOM from the start.
            // Update the DOM with locale string version of `value`
            $("#eppp-value").text(intToPrice(value));

            // Update the button here.
            // $("#extras-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

            // if ($("#qty-next-button").text().includes("Continue")) {
            // };



            console.log(`qty has been updated to ${value}`);

        }

        /** ===---------------------------------------------------------------===
         * Total Print Cost has been updated ↓
         */
         if (property === 'tpc') {
            // Value must be a number.
            if (typeof value !== 'number') {
                throw new Error('Total print cost must be a number.');
            }
            // This item is in DOM from the start.
            // Update the DOM with locale string version of `value`
            $(".tpc-value").text(intToPrice(value));

            // Update the button here.
            // $("#extras-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

            // if ($("#qty-next-button").text().includes("Continue")) {
            // };



            console.log(`tpc has been updated to ${value}`);

        }

        /** ===---------------------------------------------------------------===
         * Extras Quantity has been updated ↓
         */
        if (property === 'eq') {
            // Value must be a number.
            if (typeof value !== 'number') {
                throw new Error('Quantity must be a number.');
            }
            // This item is in DOM from the start.
            // Update the DOM with locale string version of `value`
            $("#eq-value").text(value.toLocaleString());

            // Update the button here.
            $("#extras-next-button").removeClass("question-button").text("Saved!").addClass("question-set");
            checkForCartQuestion();
            // if ($("#qty-next-button").text().includes("Continue")) {
            // };



            console.log(`qty has been updated to ${value}`);

        }

        /** ===---------------------------------------------------------------===
         * Payment Method has been updated ↓
         */
         if (property === 'pm') {
            // Value must be a string.
            if (typeof value !== 'string') {
                throw new Error('Payment method must be a string.');
            }
            // This item was added to DOM when the user clicked the next button on q1.
            // Update the DOM with locale string version of `value`
            $("#pm-value").text(value);

            
            console.log(`pm has been updated to ${value}`);
            $("#pay-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

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

/**
  __    ___   ___   _     _   __     __   _____  _   ___   _     
 / /\  | |_) | |_) | |   | | / /`   / /\   | |  | | / / \ | |\ | 
/_/--\ |_|   |_|   |_|__ |_| \_\_, /_/--\  |_|  |_| \_\_/ |_| \|
 */

// Document is ready...
$(function() {
    //#region
    console.log( "ready!" );

    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i) {
        alert("This page is not optimized for mobile!")

    }

    // Add table to first question
    console.log(myTable)
    $("#quantity-question").append(myTable);

    // Debug
    // $(".show-table").click();

    scrollToBottom();

    // showMessage(`
    // <h3>Your order has been added to the Shopping Cart</h2>
    // <p>Would you like to view the Shopping Cart now?</p>
    // `)

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

            $("#qty-qty-input").attr("max", pricing[i].qty);
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
        $("#qty-qty-input").slideUp();
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
        $("#qty-qty-input").slideDown();

        console.log("A custom price...")
    }
    
   
})
*/
//#endregion

/**
 * User is typing in their new quantity
 * We catch the keypress to give a live-subtotal
 */

$('#qty-qty-input').keyup(function() {
    //#region
    var kInput = Number(this.value);
    console.log("")
    customQuantity(kInput, "qty");
    //#endregion
});

/**
 * Instead of typing their new quantity, the user
 * changes the quantity in some other way, such as
 * the up / down arrows to the right of this
 * input element
 */

$('#qty-qty-input').on("change", function() {
    //#region
    var kInput = Number(this.value);
    customQuantity(kInput, "qty");
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
            <div id="wk-select-area">` +
                //<input class="date-picker" id="wk-select" type="week" min="2021-W18"/>
                `
                <input type="text" id="datepicker" class="input-format" autocomplete="off">
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
                // Hide every day but Wednesday
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
    var chosenQty = $("#qty-qty-input").val();
    var chosenPPP = $("#qty-ppp").attr("value");

    // Update Proxys with values
    orderProxy.qty = Number(chosenQty);
    orderProxy.ppp = Number(chosenPPP);
    orderProxy.tmc = Number(chosenQty) * Number(chosenPPP);



    //#endregion
});

/** 
 * User clicks on the Continue button from the Quantity question.
 */
 $(document).on("click", "#extras-next-button", function() {
    //#region

    // If the #extras-ppp exists, they wanted extras. The next question is Where should we ship them to?

    if ($("#extras-ppp").length) {
        var chosenQty = $("#extras-qty-input").val();
        var chosenPPP = $("#extras-ppp").attr("value");
    

        orderProxy.eq = Number(chosenQty);
        orderProxy.eppp = Number(chosenPPP);
        orderProxy.tpc = Number(chosenQty) * Number(chosenPPP);

        // Add the ship to question
        // ONLY if it's not there yet
        if (!$("#ship-sel").length) {
            console.log("Add the shipping question after #extras question");

            var dom = `
                <div class="question" id="ship-question">
                <div class="question-text">Where should we ship your prints?</div>
                <select id="ship-sel">
                <option value="-" default>Select...</option>
                <option value="-" >MARCO’S PIZZA - TIFFIN 1029 85 Melmore St, , OH 44883</option>
                </select>
                <div class="question-set" id="ship-next-button">
                                Continue
                </div>
            </div>
            `;

            $("#extras-question").after(dom);
            $("#ship-question").slideDown("fast", function() {
                // checkForCartQuestion();

            });

            // Forcing this...
            $("#add-to-cart-question").slideUp();
            scrollToBottom();
            // addQuestion(dom,function() {
            //     // Question added..
            //     scrollToBottom();
            // })
            $(this).removeClass("question-button").text("Saved!").addClass("question-set");

        }


    } else {
        // Skip the "Where should we ship them to?" question...

        // Renmove the shipping question
        $("#ship-question").remove();

        orderProxy.eq = 0;
        orderProxy.eppp = 0;
        orderProxy.tpc = 0;

        console.log("Skipping the shipping question");
        if (!$("#addcc-button").length) {
            // Create element to append to DOM
            var dom = `<div class="question unhide-question">
                <div class="question-text">How would you like to pay for this order?</div>
                <div class="payment-buttons">
                <div class="payment-button" id="ach-button">
                    <i class="fas fa-university"></i><p class="pay-method">ACH Ending in... 1234</p>
                </div>
                <div class="payment-button" id="cc-button">
                    <i class="fas fa-money-check-alt"></i><p class="pay-method">Card Ending in... 1234</p>
                </div>
                <div class="payment-button" id="addcc-button">
                <i class="fas fa-plus"></i></i><p>Add Card</p>
                </div>
                </div>
                <div class="question-set" id="pay-next-button">
                                        Continue
                </div>
            </div>`
            
            addQuestion(dom, function() {
                // Question was added...
                scrollToBottom();

            }) 
        }

        $(this).removeClass("question-button").text("Saved!").addClass("question-set");
        // checkForCartQuestion();


    }


    // Append the next question...


    //#endregion
 });
/** 
 * User chooses a date
 */
$(document).on("change", "#datepicker", function() {
    //#region


    // If #date doesn't exist yet, make it:
    if(!$("#date").length) {
        $("#tmc").before(`
            <div class="summary-item" id="date">
                <div class="summary-item-text summary-item-title" id="date-title">First In-Home Week:</div>
                <div class="summary-item-text summary-item-value" id="date-value">-</div>
            </div>
        `)
    }

    var newDate = $(this).val(); // Ex: 2021-07-29

    console.log(newDate);

    // Enable the button

    requireUpdate("#week-next-button");
    

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
            <div class="num-week-choice" weeks="${i}" cost="${ppw}">
                <div class="num-week-week">${i} Week${i == 1 ? "" : "s"}</div>
                <div class="num-week-cost">${prettyPpw}${i == 1 ? " One Time Payment" : " / Week"}</div>
            </div>
            `
        }


        // Create element to append to DOM
        var dom = `<div class="question" id="wk-question">
                        <div class="question-text">How many weeks would you like to mail and pay for?</div>
                        <div class="num-week">
                            ${weeks}
                        </div>
                            <div class="question-set" id="numweek-next-button">
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


/*
This area was used for debugging
*/
//#region
/*
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
*/
//#endregion

/** 
 * User Chooses a Number of Weeks
 */
$(document).on("click", ".num-week-choice", function() {
    //#region
    // Grab the chosen data from this tag
    var weeks = $(this).attr("weeks");
    var cost = $(this).attr("cost");

    var weeklyCost = intToPrice(orderDetails.tmc / Number(weeks));


    if (!$("#weeks").length) {
        $("#tmc").before(`
            <div class="summary-item" id="weeks">
                <div class="summary-item-text summary-item-title" id="weeks-title">Mailing weeks:</div>
                <div class="summary-item-text summary-item-value" id="weeks-value">-</div>
            </div>
        `);

        // Make DOM for the Total Cost, and the Bottom Summary (including Weekly Mailing Cost)
        var dom = `<div class="summary-area" id="summary-total">
        <div class="summary-item" id="tc">
        <div class="summary-item-text summary-item-title" id="tc-title">Total Cost:</div>
        <div class="summary-item-text summary-item-value" id="tc-value">-</div>
        </div>
        </div>


        <div class="summary-area" id="bottom-summary">
        <div class="summary-item summary-item-bottom" id="wmc">
        <div class="summary-item-text summary-item-title bold" id="wmc-title">Weekly Mailing Cost:</div>
        <div class="summary-item-text summary-item-value bold" id="wmc-value">-</div>
        </div>
        <div class="disc">*To be billed each week of mailing.</div>
        </div>`

        $("#mail-summary").after(dom);



    }


    // Unset any ".num-week-selected"
    $(".num-week-selected").removeClass("num-week-selected");
    // Make this one appear selected
    $(this).addClass("num-week-selected");


    requireUpdate("#numweek-next-button")
    
    //#endregion
    // alert(`Weeks: ${weeks} Cost: ${cost}`);
});

// On Number of Weeks Continue button press

$(document).on("click", "#numweek-next-button", function() {

    //#region
    var weeks = $(".num-week-selected").attr("weeks");

    orderProxy.weeks = Number(weeks);
    orderProxy.tc = orderDetails.tmc;
    orderProxy.wmc = orderDetails.tmc / Number(weeks);

    // Add the next question, **if it's not already there.**

    if (!$(".extras-buttons").length) { // Arbitrary piece of appended dom below
        var dom = `<div class="question" id="extras-question">
        <div class="question-text">Would you like extra copies shipped to a store?</div>
        
        <div class="extras-buttons">
            <div class="question-button extras-button" id="extras-yes-button">
                Yes
            </div>
            <div class="question-button extras-button" id="extras-no-button">
                No
            </div>
        </div>

        

        <div class="question-set" id="extras-next-button">
            Continue
        </div>
        ${myTable}
        </div>`;

        addQuestion(dom, function() {
            // Callback
            console.log("We added the next question...")
            scrollToBottom();
        })
    }

    

    //#endregion

});

/**
 * User clicks Yes or No for Extras Question
 */

$(document).on("click", ".extras-button", function() {
    //#region

    console.log($(this).text());
    // Show the continue button either way
    $("#extras-next-button").fadeIn("fast");
    if ($(this).text().includes("Yes")) {

        // The user said Yes

        // If this isn't already selected!
        if (!$("#ship").length) {
            // Also, show or hide the right area in the Order Details
            // Add the Extras area to the Order Details if it's not there already




            var dom = `
            <div class="summary-area" id="summary-extras">
                    <div class="summary-area-head">Extra Copies</div>
                    <div class="summary-item" id="ship">
                        <div class="summary-item-text summary-item-title" id="ship-title">Ship to:</div>
                        <div class="summary-item-text summary-item-value" id="ship-value">-</div>
                    </div>
                    <div class="summary-item" id="eppp">
                        <div class="summary-item-text summary-item-title" id="eppp-title">Price per Piece:</div>
                        <div class="summary-item-text summary-item-value" id="eppp-value">-</div>
                    </div>
                    <div class="summary-item" id="eq">
                        <div class="summary-item-text summary-item-title" id="eq-title">Copy Quantity:</div>
                        <div class="summary-item-text summary-item-value" id="eq-value">-</div>
                    </div>
                    <div class="summary-item" id="ship">
                        <div class="summary-item-text summary-item-title" id="shipp-title">Shipping:</div>
                        <div class="summary-item-text summary-item-value" id="shipp-value">-</div>
                    </div>
                    <div class="summary-item" id="tpc">
                        <div class="summary-item-text summary-item-title bold" id="tpc-title">Total Print Cost:</div>
                        <div class="summary-item-text summary-item-value bold tpc-value" id="tpc-value">-</div>
                    </div>
                    </div>
            `
            // Also, add the Print Cost to the #bottom-summary!
            // If these doms are not already added...

            if (!$("#dn-title").length) {
                $("#bottom-summary").append(`
                <div class="summary-item summary-item-bottom" id="tpc">
                    <div class="summary-item-text summary-item-title bold" id="tpc-title">Print Cost:</div>
                    <div class="summary-item-text summary-item-value bold tpc-value" id="tpc-value">-</div>
                </div>

                `)
                $("#bottom-summary").after(`
                <div class="summary-item summary-item-bottom" id="dn">
                    <div class="summary-item-text summary-item-title bold" id="dn-title">Due Now:</div>
                    <div class="summary-item-text summary-item-value bold tpc-value" id="dn-value">-</div>
                </div>
                `);


            }

            $("#summary-total").before(dom);
        }

        // Add the extras-input-area before sliding down
        var eia = `<div id="extras-input-area">
        <div class="question-text">How many extra pieces would you like?</div>
            <div class="qty-select-area">
                <div class="qty-input-warn">
                    <input type="number" class="input-format" id="extras-qty-input" placeholder="Enter a quantity..."/>
                    <p class="warn" id="extras-warning">Minimum quantity: <span id="qty-min">500</span></p>
                </div>
                <div class="qty-price">
                    <div class="qty-price-area"><b class="bold-text">Price per Piece&nbsp;</b><span id="extras-ppp" >-</span></div>
                    <!-- <div class="qty-price-area"><b class="bold-text">Subtotal:&nbsp;</b><span id="st" class="subTotal">-</span></div> -->
                    <a href="#" class="link-small show-table" value="extras">Show Price Guide</a>
                </div>
            </div>
        </div>`

        $("#extras-next-button").before(eia);

        $("#extras-input-area").slideDown("fast");

        checkForCartQuestion()
        scrollToBottom();

        // Add some CSS to show that this is selected and the other isn't
        $("#extras-no-button").addClass("disabled-button");
        $("#extras-yes-button").removeClass("disabled-button");



    } else {



        //User said no
        $("#extras-input-area").slideUp("fast", function() {
            $("#extras-input-area").remove();
        });

        // Remove the shipping question

        

        // Add some CSS to show that this is selected and the other isnt'
        $("#extras-yes-button").addClass("disabled-button");
        $("#extras-no-button").removeClass("disabled-button");

        // Hide the area in Order Details
        $("#summary-extras").remove();

        // Also hide the Due Now and Print Cost areas

        $("#dn").remove();
        $("#tpc").remove();

        // Enable the Continue button

        requireUpdate("#extras-next-button")
        
        // Also, show or hide the right area in the Order Details

        // Hide the ship to question
        $("#ship-question").remove();

        scrollToBottom();
    }
    

    // Since yes was Selected, let's show the Extras quantity area.



    //#endregion
});


/**
 * User is typing in their new quantity
 * We catch the keypress to give a live-subtotal
 */

 $(document).on("keyup",'#extras-qty-input', function() {
    //#region
    console.log("Keyed up")
    var kInput = Number(this.value);
    
    customQuantity(kInput, "extras");

    // orderProxy.eq = kInput;
    // customQuantity(kInput);
    //#endregion
});

/** 
 * User Clicks the View Order Details button
 */

$("#view-summary").on("click", function() {
    //#region
    if ($(this).text().includes("View")) {
        $(this).text("Hide Order Details");
    } else if ($(this).text().includes("Hide")) {
        $(this).text("View Order Details");
    }
    $("#summary-area").slideToggle("fast");
    //#endregion
});

/**
 * User chooses a store to ship to
 */

$(document).on('change', "#ship-sel", function() {
    
    requireUpdate("#ship-next-button");
    
})

/**
 * User clicks Yes or No for Extras Question
 */

 $(document).on("click", "#ship-next-button", function() {
     //#region
     var selText = $( "#ship-sel option:selected" ).text();

     // If the option isn't the default "Select..."
     if (selText.includes("Select")) {
        orderProxy.ship = "-"
     } else {
        orderProxy.ship = selText;
        orderProxy.shipp = 66.99;
     }

    // Add the Account total
    if (!$("#account").length) {
        $("#bottom-summary").prepend(`
        <div class="summary-item summary-item-bottom" id="account">
            <div class="summary-item-text summary-item-title bold" id="pm-title">Account:</div>
            <div class="summary-item-text summary-item-value bold tpc-value" id="pm-value">-</div>
        </div>
        `)
    }

     console.log("Adding the payment question...")
     // Add payment question
     // If it's not there yet...
     if (!$("#addcc-button").length) {
         var dom = `<div class="question unhide-question">
         <div class="question-text">How would you like to pay for this order?</div>
         <div class="payment-buttons">
           <div class="payment-button" id="ach-button">
             <i class="fas fa-university"></i><p class="pay-method">ACH Ending in... 1234</p>
           </div>
           <div class="payment-button" id="cc-button">
             <i class="fas fa-money-check-alt"></i><p class="pay-method">Card Ending in... 1234</p>
           </div>
           <div class="payment-button" id="addcc-button">
           <i class="fas fa-plus"></i></i><p>Add Card</p>
           </div>
         </div>
         <div class="question-set" id="pay-next-button">
                                Continue
        </div>
       </div>`
       
       addQuestion(dom, function() {
           // Question was added...
           scrollToBottom();
       })
     }

    //#endregion

 });

/**
 * User clicks a payment option
 */

 $(document).on("click", ".payment-button", function() {
    //#region
    var btnID = $(this).attr("id");


    if (btnID != "addcc-button") {
        // They chose an existing payment

        // Update the next button to say Update if it currently says Saved
        requireUpdate("#pay-next-button");
       
        // Add a class to show this button is selected - remove it from whatever else it's on
        $(".pay-selected").removeClass("pay-selected");
        $(this).addClass("pay-selected")
    }

    //#endregion
 });

/**
 * User clicks a continue with payment
 */

 $(document).on("click", "#pay-next-button", function() {
    //#region
    var payMethod = $(".pay-selected").text().trim();

    orderProxy.pm = payMethod;    

    // Last question add...
    console.log("Adding the question...")
    checkForCartQuestion();


    // console.log(payMethod);
    //#endregion
 });


 /** 
  * The user clicks add to cart
  */

$(document).on("click", ".add-to-cart-button", function() {
    //#region
    var thisVal = $(this).attr("value");
    if (thisVal == "add") {
        showMessage(`
            <h3>Your order has been added to the Shopping Cart</h2>
            <p>Would you like to view the Shopping Cart now?</p>
        `)
    } else if (thisVal == "save") {
        showMessage(`
            <h3>Your order has been Saved for Later</h2>
            <p>Would you like to return to the Place an Order page?</p>
        `)
    }

    //#endregion
});


 /** 
  * Fade out the message if the user clicks a button
  */

$(".message-button").on("click", function() {
    //#region
    console.log("Clicked")
    $("#message-container").fadeOut("fast");
    //#endregion
});

//Show Hide Pricing Guide

$(document).on("click", ".show-table", function() {
    var whichOne = $(this).attr("value");
    var questionID = whichOne + "-question"
    $("#" + questionID).find(".toggler").slideToggle("fast");
    console.log($(this).text())
    if ($(this).text().includes("Show")) {
        $(this).text("Hide Price Guide");
    } else {
        $(this).text("Show Price Guide");
    }
});

/** ===--------------------------------------------------------------------------------------------===
 * CUSTOM FUNCTIONS ↓
 */


/**
 * Takes a new Quantity number, figures out the price level in the price grid
 * and updates the properties of our orderDetails proxy and Subtotal values
 *     * This is a hold-over from when I had a drop down with a "custom" option.
 *     * This is now being run any time the user updates the quantity.
 * 
 * @param {Number} kInput The new quantity number
 * @param {String} type Recycled function for both Mailing Quantity and Extras Quantity
 */

function customQuantity (kInput, type) {
    //#region
    // This logic was written largely before I implemented the Proxy object.
    // Could probably be improved upon, but I've got a deadline

    var warningID = "#" + type + "-warning";
    var inputID = "#" + type + "-qty-input"
    var nextButtonID = "#" + type + "-next-button"
    var pppID = "#" + type + "-ppp";
    // Find this.value in pricing
    for (var i = 0; i < pricing.length; i++) {

        if (kInput >= pricing[i].qty && kInput <=pricing[i + 1].qty) {
            console.log(`${kInput} is greater than or equal to ${pricing[i].qty} and less than or equal to ${pricing[i + 1].qty}`);

            // Mutiply kInput by pricing[i].ppp, update subtotal
            // updateSubTotal((kInput * pricing[i].ppp), true)
            
            // Update the Price per Piece with the new .ppp value
            $(pppID).text(intToPrice(pricing[i].ppp)).attr("value", pricing[i].ppp);

            // This is allowed. Hide warning to the user
            $(warningID).hide();
            $(inputID).removeClass("input-warn");

            // Enable the Continue button
            requireUpdate(nextButtonID)
            

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
            // updateSubTotal((kInput * pricing[0].ppp), true)
            $(pppID).text(intToPrice(pricing[0].ppp)).attr("value", pricing[i].ppp);

            // This is not allowed. Show warning to the user
            $(warningID).show();
            $(inputID).addClass("input-warn");

            // If the Continue button states "Saved!", simply update the text to "Update"
            if ($(nextButtonID).text() == "Saved!") {
                $(nextButtonID).text("Update")
            } else {
                // Disable the Continue button
                $(nextButtonID).removeClass("question-button").addClass("question-set");

            }

            //The proxy should update when the user clicks Continue or Save.

            break;

        } else if (kInput > pricing[pricing.length - 1].qty) {
            console.log(`${kInput} is above maximum...`)
            // Mutiply kInput by pricing[pricing.length - 1].ppp, update subtotal
            // updateSubTotal((kInput * pricing[pricing.length - 1].ppp), true)
            $(pppID).text(intToPrice(pricing[pricing.length - 1].ppp)).attr("value", pricing[i].ppp);

            // This is allowed. Hide warning to the user
            $(warningID).hide();
            $(inputID).removeClass("input-warn");
            // Enable the Continue button
            requireUpdate(nextButtonID)
            

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

/**
 * Change the text of the next button to "Update"
 * Then swap classes to make it clickable
 * @param {String} refid The ID of the 'next-button' we are updating
 */
function requireUpdate(refid) {
    // Change the text of the tag with the id refid
    // to Update and fix it's class
    if (!$(refid).text().includes("Continue")) {
        $(refid).text("Update");
    }
    $(refid).removeClass("question-set").addClass("question-button");
    
    // If the Add to Cart area is there, hide it!
    if ($("#add-next-button").length) {
        $("#add-to-cart-question").slideUp("fast", function() {
            $(this).remove();
            
        })

        $(".add-to-cart-button").slideUp("fast", function() {
            $(this).remove();
        })

    }

}

/**
 * Add the Add To Cart Question when something has been updated
 * Only if the Credit Cart question is present
 */

function checkForCartQuestion() {
    // Is the payment info question there?
    if ($("#pay-next-button").length) {
        // Is the add to cart question there?
        if (!$("#add-next-button").length) {
            // We should add that question.
            var dom = `<div class="question unhide-question" id="add-to-cart-question">
            <div class="confirm-text">
                <i class="fas fa-check-circle"></i>
                <div class="question-text">You are all set!</div>
            </div>
            <div class="add-to-cart-buttons">
                <div class="question-button add-to-cart-button" qb="1" id="add-next-button" value="add">
                    Add to Cart
                </div>   
                <div class="question-button add-to-cart-button" qb="1" id="save-next-button" value="save">
                    Save for Later
                </div>
            </div>
            </div>`
        
            addQuestion(dom, function() {
                // Question added...
                console.log("Question added...");
                scrollToBottom();
            });

            if (!$(".summary-add-button").length) {
                $("#summary-area").append(`
                <div class="add-to-cart-buttons">
                    <div class="question-button add-to-cart-button add-to-cart-button summary-add-button" value="add" >Add to cart</div>
                    <div class="question-button add-to-cart-button add-to-cart-button summary-add-button" value="save">Save for Later</div>
                </div>
                `);
            }
            // Append the Cart and Save buttons to the order details summary
            
            
            

        }
    }
}

function showMessage(theMessage) {
    $("#message").empty().append(theMessage);
    $("#message-container").css("display", "flex");

}