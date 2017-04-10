/**
 * 本地缓存
 * Created by Administrator on 2015/11/23.
 */
//angular.module('localDatabase',[])
define([
  'app',
  'html/common/storage',
],function(app){
  app.factory('localDatabase',['Storage',function(Storage){
    var _key_info = 'oderInfo';
    var _key_classes = 'key_classes';
    function clearUnlessCache(){
      //removeOderInfo();
    }

    function removeOderInfo(){
      Storage.remove(_key_info);
    }

    return {

      clearUnlessCache : clearUnlessCache,

      getUsername : function(){
        var username = '' ;
        if(localStorage.getItem('username') != null){
          username = localStorage.getItem('username');
        }
        return username ;
      },
      setUsername : function(username){
        localStorage.setItem('username',username);
      },

      getPassword : function(){
        var password = '';
        if(localStorage.getItem('password') != null){
          password = localStorage.getItem('password');
        }
        return password ;
      },
      setPassword : function(password){
        localStorage.setItem('password',password);
      },


      getSessid : function(){
        var password = '';
        if(localStorage.getItem('sessid') != null){
          password = localStorage.getItem('sessid');
        }
        return password ;
      },
      setSessId : function(sessid){
        localStorage.setItem('sessid',sessid);
      },



      getDid : function(){
        var did = '';
        if(localStorage.getItem('did') != null){
          did = localStorage.getItem('did');
        }
        return did ;
      },
      setDid : function(did){
        localStorage.setItem('did',did);
      },



      getOs : function(){
        var os = '';
        if(localStorage.getItem('os') != null){
          os = localStorage.getItem('os');
        }
        return os ;
      },
      setOs : function(os){
        localStorage.setItem('os',os);
      },



      getNm : function(){
        var nm = '';
        if(localStorage.getItem('nm') != null){
          nm = localStorage.getItem('nm');
        }
        return nm ;
      },
      setNm : function(nm){
        localStorage.setItem('nm',nm);
      },



      getMno : function(){
        var mno = '';
        if(localStorage.getItem('mno') != null){
          mno = localStorage.getItem('mno');
        }
        return mno ;
      },
      setMno : function(mno){
        localStorage.setItem('mno',mno);
      },



      getDm : function(){
        var dm = '';
        if(localStorage.getItem('dm') != null){
          dm = localStorage.getItem('dm');
        }
        return dm ;
      },
      setDm : function(dm){
        localStorage.setItem('dm',dm);
      },

      setOderInfo : function(saveData){
        Storage.set(_key_info,saveData);
      },

      getOderInfo : function(){
        return Storage.get(_key_info);
      },

      removeOderInfo : removeOderInfo,

      setShopClasses : function(value){
        Storage.set(_key_classes,value);
      },

      getShopClasses : function(){
        return Storage.get(_key_classes);
      }

    }
  }]);

});
