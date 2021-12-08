const timer = (deadline, element, setMintPrompt = null) => {

  var skip = element == "pass" ? true : false;

  // var countDownDate = new Date(deadline).getTime();

  var countDownDate = deadline

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get today's date and time

    var now = new Date().getTime()

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"

    if (document.getElementById(element) || skip) {

      if (distance < 0 && distance >= -1000 && setMintPrompt) {
        console.log("time up")
        setMintPrompt(true)
      }

      if (distance < 0) {
        if (element !== "pass") document.getElementById(element).innerHTML = "00:00:00"
      } else {
        if (document.getElementById(element))
          document.getElementById(element).innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
      }

    }
  }, 1000);
}

export default timer