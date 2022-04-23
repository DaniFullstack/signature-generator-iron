'use strict';

/* Controllers */

signature.controller('HomeCtrl', ['$scope', '$timeout', 'IDB', function ($scope, $timeout, IDB) {

    $scope.logoBase = "https://s3.amazonaws.com/img.ironsrc/img/";
    // $scope.logoBase = "img/";
    $scope.defaultLogo = "logo-is";

    $scope.ironSourceLogo = $scope.logoBase+"/logo-is";

    $scope.data = [
        {
            depName: "ironSource",
            logo: "logo-is",
            social: {
                linkedin: 'https://www.linkedin.com/company/ironsource',
                twitter: 'https://twitter.com/ironsource',
                facebook: 'https://www.facebook.com/ironSource'
            },
            link: 'is.com',
            logoHeight: 'height: 37px;'
        },
        {
            depName: "SuperSonic",
            logo: "logo-ssonic",
            social: {
                linkedin: 'https://www.linkedin.com/company/supersonic-studios/',
                facebook: 'https://www.facebook.com/studiossupersonic/'
            },
            link: 'supersonic.com',
            logoHeight: 'height: 49px;'
        },
        {
            depName: "Maverick",
            logo: "maverick-logo",
            social: {
                linkedin: 'https://www.linkedin.com/company/maverickstudios/about/'
            },
            link: 'maverickstudios.io',
            logoHeight: 'height: 29px;'
        },
        {
            depName: 'Aura',
            logo: 'logo-aura',
            social: {
                linkedin: 'https://www.linkedin.com/showcase/ironsource-aura/',
            },
            link: 'aura.ironsrc.com',
            logoHeight: 'height: 37px;'
        },
        {
            depName: 'Luna',
            logo: 'logo-luna_new',
            social: {
                linkedin: 'https://www.linkedin.com/company/ironsource/',
            },
            link: 'luna.is.com',
            logoHeight: 'height: 49px;'
        }
        // {
        //     depName: "Administration",
        //     logo: "logo-administration",
        // },
        // {
        //     depName: "Bi",
        //     logo: "logo-bi",
        // },
        // {
        //     depName: "installCore",
        //     logo: "logo-ic",
        // },
        // {
        //     depName: "QA",
        //     logo: "logo-qa",
        // },
        // {
        //     depName: "QA",
        //     logo: "logo-qa",
        // },
    ];

    $scope.webSite = 0;

    $scope.addresses = [
        {
            name: 'No Address',
            addr: ''
        },
        {
            name: 'San Fransisco',
            addr: '17 Bluxome Street, San Francisco, CA, USA'
        },
        {
            name: 'New York',
            addr: '180 Varick Street, 13th Floor, New York, NY, USA'
        },
        {
            name: 'Tel Aviv',
            addr: 'ironSource HQ - 121 Derech Menachem Begin st. Tel Aviv'
        },
        {
            name: 'Beijing',
            addr: 'A505, East Avenue, 10 New East Road, Chaoyang District, Beijing, China'
        },
        {
            name: 'London',
            addr: 'Grant House, 56-60 St John Street, London, UK'
        },
        {
            name: 'Kiev',
            addr: 'Ivana Lepse Blvd. 6-z, 03680, Kiev, Ukraine'
        },
        {
            name: 'Bangalore',
            addr: 'Office Nos. CB27 and CB28, Pine Valley Building, Domlur, Bangalore, Karnataka, India'
        },
        {
            name: 'Shanghai',
            addr: 'Room 1408, Puhui Plaza, No. 318 Fuzhou Road, Shanghai, China'
        },
        {
            name: 'Minsk',
            addr: 'Pinskaya 28A, Minsk, Belarus'
        }
    ];

    $scope.userInfo = {};

    $scope.userInfo.office = $scope.userInfo.office || _.findWhere($scope.addresses, {name: 'Tel Aviv'});
    $scope.userInfo.webSite = $scope.webSite;
    $scope.userInfo.logo = $scope.userInfo.logo || 'png';



    IDB.getAll('userInfoNew_v2', function (data) {

        $scope.$apply(function() {
            if ( _.isUndefined(data.user) ) {
                data.user = {};
                data.user.value = {
                    fax: '+972-77-5448273',
                    logo: 'png',
                    webSite: data.webSite || $scope.webSite,
                    office: _.findWhere($scope.addresses, {name: 'Tel Aviv (Lilienblum)'})
                };
                IDB.add('userInfoNew_v2', {id: 'user', value: data.user.value}, null);
            }

            var depName = "ironSource";
            if (data.department) {
                depName = data.department.value.depName;
            }

            $scope.department = $scope.webSite;
             $scope.address = _.findWhere($scope.addresses, {name: 'London'});

            $scope.userInfo = data.user.value;
        });
    });

    $scope.$watch('userInfo', _.debounce(function () {
        if($scope.userInfo) {
            IDB.update('userInfoNew_v2', {id: 'user', value: $scope.userInfo}, null);
        }

        var success;
        clearTimeout(success);
        
        new ClipboardJS('#copy-btn', {
            target: function() {return document.getElementById('signature')}
        })
    }, 1000), true);

    $scope.changedepartment = function(department){
        IDB.update('userInfoNew_v2', {id: 'department', value: department}, null);
    }

    $scope.getColor = function (color) {
        return {color: color}
    };

}]);