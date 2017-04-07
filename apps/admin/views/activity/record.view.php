<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telphone=no, email=no" />
    <link rel="dns-prefetch" href="//bigh5.com">
    <?php include '../views/public/head.view.php';?>
    <?php echo '<link rel="stylesheet" href="'.C('SITE_DOMAIN').'/wangEditor-1.3.12.css?'.C('VERSION_CSS').'">';?>
</head>

<body>
<!-- header start -->
<?php include '../views/public/header.view.php';?>
<!-- header end -->
<!-- container start -->
<!-- container start -->
<div class="container">
    <div class="main">
        <div class="main-inner">
            <div class="main-container">
                <div class="dp-page-head">
                    <h2 class="title">参与记录</h2>
                </div>
                <div class="table-wrap">
                    <table class="table-condensed dp-table table table-striped" id="dp-list-tbl">
                        <thead>
                        <tr>
                            <th>期号</th>
                            <th>参与用户</th>
                            <th>参与人次</th>
                            <th>参与时间</th>
                            <?php if($_GET['type']==6) echo '<th>奇偶</th>' ; ?>      
                            <th>夺宝号</th>
                        </tr>
                        </thead>
                        <tbody>
                            <?php foreach($data['list'] as $val){?>
                                <tr>
                                    <td><?php echo $val['activity_id']?></td>
                                    <td><?php echo $val['nick']?></td>
                                    <td><?php echo $val['user_num']?></td>
                                    <td><?php echo date('Y-m-d H:i:s',$val['rt']);?></td>
                                    <?php if($_GET['type']==6) {
                                       $msg= json_decode($val['order_info'],true);
                                       $str='异常';
                                       if($msg[0]['hot_luckyBuy']==1){
                                            $str='奇';
                                       }else if($msg[0]['hot_luckyBuy']==2){
                                            $str='偶';
                                       }
                                       echo '<td>'.$str.'</td>';
                                    }        
                                     ?>     
                                   
                                    <td><a data-id="<?php echo $val['uid']?>" class="js-look">查看</a></td>
                                </tr>
                                <tr class="hide" data-id="<?php echo $val['uid']?>">
                                    <td colspan="5"><?php echo $val['activity_num']?></td>
                                </tr>
                            <?php }?>
                        </tbody>
                    </table>
                    <div class="dp-tfoot clearfix">
                        <div class="item fr">
                            <nav class="dp-page-right">
                                <?php echo $data['page_content'];?>
                            </nav>
                            <div class="page-cnt">共<?php echo $data['page_total']?>条，每页<?php echo $data['page_num']?>条</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php include '../views/public/menu.view.php';?>
</div>
<!-- container end -->

<!-- 全局变量 end -->
<?php echo_js('libs/sea.js');?>
<?php echo_js('libs/seajs_preload.js');?>
<?php echo_js('libs/seajs_config.js');?>
<script>
    seajs.use('activity/activity');
</script>
</body>
</html>
