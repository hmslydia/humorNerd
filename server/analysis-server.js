


insertAnalysisTasksFromOnion  = function(headline_ids){
  var analysis_task_ids = []
  _.each(headline_ids, function( headline_id){
      var headlineObj = Headlines.findOne(headline_id)
      headlineObj.headline_id = headlineObj._id
      delete headlineObj._id
      
      
      //var voices = headlineObj["voices"]
      var analysis_task_id = AnalysisTasks.insert(headlineObj) 
      console.log("analysis: "+headlineObj.headline_text)
      analysis_task_ids.push(analysis_task_id) 
      /*
      _.each(voices, function(voiceObj){
        //insert into RatingTasks
        headlineObj["voice_id"] = voiceObj.voice_id
        headlineObj["voice_text"] = voiceObj.voice_text
        headlineObj["voice_image"] = voiceObj.voice_image
        
        
        analysis_task_ids.push(analysis_task_id)        
      })
      */
    })
  TaskIds.insert({name: "analysis_task_ids1", task_id_array: analysis_task_ids})   
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