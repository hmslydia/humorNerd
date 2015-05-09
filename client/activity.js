function goToReactionTaskBatch(reactionBatchId){
  
  var reactionBatchObj = ReactionTaskBatchAssignments.findOne(reactionBatchId)
  var num_completed = reactionBatchObj["num_completed"]
  var reaction_task_ids = reactionBatchObj["reaction_task_ids"] 
  var current_task_id = reaction_task_ids[num_completed]
  
  //Router.go("rate", {task_id: current_task_id, num: num_completed})
  Router.go("reaction", {batch_id: reactionBatchId, num: num_completed})  
}

Template.activity.events({
  
  'click #reactionBatch ': function(event){
      var reactionBatchId = this._id
      goToReactionTaskBatch(reactionBatchId)
  },
  
  'click #createReactionBatch': function(event){
    console.log('createReactionBatch')
    Meteor.call('createReactionBatch', {}, function(err, data){
      console.log(err)
      console.log(data)
      var reactionBatchId = data
      goToReactionTaskBatch(reactionBatchId)
    })
  }
  
})