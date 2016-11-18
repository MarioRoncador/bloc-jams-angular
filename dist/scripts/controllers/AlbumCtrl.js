 (function() {
     function AlbumCtrl(Fixtures, SongPlayer) {
         this.albumData = Fixtures.getAlbum();
         this.songPlayer = SongPlayer;

         this.song_list = [];
         for (var i = 0; i < 5; i++){
            this.song_list.push(this.albumData.songs[i]);
         }
     }
     
     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);

 })();
