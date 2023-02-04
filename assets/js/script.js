const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row.seat:not(.occupied)'); //puts all the items found into a node list (like an array) - spscifically we want the unoccupied seats in a row (not the occupied ones or in the showcase legend area)
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const ticketPrice = +movieSelect.value; // gets ticket price string as a number - quicker than using parseInt()

console.log(typeof ticketPrice);

//----Functions Area ----->

/** Doc String
 * update total count of selected seats 
 */

function updateSelectedCount() {
    const selectedSeats

}





//----Event Listeners Area ----->

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        console.log(e.target); //shows which "seat" is being clicked on in the container, in the console  
        e.target.classList.toggle('selected');
        // classList can be .add/ .remove / .toggle   - toggle turns it on and off when clicked    

        updateSelectedCount(); //runs this fucntion to udpate the counter
    }

});