const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //puts all the items found into a node list - not the space in between .row .seat:not(.occupied) - [like an array] - spcifically we want the unoccupied seats in a row (not the occupied ones or in the showcase legend area)
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

console.log(seats);
let ticketPrice = +movieSelect.value; // gets ticket price string as a number - quicker than using parseInt() - use let not const as this ticke price will change

//----Functions Area ----->

/** Doc String
 * update total count of selected seats 
 */

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat);
    }); //this function gets the indexed seats from the node list and capturs in an array

    // console.log(seatsIndex);  shows the index of each selected seat working in the console

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    // stores this data in the application window even when browser is refreshed

    const selectedSeatsCount = selectedSeats.length;
    // console.log(selectedSeatsCount); - shows the selection count is working in the console
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice
    // updates the HTML text for count and total to reflect on screen

};

// Saving data into local storage----
//   localStorage.setItem('selectedSeats', JSON.stringify 
//   (seatsIndex));

// Convert a node list into an array using a spread operator
//     const seatsIndex = [...selectedSeats].map(function (seat) {
//     return [...seats].indexOf(seat);
//      });



//----Event Listeners Area ----->

// Movie select event  (activates a ticket price change)
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    console.log(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});



//Seat select click event

container.addEventListener('click', e => {
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        // console.log(e.target); //shows which "seat" is being clicked on in the container, in the console  
        e.target.classList.toggle('selected');
        // classList can be .add/ .remove / .toggle   - toggle turns it on and off when clicked    

        updateSelectedCount(); //runs this fucntion to udpate the counter
    }

});