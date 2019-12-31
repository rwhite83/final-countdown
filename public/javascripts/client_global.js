function a() {
    alert('script fired');
}

// alert('script fired');

function countdown() {

    console.log('function called');
    
    // extract date and time
    var count_down_date = new Date(date).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        return_string = "";
        
        // Get todays date and time
        var now = new Date().getTime();
        
        // Find the distance between now and the count down date
        var distance = count_down_date - now;
        
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var formattedDays = ("0" + days).slice(-2);
        var formattedHours = ("0" + hours).slice(-2);
        var formattedMinutes = ("0" + minutes).slice(-2);
        var formattedSeconds = ("0" + seconds).slice(-2);
        
        // Output the result in an element with id="demo"
        return_string = formattedDays + ":" + formattedHours + ":"
            + formattedMinutes + ":" + formattedSeconds;

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            return_string = "Good Luck!";
        }
    }, 1000);

    return return_string;
}

// countdown("Nov 29, 2019 23:59:00", "Final Submission for Term Game Project")
// countdown("Oct 2, 2019 23:59:59", "Milestone 1 Due")
// countdown("Sep 25, 2019 23:59:00", "hci_quiz")