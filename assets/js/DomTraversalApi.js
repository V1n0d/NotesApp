var BigApple = BigApple || {};

(function(){

/***** Helper functions for DOM utilities ****/


 BigApple.DomTraversalApi = function(){
  
    function DomTraversalApi( selector ){
      this.node = document.querySelector( selector );
    }

    DomTraversalApi.prototype = {
      get: function(){
        return this.node;
      },
      bind: function( evt, fn ){
        if( this.node ){
          this.node.addEventListener( evt, fn );
        }
      },
      live: function (event_type, call_back) {
          if(!this.node) return;
          var element_class = this.node.getAttribute('class');
          document.addEventListener(event_type, function (event) {
              var el = event.target;
              var found;
              while (el && !(found = el.className === element_class)) {
                  el = el.parentElement;
              }

              if (found) {
                  call_back.call(el, event);
              }
          });
      },
    };

    DomTraversalApi.prototype.bindLiveEvents = function(){
      //Core Events - Deleting Notes 
      $(".delete_note" ).live("click", function(){
        if(confirm("Are you sure you want to delete the item?")){
          var notesEvt = new BigApple.NotesEvents();
          notesEvt.deleteNotes(this);
        }
      });

      //Core Events - Editing Notes 
      $(".edit_note" ).live("click", function(){
        var notesEvt = new BigApple.NotesEvents();
        notesEvt.editNotes(this);
      });

      //Core Events - Updating Notes 
      $(".save_note" ).live("click", function(){
        var validate = new BigApple.ValidateNotes();
        if(!validate.validateExistingNote(this)) return;
        var notesEvt = new BigApple.NotesEvents();
        notesEvt.saveNotes(this);
      });

    };

    return DomTraversalApi;

  }();

}).call(this);

$ = function ( selector ){
  return new BigApple.DomTraversalApi( selector );
}

