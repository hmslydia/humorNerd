Headlines = new Meteor.Collection("headlines");
/*
id:
headline_text:
description_text:
voices = [
  {
    voice_id:
    voice_text:
    image: 
  }
  ]
*/

Voices = new Meteor.Collection("voices");
/*
id:
voice_text
image:
headline_id:
headline_text:   
*/

TaskIds = new Meteor.Collection("task_ids");

/*
name: "rating_task_ids1"
task_id_array: rating_task_ids
*/

///////////////////////////////// 
// RATING TASKS
/////////////////////////////////

RatingTasks = new Meteor.Collection("ratingTasks");
/*
id:
headline_id:
headline_text:
description_text:
voices = [
  {
    voice_id:
    voice_text:
    image: 
  }
  ]
*/


RatingTaskBatchAssignments = new Meteor.Collection("ratingTaskBatchAssignments"); 
/*
id:
user_id:
rating_task_ids: []
num_completed: 0
num_total: 
active: false
completed: false
time_created:
time_completed: 
  
*/

RatingLog = new Meteor.Collection("ratingLog");
/*
id:
headline_id:
//headline_text:
//description_text:

user_id:
user_name:

//rating_task_batch_id
rating_task_id

voice_id
rating

ratings:  [
  {
    voice_id:
    voice_text:
    image: 
    rating:
  }
  ]
*/

RatingCount = new Meteor.Collection("ratingCount");
/*
id:

rating_task_id; 

headline_id:
headline_text:
description_text:

voice_id
voice_text

count_yes: 0
count_kinda: 0
count_no: 0
count_dunno: 0
*/


/////////////////////////////////  
// ANALYSIS TASKS
/////////////////////////////////  


AnalysisTasks = new Meteor.Collection("analysisTasks");
/*
id:
headline_id:
headline_text:
description_text:
voice_id:
voice_text:
voice_image: 

*/


AnalysisTaskBatchAssignments = new Meteor.Collection("analysisTaskBatchAssignments"); 
/*
id:
user_id:
analysis_task_ids: []
num_completed: 0
num_total: 
active: false
completed: false
time_created:
time_completed: 
  
*/

AnalysisLog = new Meteor.Collection("analysisLog");
/*
id:
headline_id:
voice_id

user_id:
user_name:

//rating_task_batch_id
analysis_task_id
analysis_task_batch_assignment_id

answerObj = [
  headline-1: "a",
  joke-1: "b",
  ...
  ]


*/

/*
match_pairs: [
  {
    headline_phrase:
    voice_phrase:
    comment: 
     
  }
  ]

crit_target:
crit_reason:
pov:
specific_language: []
emotion_pos: []
emotion_neg: []
emtion_other: []
time_enter:
time_submit:  
  */
  
/////////////////////////////////  
// REACTION TASKS
///////////////////////////////// 
  
ReactionTasks = new Meteor.Collection("reactionTasks");
/*
id:
headline_id:
headline_text:
description_text:

*/


ReactionTaskBatchAssignments = new Meteor.Collection("reactionTaskBatchAssignments"); 
/*
id:
user_id:
reaction_task_ids: []
num_completed: 0
num_total: 
active: false
completed: false
time_created:
time_completed: 
  
*/

ReactionLog = new Meteor.Collection("reactionLog");
/*
id:
headline_id:

user_id:
user_name:

reaction_task_id
reaction_task_batch_assignment_id

answerObj = [
  headline-1: "a",
  joke-1: "b",
  ...
  ]


*/

Feedback = new Meteor.Collection("feedback")