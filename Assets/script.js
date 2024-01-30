
  const localeSettings = {};
  dayjs.locale(localeSettings);
  //waiting for the DOM to be fully loading before executing the code
  $(function () {
    // get the current date and time
    const currentHour = dayjs().format('H');
  // The function below will change the color of the blocks depending on its current time. 
    function hourlyColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }
  // Function will save user entry in a local storage, once they have saved their entry. 
    function textEntry() {
      $('.saveBtn').on('click', function() {
        const key = $(this).parent().attr('id');
        const value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
   // Function will update the block color dependant on the current time
   //Grey = past
   //Red = current
   //Green = Future 
    function refreshColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
    // Retrieve user entry from local storage
    $('.time-block').each(function() {
      const key = $(this).attr('id');
      const value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
//date format
    function updateDate() {
      const dateElement = $('#date');
      const currentDate = dayjs().format('dddd, MMMM D, YYYY');
      dateElement.text(currentDate);
    }
    hourlyColor();
    textEntry();                
    refreshColor();
//update date
    setInterval(updateDate);
  });