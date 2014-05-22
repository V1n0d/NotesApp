var BigApple = BigApple || {};

/***** Helpers for Validating Notes ****/

(function(){

 BigApple.ValidateNotes = function(){
  
    function ValidateNotes(el,type){
      this.store = new BigApple.NotesStore();
      this.notes = this.store.getObject('notes') || [];
    }

    ValidateNotes.prototype.isValid = function(value,key){
      if(typeof value!='undefined' && value!=''){
        return true;
      }else{
        alert("Please enter a valid value for "+key);
        return false;
      }
    };

    ValidateNotes.prototype.isUnique = function(title,note_id){
      var isUnique = true;
      for(var note in this.notes){
        
        if(typeof note_id!='undefined' && note_id-1==note) continue;

        if(this.notes[note]['title']== this.trim(title)){
          alert("Please enter a different title.")
          isUnique = false;
          break;
        }
      }
      return isUnique;
    };

    ValidateNotes.prototype.trim = function(str){
      return str.replace(/^\s+|\s+$/g, "");
    }

    ValidateNotes.prototype.validateNewNote = function() {
      var title = $note_title.value;
      var description = $note_description.value;
      if(this.isValid(title,'title') && this.isValid(description,'description')){
        return this.isUnique(title);
      }else{
        return false;
      }
    };

    ValidateNotes.prototype.validateExistingNote = function(el) {
      var noteEvt = new BigApple.NotesEvents();
      var note_id = noteEvt.getNoteId(el);
      var title = document.querySelector('.note[data-note-id="'+note_id+'"] .notes_title').innerHTML;
      var description = document.querySelector('.note[data-note-id="'+note_id+'"] .notes_description').innerHTML;
      if(this.isValid(title,'title') && this.isValid(description,'description')){
        return this.isUnique(title,note_id);
      }else{
        return false;
      }
    };

    return ValidateNotes;

  }();

}).call(this);

