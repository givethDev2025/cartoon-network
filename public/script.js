    const video = document.getElementById('video');
    const directStreamURL = "http://38.96.178.201:80/live/CartoonNetwork/tracks-v1a1/mono.m3u8";

    const capturedPlainURLs = [];

    if (Hls.isSupported()) {
    const hls = new Hls({
      debug: true,
      xhrSetup: (xhr, url) => {
        console.log('[GET]', url);
        capturedPlainURLs.push(url);
      }
    });

      hls.loadSource(directStreamURL);
      hls.attachMedia(video);

      // Access from browser console
      window.getCapturedPlainURLs = () => capturedPlainURLs;
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = directStreamURL;
    } else {
      alert('Your browser does not support HLS playback.');
    }