const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //puts all the items found into a node list - not the space in between .row .seat:not(.occupied) - [like an array] - spcifically we want the unoccupied seats in a row (not the occupied ones or in the showcase legend area)
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// console.log(seats);

let ticketPrice = +movieSelect.value; // gets ticket price string as a number - quicker than using parseInt() - use let not const as this ticke price will change

//----Functions Area ----->

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
// stores this data in the application window as a key: value pair


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

// Get data fronm local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Notes:  

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
    setMovieData(e.target.selectedIndex, e.target.value);
    // shows the index number and price of the selected item (movie select dropdown  ??  )
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

// Initial count and total set (from local storage)
updateSelectedCount();