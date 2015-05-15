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

  var checkedElements = $('input:radio:checked');
  //add the rating to each voice in the RatingTask obj
  _.each(checkedElements, function(elt){
    var voice_id = $(elt).data("id")
    var elt_name = $(elt).attr("name")
    var value = $(elt).val()
    answerObj[elt_name] = value
  })
  
  var thisReactionTask = ReactionTasks.findOne()
  var reaction_task_id = thisReactionTask._id
  thisReactionTask["reaction_task_id"] = reaction_task_id
  delete thisReactionTask["_id"]
  
  var thisReactionTaskBatchAssignment = ReactionTaskBatchAssignments.findOne()
  var thisReactionTaskBatchAssignmentId = thisReactionTaskBatchAssignment._id
  thisReactionTask["reaction_task_batch_assignment_id"] = thisReactionTaskBatchAssignmentId
  
  thisReactionTask["answers"] = answerObj
  console.log(thisReactionTask["answers"])
  
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
  
  'click #selfAssessment': function(){
    $("#selfAssessmentContainer").css("visibility","visible")
    location.hash = "#selfAssessmentButton" ;
  }

})
