function validateFeedback(){
  return true
}

function submitFeedback(){
  var answers = $('.answer');

  var answerObj = {}
  _.each(answers, function(a){
    var id = $(a).attr("id")
    var value = $(a).val()
    if(value != ""){
      answerObj[id] = value
    }
  })

  Meteor.call('submitFeedback', answerObj, function(err, data){
    Router.go("thanks")
  })


}


Template.feedback.events({
  'click #submit ': function(event){
      var validEntry = validateAnalysis()

      if(validEntry){
        //SUMBIT
        submitFeedback()
        
      } else {
        alert("Please enter a rating for all the jokes.")
      }

  },
})