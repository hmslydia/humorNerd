


insertAnalysisTasksFromOnion  = function(headline_ids){
  var analysis_task_ids = []
  _.each(headline_ids, function( headline_id){
      var headlineObj = Headlines.findOne(headline_id)
      headlineObj.headline_id = headlineObj._id
      delete headlineObj._id
      
      var voices = headlineObj["voices"]
      _.each(voices, function(voiceObj){
        //insert into RatingTasks
        headlineObj["voice_id"] = voiceObj.voice_id
        headlineObj["voice_text"] = voiceObj.voice_text
        headlineObj["voice_image"] = voiceObj.voice_image
        var analysis_task_id = AnalysisTasks.insert(headlineObj) 
        
        analysis_task_ids.push(analysis_task_id)        
      })

    })
  return analysis_task_ids  
  
}

insertAnalysisTaskBatchAssignments = function(user_id, analysis_task_ids){
  return AnalysisTaskBatchAssignments.insert({
    user_id: user_id,
    analysis_task_ids: analysis_task_ids,
    num_completed: 0,
    num_total: analysis_task_ids.length,
    active: true,
    completed: false,
    time_created: getTime(),
    time_completed: null 
  })   
}