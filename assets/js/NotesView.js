var BigApple = BigApple || {};
BigApple.notes_wrapper = $('.notes_wrapper').get();
BigApple.is_events_binded=false;
(function(){

/***** View Helper functions for rendering notes ****/


 BigApple.NotesView = function(){
  
    function NotesView(){
      this.store = new BigApple.NotesStore();
      this.notes = this.store.getObject('notes');

    }

    NotesView.prototype.initNotes = function(){
      for(var id in this.notes){
        this.createNotes(this.notes[id]['title'],this.notes[id]['description'],parseInt(id)+1)
      }

    };

    NotesView.prototype.searchNotes = function(key){

      var result = 0;
      $notes_wrapper = $('.notes_wrapper').get()
      $search_result = $('.search_result').get()
      $notes_wrapper.innerHTML='';

      if(key==''){
        this.initNotes();
        return;
      }
      for(var id in this.notes){
        if(this.notes[id]['title'].indexOf(key)!=-1){
          this.createNotes(this.notes[id]['title'],this.notes[id]['description'],parseInt(id)+1)
          result++;
        }
      }
      result = result ? result : 'No';
      $search_result.innerHTML=result+' Results Found';
    };

    NotesView.prototype.createNotes = function(title , description,id) {
       var $notes = document.createElement('div');
       var note_length = this.store.getLength('notes');
       var note_id = typeof id !='undefined' ? id : note_length;
       var $search_wrapper =  $('.search_wrapper').get();

       $notes.setAttribute('data-note-id',note_id);
       $notes.setAttribute('class','note');

       $notes_details = this.buildNotesDetails(title , description);
       $notes_actions = this.buildNotesActions();

       $notes.appendChild($notes_details);
       $notes.appendChild($notes_actions);
       BigApple.notes_wrapper.appendChild($notes);
       if(!BigApple.is_events_binded){
        var domApi = new BigApple.DomTraversalApi();
        domApi.bindLiveEvents();
        $search_wrapper.style.display='block';
        BigApple.is_events_binded=true;
       }

    };

    NotesView.prototype.buildNotesDetails = function(title , description) {
       var $notes_title = document.createElement('div');
       var $notes_description = document.createElement('div');
       var $notes_details = document.createElement('div');
       
       $notes_details.setAttribute('class','notes_details');
       
       $notes_title.setAttribute('class','notes_title');
       $notes_title.innerHTML = title;
       
       $notes_description.setAttribute('class','notes_description');
       $notes_description.innerHTML = description;

       $notes_details.appendChild($notes_title);
       $notes_details.appendChild($notes_description);

       return $notes_details;
    };

    NotesView.prototype.buildNotesActions = function(){
      var $edit_note = document.createElement('span');
      var $save_note = document.createElement('span');
      var $delete_note = document.createElement('span');
      var $notes_actions = document.createElement('div');
      $notes_actions.setAttribute('class','notes_actions');

      $edit_note.setAttribute('class','edit_note');
      $edit_note.innerHTML = 'Edit';

      $save_note.setAttribute('class','save_note');
      $save_note.innerHTML = 'Save';
      $save_note.style.display='none';

      $delete_note.setAttribute('class','delete_note');
      $delete_note.innerHTML = 'Delete';

      $notes_actions.appendChild($edit_note);
      $notes_actions.appendChild($save_note);
      $notes_actions.appendChild($delete_note);

      return $notes_actions;
    };

    NotesView.prototype.deleteNotesFromDOM = function(el){
      var note_id;
      while(el){
        if(el.className == 'note'){
          el.parentNode.removeChild(el);
          break;
        }
        el = el.parentNode;
      }
    };

    return NotesView;

  }();

}).call(this);

