function goToRatingTaskBatch(ratingBatchId){
  
  var ratingBatchObj = RatingTaskBatchAssignments.findOne(ratingBatchId)
  var num_completed = ratingBatchObj["num_completed"]
  var rating_task_ids = ratingBatchObj["rating_task_ids"] 
  var current_task_id = rating_task_ids[num_completed]
  
  //Router.go("rate", {task_id: current_task_id, num: num_completed})
  Router.go("rate", {batch_id: ratingBatchId, num: num_completed})  
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
  
  'click .analysisBatch ': function(event){
      var analysisBatchId = this._id
      
      var analysisBatchObj = AnalysisTaskBatchAssignments.findOne(analysisBatchId)
      var num_completed = analysisBatchObj["num_completed"]
      var analysis_task_ids = analysisBatchObj["analysis_task_ids"] 
      var current_task_id = analysis_task_ids[num_completed]
      
      Router.go("analysis", {batch_id: analysisBatchId, num: num_completed})

  },
  
  'click #createAnalysisBatch': function(event){
    //console.log("createAnalysisBatch")
    Meteor.call('createAnalysisBatch', {}, function(err, data){
      //callback
      console.log(data)
    })
  }  
  
  
})