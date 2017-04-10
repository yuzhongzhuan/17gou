
define([
    'app',
    'utils/toastUtil',
    'html/common/storage',
], function(app) {

    app.controller(
        'redPacketRuleCtrl', ['$scope', '$ionicHistory', '$location', '$state', '$stateParams', '$timeout', 'ToastUtils', 'Storage','$http','$sce',
            function($scope, $ionicHistory, $location, $state, $stateParams, $timeout, ToastUtils, Storage,$http,$sce) {
                ToastUtils.showLoading('加载中....');
                $scope.goBack = function() {
                    $ionicHistory.goBack();
                };
                var url = baseUrl.replace('apps/webapp/www/','');
                $http.get(url + 'uploads/other/red.html?t='+ (+new Date())).then(function(re) {
                    $scope.html = $sce.trustAsHtml(re.data);
                    ToastUtils.hideLoading();
                },function(err) {
                    ToastUtils.hideLoading();
                    ToastUtils.showError('加载出错');
                })

               

            }
        ])

});
