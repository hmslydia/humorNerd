


insertReactionTasksFromOnion  = function(headline_ids){
  var reaction_task_ids = []
  _.each(headline_ids, function( headline_id){
      var headlineObj = Headlines.findOne(headline_id)
      headlineObj.headline_id = headlineObj._id
      delete headlineObj._id
      /*
      var voices = headlineObj["voices"]
      _.each(voices, function(voiceObj){
        //insert into RatingTasks
        headlineObj["voice_id"] = voiceObj.voice_id
        headlineObj["voice_text"] = voiceObj.voice_text
        headlineObj["voice_image"] = voiceObj.voice_image
        var reaction_task_id = ReactionTasks.insert(headlineObj) 
        
        reaction_task_ids.push(reaction_task_id)        
      })
      */
      
      var reaction_task_id = ReactionTasks.insert(headlineObj)
      reaction_task_ids.push(reaction_task_id)
    })
    
  TaskIds.insert({name: "reaction_task_ids1", task_id_array: reaction_task_ids})   
  return reaction_task_ids  
  
}

insertReactionTaskBatchAssignments = function(user_id, reaction_task_ids){
  return ReactionTaskBatchAssignments.insert({
    user_id: user_id,
    reaction_task_ids: reaction_task_ids,
    num_completed: 0,
    num_total: reaction_task_ids.length,
    active: true,
    completed: false,
    time_created: getTime(),
    time_completed: null 
  })   
}