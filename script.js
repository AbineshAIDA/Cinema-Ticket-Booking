const seatMapContainer = document.querySelector('.seat-map');
const selectedSeatsSpan = document.getElementById('selected-seats');
const totalPriceSpan = document.getElementById('total-price');
const confirmBookingButton = document.getElementById('confirm-booking');
const bookingConfirmation = document.getElementById('booking-confirmation');

let selectedSeats = [];

function createSeatMap() {
    const numRows = 10;
    const numCols = 20;
    const diamondRow = numRows - 1;
    const premiumRows = [0, 1, 2];

    const seatRows = document.createElement('ul');
    seatRows.classList.add('seat-rows');

    for (let i = 0; i < numRows; i++) {
        const seatRow = document.createElement('li');
        seatRow.classList.add('seat-row');

        for (let j = 0; j < numCols; j++) {
            const seat = document.createElement('button');
            seat.classList.add('seat');

            if (i === diamondRow) {
                if (j >= numCols - 9) {
                    seat.classList.add('premium-diamond');
                } else {
                    seat.classList.add('diamond');
                }
            }

            seat.addEventListener('click', () => {
                const seatType = seat.classList.contains('premium-diamond')
                    ? 'premium-diamond'
                    : seat.classList.contains('diamond')
                    ? 'diamond'
                    : 'normal';
                const seatPrice =
                    seatType === 'premium-diamond'
                        ? 300
                        : seatType === 'diamond'
                        ? 190
                        : 150;

                const seatIndex = selectedSeats.findIndex(
                    (selectedSeat) => selectedSeat.row === i && selectedSeat.col === j
                );

                if (seatIndex !== -1) {
                    selectedSeats.splice(seatIndex, 1);
                    seat.classList.remove('selected');
                } else {
                    selectedSeats.push({ row: i, col: j, type: seatType, price: seatPrice });
                    seat.classList.add('selected');
                }

                updateBookingSummary();
            });

            seatRow.appendChild(seat);
        }

        seatRows.appendChild(seatRow);
    }

    seatMapContainer.appendChild(seatRows);
}

function updateBookingSummary() {
    let totalSeats = 0;
    let totalPrice = 0;

    selectedSeats.forEach((seat) => {
        totalSeats++;
        totalPrice += seat.price;
    });

    selectedSeatsSpan.textContent = totalSeats + ' Seat(s)';
    totalPriceSpan.textContent = '₹' + totalPrice;

    if (totalSeats > 0) {
        bookingConfirmation.style.display = 'block';
    } else {
        bookingConfirmation.style.display = 'none';
    }
}

createSeatMap();

confirmBookingButton.addEventListener('click', () => {
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat.');
        return;
    }

    alert('Your booking has been confirmed! Thank you for choosing Starlight Cinemas.');

    selectedSeats = [];
    updateBookingSummary();

    const selectedSeatsButtons = document.querySelectorAll('.seat.selected');
    selectedSeatsButtons.forEach((button) => button.classList.remove('selected'));
});
