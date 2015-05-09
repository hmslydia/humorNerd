validateAnalysis = function(){
  // WORK HERE
  return true
}

submitAnalysis = function (){  
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
  
  var thisAnalysisTask = AnalysisTasks.findOne()
  var analysis_task_id = thisAnalysisTask._id
  thisAnalysisTask["analysis_task_id"] = analysis_task_id
  delete thisAnalysisTask["_id"]
  
  var thisAnalysisTaskBatchAssignment = AnalysisTaskBatchAssignments.findOne()
  var thisAnalysisTaskBatchAssignmentId = thisAnalysisTaskBatchAssignment._id
  thisAnalysisTask["analysis_task_batch_assignment_id"] = thisAnalysisTaskBatchAssignmentId
  
  thisAnalysisTask["answers"] = answerObj
  /*
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
  */
  Meteor.call('submitAnalysis', thisAnalysisTask, function(err, data){
    var new_num = data.num_completed
    var completed = data.completed
    if(completed){
      Router.go("/")
    }else {
      Router.go('analysis', {batch_id: thisAnalysisTaskBatchAssignmentId, num: new_num})
    }
  })
  
}

Template.analysis.events({
  'click #submit ': function(event){
      var validEntry = validateAnalysis()

      if(validEntry){
        //SUMBIT
        submitAnalysis()
        
      } else {
        alert("Please enter a rating for all the jokes.")
      }

  },
})
