 (function() {
     function CollectionCtrl() {
        this.albums = [];
        for (var i=0; i < 12; i++) {
            this.albums.push(angular.copy(albumBig));
        }
     }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', CollectionCtrl);
 })();