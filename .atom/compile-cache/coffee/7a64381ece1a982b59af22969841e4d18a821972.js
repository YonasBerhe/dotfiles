(function() {
  var IonicFrameworkSnippetsView;

  module.exports = IonicFrameworkSnippetsView = (function() {
    function IonicFrameworkSnippetsView(serializedState) {
      var message;
      this.element = document.createElement('div');
      this.element.classList.add('ionic-framework-snippets');
      message = document.createElement('div');
      message.textContent = "The IonicFrameworkSnippets package is Alive! It's ALIVE!";
      message.classList.add('message');
      this.element.appendChild(message);
    }

    IonicFrameworkSnippetsView.prototype.serialize = function() {};

    IonicFrameworkSnippetsView.prototype.destroy = function() {
      return this.element.remove();
    };

    IonicFrameworkSnippetsView.prototype.getElement = function() {
      return this.element;
    };

    return IonicFrameworkSnippetsView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3Nhbm95Ly5hdG9tL3BhY2thZ2VzL2lvbmljLWZyYW1ld29yay1zbmlwcGV0cy9saWIvaW9uaWMtZnJhbWV3b3JrLXNuaXBwZXRzLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBCQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNTLElBQUEsb0NBQUMsZUFBRCxHQUFBO0FBRVgsVUFBQSxPQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCLENBQVgsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBbkIsQ0FBdUIsMEJBQXZCLENBREEsQ0FBQTtBQUFBLE1BSUEsT0FBQSxHQUFVLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCLENBSlYsQ0FBQTtBQUFBLE1BS0EsT0FBTyxDQUFDLFdBQVIsR0FBc0IsMERBTHRCLENBQUE7QUFBQSxNQU1BLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBbEIsQ0FBc0IsU0FBdEIsQ0FOQSxDQUFBO0FBQUEsTUFPQSxJQUFDLENBQUEsT0FBTyxDQUFDLFdBQVQsQ0FBcUIsT0FBckIsQ0FQQSxDQUZXO0lBQUEsQ0FBYjs7QUFBQSx5Q0FZQSxTQUFBLEdBQVcsU0FBQSxHQUFBLENBWlgsQ0FBQTs7QUFBQSx5Q0FlQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULENBQUEsRUFETztJQUFBLENBZlQsQ0FBQTs7QUFBQSx5Q0FrQkEsVUFBQSxHQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxRQURTO0lBQUEsQ0FsQlosQ0FBQTs7c0NBQUE7O01BRkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/Users/sanoy/.atom/packages/ionic-framework-snippets/lib/ionic-framework-snippets-view.coffee
