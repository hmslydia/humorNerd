incrementRatingCount = function(rating_task_id, voice_id, rating){
  var fieldsToInc = {}
  
  if( rating == "yes"){
    fieldsToInc = {count_yes: 1}
  } 
  else if( rating == "kinda"){
    fieldsToInc = {count_kinda: 1}
  }
  else if( rating == "no"){
    fieldsToInc = {count_no: 1}
  }
  else if( rating == "dunno"){
    fieldsToInc = {count_dunno: 1}
  }
  console.log(fieldsToInc)
  console.log(rating_task_id)
  console.log(voice_id)
  var rating_count_id = RatingCount.findOne(    {
    rating_task_id: rating_task_id,
    voice_id: voice_id
  })._id
  console.log(rating_count_id)
    
  console.log(rating_count_id)
  RatingCount.update(
    {
      _id: rating_count_id
    }, 
    {$inc: fieldsToInc }
  )   
}





insertRatingTasksFromOnion  = function(headline_ids){
  var rating_task_ids = []
  _.each(headline_ids, function( headline_id){
      var headlineObj = Headlines.findOne(headline_id)
      headlineObj.headline_id = headlineObj._id
      delete headlineObj._id
      
      //insert into RatingTasks
      var rating_task_id = RatingTasks.insert(headlineObj) 
      console.log("rating: "+headlineObj.headline_text)
      //insert into RatingCount
      _.each(headlineObj["voices"], function(voiceObj){
        var countObj = {
          rating_task_id: rating_task_id,
          headline_id: headlineObj["headline_id"],
          voice_id: voiceObj["voice_id"],
          count_yes: 0,
          count_kinda : 0,
          count_no : 0,
          count_dunno : 0
        }

        RatingCount.insert(countObj)        
      })
      
      rating_task_ids.push(rating_task_id)
    })
    
  TaskIds.insert({name: "rating_task_ids1", task_id_array: rating_task_ids})  
  return rating_task_ids  
  
}

insertRatingTaskBatchAssignments = function(user_id, rating_task_ids){
  return RatingTaskBatchAssignments.insert({
    user_id: user_id,
    rating_task_ids: rating_task_ids,
    num_completed: 0,
    num_total: rating_task_ids.length,
    active: true,
    completed: false,
    time_created: getTime(),
    time_completed: null 
  })   
}