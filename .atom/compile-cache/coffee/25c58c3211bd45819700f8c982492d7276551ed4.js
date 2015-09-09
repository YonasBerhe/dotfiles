(function() {
  var IonicFrameworkSnippets;

  IonicFrameworkSnippets = require('../lib/ionic-framework-snippets');

  describe("IonicFrameworkSnippets", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('ionic-framework-snippets');
    });
    return describe("when the ionic-framework-snippets:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.ionic-framework-snippets')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'ionic-framework-snippets:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var ionicFrameworkSnippetsElement, ionicFrameworkSnippetsPanel;
          expect(workspaceElement.querySelector('.ionic-framework-snippets')).toExist();
          ionicFrameworkSnippetsElement = workspaceElement.querySelector('.ionic-framework-snippets');
          expect(ionicFrameworkSnippetsElement).toExist();
          ionicFrameworkSnippetsPanel = atom.workspace.panelForItem(ionicFrameworkSnippetsElement);
          expect(ionicFrameworkSnippetsPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'ionic-framework-snippets:toggle');
          return expect(ionicFrameworkSnippetsPanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.ionic-framework-snippets')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'ionic-framework-snippets:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var ionicFrameworkSnippetsElement;
          ionicFrameworkSnippetsElement = workspaceElement.querySelector('.ionic-framework-snippets');
          expect(ionicFrameworkSnippetsElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'ionic-framework-snippets:toggle');
          return expect(ionicFrameworkSnippetsElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL3Nhbm95Ly5hdG9tL3BhY2thZ2VzL2lvbmljLWZyYW1ld29yay1zbmlwcGV0cy9zcGVjL2lvbmljLWZyYW1ld29yay1zbmlwcGV0cy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxzQkFBQTs7QUFBQSxFQUFBLHNCQUFBLEdBQXlCLE9BQUEsQ0FBUSxpQ0FBUixDQUF6QixDQUFBOztBQUFBLEVBT0EsUUFBQSxDQUFTLHdCQUFULEVBQW1DLFNBQUEsR0FBQTtBQUNqQyxRQUFBLHlDQUFBO0FBQUEsSUFBQSxPQUF3QyxFQUF4QyxFQUFDLDBCQUFELEVBQW1CLDJCQUFuQixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxnQkFBQSxHQUFtQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVgsQ0FBbUIsSUFBSSxDQUFDLFNBQXhCLENBQW5CLENBQUE7YUFDQSxpQkFBQSxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsMEJBQTlCLEVBRlg7SUFBQSxDQUFYLENBRkEsQ0FBQTtXQU1BLFFBQUEsQ0FBUyw2REFBVCxFQUF3RSxTQUFBLEdBQUE7QUFDdEUsTUFBQSxFQUFBLENBQUcsaUNBQUgsRUFBc0MsU0FBQSxHQUFBO0FBR3BDLFFBQUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLDJCQUEvQixDQUFQLENBQW1FLENBQUMsR0FBRyxDQUFDLE9BQXhFLENBQUEsQ0FBQSxDQUFBO0FBQUEsUUFJQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLGlDQUF6QyxDQUpBLENBQUE7QUFBQSxRQU1BLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLGtCQURjO1FBQUEsQ0FBaEIsQ0FOQSxDQUFBO2VBU0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILGNBQUEsMERBQUE7QUFBQSxVQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQiwyQkFBL0IsQ0FBUCxDQUFtRSxDQUFDLE9BQXBFLENBQUEsQ0FBQSxDQUFBO0FBQUEsVUFFQSw2QkFBQSxHQUFnQyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQiwyQkFBL0IsQ0FGaEMsQ0FBQTtBQUFBLFVBR0EsTUFBQSxDQUFPLDZCQUFQLENBQXFDLENBQUMsT0FBdEMsQ0FBQSxDQUhBLENBQUE7QUFBQSxVQUtBLDJCQUFBLEdBQThCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBZixDQUE0Qiw2QkFBNUIsQ0FMOUIsQ0FBQTtBQUFBLFVBTUEsTUFBQSxDQUFPLDJCQUEyQixDQUFDLFNBQTVCLENBQUEsQ0FBUCxDQUErQyxDQUFDLElBQWhELENBQXFELElBQXJELENBTkEsQ0FBQTtBQUFBLFVBT0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QyxpQ0FBekMsQ0FQQSxDQUFBO2lCQVFBLE1BQUEsQ0FBTywyQkFBMkIsQ0FBQyxTQUE1QixDQUFBLENBQVAsQ0FBK0MsQ0FBQyxJQUFoRCxDQUFxRCxLQUFyRCxFQVRHO1FBQUEsQ0FBTCxFQVpvQztNQUFBLENBQXRDLENBQUEsQ0FBQTthQXVCQSxFQUFBLENBQUcsMEJBQUgsRUFBK0IsU0FBQSxHQUFBO0FBTzdCLFFBQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsZ0JBQXBCLENBQUEsQ0FBQTtBQUFBLFFBRUEsTUFBQSxDQUFPLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLDJCQUEvQixDQUFQLENBQW1FLENBQUMsR0FBRyxDQUFDLE9BQXhFLENBQUEsQ0FGQSxDQUFBO0FBQUEsUUFNQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQWQsQ0FBdUIsZ0JBQXZCLEVBQXlDLGlDQUF6QyxDQU5BLENBQUE7QUFBQSxRQVFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLGtCQURjO1FBQUEsQ0FBaEIsQ0FSQSxDQUFBO2VBV0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUVILGNBQUEsNkJBQUE7QUFBQSxVQUFBLDZCQUFBLEdBQWdDLGdCQUFnQixDQUFDLGFBQWpCLENBQStCLDJCQUEvQixDQUFoQyxDQUFBO0FBQUEsVUFDQSxNQUFBLENBQU8sNkJBQVAsQ0FBcUMsQ0FBQyxXQUF0QyxDQUFBLENBREEsQ0FBQTtBQUFBLFVBRUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QyxpQ0FBekMsQ0FGQSxDQUFBO2lCQUdBLE1BQUEsQ0FBTyw2QkFBUCxDQUFxQyxDQUFDLEdBQUcsQ0FBQyxXQUExQyxDQUFBLEVBTEc7UUFBQSxDQUFMLEVBbEI2QjtNQUFBLENBQS9CLEVBeEJzRTtJQUFBLENBQXhFLEVBUGlDO0VBQUEsQ0FBbkMsQ0FQQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/sanoy/.atom/packages/ionic-framework-snippets/spec/ionic-framework-snippets-spec.coffee
