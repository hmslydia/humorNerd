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
              
              Meteor.subscribe('reactionTasks'),
              Meteor.subscribe('reactionTaskBatchAssignments'),
              
              Meteor.subscribe('taskIds'),
              ]
    },
    data: function(){
      return {
        ratingBatches: RatingTaskBatchAssignments.find({user_id: Meteor.userId()}).fetch(),
        createRatingBatchButton: (RatingTaskBatchAssignments.find({user_id: Meteor.userId()}).count() == 0),
        
        analysisBatches: AnalysisTaskBatchAssignments.find({user_id: Meteor.userId()}).fetch(),
        createAnalysisBatchButton: (AnalysisTaskBatchAssignments.find({user_id: Meteor.userId()}).count() == 0),
        listHeadlineNounsBatches: ReactionTaskBatchAssignments.find({user_id: Meteor.userId()}).fetch(),
        createListHeadlineNounsBatchButton: (ReactionTaskBatchAssignments.find({user_id: Meteor.userId()}).count() == 0)
      }
    },
    action: function(){
      if(this.ready()){
        this.render()
      }
    }
     
  })
/*
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
*/
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
        analysisTask: AnalysisTasks.findOne(),
        analysisBatch: AnalysisTaskBatchAssignments.findOne()
      }
    },
    action: function(){
      if(this.ready()){
        this.render()
      }
    }
  }) 
  
  this.route('analysisInstructions', { 
    path: '/analysisInstructions',
    layoutTemplate: 'standardLayout',
    yieldTemplates: {
      'header': {to: 'header'}
    },
        data: function(){
      return {
        headline: "<h1>People Bending iPhones At Apple Stores</h1>",
        description: "<p>Videos are surfacing online of people going into Apple stores and trying to bend the new iPhone 6 Plus to prove that it’s possible, drawing criticism from internet commenters accusing them of being idiots. </p>",
        voices: [
          {voice_text: "“I can’t believe people would just walk into an Apple store and start breaking things like it’s a Best Buy.”",
            voice_image: "voice1.jpg",

            joke_1: "people",
            joke_1_class: "highlighted-example",
            
            joke_2: "Apple store",
            joke_2_class: "highlighted-example",
            
            joke_3: "breaking things",
            joke_3_class: "highlighted-example",
            
            joke_4: "Best Buy",
            joke_4_class: "highlighted-example",
            
            headline_1: "people",
            headline_1_class: "highlighted-example",
            
            headline_2: "Apple store",
            headline_2_class: "highlighted-example",
            
            headline_3: "Bending iPhones",
            headline_3_class: "highlighted-example",
            
            headline_4: "Apple Store",
            headline_4_class: "highlighted-example",
            
            relationship_3: "reframing",
            relationship_3_class: "highlighted-example",
            
            relationship_4: "Apple Store competitor",
            relationship_4_class: "highlighted-example",
          },
          {voice_text: "“If Apple didn’t want people to abuse its products in idiotic ways, it shouldn’t have placed them where the American consumer could reach them.”",
            voice_image: "voice2.jpg",
            
            joke_1: "Apple",
            joke_1_class: "highlighted-example",
            
            joke_2: "abuse its products",
            joke_2_class: "highlighted-example",
            
            joke_3: "American consumer",
            joke_3_class: "highlighted-example",
            
            joke_4: "Best Buy",
            joke_4_class: "highlighted-example",
            
            headline_1: "Apple",
            headline_1_class: "highlighted-example",
            
            headline_2: "Bending iPhones",
            headline_2_class: "highlighted-example",
            
            headline_3: "people?",
            headline_3_class: "highlighted-example",
            
            headline_4: "Apple Store",
            headline_4_class: "highlighted-example",
            
            relationship_3: "reframing",
            relationship_3_class: "highlighted-example",
            
            relationship_4: "Apple Store competitor",
            relationship_4_class: "highlighted-example",
            
            
            },
          {voice_text: "“I just hope Apple can bounce back from this.”",
            voice_image: "voice3.jpg",
            
            joke_1: "Apple",
            joke_1_class: "highlighted-example",
            
            joke_2: "this",
            joke_2_class: "highlighted-example",
            
            
            headline_1: "Apple",
            headline_1_class: "highlighted-example",
            
            headline_2: "(headline?)",
            headline_2_class: "highlighted-example",
                        
            },
          
        ]
      }
    },
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
              Meteor.subscribe('voices'),

              Meteor.subscribe('reactionTaskBatchAssignmentsByIdAndReactionTask', batch_id, num),
              Meteor.subscribe('reactionLog'),
              
              Meteor.subscribe('taskIds'),              
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

  this.route('reactionInstructions', { 
    path: '/reactionInstructions',
    layoutTemplate: 'standardLayout',
    yieldTemplates: {
      'header': {to: 'header'}
    },
        data: function(){
      return {
        description_text: "<p>Pop star Justin Bieber was baptized in a friend’s bathtub this weekend after weeks of Bible study and church services, with celebrity blogs reporting that the 20-year-old sought spiritual guidance in an attempt to wash away his sins following a scandal in which videos emerged of him using racial slurs. What do <i>you</i> think?</p>",
        headline_text: "<h1>Justin Bieber Baptized In NYC Bathtub</h1>",
        
        
        //answer
        list_noun_1: "Justin Bieber",
        list_noun_1_class: "highlighted-example",
        
        list_associated_1: "other pop stars, fans (12 year old girls)",
        list_associated_1_class: "highlighted-example",
        
        //answer
        list_noun_2: "friend",
        list_noun_2_class: "highlighted-example",
        
        list_associated_2: "pop's stars friends (do these even exist?)",
        list_associated_2_class: "highlighted-example",               


        //answer
        list_noun_3: "friend’s bathtub",
        list_noun_3_class: "highlighted-example",
        
        list_associated_3: "friend's other major household appliances",
        list_associated_3_class: "highlighted-example", 
        
        //answer
        list_noun_4: "Baptism",
        list_noun_4_class: "highlighted-example",
        
        list_associated_4: "person who performed it.",
        list_associated_4_class: "highlighted-example", 
        
        
                //answer
        list_noun_5: "Bible study",
        list_noun_5_class: "highlighted-example",
        
        list_associated_5: "other attendees, Christians, non-Christians",
        list_associated_5_class: "highlighted-example", 
        
        
                //answer
        list_noun_6: "celebrity blogs",
        list_noun_6_class: "highlighted-example",
        
        list_associated_6: "bloggers, the posts they write about him",
        list_associated_6_class: "highlighted-example", 
        
        
                //answer
        list_noun_7: "his sins",
        list_noun_7_class: "highlighted-example",
        
        list_associated_7: "his music is a sin. Can it wash that away?",
        list_associated_7_class: "highlighted-example", 
                
        voices: [
          {voice_image: "voice1.jpg",
voice_text: "<p>“Oh my God! Can I lick the tub?”</p>",
voice_id: "KumJEWz398kTYgNDa",

            joke_1: "I",
            joke_1_class: "highlighted-example",
            yes_checked_1: "checked",
            
            joke_2: "tub",
            joke_2_class: "highlighted-example",
            yes_checked_2: "checked",
            
            
            headline_1: "Beiber fan",
            headline_1_class: "highlighted-example",
            
            headline_2: "friend's bathtub",
            headline_2_class: "highlighted-example",
            

            
          },
          {voice_image: "voice2.jpg",
voice_text: "<p>“Great, now my teenage daughter’s going to be begging me for $300 so she can reaffirm her devotion to God, too.”</p>",
voice_id: "HiQEHfrgaC2Hpt3Ee",
            
            joke_1: "my",
            joke_1_class: "highlighted-example",
            no_checked_1: "checked",
            
            joke_2: "teenage daughter",
            joke_2_class: "highlighted-example",
            yes_checked_2: "checked",
            
            joke_3: "reaffirm her devotion to God",
            joke_3_class: "highlighted-example",
            yes_checked_3: "checked",
            
            
            headline_1: "(none)",
            headline_1_class: "highlighted-example",
            
            headline_2: "fans (12 year old girls)",
            headline_2_class: "highlighted-example",
            
            headline_3: "Baptised",
            headline_3_class: "highlighted-example",
            
            
            
            },
          {
voice_image: "voice3.jpg",
voice_text: "<p>“Never let it be said that Bieber’s PR people aren’t bringing new ideas to the table.”</p>",
            voice_id: "va9qmkC2wyxovgJmN",
            
            joke_1: "Bieber’s PR people",
            joke_1_class: "highlighted-example",
            no_checked_1: "checked",
            
            joke_2: "new ideas",
            joke_2_class: "highlighted-example",
            yes_checked_2: "checked",
            
            headline_1: "Justin Bieber",
            headline_1_class: "highlighted-example",
            
            headline_2: "baptized in a NYC Bathtub",
            headline_2_class: "highlighted-example",
                        
            },
          
        ]
      }
    },
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