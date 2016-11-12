 (function() {
     function Fixtures() {
         var Fixtures = {};
         
     var albumPicasso = {
         title: 'The Colors',
         artist: 'Pablo Picasso',
         label: 'Cubism',
         year: '1881',
         albumArtUrl: '/assets/images/album_covers/01.png',
         songs: [
             { title: 'Blue', duration: '161.71', audioUrl: '/assets/music/blue' },
             { title: 'Green', duration: '103.96', audioUrl: '/assets/music/green' },
             { title: 'Red', duration: '268.45', audioUrl: '/assets/music/red' },
             { title: 'Pink', duration: '153.14', audioUrl: '/assets/music/pink' },
             { title: 'Magenta', duration: '374.22', audioUrl: '/assets/music/magenta' }
         ]
     };
 
     var albumMarconi = {
         title: 'The Telephone',
         artist: 'Guglielmo Marconi',
         label: 'EM',
         year: '1909',
         albumArtUrl: '/assets/images/album_covers/20.png',
         songs: [
             { title: 'Hello, Operator?', duration: '1:01' },
             { title: 'Ring, ring, ring', duration: '5:01' },
             { title: 'Fits in your pocket', duration: '3:21' },
             { title: 'Can you hear me now?', duration: '3:14' },
             { title: 'Wrong phone number', duration: '2:15' }
         ]
     };
         
          var albumBig = {
     title: 'Life After Death',
     artist: 'The Notorious B.I.G.',
     label: 'Bad Boy Entertainment',
     year: '1994',
     albumArtUrl: 'http://www.egotripland.com/wp-content/uploads/2012/03/Notorious_BIG-Life_After_Death1-e1331104684115.jpg',
     songs: [
         { title: 'Hypnotize', duration: '4:01', audioUrl: '/assets/music/Hypnotize' },
         { title: 'Fuck You Tonight', duration: '5:24', audioUrl: '/assets/music/FuckYouTonight' },
         { title: 'I Love The Dough', duration: '3:45', audioUrl: '/assets/music/ILoveTheDough' },
         { title: 'I Got A Story To Tell', duration: '3:18', audioUrl: '/assets/music/IGotAStoryToTell'  },
         { title: 'Kick In The Door', duration: '3:15', audioUrl: '/assets/music/KickInTheDoor' }
     ]
 };
         
         Fixtures.getAlbum = function() {
         return albumBig;
         };
         
         Fixtures.getCollection = function(numberOfAlbums) {
         var totalCollection = [];
         for(var i = 0; i < numberOfAlbums; i++){
             totalCollection.push(albumBig);
         }
         return totalCollection;
         };
         
         return Fixtures;
     }
 
     angular
         .module('blocJams')
         .factory('Fixtures', Fixtures);
 })();