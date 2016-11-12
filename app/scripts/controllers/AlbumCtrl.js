 (function() {
     function AlbumCtrl() {
         this.headline_text = "This works!";
         
         this.albumData = angular.copy(albumBig);
         
         this.song_list = [
         { title: 'Hypnotize', duration: '4:01' },
         { title: 'Fuck You Tonight', duration: '5:24' },
         { title: 'I Love The Dough', duration: '3:45'},
         { title: 'I Got A Story To Tell', duration: '3:18' },
         { title: 'Kick In The Door', duration: '3:15'}
     ]
         
     }
     angular
         .module('blocJams')
         .controller('AlbumCtrl', AlbumCtrl);
 })();

