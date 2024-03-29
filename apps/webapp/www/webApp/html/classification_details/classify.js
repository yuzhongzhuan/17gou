
define(
    [
        'app',
        'html/trolley/trolley_fly',
        'components/view-broad/view_broad',
        'html/classification/service_classification_list',
        'utils/toastUtil',
        'models/model_activity',
        'html/trolley/trolley_service',
        'html/common/global_service',
        'html/common/storage',
    ],
    function(app,funParabola){
        'use strict';
        app
            .controller('classifyController',['$scope','$stateParams','$timeout','ToastUtils','ClassificationService', 'ActivityModel','trolleyInfo','$window','Global','$ionicScrollDelegate','$state','$ionicPopup','$ionicGesture','Storage',
                function($scope,$stateParams,$timeout,ToastUtils,ClassificationService,ActivityModel,trolleyInfo,$window,Global,$ionicScrollDelegate,$state,$ionicPopup,$ionicGesture,Storage){
                    var innerHeight = $window.innerHeight;
                    $scope.class_details_pic2=false;//不在内容区里的顶部分类栏

                    /*$scope.hua=function(){
                        var big_img=document.getElementById("class_details_pic");//在内容区里的中间分类栏
                        var top_big_img=document.getElementById("class_details_pic2");//不在内容区里的顶部分类栏
                        var aside2=document.getElementById("aside2");//不在内容区里的其他分类框
                        var aside=document.getElementById("aside");//不在内容区里的其他分类框
                        var big_img2=document.getElementById("text");//是标签ion-content
                        var t=big_img.getBoundingClientRect().top;//在内容区里的中间分类栏
                        // var t3=top_big_img.getBoundingClientRect().top;//不在内容区里的顶部分类栏
                        //console.log(t3);
                        console.log(t);
                        if(Global.isInweixinBrowser()) {//微信端
                            if (t<=-22) {
                                top_big_img.style.display = "block";
                                //$scope.class_details_pic2=true;
                                console.log('down')
                                if(Global.isInweixinBrowser()) {
                                    big_img2.style.top = "46px";
                                } else {
                                    if(ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
                                        big_img2.style.top = "0px";
                                    } else {
                                        big_img2.style.top = "0px";
                                    }
                                    big_img2.style.top = "0px";

                                }
                            }
                            else{
                                //$scope.class_details_pic2=false;
                                top_big_img.style.display = "none";
                                big_img.style.display = "block";
                                console.log('up')
                                if(Global.isInweixinBrowser()) {
                                    big_img2.style.top = "0px";
                                } else {
                                    if(ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
                                        big_img2.style.top = "44px";
                                    } else {
                                        big_img2.style.top = "44px";
                                    }
                                    big_img2.style.top = "44px";

                                }
                            }
                        }
                        else{//其他浏览器
                            if (t<=50) {
                                top_big_img.style.display = "block";
                                //$scope.class_details_pic2=true;
                                console.log('down')
                                if(Global.isInweixinBrowser()) {
                                    big_img2.style.top = "90px";
                                } else {
                                    if(ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
                                        big_img2.style.top = "0px";
                                    } else {
                                        big_img2.style.top = "0px";
                                    }
                                    big_img2.style.top = "45px";

                                }
                            }
                            else{
                                //$scope.class_details_pic2=false;
                                top_big_img.style.display = "none";
                                big_img.style.display = "block";
                                console.log('up')
                                if(Global.isInweixinBrowser()) {
                                    big_img2.style.top = "0px";
                                } else {
                                    if(ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
                                        big_img2.style.top = "44px";
                                    } else {
                                        big_img2.style.top = "44px";
                                    }
                                    big_img2.style.top = "44px";

                                }
                            }
                        }

                    }*/
                    $scope.categoryList = [];
                    /*下面是我暂时添加数据*/
                    /* $scope.Activity_zone=[
                     {"name":"圣诞专辑","activity_type":6,nid:"xyg"},
                     {"name":"手套专辑","activity_type":6,nid:"xyg"},
                     {"name":"圣诞礼品","activity_type":6,nid:"xyg"},
                     {"name":"返现购","activity_type":7,nid:"fxg"},
                     {"name":"二人拼团","activity_type":4,nid:"erpt"},
                     {"name":"十元专区","activity_type":2,nid:"syzq"}
                     ];
                     */
                    /*$scope.Activity_sds=[
                     {goods_type_id:17,"name":"手套专辑"},
                     {goods_type_id:18,"name":"圣诞礼品"}
                     ];*/
                    $scope.year_huo={
                        goods_type_id:19,"name":"年货专区"
                    };

                    $scope.Activity_zone=[
                        {"name":"返现购","activity_type":7},
                        {"name":"二人拼团","activity_type":4}
                    ];


                    $scope.btntext = {
                        type4: '二人购',
                        type7: '幸运购',
                        type1: '一元抢',
                        type2: '十元购'
                    };


                    function getCategoryList(){
                        ClassificationService.getClasses(function(categoryList){
                            $scope.categoryList = categoryList
                            // for(var i in categoryList) {
                            //   if(categoryList[i].sub) {
                            //     for(var j = 0,len = categoryList[i].sub.length;j < len;j++) {
                            //       $scope.categoryList.push(categoryList[i].sub[j]);
                            //     }
                            //   }

                            // }
                        },function(reason){
                            console.error(reason);
                        });
                    }


                    $scope.changeActive = function(order_key,order_type,activity_type) {
                        $scope.closeClass();
                        $scope.closeClass2();
                        $scope.showClassify2 = false;
                        if(!$scope.isLoadFinished) return;
                        $scope.order_key = order_key;
                        $scope.page = 1;
                        if(order_type == 'none') {
                            $scope.order_type = '';
                        } else if(order_type == 'asc') {
                            $scope.order_type = 'desc';
                        } else {
                            $scope.order_type = 'asc';
                        }

                        /*if(activity_type == 'tenyuan') {
                         $scope.activity_type = 2;
                         } else {
                         $scope.activity_type = -4; //原本null改成-4 是让此不显示二人购
                         }*/

                        /*下面是我添加的============================================*/
                        $scope.Activity_zone.activity_type=activity_type;//二人云购的列表数据等于activity_type
                        if(activity_type==4){//商品类型为4时就执行价格null、asc、desc
                            if(order_type == 'none') {
                                $scope.order_type = '';
                            } else if(order_type == 'asc') {
                                $scope.order_type = 'desc';
                            } else {
                                $scope.order_type = 'asc';
                            }
                        }
                        if(activity_type==2){
                            if(order_type == 'none') {
                                $scope.order_type = '';
                            } else if(order_type == 'asc') {
                                $scope.order_type = 'desc';
                            } else {
                                $scope.order_type = 'asc';
                            }
                        }
                        /*=========================================================*/
                        $scope.getData(true);
                        console.log($scope.activity_type);
                        console.log($scope.order_key);

                    }

                    $scope.getData = function(doRefresh) {
                        $scope.isLoadFinished = false;
                        var order_key = $scope.order_key == 'tenyuan' ? null : $scope.order_key;
                        ActivityModel.getActivityList($scope.goods_type_id,null,order_key,'desc',($scope.page-1) * 20 + 1,20,'0',$scope.activity_type, function(xhr, re) {
                            var code = re.code;
                            if (code == 0) {
                                var data = re.data;
                                var len = data.length;
                                if(doRefresh) {
                                    $scope.broadlist = data;
                                } else {
                                    for(var i = 0;i < len;i++) {
                                        $scope.broadlist.push(data[i]);
                                    }
                                }
                                if(len < 20) {
                                    $scope.isMoreData = false;
                                } else {
                                    $scope.page ++;
                                    $scope.isMoreData = true;
                                }

                            } else {
                                ToastUtils.showMsgWithCode(code, re.msg);
                            }

                        }, function(response, data) {
                            ToastUtils.showMsgWithCode(7, '获取商品列表失败：' + '状态码：' + response.status);
                        }, function() {
                            $scope.isLoadFinished = true;
                            if(doRefresh) {
                                $scope.$broadcast('scroll.refreshComplete');
                                $ionicScrollDelegate.scrollTop()
                            }
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        })
                    }

                    $scope.fetchData = function(goods_type_id) {
                        if(!$scope.isLoadFinished) return;
                        $scope.activity_type=-4;//原本null改成-4 是让此不显示二人购
                        // $scope.order_type = '';

                        $scope.goods_type_id = goods_type_id;
                        $scope.page = 1;
                        $scope.getData(true);
                        console.log(goods_type_id);
                        $scope.showClassify2 = false;
                        /*console.log($scope.order_key);*/
                    }
                    $scope.fetchData2 = function(type) {
                        /*老王弹出一个返现购对话框 */
                        if (type == 7 || type == 6) {
                            var ruleImgAlert = ['img/Rule_luckyBuy.png','img/fanxiangouRule.png'];
                            var fanxian = $ionicPopup.show({
                                template:'<img id="fanxiangouRule" src="'+ruleImgAlert[type-6]+'"><i></i>',
                                buttons:[{
                                    text:'确定',
                                    type:'button-default'
                                }]
                            })
                            var timer = $timeout(function(){
                                var fanxiangouRule = document.getElementById('fanxiangouRule'),
                                    popupBody = fanxiangouRule.parentElement,
                                    popup = popupBody.parentElement,
                                    span = fanxiangouRule.querySelector('span'),
                                    popupheader = popup.getElementsByClassName('popup-head')[0];
                                popupheader.style.display = 'none';
                                popup.style.height = (type == 6 ? '310px': '286px');
                                popup.style.width = '300px';
//										popup.style.backgroundColor = 'transparent';
                                /*返回用户不是微信账户的错误*/
                            },10)
                        }
                        if(!$scope.isLoadFinished) return;
                        // $scope.order_type = '';
                        $scope.goods_type_id = null;
                        $scope.activity_type=type;
                        $scope.page = 1;
                        $scope.getData(true);
                        console.log(type);
                        /*console.log($scope.order_key);*/
                        $scope.showClassify2 = false;
                    }


                    //点击活动专区中的圣诞专辑
                    $scope.fetchData3 = function(goods_type_id) {
                        if(!$scope.isLoadFinished) return;
                        // $scope.order_type = '';
                        $scope.activity_type=-4;
                        $scope.goods_type_id =goods_type_id;
                        if(goods_type_id==null){
                            if(goods_type_id>=17 && goods_type_id<=18){
                                goods_type_id+=17;
                                $scope.page = 1;
                                $scope.getData(true);
                            }
                        }


                        console.log(goods_type_id);
                        /*console.log($scope.order_key);*/
                    }

                    $scope.doRefresh = function(){
                        $scope.page = 1;
                        $scope.getData(true);
                    };

                    $scope.loadMore = function(){
                        if(!$scope.isLoadFinished) return;
                        $scope.getData(false);
                    };

                    $scope.gotoDetail = function(id){
                        $state.go('activity-goodsDetail', {activityId:id});
                    };

                    function addToCart(broad,$event){
                        var img = new Image();
                        img.src = broad.title_img;
                        img.style.display = 'none';
                        img.className = 'eleFlyElement';
                        img.style.top = $event.y + 'px';
                        img.style.left = $event.x  + 'px';
                        angular.element(document.body).append(img);
                        img.style.display = 'block';
                        var toEle;
                        if($state.current.name == 'tab.classify') {
                            toEle = document.querySelector(".js-tab-cart");
                        } else {
                            toEle = document.querySelector("#classify_cart");
                        }
                        var myParabola = funParabola(img, toEle, {
                            speed: 300, //抛物线速度
                            curvature: 0.0008, //控制抛物线弧度
                            complete: function() {
                                img.style.display = 'none';
                                angular.element(img).remove()
                                var shopItem = broad;
                                shopItem.join_number = 1;
                                $scope.$apply(function() {
                                    trolleyInfo.addGoodsItem(shopItem);
                                })

                            }
                        })
                        myParabola.position().move();
                    };

                    $scope.addToCart = addToCart;
                    $scope.$on('$ionicView.beforeEnter', function(ev, data) {
                        $scope.broadlist = []
                        $scope.isMoreData = false;
                        $scope.isLoadFinished = true;
                        if(Storage.get('commodity_goods_type_id')){
                            $scope.goods_type_id3=Storage.get('commodity_goods_type_id');
                            $scope.goods_type_id = $scope.goods_type_id3;
                        }
                        //$scope.activity_type = 4;
                        $scope.page = 1;
                        $scope.order_key = 'weight';




                        //添加下面的==================================================
                        if($scope.activity_type==2 && $scope.activity_type==4 && $scope.goods_type_id != null){
                            $scope.fetchData2($scope.activity_type);
                        }
                        if($scope.goods_type_id>0 && $scope.goods_type_id<20 && $scope.activity_type>=1 && $scope.activity_type<=3){
                            $scope.fetchData($scope.goods_type_id);
                        }

                        //==========================================================
                        getCategoryList();
                        $scope.getData();

                        var gapHeight;
                        if($state.current.name == 'tab.classify') {
                            gapHeight = 49;
                            $scope.hideCartIcon = true;
                            $scope.showCartId = false;
                        } else {
                            gapHeight = 0;
                            $scope.hideCartIcon = false;
                            $scope.showCartId = true;
                        }

                        if(Global.isInweixinBrowser()) {
                            $scope.leftBarHeight = innerHeight - gapHeight;
                            $scope.leftBarTop = '202px';
                            $scope.inWechatB = true;
                        } else {
                            $scope.leftBarHeight = innerHeight - 44 - gapHeight;
                            if(ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
                                $scope.leftBarTop = '264px';
                                $scope.inIosApp = true;
                            } else {
                                $scope.leftBarTop = '88px';
                                $scope.inIosApp = false;
                            }
                            $scope.inWechatB = false;

                        }

                    })

                    $scope.goNext = function(){
                        if($state.current.name == 'tab.classify') {
                            $state.go('tab.publish');
                        }

                    };

                    $scope.goPre = function(){
                        if($state.current.name == 'tab.classify') {
                            $state.go('tab.mainpage');
                        }

                    };

                    $scope.showClassify = false;
                    $scope.showClass = function() {
                        //佳纯要求的是点击“点击其他分类”跳转到商品分类页面|
                        $state.go('commodity_classification');
                        $scope.showClassify2 = false;
                        $scope.showClassify = true;
                    }

                    $scope.closeClass = function() {
                        $scope.showClassify = false;
                    }
                    $scope.showClassify2 = false;
                    $scope.showClass2 = function() {
                        //佳纯要求的是点击“点击其他分类”跳转到商品分类页面|
                        $state.go('commodity_classification');
                       // $scope.showClassify2 = true;
                        //$scope.showClassify = false;
                    }

                    $scope.closeClass2 = function() {
                        $scope.showClassify2 = false;
                    }
                    $scope.go_search=function(){
                        $state.go('search',{
                            productType:1
                        });
                    }
                    $scope.goHome = function() {
                        $state.go('tab.mainpage');
                    }


                    /*=================================*/

                    $scope.jt_0=true;
                    $scope.dt_45=false;
                    $scope.jt_45=false;
                    $scope.dt_0=false;

                    $scope.dt_boxdown=false;
                    $scope.jt_boxdown=false;
                    $scope.dt_boxup=false;

                    $scope.dt_op1=false;
                    $scope.jt_op1=false;
                    $scope.dt_op0=false;


                    $scope.open_News=function(){
                        $scope.jt_0=false;
                        $scope.dt_45=true;
                        $scope.dt_boxdown=true;
                        $scope.dt_op1=true;
                        $timeout(function(){
                            $scope.dt_45=false;
                            $scope.jt_45=true;
                            $scope.dt_op1=false;
                            $scope.jt_op1=true;
                            $scope.dt_boxdown=false;
                            $scope.jt_boxdown=true;
                        },500);
                    }
                    $scope.close_News=function(){
                        $scope.jt_45=false;
                        $scope.dt_0=true;
                        $scope.jt_boxdown=false;
                        $scope.dt_boxup=true;
                        $scope.jt_op1=false;
                        $scope.dt_op0=true;
                        $timeout(function(){
                            $scope.dt_0=false;
                            $scope.jt_0=true;
                        },500);
                    }
                    /*=================================*/



                }]);
    });
