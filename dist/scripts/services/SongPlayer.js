(function() {
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};
         
          /**
          * @desc store the info about the album in currentAlbum
          * @type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();
         
          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;
         
          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
          var setSong = function(song) {
              if (currentBuzzObject) {
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              }     
        
            currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
            });
      
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
          };
         
         
          /**
          * @function playSong
          * @desc Plays the current object (currentBuzzObject.play();) and sets the song object to ture
          * @param none
          */  
          var playSong = function(song){
              currentBuzzObject.play();
              song.playing = true;
          };
         
          /**
          * @function getSongIndex
          * @desc Returns the index of the playing song
          * @param song = currently playing song
          */  
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
          }; 
         
          /**
          * @function stopSong
          * @desc Stops the current buzz object & sets the playing song to the first of the list
          * @param the currently playing song
          */  
          var stopSong = function(song) {
              currentBuzzObject.stop();
              song.playing = null;
          }; 
         
         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
        SongPlayer.currentSong = null;
         
         /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
         
      SongPlayer.play = function(song) {
         song = song || SongPlayer.currentSong;
         if (SongPlayer.currentSong !== song) {
           setSong(song);
           playSong(song);
        } else if (SongPlayer.currentSong === song) {
             if (currentBuzzObject.isPaused()) {
               currentBuzzObject.play();
             }
          }
      };
         
      SongPlayer.pause = function(song) {
         song = song || SongPlayer.currentSong;
         currentBuzzObject.pause();
         song.playing = false;
      };   
      
      /**
      * @function SongPlayer.previous
      * @desc getSong index and decrease the index by one. if the index is < 0 stop the song and set as currently playing song the first song.
      * @param none
      */  
      SongPlayer.previous = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex--;
           
         if (currentSongIndex < 0) {
            stopSong(song);
         } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
         }
      };
    
      /**
      * @function SongPlayer.next
      * @desc getSong index and increase the index by one. If the index is > 4 stop the song and set as currently playing song the first song.
      * @param none
      */    
      SongPlayer.next = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex++;
                   
         alert(currentAlbum.songs[currentSongIndex]);
         
           
         if (currentSongIndex > 4) {
             stopSong(song);
         } else {
             var song = currentAlbum.songs[currentSongIndex];
             setSong(song);
             playSong(song);
         }
      };
         
         
      /**
      * @function setCurrentTime
      * @desc Set current time (in seconds) of currently playing song
      * @param {Number} time
      */
      SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
      };

          return SongPlayer;
     }
    

 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();