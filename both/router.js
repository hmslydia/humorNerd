Router.map(function(){
  this.route('home', { 
    path: '/',
    layoutTemplate: 'standardLayout',
    yieldTemplates: {
      'header': {to: 'header'}
    },
    waitOn: function(){         
      return [Meteor.subscribe('headlines'),     
              Meteor.subscribe('voices'),
              
              Meteor.subscribe('ratingTasks'),
              Meteor.subscribe('ratingTaskBatchAssignments'),
              
              Meteor.subscribe('analysisTasks'),
              Meteor.subscribe('analysisTaskBatchAssignments'),
              ]
    },
    data: function(){
      return {
        ratingBatches: RatingTaskBatchAssignments.find({user_id: Meteor.userId()}).fetch(),
        createRatingBatchButton: (RatingTaskBatchAssignments.find({user_id: Meteor.userId()}).count() == 0),
        
        analysisBatches: AnalysisTaskBatchAssignments.find({user_id: Meteor.userId()}).fetch(),
        createAnalysisBatchButton: (AnalysisTaskBatchAssignments.find({user_id: Meteor.userId()}).count() == 0)
      }
    },
    action: function(){
      if(this.ready()){
        this.render()
      }
    }
     
  })

  this.route('activity', { 
    path: '/activity',
    layoutTemplate: 'standardLayout',
    yieldTemplates: {
      'header': {to: 'header'}
    },
    waitOn: function(){   
      //var task_id = this.params.task_id 
      var batch_id = this.params.batch_id 
      var num = this.params.num
      
            
      return [Meteor.subscribe('headlines'),     
              Meteor.subscribe('voices'),   
              
              Meteor.subscribe('reactionTasks'),
              Meteor.subscribe('reactionTaskBatchAssignments'),        
              ]
    }, 
    data: function(){
      return {
        reactionBatches: ReactionTaskBatchAssignments.find({user_id: Meteor.userId()}).fetch(),
        createReactionBatchButton: (ReactionTaskBatchAssignments.find({user_id: Meteor.userId()}).count() == 0)
      }
    },
    action: function(){
      if(this.ready()){
        this.render()
      }
    }
  }) 

  this.route('rate', { 
    path: '/rate/:batch_id/:num',
    layoutTemplate: 'standardLayout',
    yieldTemplates: {
      'header': {to: 'header'}
    },
    waitOn: function(){   
      //var task_id = this.params.task_id 
      var batch_id = this.params.batch_id 
      var num = this.params.num
      
            
      return [Meteor.subscribe('headlines'),     
              Meteor.subscribe('voices'),

              Meteor.subscribe('ratingTaskBatchAssignmentsByIdAndRatingTask', batch_id, num),
              Meteor.subscribe('ratingLog'),
              Meteor.subscribe('ratingCount'),              
              ]
    }, 
    data: function(){
      return {
        ratingTask: RatingTasks.findOne(),
        ratingBatch: RatingTaskBatchAssignments.findOne()
      }
    },
    action: function(){
      if(this.ready()){
        this.render()
      }
    }
  })  
  
  this.route('analysis', { 
    path: '/analysis/:batch_id/:num',
    layoutTemplate: 'standardLayout',
    yieldTemplates: {
      'header': {to: 'header'}
    },
    waitOn: function(){   
      //var task_id = this.params.task_id 
      var batch_id = this.params.batch_id 
      var num = this.params.num
      
            
      return [Meteor.subscribe('headlines'),     
              Meteor.subscribe('voices'),

              Meteor.subscribe('analysisTaskBatchAssignmentsByIdAndRatingTask', batch_id, num),
              Meteor.subscribe('analysisLog'),             
              ]
    }, 
    data: function(){
      return {
        analysisTask: AnalysisTasks.findOne()
      }
    },
    action: function(){
      if(this.ready()){
        this.render()
      }
    }
  }) 
  
  this.route('reaction', { 
    path: '/reaction/:batch_id/:num',
    layoutTemplate: 'standardLayout',
    yieldTemplates: {
      'header': {to: 'header'}
    },
    waitOn: function(){   
      //var task_id = this.params.task_id 
      var batch_id = this.params.batch_id 
      var num = this.params.num
      
            
      return [Meteor.subscribe('headlines'),     
              //Meteor.subscribe('voices'),

              Meteor.subscribe('reactionTaskBatchAssignmentsByIdAndReactionTask', batch_id, num),
              Meteor.subscribe('reactionLog'),
              //Meteor.subscribe('ratingCount'),              
              ]
    }, 
    data: function(){
      return {
        reactionTask: ReactionTasks.findOne(),
        reactionBatch: ReactionTaskBatchAssignments.findOne()
        //num_completed: ReactionTaskBatchAssignments.findOne().num_total
      }
    },
    action: function(){
      if(this.ready()){
        this.render()
      }
    }
  }) 
  
  this.route('thanks', { 
    path: '/thanks',
    layoutTemplate: 'standardLayout',
    yieldTemplates: {
      'header': {to: 'header'}
    },
    waitOn: function(){   
      return [
        Meteor.subscribe('feedback'),                   
              ]
    }, 

    action: function(){
      if(this.ready()){
        this.render()
      }
    }
  })    

  this.route('feedback', { 
    path: '/feedback',
    layoutTemplate: 'standardLayout',
    yieldTemplates: {
      'header': {to: 'header'}
    },
    waitOn: function(){   
     
    }, 

    action: function(){
      if(this.ready()){
        this.render()
      }
    }
  })  
   
})