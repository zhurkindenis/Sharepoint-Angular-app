// Install the angularjs.TypeScript.DefinitelyTyped NuGet package
var App;
(function (App) {
    "use strict";
    var SharePointServcie = (function () {
        function SharePointServcie($q) {
            this.$q = $q;
        }
        SharePointServcie.prototype.getLists = function () {
            var promise = this.$q.defer();
            SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () {
                var ctx = SP.ClientContext.get_current();
                var hostUrl = decodeURIComponent(SP.ScriptHelpers.getDocumentQueryPairs()['SPHostUrl']);
                var appCtx = new SP.AppContextSite(ctx, hostUrl);
                var hostWeb = appCtx.get_web();
                var lists = hostWeb.get_lists();
                ctx.load(lists);
                ctx.executeQueryAsync(function () {
                    var result = [];
                    for (var e = lists.getEnumerator() ; e.moveNext() ;) {
                        result.push(e.get_current());
                    }
                    promise.resolve(result);
                }, function (o, args) { promise.reject(args.get_message()); });
            });
            return promise.promise;
        };
        SharePointServcie.$inject = ["$q"];
        return SharePointServcie;
    })();
    angular.module("app").service("$SharePoint", SharePointServcie);
})(App || (App = {}));
//# sourceMappingURL=SharePointService.js.map