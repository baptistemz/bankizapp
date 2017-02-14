(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer('ws://localhost:3000/cable', {
    transports: ['websocket']
  });

}).call(this);
