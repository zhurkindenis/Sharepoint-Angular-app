
angular.module('RequestForm', [])
.controller('TasksController', function ($scope, $http) {
    $scope.Systems = [];
    $scope.Roles = [];
    $scope.getListItems = function (url) {
        return $http({
            method: 'GET',
            url: url,
            headers: { 'Accept': 'application/json;odata=verbose' }
        });
    }
    $scope.setListItems = function ($event) {
        $event.preventDefault();
        if (!$scope.selectedRolesItem.Title || !$scope.selectedSystemsItem.Title)
        {
            return;
        }
        SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
            var ctx = SP.ClientContext.get_current();
            var hostUrl = decodeURIComponent(SP.ScriptHelpers.getDocumentQueryPairs()['SPHostUrl']);
            var appCtx = new SP.AppContextSite(ctx, hostUrl);
            var hostWeb = appCtx.get_web();
                        var web = ctx.get_web();
            var user = web.get_currentUser();

            var lists = hostWeb.get_lists().getByTitle('Requests');
            ctx.load(lists);
            var listItemInfo = new SP.ListItemCreationInformation();

            var listItem = lists.addItem(listItemInfo);
            listItem.set_item('Title', "Отправлен на согласование");
            listItem.set_item('Role', $scope.selectedRolesItem.ID);
            listItem.set_item('Systems', $scope.selectedRolesItem.SystemsId);
            listItem.set_item('Author0', user);
            listItem.set_item('Moderator', $scope.selectedRolesItem.ModeratorId);
            listItem.update();

            var onQuerySucceeded = function () {
                alert("Запрос отправлен на согласование");
            }
            var onQueryFailed = function (sender, args) {
                alert('Ошибка запроса ' + args.get_message() + '\n' + args.get_stackTrace());
            }
            ctx.executeQueryAsync(Function.createDelegate(this, onQuerySucceeded), Function.createDelegate(this, onQueryFailed));
        });
 
    }
    $scope.getListItems("/_api/web/lists/GetByTitle('Systems')/items")
          .then(function (data) {
            console.log(data.data.d);
            $scope.Systems = data.data.d.results;
                  })
          , function error (status) {
              console.log(status);
          };
    $scope.getListItems("/_api/web/lists/GetByTitle('Role')/items?$select=Title, ID, ModeratorId, SystemsId, Systems/Title&$expand=Systems")
          .then(function (data) {
              console.log(data.data.d);
            $scope.Roles = data.data.d.results;
             }), function error (status) {
              console.log(status);
          };
});