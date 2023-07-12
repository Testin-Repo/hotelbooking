
function generateBookingNumber() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    
    const bookingNumber = `${year}${month}${day}-${randomNum}`;
    
    return bookingNumber;
  }
  
module.exports = {generateBookingNumber}  