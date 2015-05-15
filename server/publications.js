// Static Data

Meteor.publish('headlines', function(){
  return Headlines.find()
})

Meteor.publish('voices', function(){
  return Voices.find()
})

/*
  
  RATING
  
*/


// Task Definition Data
Meteor.publish('ratingTasks', function(){
  return RatingTasks.find()
})

Meteor.publish('ratingTaskBatchAssignments', function(){
  return RatingTaskBatchAssignments.find()
})

Meteor.publish('ratingTaskBatchAssignmentsByIdAndRatingTask', function(batch_id,num){
  var ratingTaskBatch = RatingTaskBatchAssignments.find(batch_id)
  
  var ratingTaskId = []
  if (ratingTaskBatch.fetch()){
    ratingTaskId = ratingTaskBatch.fetch()[0]["rating_task_ids"][parseInt(num)];
    
  }
  
  return [ratingTaskBatch, RatingTasks.find(ratingTaskId)];
})



// Per User Data
Meteor.publish('ratingLog', function(){
  return RatingLog.find()
})

Meteor.publish('ratingCount', function(){
  return RatingCount.find()
})


/*
  
  Analysis
  
*/


// Task Definition Data
Meteor.publish('analysisTasks', function(){
  return AnalysisTasks.find()
})

Meteor.publish('analysisTaskBatchAssignments', function(){
  return AnalysisTaskBatchAssignments.find()
})

Meteor.publish('analysisTaskBatchAssignmentsByIdAndRatingTask', function(batch_id,num){
  var analysisTaskBatch = AnalysisTaskBatchAssignments.find(batch_id)
  var analysisTaskId = []
  if(analysisTaskBatch.fetch()){
    analysisTaskId = analysisTaskBatch.fetch()[0]["analysis_task_ids"][parseInt(num)];
  }
  
  return [analysisTaskBatch, AnalysisTasks.find(analysisTaskId)];
})



// Per User Data
Meteor.publish('analysisLog', function(){
  return AnalysisLog.find()
})

/*
  
  Reaction
  
*/


// Task Definition Data
Meteor.publish('reactionTasks', function(){
  return ReactionTasks.find()
})

Meteor.publish('reactionTaskBatchAssignments', function(){
  return ReactionTaskBatchAssignments.find()
})

Meteor.publish('reactionTaskBatchAssignmentsByIdAndReactionTask', function(batch_id,num){
  var reactionTaskBatch = ReactionTaskBatchAssignments.find(batch_id)
  var reactionTaskId = []
  if(reactionTaskBatch.fetch()){
    reactionTaskId = reactionTaskBatch.fetch()[0]["reaction_task_ids"][parseInt(num)];
  }
  return [reactionTaskBatch, ReactionTasks.find(reactionTaskId)];
})



// Per User Data
Meteor.publish('reactionLog', function(){
  return ReactionLog.find()
})

Meteor.publish('feedback', function(){
  return Feedback.find()
})

Meteor.publish('taskIds', function(){
  return TaskIds.find()
})