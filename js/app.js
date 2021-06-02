/**
 * This code got a bit messy...
 */


/**
 * Import Pricing Grid
 */
import * as priceGrid from "./price-grid.js"
const pricing = priceGrid.getGrid();

console.log(pricing);

// Create pricing table DOM

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


/**
 ▄▄▄·▄▄▄        ▐▄• ▄  ▄· ▄▌
▐█ ▄█▀▄ █·▪      █▌█▌▪▐█▪██▌
 ██▀·▐▀▀▄  ▄█▀▄  ·██· ▐█▌▐█▪
▐█▪·•▐█•█▌▐█▌.▐▌▪▐█·█▌ ▐█▀·.
.▀   .▀  ▀ ▀█▄▀▪•▀▀ ▀▀  ▀ • 
 */

/**
 * https://www.javascripttutorial.net/es6/javascript-proxy/
 */

// ORDER OBJECT
const orderDetails = {
    //#region 

    qty:null, // Quantity
    ppp:null, // Price per Piece
    date:null, // In Home Date
    weeks:null, // Mailing Weeks
    tmc: null, // Total Mailing Cost
    tc:null, // Total Cost
    wmc:null, // Weelky Mailing Cost (Later changed to be displayed as Total Weekly Cost)
    ship:null, // Ship To
    shipp:null, // Shipping Price
    eq:null, // Extras Quantity
    eppp:null, // Extras Price Per Piece
    tpc:null, // Total Print Cost
    pc:null, // Print Cost
    pm:null, // Payment Method
    on:null, // Debit On day
    ccfee:null, // Credit Card Fee
    dn:null // Due Now

    //#endregion
}

