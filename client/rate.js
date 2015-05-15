validateRating = function(){
  //is there at least one radio button checked?
  var checkedElements = $('input:radio:checked');
  var ratingsDone = checkedElements.length
  var ratingsNeeded = RatingTasks.findOne().voices.length
  //console.log(ratingsDone+" "+ratingsNeeded)
  return (ratingsDone == ratingsNeeded)
}

submitRating = function (){  
  var checkedElements = $('input:radio:checked');
  
  var thisRatingTask = RatingTasks.findOne()
  var rating_task_id = thisRatingTask._id
  thisRatingTask["rating_task_id"] = rating_task_id
  delete thisRatingTask["_id"]
  
  var thisRatingTaskBatchAssignment = RatingTaskBatchAssignments.findOne()
  var thisRatingTaskBatchAssignmentId = thisRatingTaskBatchAssignment._id
  thisRatingTask["rating_task_batch_assignment_id"] = thisRatingTaskBatchAssignmentId
  
  //add the rating to each voice in the RatingTask obj
  _.each(checkedElements, function(elt){
    var voice_id = $(elt).data("id")
    var rating = $(elt).val()

    _.each(thisRatingTask["voices"], function(voiceObj){
      if (voiceObj["voice_id"] == voice_id){
        voiceObj["rating"] = rating
      }
    })
  })
  
  console.log(thisRatingTask)
  //console.log(ratingsToInsert)
  
  Meteor.call('submitRating', thisRatingTask, function(err, data){
    console.log(data)
    var new_num = data.num_completed
    var completed = data.completed
    if(completed){
      Router.go("home")
    }else {
      Router.go('rate', {batch_id: thisRatingTaskBatchAssignmentId, num: new_num})
    }
  })
  
}

Template.rate.helpers({
  num_doing: function(){
    return RatingTaskBatchAssignments.findOne().num_completed + 1
  }
})

Template.rate.events({
  'click #submit ': function(event){
      var validEntry = validateRating()
      //console.log(validEntry)
      if(validEntry){
        //SUMBIT
        submitRating()
        
      } else {
        alert("Please enter a rating for all the jokes.")
      }
      
      
      /*var ratingBatchObj = RatingTaskBatchAssignments.findOne(ratingBatchId)
      var num_completed = ratingBatchObj["num_completed"]
      var rating_task_ids = ratingBatchObj["rating_task_ids"] 
      var current_task_id = rating_task_ids[num_completed]
      */
      //Router.go("rate", {task_id: current_task_id})

      /*
      Meteor.call("addCommentOrTag", params, function(){
        //no callback
      })
      //clear
      $(event.target).prev("textarea").val("")
      */
  },
  
  'click .radio_answer_text': function(event){
    console.log(event.target)
    var target = $(event.target).parents('tr')[0]
    var input = $(target).children().children()[0]
    var isChecked = $(input).prop('checked')
    if(isChecked){
      $(input).prop('checked',false)
    } else {
      $(input).prop('checked',true)
    }
  }
})
