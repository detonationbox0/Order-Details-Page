
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
    ppp:.32, // Price per Piece
    date:"Week 18, 2021", // In Home Date
    weeks:1, // Mailing Weeks
    tmc: 3200, // Total Mailing Cost
    tc:3200, // Total Cost
    wmc:3200, // Weelky Mailing Cost
    eq:10000, // Extras Quantity
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
            $("#week-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

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

            // if ($("#qty-next-button").text().includes("Continue")) {
            // };



            console.log(`qty has been updated to ${value}`);

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
    var chosenQty = $("#extras-qty-input").val();
    var chosenPPP = $("#extras-ppp").attr("value");

    // Update Proxys with values
    orderProxy.eq = Number(chosenQty);
    orderProxy.eppp = Number(chosenPPP);
    orderProxy.tpc = Number(chosenQty) * Number(chosenPPP);
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
            <div class="num-week-choice" weeks="${i}" cost="${ppw}">
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
        <div class="summary-item" id="wmc">
        <div class="summary-item-text summary-item-title bold" id="wmc-title">Weekly Mailing Cost:</div>
        <div class="summary-item-text summary-item-value bold" id="wmc-value">-</div>
        </div>
        </div>`

        $("#mail-summary").after(dom);



    }


    // Unset any ".num-week-selected"
    $(".num-week-selected").removeClass("num-week-selected");
    // Make this one appear selected
    $(this).addClass("num-week-selected");



    if (!$("#numweek-next-button").text().includes("Continue")) {
        $("#numweek-next-button").text("Update");
    }

    $("#numweek-next-button").removeClass("question-set").addClass("question-button");
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

    // Add the next question, if it's not already there.

    var dom = `<div class="question">
                <div class="question-text">Would you like extras?</div>
                
                <div class="extras-buttons">
                    <div class="question-button extras-button" id="extras-yes-button">
                        Yes
                    </div>
                    <div class="question-button extras-button" id="extras-no-button">
                        No
                    </div>
                </div>

                <div id="extras-input-area">
                    <div class="question-text">How many extra pieces would you like?</div>
                    <div class="qty-select-area">
                    <div class="qty-input-warn">
                        <input type="number" class="input-format" id="extras-qty-input" placeholder="Enter a quantity..."/>
                        <p class="warn" id="extras-warning">Minimum quantity: <span id="qty-min">500</span></p>
                    </div>
                    <div class="qty-price">
                        <div class="qty-price-area"><b class="bold-text">Price per Piece&nbsp;</b><span id="extras-ppp" >-</span></div>
                        <!-- <div class="qty-price-area"><b class="bold-text">Subtotal:&nbsp;</b><span id="st" class="subTotal">-</span></div> -->
                        <a href="#" class="link-small">Show Price Guide</a>
                    </div>
                    </div>
                </div>

                <div class="question-set" id="extras-next-button">
                    Continue
                </div>

                </div>`;

    addQuestion(dom, function() {
        // Callback
        console.log("We added the next question...")
        scrollToBottom();
    })

    //#endregion

});

/**
 * User clicks Yes or No for Extras Question
 */

$(document).on("click", ".extras-button", function() {
    console.log($(this).text());
    if ($(this).text().includes("Yes")) {
        $("#extras-input-area").slideDown("fast");

        scrollToBottom();

        // Add some CSS to show that this is selected and the other isn't

        // Also, show or hide the right area in the Order Details

    } else {
        $("#extras-input-area").slideUp("fast");

        // Add some CSS to show that this is selected and the other isnt'

        // Also, show or hide the right area in the Order Details
    }
    

    // Since yes was Selected, let's show the Extras quantity area.




});

/**
 * User is typing in their new quantity
 * We catch the keypress to give a live-subtotal
 */

 $('#extras-qty-input').keyup(function() {
    //#region
    var kInput = Number(this.value);

    customQuantity(kInput, "extras");
    console.log(kInput);
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
            $(nextButtonID).removeClass("question-set").addClass("question-button");
            // If the button's text isn't Continue, change to Update
            if (!$(nextButtonID).text().includes("Continue")) {
                $(nextButtonID).text("Update");
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
            $(nextButtonID).removeClass("question-set").addClass("question-button");
            if (!$(nextButtonID).text().includes("Continue")) {
                $(nextButtonID).text("Update");
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


