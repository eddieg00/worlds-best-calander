//global variables
var currentDayEl = $('#currentDay');
//container in header
var containerEl = $('.container');
var currentHour = moment().hour();
//array list
var workDayHours = [
    moment().hour(9).format('hA'),
    moment().hour(10).format('hA'),
    moment().hour(11).format('hA'),
    moment().hour(12).format('hA'),
    moment().hour(13).format('hA'),
    moment().hour(14).format('hA'),
    moment().hour(15).format('hA'),
    moment().hour(16).format('hA'),
    moment().hour(17).format('hA')
];
var timeBlockHour = $('col-1 hour');
var task = $('.description');

var currentDay = moment().format('dddd, MMMM Do');
currentDayEl.text(currentDay);

function auditTimeBlock($timeBlock) {
    var timeBlockHour = $timeBlock.find('.hour');
    var currentTimeBlockHour = moment(timeBlockHour.text().trim(), 'hA').hour();

    $timeBlock.removeClass('past present future');

    if (currentTimeBlockHour > currentHour) {
        $timeBlock.addClass('future');
    } else if (currentTimeBlockHour === currentHour) {
        $timeBlock.addClass('present');
    } else {
        $timeBlock.addClass('past');
    }
}


function loadTask() {

    //loop to get task for each hour
    for (var i = 0; i < workDayHours.length; i++) {
        let task = localStorage.getItem(workDayHours[i])

        if (task) {
            $('#' + (i + 9)).siblings().first().children().text(task);
        }
    }
}


// Define a function to create a time block row for a given hour
function createTimeBlockRow(hour) {
    // Create the necessary elements
    var timeBlockRow = $('<div>')
      .addClass('row time-block')
      .attr('id', 'row-' + hour);
  
    var timeBlockHour = $('<div>')
      .addClass('col-1 hour')
      .text(hour);
  
    var timeBlockEventSpace = $('<div>')
      .addClass('col-10')
      .attr('id', 'time-block-' + hour);
  
    var userInput = $('<p>')
      .addClass('description')
      .text(' ')
      .attr('id', 'Hour-' + hour);
  
    auditTimeBlock(timeBlockEventSpace);
  
    var saveBtn = $('<button>')
      .addClass('col-1 saveBtn')
      .attr({
        id: 'save-button-' + hour,
        type: 'button'
      })
      .on('click', function () {
        var hour = $(this).siblings('.hour').text();
        var task = $(this).siblings('.description').text().trim();
        saveTask(hour, task);
      });
  
    var saveIcon = $('<i>').addClass('fas fa-save');
  
    // Append the elements to the row
    timeBlockRow.append(timeBlockHour, timeBlockEventSpace, saveBtn);
    timeBlockEventSpace.append(userInput);
    saveBtn.append(saveIcon);
  
    return timeBlockRow;
  }
  
  // Loop through the work day hours and create a time block row for each hour
  for (var i = 9; i <= 17; i++) {
    var timeBlockRow = createTimeBlockRow(i);
    $(containerEl).append(timeBlockRow);
  }
  
$('.col-10').on('click', 'p', function () {

    var text = $(this)
        .text()
        .trim()

    var textInput = $('<textarea>')
        .addClass('form-control')
        .val(text);

    $(this).replaceWith(textInput);

    textInput.trigger('focus');
});

$('.col-10').on('blur', 'textarea', function () {
    var text = $(this)
        .val()
        .trim();

    var userTextP = $("<p>")
        .addClass("description")
        .text(text);

    $(this).replaceWith(userTextP);
})

loadTask();