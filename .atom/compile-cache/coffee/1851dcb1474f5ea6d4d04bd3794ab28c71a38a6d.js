(function() {
  var CompositeDisposable, IonicFrameworkSnippets, IonicFrameworkSnippetsView;

  IonicFrameworkSnippetsView = require('./ionic-framework-snippets-view');

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = IonicFrameworkSnippets = {
    ionicFrameworkSnippetsView: null,
    modalPanel: null,
    subscriptions: null,
    activate: function(state) {
      this.ionicFrameworkSnippetsView = new IonicFrameworkSnippetsView(state.ionicFrameworkSnippetsViewState);
      this.modalPanel = atom.workspace.addModalPanel({
        item: this.ionicFrameworkSnippetsView.getElement(),
        visible: false
      });
      this.subscriptions = new CompositeDisposable;
      return this.subscriptions.add(atom.commands.add('atom-workspace', {
        'ionic-framework-snippets:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
    },
    deactivate: function() {
      this.modalPanel.destroy();
      this.subscriptions.dispose();
      return this.ionicFrameworkSnippetsView.destroy();
    },
    serialize: function() {
      return {
        ionicFrameworkSnippetsViewState: this.ionicFrameworkSnippetsView.serialize()
      };
    },
    toggle: function() {
      console.log('IonicFrameworkSnippets was toggled!');
      if (this.modalPanel.isVisible()) {
        return this.modalPanel.hide();
      } else {
        return this.modalPanel.show();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3Nhbm95Ly5hdG9tL3BhY2thZ2VzL2lvbmljLWZyYW1ld29yay1zbmlwcGV0cy9saWIvaW9uaWMtZnJhbWV3b3JrLXNuaXBwZXRzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx1RUFBQTs7QUFBQSxFQUFBLDBCQUFBLEdBQTZCLE9BQUEsQ0FBUSxpQ0FBUixDQUE3QixDQUFBOztBQUFBLEVBQ0Msc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQURELENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUFpQixzQkFBQSxHQUNmO0FBQUEsSUFBQSwwQkFBQSxFQUE0QixJQUE1QjtBQUFBLElBQ0EsVUFBQSxFQUFZLElBRFo7QUFBQSxJQUVBLGFBQUEsRUFBZSxJQUZmO0FBQUEsSUFJQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSwwQkFBRCxHQUFrQyxJQUFBLDBCQUFBLENBQTJCLEtBQUssQ0FBQywrQkFBakMsQ0FBbEMsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBNkI7QUFBQSxRQUFBLElBQUEsRUFBTSxJQUFDLENBQUEsMEJBQTBCLENBQUMsVUFBNUIsQ0FBQSxDQUFOO0FBQUEsUUFBZ0QsT0FBQSxFQUFTLEtBQXpEO09BQTdCLENBRGQsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUpqQixDQUFBO2FBT0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0M7QUFBQSxRQUFBLGlDQUFBLEVBQW1DLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5DO09BQXBDLENBQW5CLEVBUlE7SUFBQSxDQUpWO0FBQUEsSUFjQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBLENBREEsQ0FBQTthQUVBLElBQUMsQ0FBQSwwQkFBMEIsQ0FBQyxPQUE1QixDQUFBLEVBSFU7SUFBQSxDQWRaO0FBQUEsSUFtQkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSwrQkFBQSxFQUFpQyxJQUFDLENBQUEsMEJBQTBCLENBQUMsU0FBNUIsQ0FBQSxDQUFqQztRQURTO0lBQUEsQ0FuQlg7QUFBQSxJQXNCQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHFDQUFaLENBQUEsQ0FBQTtBQUVBLE1BQUEsSUFBRyxJQUFDLENBQUEsVUFBVSxDQUFDLFNBQVosQ0FBQSxDQUFIO2VBQ0UsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQUEsRUFERjtPQUFBLE1BQUE7ZUFHRSxJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosQ0FBQSxFQUhGO09BSE07SUFBQSxDQXRCUjtHQUpGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/sanoy/.atom/packages/ionic-framework-snippets/lib/ionic-framework-snippets.coffee
