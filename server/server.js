/*
rating_task_ids1 = []
analysis_task_ids1 = []
reaction_task_ids1 = []
*/

getTime = function(){
  return (new Date()).getTime()
}

addUserInfo = function(obj){
  if(Meteor.userId()){
    obj["user_id"] = Meteor.userId()
  } 
}


Meteor.methods({ 
  
/*
  RATE
*/
  createRatingBatch: function(){
    var rating_task_ids1 = TaskIds.findOne({name: "rating_task_ids1"}).task_id_array
    var ratingTaskBatchAssignmentId = insertRatingTaskBatchAssignments(Meteor.userId(), rating_task_ids1)
    return ratingTaskBatchAssignmentId
    
  },
  submitRating: function(params){  

    //Insert into RatingLog
    addUserInfo(params)      
    RatingLog.insert(params)
    
    //Insert into RatingCount
    var rating_task_id = params["rating_task_id"]
    _.each(params["voices"], function(voiceObj){  
      var voice_id = voiceObj["voice_id"]
      var rating = voiceObj["rating"]
      incrementRatingCount(rating_task_id, voice_id, rating)
          
    })

    //update progress in RatingTaskBatchAssignments
    var rating_task_batch_assignment_id = params["rating_task_batch_assignment_id"]
    var ratingBatch = RatingTaskBatchAssignments.findOne(rating_task_batch_assignment_id)
    var num_completed = ratingBatch["num_completed"]
    var num_total = ratingBatch["num_total"]
    var new_num_completed = parseInt(num_completed) + 1
    var newVals = {num_completed: new_num_completed, completed: false}
    if (new_num_completed >= num_total){
      newVals["completed"] = true
    } 
    console.log('update batch')
    console.log(rating_task_batch_assignment_id)
    console.log(newVals)
    RatingTaskBatchAssignments.update(
      {_id: rating_task_batch_assignment_id},
      {$set: newVals}      
    )
    return newVals
  },
  
  
/*
  ANALYSIS
*/
  createAnalysisBatch: function(){
    
    var analysisTaskBatchAssignmentId = insertAnalysisTaskBatchAssignments(Meteor.userId(), analysis_task_ids1)
    return analysisTaskBatchAssignmentId
    
  },
  submitAnalysis: function(params){  

    //Insert into AnalysisLog
    addUserInfo(params)      
    AnalysisLog.insert(params)
    


    //update progress in RatingTaskBatchAssignments
    var analysis_task_batch_assignment_id = params["analysis_task_batch_assignment_id"]
    var analysisBatch = AnalysisTaskBatchAssignments.findOne(analysis_task_batch_assignment_id)
    var num_completed = analysisBatch["num_completed"]
    var num_total = analysisBatch["num_total"]
    var new_num_completed = parseInt(num_completed) + 1
    var newVals = {num_completed: new_num_completed, completed: false}
    if (new_num_completed == num_total){
      newVals["completed"] = true
    } 
    
    AnalysisTaskBatchAssignments.update(
      {_id: analysis_task_batch_assignment_id},
      {$set: newVals}      
    )
    return newVals
  },
  
/*
  REACTION
*/
  createReactionBatch: function(){
    var reaction_task_ids1 = TaskIds.findOne({name: "reaction_task_ids1"}).task_id_array
    console.log("reaction_task_ids1")
    console.log(reaction_task_ids1)
    var reactionTaskBatchAssignmentId = insertReactionTaskBatchAssignments(Meteor.userId(), reaction_task_ids1)
    console.log(reactionTaskBatchAssignmentId)
    return reactionTaskBatchAssignmentId
    
  },
  submitReaction: function(params){  

    //Insert into AnalysisLog
    addUserInfo(params)      
    ReactionLog.insert(params)
    


    //update progress in RatingTaskBatchAssignments
    var reaction_task_batch_assignment_id = params["reaction_task_batch_assignment_id"]
    var reactionBatch = ReactionTaskBatchAssignments.findOne(reaction_task_batch_assignment_id)
    var num_completed = reactionBatch["num_completed"]
    var num_total = reactionBatch["num_total"]
    var new_num_completed = parseInt(num_completed) + 1
    var newVals = {num_completed: new_num_completed, completed: false}
    if (new_num_completed == num_total){
      newVals["completed"] = true
    } 
    
    ReactionTaskBatchAssignments.update(
      {_id: reaction_task_batch_assignment_id},
      {$set: newVals}      
    )
    return newVals
  },
  
  submitFeedback: function(params){  

    //Insert into AnalysisLog
    addUserInfo(params)      
    Feedback.insert(params)
    return true
  }      
})



insertHeadlines = function(startIndex, endIndex){
  var headline_ids = []
  
  for( var i = startIndex; i<endIndex; i++){
    //insert headlines and collect
    var thisHeadline = voices[i]
    var headline_id = Headlines.insert({
      headline_text: thisHeadline["headline"],
      description_text: thisHeadline["description"],
      url: thisHeadline["url"],
      onion_headline_id: thisHeadline["headline_id"],
      //voices: []
    })
    headline_ids.push(headline_id)
    
    //insert responses with this headline_id
    theseVoices = []  
    
    var voice_text1 = thisHeadline["voice1"]  
    var voice_image1 = "voice1.jpg"
    var voice1_id = Voices.insert({
      voice_text: voice_text1,
      voice_image: voice_image1,
      headline_id: headline_id,
      headline_text: thisHeadline["headline"]
    })
    theseVoices.push({
      voice_text: voice_text1,
      voice_image: voice_image1,
      voice_id: voice1_id,
    })

    var voice_text2 = thisHeadline["voice2"]  
    var voice_image2 = "voice2.jpg"
    var voice2_id = Voices.insert({
      voice_text: voice_text2,
      voice_image: voice_image2,
      headline_id: headline_id,
      headline_text: thisHeadline["headline"]
    })
    theseVoices.push({
      voice_text: voice_text2,
      voice_image: voice_image2,
      voice_id: voice2_id,
    })
    
    var voice_text3 = thisHeadline["voice3"]  
    var voice_image3 = "voice3.jpg"
    var voice3_id = Voices.insert({
      voice_text: voice_text3,
      voice_image: voice_image3,
      headline_id: headline_id,
      headline_text: thisHeadline["headline"]
    })
    theseVoices.push({
      voice_text: voice_text3,
      voice_image: voice_image3,
      voice_id: voice3_id
    })    
    
    //update headline to include response ideas
    Headlines.update(headline_id, {$set: {voices: theseVoices}})
  }
  return headline_ids
}


Meteor.startup(function () {	
  if (Headlines.find().count() === 0) {
    var headline_ids1 = insertHeadlines(0, 3)
    rating_task_ids1 = insertRatingTasksFromOnion(headline_ids1)
    
    //var headline_ids2 = insertHeadlines(3, 5)
    //analysis_task_ids1 = insertAnalysisTasksFromOnion(headline_ids2)
    
    var headline_ids3 = insertHeadlines(3, 9)
    var headline_ids_subselect = [headline_ids3[1], headline_ids3[2]]
    
    reaction_task_ids1 = insertReactionTasksFromOnion(headline_ids_subselect)
  } 
})