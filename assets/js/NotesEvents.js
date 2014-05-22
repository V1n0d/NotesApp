var BigApple = BigApple || {};

(function(){

/***** Event Helpers for creating and managing Notes ****/

 BigApple.NotesEvents = function(){
  
    function NotesEvents(){
      this.store = new BigApple.NotesStore();
      this.view = new BigApple.NotesView();
      this.notes = this.store.getObject('notes') || [];
    }

    NotesEvents.prototype.addNotes = function(title , description) {

      var data = { 
          title : title,
          description : description
        };

      this.notes.push(data);

      this.store.setObject('notes',this.notes);
      this.view.createNotes(title,description);
      window.scrollTo(0,document.body.scrollHeight);
      
    };

    NotesEvents.prototype.deleteNotes = function(el){
      this.view.deleteNotesFromDOM(el.parentNode);
      var note_id = this.getNoteId(el)-1;

      if(typeof note_id!='undefined'){
        this.notes.splice(note_id,1);
        this.store.setObject('notes',this.notes);
      }
    };

    NotesEvents.prototype.editNotes = function(el){
      var note_id = this.getNoteId(el);

      var $title_elem = document.querySelector('.note[data-note-id="'+note_id+'"] .notes_title');
      $title_elem.setAttribute('contentEditable','true');
      $title_elem.className += " editable" ;

      var $description_elem = document.querySelector('.note[data-note-id="'+note_id+'"] .notes_description');
      $description_elem.setAttribute('contentEditable','true');
      $description_elem.className += " editable editDesc" ;

      var $save_note = document.querySelector('.note[data-note-id="'+note_id+'"] .save_note');
      $save_note.style.display='block';
      el.style.display='none';

    };

    NotesEvents.prototype.saveNotes = function(el) {
      var note_id = this.getNoteId(el);
      var $title_elem = document.querySelector('.note[data-note-id="'+note_id+'"] .notes_title');
      var $description_elem = document.querySelector('.note[data-note-id="'+note_id+'"] .notes_description');
      var $edit_note = document.querySelector('.note[data-note-id="'+note_id+'"] .edit_note');
      
      var data = { 
          title : $title_elem.innerHTML,
          description : $description_elem.innerHTML
        };

      this.notes[note_id-1]=data;

      this.store.setObject('notes',this.notes);
      
      el.style.display='none';
      $edit_note.style.display='block';
      $title_elem.className = 'notes_title'; 
      $description_elem.className = 'notes_description'; 
      $title_elem.removeAttribute('contentEditable');
      $description_elem.removeAttribute('contentEditable');

    };

    NotesEvents.prototype.getNoteId = function(el){
      el = el.parentNode;
      while(el){
        if(el.className=='note'){
          current_note = el;
          break;
        }
        el=el.parentNode;
      }
      
      return Number(current_note.getAttribute('data-note-id'));
    };

    return NotesEvents;

  }();

}).call(this);

