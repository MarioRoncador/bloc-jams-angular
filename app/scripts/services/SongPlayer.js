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

      currentBuzzObject.setVolume(50);

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      currentBuzzObject.bind('volumechange', function() {
        $rootScope.$apply(function() {
          SongPlayer.volume = currentBuzzObject.getVolume();
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
      SongPlayer.currentAlbum = currentAlbum;
    };

    /**
    * @function stopSong
    * @desc Stops the current buzz object & sets the playing song to the first of the list
    * @param the currently playing song
    */
    var stopSong = function(song) {
      currentBuzzObject.pause();
      currentBuzzObject.setTime(null);
      song.playing = false;
      SongPlayer.currentAlbum = null;
      SongPlayer.currentSong = null;
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
    * @desc Active song object from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /**
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;

    /**
    * @desc Current album variable (public)
    * @type {Object}
    */
    SongPlayer.currentAlbum = null;


    /**
    * @desc The volume of the song player
    * @type {Number}
    */
    SongPlayer.volume = null;

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
          song.playing = true;
        }
      }
    };




    /**
    * @function setVolume
    * @desc Set volume of the song player
    * @param {Number} volume
    */
    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume)
      }
    };

    /**
    * @function SongPlayer.pause (public method of the SongPlayer service)
    * @desc Uses the private setSong and playSong methods to pause currently playing music
    * @param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause(); // Pauses song, doesn't stop it
      song.playing = false;
    };

    /**
    * @function SongPlayer.playOrPause (public method of the SongPlayer service)
    * @desc Will either play or pause depending on whether the song is playing (helps with buttons)
    * @param {Object} song
    */
    SongPlayer.playOrPause = function(song) {

      if (song.playing){
        SongPlayer.pause(song);
      }
      else{
        SongPlayer.play(song);
      }
    };

    /**
    * @function SongPlayer.previous (public method of the SongPlayer service)
    * @desc Get array index of the song preceding the currentSong
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);
      }
      else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }

    };

    /**
    * @function SongPlayer.next (public method of the SongPlayer service)
    * @desc Get array index of the song following the currentSong
    */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
        stopSong(SongPlayer.currentSong);
      }
      else {
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