// ORDER HANDLER
var orderDetailsHandler = {
    //#region
    set(target, property, value) {
        //`target` is the object
        //`property` is the property that has changed
        //`value` is the new value of the property

        /** ---------------------------------------------------------------
         * ===  Quantity has been updated  === ↓
         *  ---------------------------------------------------------------
         */

         if (property === 'qty') {
            // Value must be a number.
            if (typeof value !== 'number') {

                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#qty").remove();

                console.log('orderDetailsHandler: qty must be a number.');
            }

            // If this property is not in Order Details yet, add it
            if (!$("#qty-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                addDeetArea("mail-summary");
                
                // Add this property
                $("#mail-summary").append(`
                    <div class="summary-item" id="qty">
                        <div class="summary-item-text summary-item-title" id="qty-title">Quantity:</div>
                        <div class="summary-item-text summary-item-value" id="qty-value">${value.toLocaleString()}</div>
                    </div>
                `)
            } else {
                // This property is there, set it's text to value
                $("#qty-value").text(value.toLocaleString());
            }

            // This question has been saved.
            // Update this question's button
            $("#qty-next-button").removeClass("question-button").text("Saved!").addClass("question-set");


            // Check to see if we should show the final question
            checkForCartQuestion();

            console.log(`qty has been updated to ${value}`);
        }




        /** ---------------------------------------------------------------
         * ===  Price per Piece has been updated  === ↓
         *  ---------------------------------------------------------------
         */

         if (property === 'ppp') {
            // Value must be a number.
            if (typeof value !== 'number') {

                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#ppp").remove();

                console.log('orderDetailsHandler: ppp must be a number.');
            }

            // If this property is not in Order Details yet, add it
            if (!$("#ppp-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                addDeetArea("mail-summary");
                
                // Add this property
                $("#mail-summary").append(`
                    <div class="summary-item" id="ppp">
                        <div class="summary-item-text summary-item-title" id="ppp-title">Price per Piece:</div>
                        <div class="summary-item-text summary-item-value" id="ppp-value">${intToPrice(value)}</div>
                    </div>
                `)
            } else {
                // This property is there, set it's text to value
                $("#ppp-value").text(intToPrice(value));
            }

            // This item should be updated along with Quantity
            // So we shouldn't have to update this question's button.
            // We also shouldn't have to check for the add to cart question
            // $("#qty-next-button").removeClass("question-button").text("Saved!").addClass("question-set");
            // checkForCartQuestion();         

            console.log(`ppp has been updated to ${value}`);

        }

        /** ---------------------------------------------------------------
         * ===  In Home Date has been updated  === ↓
         *  ---------------------------------------------------------------
         */

        if (property === 'date') {
            // Value must be a string.
            if (typeof value !== 'string') {

                // By setting this value to anything but a string, we should
                // remove it from the dom.
                $("#date").remove();

                console.log('orderDetailsHandler: date must be a number.');
            }

            // If this property is not in Order Details yet, add it
            if (!$("#date-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                addDeetArea("mail-summary");
                
                // Add this property BEFORE Total Mailing Cost, which must exist
                // before this property is updated per logic of page
                $("#tmc").before(`
                    <div class="summary-item" id="date">
                        <div class="summary-item-text summary-item-title" id="date-title">First In-Home Week:</div>
                        <div class="summary-item-text summary-item-value" id="date-value">${value}</div>
                    </div>
                `)
            } else {
                // This property is there, set it's text to value
                $("#date-value, #date-disc").text(value);
            }

            // Update the button here.
            $("#week-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

            // Check to see if we should show the final question
            checkForCartQuestion();

            console.log(`date has been updated to ${value}`);


        }

        /** ---------------------------------------------------------------
         * ===  Mailing Weeks has been updated  === ↓
         *  ---------------------------------------------------------------
         */

         if (property === 'weeks') {
            // Value must be a number.
            if (typeof value !== 'number') {

                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#weeks").remove();

                console.log('orderDetailsHandler: weeks must be a number.');
            }

            // If this property is not in Order Details yet, add it
            if (!$("#weeks-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                addDeetArea("mail-summary");
                
                // Add this property BEFORE Total Mailing Cost, which must exist
                // before this property is updated per logic of page
                $("#tmc").before(`
                    <div class="summary-item" id="weeks">
                        <div class="summary-item-text summary-item-title" id="weeks-title">Mailing Weeks:</div>
                        <div class="summary-item-text summary-item-value" id="weeks-value">${value}</div>
                    </div>
                `);

            } else {
                // This property is there, set it's text to value
                $("#weeks-value").text(value.toLocaleString());
            }

            // This question has been saved.
            // Update this question's button
            $("#numweek-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

            // Check to see if we should show the final question
            checkForCartQuestion();

            console.log(`weeks has been updated to ${value}`);

            
        }


        /** ---------------------------------------------------------------
         * ===  Total Mailing Cost has been updated  === ↓
         *  ---------------------------------------------------------------
         */

        if (property === 'tmc') {
            // Value must be a number.
            if (typeof value !== 'number') {
                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#tmc").remove();

                console.log('orderDetailsHandler: tmc must be a number.');


            }

            // If this property is not in Order Details yet, add it
            if (!$("#tmc-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                addDeetArea("mail-summary");
                
                // Add this property
                $("#mail-summary").append(`
                    <div class="summary-item" id="tmc">
                        <div class="summary-item-text summary-item-title bold" id="tmc-title">Total Mailing Cost:</div>
                        <div class="summary-item-text summary-item-value bold" id="tmc-value">${intToPrice(value)}</div>
                    </div>
                `)
            } else {
                // This property is there, set it's text to value
                $("#tmc-value").text(intToPrice(value));
            }

            console.log(`tmc has been updated to ${value}`);

            // This property should be updated every time calcDeets is ran
            // Therefore, there's no button to update, and no need to check
            // for the last question

            // $("#week-next-button").removeClass("question-button").text("Saved!").addClass("question-set");
            // checkForCartQuestion();

            console.log(`tmc has been updated to ${value}`);



            // $("#tmc-value").text(intToPrice(value));

            
        }


        

        /** ---------------------------------------------------------------
         * ===  Total Cost has been updated  === ↓
         *  ---------------------------------------------------------------
         */

         if (property === 'tc') {

            // Value must be a number.
            if (typeof value !== 'number') {
                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#tc").remove();

                console.log('orderDetailsHandler: tc must be a number.');

                
            }

            // If this property is not in Order Details yet, add it
            if (!$("#tc-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                addDeetArea("bottom-summary");
                
                // Add this property
                $("#dn").before(`
                    <div class="summary-item" id="tc">
                        <div class="summary-item-text summary-item-title bold" id="tc-title">Grand Total:</div>
                        <div class="summary-item-text summary-item-value bold" id="tc-value">${intToPrice(value)}</div>
                    </div>
                `)
            } else {
                // This property is there, set it's text to value
                $("#tc-value").text(intToPrice(value));
            }

            console.log(`tc has been updated to ${value}`);


        }

        /** ---------------------------------------------------------------
         * ===  Print Cost has been updated  === ↓
         *  ---------------------------------------------------------------
         */

         if (property === 'pc') {

            // Value must be a number.
            if (typeof value !== 'number') {
                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#pc").remove();

                console.log('orderDetailsHandler: pc must be a number.');

                
            }

            if (value == 0) {
                // Remove the extras area and continue
                $("#summary-extras").remove();
                // continue;
            } else {
                // If this property is not in Order Details yet, add it
                if (!$("#pc-value").length) {


                    // If the mailing area is not in Order Details yet, add it.
                    addDeetArea("summary-extras");
                    
                    // Add this property
                    $("#summary-extras").append(`
                        <div class="summary-item" id="pc">
                            <div class="summary-item-text summary-item-title" id="pc-title">Print Cost:</div>
                            <div class="summary-item-text summary-item-value" id="pc-value">${intToPrice(value)}</div>
                        </div>
                    `)

                } else {
                    // This property is there, set it's text to value
                    $("#pc-value").text(intToPrice(value));
                }

                console.log(`pc has been updated to ${value}`);
            }

            


            
        }

        /** ---------------------------------------------------------------
         * ===  Extras Quantity has been updated  === ↓
         *  ---------------------------------------------------------------
         */
         if (property === 'eq') {

            // Value must be a number.
            if (typeof value !== 'number') {

                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#eq").remove();

                console.log('orderDetailsHandler: eq must be a number.');
            }

            if (value == 0) {
                // Remove the extras area and continue
                $("#summary-extras").remove();
            } else {

                // If this property is not in Order Details yet, add it
                if (!$("#eq-value").length) {


                    // If the mailing area is not in Order Details yet, add it.
                    addDeetArea("summary-extras");
                    
                    // Add this property
                    $("#summary-extras").append(`
                        <div class="summary-item" id="eq">
                            <div class="summary-item-text summary-item-title" id="eq-title">Print Copies:</div>
                            <div class="summary-item-text summary-item-value" id="eq-value">${value.toLocaleString()}</div>
                        </div>
                    `)
                } else {
                    // This property is there, set it's text to value
                    $("#eq-value").text(value.toLocaleString());
                }

                // This question has been saved.
                // Update this question's button
                $("#extras-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

                // Check to see if we should show the final question
                // checkForCartQuestion();

                console.log(`eq has been updated to ${value}`);
            }

        }



        /** ---------------------------------------------------------------
         * ===  Extras Price per Piece has been updated  === ↓
         *  ---------------------------------------------------------------
         */
         if (property === 'eppp') {


            // Value must be a number.
            if (typeof value !== 'number') {

                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#eppp").remove();

                console.log('orderDetailsHandler: eppp must be a number.');
            }

            if (value == 0) {
                // Remove the extras area and continue
                $("#summary-extras").remove();
            } else {

                // If this property is not in Order Details yet, add it
                if (!$("#eppp-value").length) {


                    // If the mailing area is not in Order Details yet, add it.
                    addDeetArea("summary-extras");
                    
                    // Add this property
                    $("#eq").after(`
                        <div class="summary-item" id="eppp">
                            <div class="summary-item-text summary-item-title" id="eppp-title">Price per Piece:</div>
                            <div class="summary-item-text summary-item-value" id="eppp-value">${intToPrice(value)}</div>
                        </div>
                    `)
                } else {
                    // This property is there, set it's text to value
                    $("#eppp-value").text(intToPrice(value));
                }

                // This item should be updated along with Quantity
                // So we shouldn't have to update this question's button.
                // We also shouldn't have to check for the add to cart question
                // $("#qty-next-button").removeClass("question-button").text("Saved!").addClass("question-set");
                // checkForCartQuestion();   
                
                $("#eppp-value").text(intToPrice(value));


                console.log(`eppp has been updated to ${value}`);
            }

            
        }


        /** ===---------------------------------------------------------------===
         * Shipping Price has been updated ↓
         */
        if (property === 'shipp') {

            // Value must be a number.
            if (typeof value !== 'number') {

                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#shipp").remove();

                console.log('orderDetailsHandler: shipp must be a number.');
            }


            if (value == 0) {
                // Remove the extras area and continue
                $("#summary-extras").remove();
            } else {
                // If this property is not in Order Details yet, add it
                if (!$("#shipp-value").length) {


                    // If the extras area is not in Order Details yet, add it.
                    addDeetArea("summary-extras");
                    
                    // Add this property
                    $("#summary-extras").append(`
                        <div class="summary-item" id="shipp">
                            <div class="summary-item-text summary-item-title" id="shipp-title">Shipping:</div>
                            <div class="summary-item-text summary-item-value" id="shipp-value">${intToPrice(value)}</div>
                        </div>
                    `)
                } else {
                    // This property is there, set it's text to value
                    $("#shipp-value").text(intToPrice(value));
                }

                // This item should be updated along with Quantity
                // So we shouldn't have to update this question's button.
                // We also shouldn't have to check for the add to cart question
                // $("#qty-next-button").removeClass("question-button").text("Saved!").addClass("question-set");
                // checkForCartQuestion();   
                
                $("#shipp-value").text(intToPrice(value));


                console.log(`shipp has been updated to ${value}`);
            }

        }
        

        /** ---------------------------------------------------------------
         * === Ship To has been updated  === ↓
         *  ---------------------------------------------------------------
         */

        if (property === 'ship') {

            // Value must be a number.
            if (typeof value !== 'string') {
                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#ship").remove();

                console.log('orderDetailsHandler: ship must be a number.');
                throw ('orderDetailsHandler: ship must be a number.') // Stop execution
                
            }

            // If this property is not in Order Details yet, add it
            if (!$("#ship-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                // addDeetArea("summary-extras");

                // Add this property BEFORE Print Cost, which must exist
                // before this property is updated per logic of page
                $("#eq").before(`
                    <div class="summary-item" id="ship">
                        <div class="summary-item-text summary-item-title" id="ship-title">Ship To:</div>
                        <div class="summary-item-text summary-item-value" id="ship-value">${value}</div>
                    </div>
                `)

            } else {
                // This property is there, set it's text to value
                $("#ship-value").text(value);
            }

            console.log(`ship has been updated to ${value}`);

            // This question has been saved.
            // Update this question's button
            $("#ship-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

            // Check to see if we should show the final question
            // checkForCartQuestion();


            // // This item was added to DOM when the user clicked the next button on q1.
            // // Update the DOM with locale string version of `value`
            // if (value != "-") {
            //     $("#ship-value").text(value);

            //     // Update the button here.
            //     $("#ship-next-button").removeClass("question-button").text("Saved!").addClass("question-set");
            //     checkForCartQuestion();
            //     console.log(`Ship to has been updated to ${value}`);
            // }


        }


        /** ---------------------------------------------------------------
         * === Total Print Cost has been updated  === ↓
         *  ---------------------------------------------------------------
         */
         if (property === 'tpc') {


            // Value must be a number.
            if (typeof value !== 'number') {

                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#tpc").remove();

                console.log('orderDetailsHandler: tpc must be a number.');
            }

            // If this property is not in Order Details yet, add it
            if (!$("#tpc-value").length) {


                // If the extras area is not in Order Details yet, add it.
                // addDeetArea("summary-extras");
                
                // Add this property
                $("#summary-extras").append(`
                    <div class="summary-item" id="tpc">
                        <div class="summary-item-text summary-item-title bold" id="tpc-title">Total Print Cost:</div>
                        <div class="summary-item-text summary-item-value bold" id="tpc-value">${intToPrice(value)}</div>
                    </div>
                `)
            } else {
                // This property is there, set it's text to value
                $("#tpc-value").text(intToPrice(value));
            }

            // This item should be updated along with Quantity
            // So we shouldn't have to update this question's button.
            // We also shouldn't have to check for the add to cart question
            // $("#qty-next-button").removeClass("question-button").text("Saved!").addClass("question-set");
            // checkForCartQuestion();  


            console.log(`tpc has been updated to ${value}`);
            


        }


        /** ---------------------------------------------------------------
         * === Weekly Mailing Cost has been updated  === ↓
         *  ---------------------------------------------------------------
         */

         if (property === 'wmc') {



            // Value must be a number.
            if (typeof value !== 'number') {
                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#wmc").remove();

                console.log('orderDetailsHandler: wmc must be a number.');

                
            }

            // If this property is not in Order Details yet, add it
            if (!$("#wmc-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                addDeetArea("bottom-summary");
                
                // Add this property
                $("#dn").before(`
                    <div class="summary-item" id="wmc">
                        <div class="summary-item-text summary-item-title bold" id="wmc-title">Total Weekly Cost:</div>
                        <div class="summary-item-text summary-item-value bold" id="wmc-value">${intToPrice(value)}</div>
                        
                    </div>
                    <div class="summary-item" id="disc">
                        <div class="summary-item-text summary-item-title bold" id="disc-title">Payments Begin:</div>
                        <div class="summary-item-text summary-item-value bold" id="disc-value">${orderProxy.date}</div>
                        
                    </div>
                `)
                // <div class="disc">Payments begin <span id="date-disc"></span></div>

            } else {
                // This property is there, set it's text to value
                $("#wmc-value").text(intToPrice(value));
            }

            console.log(`wmc has been updated to ${value}`);




        }

            

        /** ---------------------------------------------------------------
         * === Payment Method has been updated  === ↓
         *  ---------------------------------------------------------------
         */
         if (property === 'pm') {

            // Value must be a string.
            if (typeof value !== 'string') {
                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#pm").remove();

                console.log('orderDetailsHandler: pm must be a number.');

                
            }

            // If this property is not in Order Details yet, add it
            if (!$("#pm-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                addDeetArea("bottom-summary");

                // Add this property BEFORE Total Cost, which must exist
                // before this property is updated per logic of page
                $("#tc").before(`
                    <div class="summary-item" id="pm">
                        <div class="summary-item-text summary-item-title" id="pm-title">Payment Method:</div>
                        <div class="summary-item-text summary-item-value" id="pm-value">${value}</div>
                    </div>
                `)

            } else {
                // This property is there, set it's text to value
                $("#pm-value").text(value);
            }

            console.log(`pm has been updated to ${value}`);

            // This question has been saved.
            // Update this question's button
            $("#pay-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

            // Check to see if we should show the final question
            checkForCartQuestion();


        }


        /** ---------------------------------------------------------------
         * === Debit On has been updated  === ↓
         *  ---------------------------------------------------------------
         */

        if (property === 'on') {
            // Value must be a string.

            // Value must be a string.
            if (typeof value !== 'string') {
                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#on").remove();

                console.log('orderDetailsHandler: on must be a string.');

                
            }

            // If there's a Debit on, we should remove the ccfee property
            $("#ccfee").remove();

            // If this property is not in Order Details yet, add it
            if (!$("#on-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                addDeetArea("bottom-summary");

                // Add this property BEFORE Total Cost, which must exist
                // before this property is updated per logic of page
                $("#tc").before(`
                    <div class="summary-item" id="on">
                        <div class="summary-item-text summary-item-title" id="on-title">Debit On:</div>
                        <div class="summary-item-text summary-item-value" id="on-value">${value}</div>
                    </div>
                `)

            } else {
                // This property is there, set it's text to value
                $("#on-value").text(value);
            }

            console.log(`on has been updated to ${value}`);

            // This question has been saved.
            // Update this question's button
            $("#pay-next-button").removeClass("question-button").text("Saved!").addClass("question-set");

            // Check to see if we should show the final question
            checkForCartQuestion();
            // checkForCartQuestion();


        }


        /** ---------------------------------------------------------------
         * === Credit Card Fee has been updated  === ↓
         *  ---------------------------------------------------------------
         */

         if (property === 'ccfee') {

            // Value must be a string.
            if (typeof value !== 'number') {
                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#ccfee").remove();

                console.log('orderDetailsHandler: ccfee must be a string.');

                
            }

            // If there's a cc fee, we should remove the Debit On property
            $("#on").remove();

            // If this property is not in Order Details yet, add it
            if (!$("#ccfee-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                addDeetArea("bottom-summary");

                // Add this property BEFORE Total Cost, which must exist
                // before this property is updated per logic of page
                $("#tc").before(`
                    <div class="summary-item" id="ccfee">
                        <div class="summary-item-text summary-item-title" id="ccfee-title">CC Fee:</div>
                        <div class="summary-item-text summary-item-value" id="ccfee-value">${intToPrice(value)}</div>
                    </div>
                `)

            } else {
                // This property is there, set it's text to value
                $("#ccfee-value").text(intToPrice(value));
            }

            console.log(`ccfee has been updated to ${value}`);

            // checkForCartQuestion();


        }

        /** ---------------------------------------------------------------
         * === Payment Method has been updated  === ↓
         *  ---------------------------------------------------------------
         */
         if (property === 'dn') {

            // Value must be a string.
            if (typeof value !== 'number') {
                // By setting this value to anything but a number, we should
                // remove it from the dom.
                $("#dn").remove();

                console.log('orderDetailsHandler: dn must be a number.');

                
            }

            // If this property is not in Order Details yet, add it
            if (!$("#dn-value").length) {


                // If the mailing area is not in Order Details yet, add it.
                addDeetArea("bottom-summary");

                // Add this property BEFORE Total Cost, which must exist
                // before this property is updated per logic of page
                $("#bottom-summary").append(`
                    <div class="summary-item" id="dn">
                        <div class="summary-item-text summary-item-title dn" id="dn-title">Due Now:</div>
                        <div class="summary-item-text summary-item-value dn" id="dn-value">${intToPrice(value)}</div>
                    </div>
                `)

            } else {
                // This property is there, set it's text to value
                $("#dn-value").text(intToPrice(value));
            }

            console.log(`dn has been updated to ${intToPrice(value)}`);


            // checkForCartQuestion();


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
APPLICATION ↓
 */

// Document is ready...
$(function() {
    //#region
    console.log( "ready!" );

    var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (mobile) {
        alert("Visit this on a Computer for Better View");              
    } else {

    }

    // Add table to first question
    // console.log(myTable)
    $("#quantity-question").append(myTable);

    // Debug
    calcDeets();

    scrollToBottom();


});




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
        It looks like this was used https://angular-ui.github.io/bootstrap/versioned-docs/1.0.0/#/datepicker
        for the Date type question.

        Here I will use jquery ui's datepicker instead.
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
            
            // We will make unavailable the next four wednesdays from today.

            var nxtWed = nextSession(); // Get's the next available Wednesday as Date()

            var dd = String(nxtWed. getDate()). padStart(2, '0');
            var mm = String(nxtWed. getMonth() + 1). padStart(2, '0'); //January is 0!
            var yyyy = nxtWed. getFullYear();

            var disabledDates = [(yyyy + "-" + mm + "-" + dd)];

            for (var i = 1; i < 4; i++) {
                // nxtWed = nxtWed.getDate() + (7 * i);
                // console.log(`Adding ${(7 * i)} to ${nxtWed.getDate()}`)
                nxtWed.setDate(nxtWed.getDate() + 7);

                var nd = String(nxtWed.getDate()).padStart(2, '0');
                var nm = String(nxtWed.getMonth() + 1).padStart(2, '0'); //January is 0!
                var nyyy = nxtWed.getFullYear();
                disabledDates.push(nyyy + "-" + nm + "-" + nd);
            }

            // disabledDates Ex: ["2021-05-26", "2021-06-02", "2021-06-09", "2021-06-16"]
            


            // Instantiate the datepicker
            $( "#datepicker" ).datepicker({
                inline: false,
                showWeek:true,
                minDate:+28,
                defaultDate: '+29d',
                gotoCurrent: true,
                // Hide every day but Wednesday
                beforeShowDay: function(date) {
                    var doW = date.getDay(); // doW = day of week
                    var disableDays = [0,1,2,4,5,6]
                    if (disableDays.includes(doW)) {
                        return [false, ""]
                    } else {
                        // It's a wednesday, but if it's in disabledDates, disable it.
                        //https://dzone.com/articles/disable-dates-in-datepicker
                        var string = jQuery.datepicker.formatDate('yy-mm-dd',date);
                        return [ disabledDates.indexOf(string) == -1 ]
                        return [true, ""]
                    }
                 },
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
    orderProxy.dn = 0;
    if ($("#extras-ppp").length) {

        var chosenQty = $("#extras-qty-input").val();
        var chosenPPP = $("#extras-ppp").attr("value");


        orderProxy.eq = Number(chosenQty);
        orderProxy.pc = Number(chosenQty) * Number(chosenPPP);
        orderProxy.eppp = Number(chosenPPP);

        orderProxy.tc = (Number(chosenQty) * Number(chosenPPP)) + orderProxy.tc;
        orderProxy.wmc = orderProxy.tc / orderProxy.weeks;

        // calcDeets();


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
        
        // $(this).removeClass("question-button").text("Saved!").addClass("question-set");
        // checkForCartQuestion();


    } else {
        // Skip the "Where should we ship them to?" question...

        // Renmove the shipping question
        $("#ship-question").remove();

        orderProxy.eq = 0;
        orderProxy.eppp = 0;
        orderProxy.tpc = 0;
        orderProxy.tc = orderProxy.tmc;
        orderProxy.wmc = orderProxy.tc / orderProxy.weeks;

        console.log("Skipping the shipping question");
        if (!$("#addcc-button").length) {
            // Create element to append to DOM
            var dom = `<div class="question unhide-question">
                <div class="question-text">How would you like to pay for this order?</div>
                <div class="payment-buttons">
                <div class="payment-button pay-selected" id="ach-button">
                    <i class="fas fa-university"></i><p class="pay-method">ACH Ending in... 1234</p>
                </div>
                <div class="payment-button" id="cc-button">
                    <i class="fas fa-money-check-alt"></i><p class="pay-method">Card Ending in... 1234</p>
                </div>
                <div class="payment-button" id="addcc-button">
                <i class="fas fa-plus"></i></i><p>Edit Payment Options</p>
                </div>
                </div>
                <div class="sel-area" id="day-of-week">
                    <p class="sel-why">Debit my account on a</p>
                    <select class="sel-format" >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    </select>
                </div>
                <div class="question-button" id="pay-next-button">
                                        Continue
                </div>
            </div>`
            
            addQuestion(dom, function() {
                // Question was added...
                scrollToBottom();

            }) 
        }




    }




    // Append the next question...


    //#endregion
 });
/** 
 * User chooses a date
 */
$(document).on("change", "#datepicker", function() {
    //#region

    // Enable the button
    requireUpdate("#week-next-button");
    
    //#endregion
});





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



/** 
 * User Chooses a Number of Weeks
 */
$(document).on("click", ".num-week-choice", function() {
    //#region

    // Unset any ".num-week-selected"
    $(".num-week-selected").removeClass("num-week-selected");
    // Make this one appear selected
    $(this).addClass("num-week-selected");

    requireUpdate("#numweek-next-button")
    
    //#endregion
});

// On Number of Weeks Continue button press

$(document).on("click", "#numweek-next-button", function() {

    //#region
    var weeks = $(".num-week-selected").attr("weeks");

    orderProxy.dn = 0; // We know this is mailing, set Due Now to $0.00

    orderProxy.weeks = Number(weeks);
    orderProxy.tc = orderDetails.tmc;
    orderProxy.wmc = orderDetails.tc / Number(weeks);



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

        // checkForCartQuestion()
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

        // $("#dn").remove();
        // $("#tpc").remove();

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

     var shipCost = 66.99; // Grab this from API

     // If the option isn't the default "Select..."
     if (selText.includes("Select")) {
        orderProxy.ship = null;
     } else {
        orderProxy.ship = selText;
        orderProxy.shipp = shipCost;
     }

     orderProxy.tpc = (orderProxy.pc + shipCost)
     orderProxy.tc = (orderProxy.tpc + orderProxy.tmc);
     orderProxy.wmc = (orderProxy.tc / orderProxy.weeks);

    // Add the Account total


     console.log("Adding the payment question...")
     // Add payment question
     // If it's not there yet...

     // Check for cart question before adding the payment question
     checkForCartQuestion();

     if (!$("#addcc-button").length) {
         var dom = `<div class="question unhide-question">
         <div class="question-text">How would you like to pay for this order?</div>
         <div class="payment-buttons">
           <div class="payment-button pay-selected" id="ach-button">
             <i class="fas fa-university"></i><p class="pay-method">ACH Ending in... 1234</p>
           </div>
           <div class="payment-button" id="cc-button">
             <i class="fas fa-money-check-alt"></i><p class="pay-method">Card Ending in... 1234</p>
           </div>
           <div class="payment-button" id="addcc-button">
           <i class="fas fa-plus"></i></i><p>Edit Payment Options</p>
           </div>
         </div>
         <div class="sel-area" id="day-of-week">
                        <p class="sel-why">Debit my account on a</p>
                        <select class="sel-format" >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        </select>
                    </div>
         <div class="question-button" id="pay-next-button">
                                Continue
        </div>
       </div>`
       
       addQuestion(dom, function() {
           // Question was added...
           scrollToBottom();
        //    checkForCartQuestion();
       })
     }

    //#endregion

 });
{/* <script src="https://gist.github.com/awesomebunny2/d0a7c331bea454d6f4e77cc5a424a791.js"></script> */}
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

        // credit card fee is 3% of total cost

        // If it's ACH, ask what day they want to mail.
        if (btnID == "ach-button") {
            // It's ACH    
            console.log("Clicked " + btnID);
            var dom = `<div class="sel-area" id="day-of-week">
                        <p class="sel-why">Debit my account on a</p>
                        <select class="sel-format" >
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        </select>
                    </div>`

            if(!$("#day-of-week").length) {
                $("#pay-next-button").before(dom);
                $("#day-of-week").slideDown("fast");
                scrollToBottom();
            }


        } else {
            // It's the CC
            // Hide the debit on question and debit on area in order details
            
            $("#day-of-week").slideUp("fast", function() {
                $("#day-of-week").remove();
            })

        }
        

        

    } else {
        // $("#day-of-week").slideUp().remove();
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

    var ccfee = orderProxy.tc * .03;

    // If there's a day of week, set the proxy value to that
    if ($("#day-of-week").length) {
        console.log("It's ACH")
        var whichDay = $(".sel-format option:selected").val();
        // Set proxy
        orderProxy.on = whichDay;
    } else {
        console.log("It's CC")
        // It's a cc
        orderProxy.ccfee = ccfee;
    }

    checkForCartQuestion();


    //#endregion
 });


 /** 
  * The user clicks add to cart
  */

$(document).on("click", ".add-to-cart-button, .summary-add-to-cart-buttons", function() {
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
    $("#" + questionID).find(".toggler").slideToggle("fast", function() {
        scrollToBottom();
    });
    console.log($(this).text())
    if ($(this).text().includes("Show")) {
        $(this).text("Hide Price Guide");
    } else {
        $(this).text("Show Price Guide");
    }
});

$(document).on("change", "#day-of-week", function() {
    requireUpdate("#pay-next-button");
})

$(document).on("change", "#extras-qty-input", function() {
    requireUpdate("#extras-next-button");
})

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

        if (kInput >= pricing[i].qty && kInput < pricing[i + 1].qty) {
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
        $("#add-to-cart-question, .summary-add-to-cart-buttons-container").slideUp("fast", function() {
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

            // If the ship to question is visible, and set to Select... cancel
            // if ($("#ship-question").length && $("#ship-sel option:selected").text().includes("Select")) {
            //     return;
            // }

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

            if (!$(".summary-add-to-cart-buttons-container").length) {


                // Append the Cart and Save buttons to the order details summary
                $("#detail-summary").append(`

                <div class="summary-add-to-cart-buttons-container">
                    <div class="question-button summary-add-to-cart-buttons" value="add" >Add to cart</div>
                    <div class="question-button summary-add-to-cart-buttons" value="save">Save for Later</div>
                </div>
                `);

            }
            
            
            

        }
    }
}

function showMessage(theMessage) {
    $("#message").empty().append(theMessage);
    $("#message-container").css("display", "flex");

}

// Get the next wednesday
// https://stackoverflow.com/questions/3638906/get-date-of-specific-day-of-the-week-in-javascript/3639224

function nextSession(date) {
    var ret = new Date(date||new Date());
    ret.setDate(ret.getDate() + (3 - 1 - ret.getDay() + 7) % 7 + 1);
    return ret;
}

// Calculate the Order Details

function calcDeets() {
    for (const prop in orderProxy) {

        console.log(`${prop}: ${orderProxy[prop]}`);

        if (prop === "tmc") {

                /**
                * Total Mailing Cost = Quantity * Price Per Piece
                * **
                * Dependant on 'qty' and 'ppp' being Numbers
                * **
                */

                 if (typeof orderProxy.qty === 'number' && typeof orderProxy.ppp === 'number') {
                    orderProxy.tmc = orderProxy.qty * orderProxy.ppp;
                } else {
                    console.log("calcDeets(): 'tmc' requires Number properties that are NAN");
                }

        } else if (prop === "pc") {

                /**
                * Print Cost = Extras Quantity *  Extras Price Per Piece
                * **
                * Dependant on 'eq' and 'eppp' being Numbers
                * **
                */

                 if (typeof orderProxy.eq === 'number' && typeof orderProxy.ppp === 'number') {
                    orderProxy.pc = orderProxy.eq * orderProxy.eppp;

                } else {
                    console.log("calcDeets(): 'pc' requires Number properties that are NAN");
                }

        } else if (prop === "tpc") {
            
                /**
                * Total Print Cost = Print Cost + Shipping Cost
                * **
                * Dependant on 'pc' and 'ppp' being Numbers
                * **
                */

                 if (typeof orderProxy.pc === 'number' && typeof orderProxy.ppp === 'number') {
                    orderProxy.tmc = orderProxy.qty * orderProxy.ppp;

                } else {
                    console.log("calcDeets(): 'tpc' requires Number properties that are NAN");
                }

        } else if (prop === "tc") {
            
            /**
            * Total Cost = Total Print Cost + Total Mailing Cost
            * **
            * Dependant on 'tpc' and 'tmc' being Numbers
            * **
            */

             if (typeof orderProxy.tpc === 'number' && typeof orderProxy.tmc === 'number') {
                orderProxy.tc = orderProxy.tpc * orderProxy.tmc;

            } else {
                console.log("calcDeets(): 'tc' requires Number properties that are NAN");
            }

        } else if (prop === "wmc") {
            
            /**
            * Total Weekly Cost = Total Cost / Number of Weeks
            * **
            * Dependant on 'tc' and 'weeks' being Numbers
            * **
            */

             if (typeof orderProxy.tc === 'number' && typeof orderProxy.weeks === 'number') {
                orderProxy.wmc = orderProxy.tc / orderProxy.weeks;

            } else {
                console.log("calcDeets(): 'wmc' requires Number properties that are NAN");
            }

        }
       
        

    }


}

/**
 * Show details area, and add an area to it if it's not there already
 * 
 * @param {String} areaid The id of the area to add
 */
function addDeetArea(areaid) {

    // If the order details is hidden, then display it
    if(!$("#detail-summary").is(":visible")){
        $("#detail-summary").css("display", "flex");
    }


    // There's only three total areas. Mailing, Print Only, and Totals

    if (!$(`#${areaid}`).length) {

        // If it's the Extras area, it goes before Summary
        if (areaid.includes("extra")) {
            $("#bottom-summary").before(`
            <div class="summary-area" id="${areaid}"></div>
        `)
        } else {
            $("#summary-area").append(`
                <div class="summary-area" id="${areaid}"></div>
            `)
        }
        
        // Add header
        if (areaid.includes("mail")) {
            $(`#${areaid}`).append(`
                <div class="summary-area-head">Mailing</div>
            `)
        } else if (areaid.includes("extra")) {
            $(`#${areaid}`).append(`
                <div class="summary-area-head">Print Copies</div>
            `)
        
        }
    }
}