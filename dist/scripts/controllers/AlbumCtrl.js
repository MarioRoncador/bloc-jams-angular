 (function() {
     function AlbumCtrl() {
         this.headline_text = "This works!";
         
         this.albumData = angular.copy(albumBig);
         
         this.song_list = [];
         for (var i = 0; i < 5; i++){
            this.song_list.push(this.albumData.songs[i]);
         }
     }
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();
