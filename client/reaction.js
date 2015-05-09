validateReaction = function(){
  // WORK HERE
  return true
}

submitReaction = function (){  
  
  var answers = $('.answer');

  var answerObj = {}
  _.each(answers, function(a){
    var id = $(a).attr("id")
    var value = $(a).val()
    if(value != ""){
      answerObj[id] = value
    }
  })
  //console.log(answerObj)
  
  var thisReactionTask = ReactionTasks.findOne()
  var reaction_task_id = thisReactionTask._id
  thisReactionTask["reaction_task_id"] = reaction_task_id
  delete thisReactionTask["_id"]
  
  var thisReactionTaskBatchAssignment = ReactionTaskBatchAssignments.findOne()
  var thisReactionTaskBatchAssignmentId = thisReactionTaskBatchAssignment._id
  thisReactionTask["reaction_task_batch_assignment_id"] = thisReactionTaskBatchAssignmentId
  
  thisReactionTask["answers"] = answerObj
  //console.log(thisReactionTask["answers"])
  
  Meteor.call('submitReaction', thisReactionTask, function(err, data){
    var new_num = data.num_completed
    var completed = data.completed
    if(completed){
      Router.go("/feedback")
    }else {
      Router.go('reaction', {batch_id: thisReactionTaskBatchAssignmentId, num: new_num})
    }
  })
  
}

function startTimer(duration, display, next) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes //minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //console.log(minutes + ":" + seconds)
        //console.log(display)
        $(display).text(minutes + ":" + seconds); 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            //start = Date.now() + 1000;
            //console.log(this)
            console.log("diff: "+diff)
            window.clearInterval(intervalListener)
            $(next).css("display","inline")
            $(next).css("visibility","visible")
            $(next+"-message").css("display","inline")        
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    var intervalListener = setInterval(timer, 1000);
    
}
Template.reaction.helpers({
  num_doing: function(){
    return ReactionTaskBatchAssignments.findOne().num_completed + 1
  }
})

var timerLength = 30;

Template.reaction.events({
  'click #submit ': function(event){
      var validEntry = validateReaction()

      if(validEntry){
        //SUMBIT
        submitReaction()
        
      } else {
        //alert("Please enter a rating for all the jokes.")
      }

  },
  
  'click #start-part1':function(event){
    $("#start-part1").prop('disabled', true);
    $("#reaction-part1").prop('disabled', false);
    $("#reaction-part1").focus();
    console.log('start part1')
    startTimer(timerLength, "#part1-timer","#part2")
  },

  'click #start-part2':function(event){
    $("#start-part2").prop('disabled', true);
    $("#reaction-part2").prop('disabled', false);
    $("#reaction-part2").focus();
    console.log('start part2')
    startTimer(timerLength, "#part2-timer","#part3")
  },
    'click #start-part3':function(event){
    $("#start-part3").prop('disabled', true);
    $("#reaction-part3").prop('disabled', false);
    $("#reaction-part3").focus();
    console.log('start part3')
    startTimer(timerLength, "#part3-timer","#part4")
  },
  
  'click #start-part4':function(event){
    $("#start-part4").prop('disabled', true);
    $("#reaction-part4").prop('disabled', false);
    $("#reaction-part4").focus();
    console.log('start part4')
    startTimer(timerLength, "#part4-timer","#submitButton")
  }
})
