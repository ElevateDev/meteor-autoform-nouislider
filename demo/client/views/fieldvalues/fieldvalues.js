AutoForm.debug();
//AutoForm.setDefaultTemplate("ionic");

Template.rangeSlider.helpers({
  editDoc: function(){
    if( Collection.find().count() > 0 ){
      return Collection.findOne();
    }
  },
  action: function(){
    if( Collection.find().count() > 0 ){
      return "update";
    }else{
      return "insert";
    }
  },
  rangeValue: function(fieldName) {
    fieldName = "singleSlider";
    console.log( "FieldValue", AutoForm.getFieldValue(fieldName, "collectionId") );
    var value = AutoForm.getFieldValue(fieldName);
    return value;
  }
});

AutoForm.hooks({
  "collectionId": {
    onError: function(e){
      console.error( e );
    },
    onSuccess: function(){
      console.log( "Success" );
      console.log( AutoForm.getFieldValue("singleSlider", "collectionId") );
    }
  }
});
