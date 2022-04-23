'use strict';

/* Controllers */

signature.controller('HomeCtrl', ['$scope', '$timeout', 'IDB', function ($scope, $timeout, IDB) {

    $scope.logoBase = "https://s3.amazonaws.com/img.ironsrc/signature/";
    $scope.defaultLogo = "logo-is.png";

    $scope.ironSourceLogo = "https://s3.amazonaws.com/img.ironsrc/signature/logo-is.png";

    $scope.data = [
        {
            depName: "ironSource",
            color: "#101026",
            logo: "logo-is.png",
            website: "http://www.ironsrc.com/",
            websiteNoPrefix: "ironsrc.com",
            linkedin: "http://www.linkedin.com/company/ironsource",
            twitter: "https://twitter.com/ironSourceGroup",
            facebook: "https://www.facebook.com/pages/ironSource/183229085132452",
            googleplus: "https://plus.google.com/+ironsrc/",
            colors: ["#1D1735", "#3D8A88", "#55A063", "#A1CC05"]
        },
        {
            depName: "mobileCore",
            color: "#5654AF",
            logo: "logo-mc.png",
            website: "https://www.mobilecore.com/",
            websiteNoPrefix: "mobilecore.com",
            linkedin: "http://www.linkedin.com/company/mobilecore-from-ironsource",
            twitter: "https://twitter.com/mobileCore_sdk",
            facebook: "https://www.facebook.com/mobilecore.platform",
            googleplus: "https://plus.google.com/+MobilecorePlatform/",
            colors: ["#5356BF", "#ee4f9c", "#00abc4", "#1d1735"]

        },
        {
            depName: "installCore",
            color: "#1cd176",
            logo: "logo-ic.png",
            website: "http://www.installcore.com/",
            websiteNoPrefix: "installcore.com",
            linkedin: "http://www.linkedin.com/company/installcore-ironsource",
            twitter: "https://twitter.com/InstallCore_",
            facebook: "https://www.facebook.com/InstallCore",
            googleplus: "https://plus.google.com/+InstallcorePlatform/",
            colors: ["#5ECE3D", "#33326B", "#00A550", "#1d1735"]

        },
        {
            depName: "displayCore",
            color: "#FF6700",
            logo: "logo-dc.png",
            website: "http://display-core.com/",
            websiteNoPrefix: "display-core.com",
            linkedin: "http://www.linkedin.com/company/ironsource",
            twitter: "https://twitter.com/ironSourceGroup",
            facebook: "https://www.facebook.com/pages/ironSource/183229085132452",
            googleplus: "https://plus.google.com/+ironsrc/",
            colors: ["#ff5500", "#f9b000", "#33326b", "#1d1735"]

        },
        {
            depName: "mediaCore",
            color: "#00A2DB",
            logo: "logo-me.png",
            website: "http://www.ironsrc.com/platforms/mediacore",
            websiteNoPrefix: "ironsrc.com/mediacore",
            linkedin: "http://www.linkedin.com/company/ironsource",
            twitter: "https://twitter.com/ironSourceGroup",
            facebook: "https://www.facebook.com/pages/ironSource/183229085132452",
            googleplus: "https://plus.google.com/+ironsrc/",
            colors: ["#5356BF", "#ee4f9c", "#00abc4", "#1d1735"]

        }
    ];

    IDB.getAll('userInfo', function (data) {
        if ( _.isUndefined(data.user) ) {
            data.user = {};
            data.user.value = {fax: '+972-77-5448273'};
            IDB.add('userInfo', {id: 'user', value: data.user.value}, null);
        }
        // if ( _.isUndefined(data.department ) ) {
        //     var ironSrcDefaults = _.filter($scope.data, function (dep) {
        //         return dep.depName == 'ironSource';
        //     });
        //     $scope.department = ironSrcDefaults[0];
        //     console.log('#department was undefined', $scope.department);
        // } else {
        //     $scope.department = data.department.value;
        //     console.log('#department is defined', $scope.department);

        // }

        var ironSrcDefaults = _.filter($scope.data, function (dep) {
                return dep.depName == 'ironSource';
        });
        $scope.department = ironSrcDefaults[0];

        $scope.userInfo = data.user.value;

        try {
            $scope.$digest();
        } catch (e) {
        }
    });

    $scope.$watch('userInfo', _.debounce(function () {
        if($scope.userInfo) {
            console.log('save userInfo', $scope.userInfo);
            IDB.update('userInfo', {id: 'user', value: $scope.userInfo}, null);
        }

        var btn = $('button#copy-btn');
        var success;
        clearTimeout(success);
        var clip = new ZeroClipboard( btn );
        clip.on("ready", function() {
            this.on("aftercopy", function(event) {
                $('#copy-success').fadeIn(300).queue(function(){
                    var $th = $(this);
                    setTimeout(function(){
                        $th.dequeue();
                    }, 2000);
                    $th.fadeOut();
                });
            });
        });
    }, 1000), true);

    $scope.changedepartment = function(department){
        $("#platforms > span").css({'color':'#9B9AAA', 'font-weight':'normal' });
        $('#' + department.depName).css({'color':department.color, 'font-weight':'bold' });

        IDB.update('userInfo', {id: 'department', value: department}, null);
    }

    $scope.$watch('department', _.debounce(function () {
        console.log('watching department');
        if($scope.department) {
            console.log('save department', $scope.department);
            IDB.update('userInfo', {id: 'department', value: $scope.department}, null);
        }
    }, 1000), true);

    $scope.getColor = function (color) {
        return {color: color}
    };

}]);