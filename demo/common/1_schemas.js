RangeSchema = new SimpleSchema({
  lower: {
    type: Number
  },
  upper: {
    type: Number
  }
});

CollectionSchema = new SimpleSchema({
  another: {
    type: String
  },
  singleSlider: {
    type: Number,
    max: 150,
    min: 30,
    autoform: {
      type: "noUiSlider",
      noUiSliderOptions: {
        step: 10
      },
      noUiSlider_pipsOptions: {
        mode: 'steps',
        density: 5
      }
    }
  },
  slider: {
    type: RangeSchema,
    max: 150,
    min: 30,
    autoform: {
      type: "noUiSlider",
      noUiSliderOptions: {
        step: 10
      },
      noUiSlider_pipsOptions: {
        mode: 'steps',
        density: 5
      }
    }
  }
});

Collection = new Mongo.Collection("c");
Collection.attachSchema( CollectionSchema );

Collection.allow({
  insert: function(uid,doc){
    console.log("insertDoc", doc );
    return true;
  },
  update: function(uid,doc){
    console.log("updateDoc", doc );
    return true;
  },
  remove: function(){
    return true;
  }
});

if( Meteor.isClient ){
  Meteor.subscribe("Collection");
}

if( Meteor.isServer ){
  Meteor.publish("Collection",function(){
    return Collection.find();
  });
}
