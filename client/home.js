function goToRatingTaskBatch(ratingBatchId){  
  var ratingBatchObj = RatingTaskBatchAssignments.findOne(ratingBatchId)
  var num_completed = ratingBatchObj["num_completed"]
  var rating_task_ids = ratingBatchObj["rating_task_ids"] 
  var current_task_id = rating_task_ids[num_completed]
  
  Router.go("rate", {batch_id: ratingBatchId, num: num_completed})  
}

function goToAnalysisTaskBatch(analysisBatchId){
  console.log(analysisBatchId)
  console.log("analysisBatchId")
  var analysisBatchObj = AnalysisTaskBatchAssignments.findOne(analysisBatchId)
  var num_completed = analysisBatchObj["num_completed"]
  var analysis_task_ids = analysisBatchObj["analysis_task_ids"] 
  var current_task_id = analysis_task_ids[num_completed]
  
  Router.go("analysis", {batch_id: analysisBatchId, num: num_completed})

}

function goToReactionTaskBatch(reactionBatchId){
  console.log(reactionBatchId)
  console.log("reactionBatchId")
  var reactionBatchObj = ReactionTaskBatchAssignments.findOne(reactionBatchId)
  var num_completed = reactionBatchObj["num_completed"]
  var reaction_task_ids = reactionBatchObj["reaction_task_ids"] 
  var current_task_id = reaction_task_ids[num_completed]
  
  Router.go("reaction", {batch_id: reactionBatchId, num: num_completed})

}

Template.home.events({
/*
  RATE 
*/ 

  'click #ratingBatch ': function(event){
      var ratingBatchId = this._id
      goToRatingTaskBatch(ratingBatchId)
  },
  
  'click #createRatingBatch': function(event){
    console.log("createRatingBatch")
    Meteor.call('createRatingBatch', {}, function(err, data){
      console.log(data)
      var ratingBatchId = data
      goToRatingTaskBatch(ratingBatchId)
    })
  },

/*
  ANALYSIS 
*/  
  
  'click #analysisInstructions' : function(){
    
  },
  
  'click #analysisBatch': function(event){
      var analysisBatchId = this._id
      goToAnalysisTaskBatch(analysisBatchId)
  },
  
  'click #createAnalysisBatch': function(event){
    //console.log("createAnalysisBatch")
    Meteor.call('createAnalysisBatch', {}, function(err, data){
      console.log(data)
      var analysisBatchId = data
      goToAnalysisTaskBatch(analysisBatchId)
    })
  },
  
  'click #listingHeadlineNounsBatch ': function(event){
      var reactionBatchId = this._id
      goToReactionTaskBatch(reactionBatchId)
  },
  
  'click #createListingHeadlineNounsBatch': function(event){
    //console.log("createAnalysisBatch")
    Meteor.call('createReactionBatch', {}, function(err, data){
      console.log(data)
      var reactionBatchId = data
      goToReactionTaskBatch(reactionBatchId)
    })
  }     
  
  
})