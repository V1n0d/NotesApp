var BigApple = BigApple || {};

var $note_title = $('.note_title').get();
var $note_description = $('.note_description').get();
var $search_box = $('.search_box').get();


//Init - renders the notes saved already
var view = new BigApple.NotesView();
view.initNotes();


//DomTraversalApi function helpers for dom manipulation

//Core Events - Saving Notes 
$(".notes_input" ).bind("submit", function(evt){
  evt.preventDefault();
  var validate = new BigApple.ValidateNotes();
  if (!validate.validateNewNote()) return; 
  var notesEvt = new BigApple.NotesEvents();
  notesEvt.addNotes($note_title.value, $note_description.value);
  $note_title.value ='';
  $note_description.value ='';
});

//Core Events - Searching Notes 
$(".search" ).live("click", function(evt){
  evt.preventDefault();
  var search_key = $search_box.value;
    var view = new BigApple.NotesView();
    view.searchNotes(search_key);
});



