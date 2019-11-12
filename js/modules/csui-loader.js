var csui = (function () {

    // Enter your server connection parameters here:
  
    var
        cgiUrl = 'http://explorationlab.projectioncore.com/OTCS/cs.exe',
        supportPath = '/img',
        username = 'Admin',
        password = 'Colombia01',
        connectionTimeout = 30, // seconds
        localTheme = 'alberi';  // to be loaded from "../themes"
  
    // Leave the rest of this file intact.
  
    var restApuUrl = cgiUrl + '/api/v1',
        supportUrl = cgiUrl.replace(/(^.*\/\/[^\/]+).*$/, '$1') + supportPath,
        head = document.head;
  
    function initialize(callback) {
      appendFavicon();
      appendMainStylesheet();
      appendStyleOverrides();
      appendScriptLoader(callback);
    }
  
    function appendFavicon() {
      var favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type= 'image/vnd.microsoft.icon';
      favicon.href = supportUrl + '/csui/themes/carbonfiber/image/favicon.ico';
      head.appendChild(favicon);
    }
  
    function appendMainStylesheet() {
      var stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = supportUrl + '/csui/themes/carbonfiber/theme.css';
      head.appendChild(stylesheet);
    }
  
    function appendStyleOverrides() {
      var stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = '../themes/' + localTheme + '/overrides.css';
      stylesheet.setAttribute('data-csui-theme-overrides', 'true');
      head.appendChild(stylesheet);
    }
  
    function appendScriptLoader(callback) {
      var script = document.createElement('script');
      script.src = cgiUrl + '/widgets?crossOrigin=true';
      script.onload = function () {
        csui.require.config({
          config: {
            'csui/pages/start/impl/perspective.router': {
              developmentPage: true
            }
          }
        });
        callback();
      };
      script.onerror = function () {
        alert('CS UI script loader has failed.');
      };
      head.appendChild(script);
    }
  
    function authenticate(callback) {
      var request = new XMLHttpRequest(),
          timeout = setTimeout(function () {
            alert('Authentication timed out.');
          }, connectionTimeout * 1000);
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          clearTimeout(timeout);
          if (request.status === 200) {
            var contentType = request.getResponseHeader('content-type');
            if (/^application\/json/i.test(contentType)) {
              var response = JSON.parse(request.responseText);
              if (response.ticket) {
                var connection = {
                  url: restApuUrl,
                  supportPath: supportPath,
                  session: {
                    ticket: response.ticket
                  }
                };
                csui.require.config({
                  config: {
                    'csui/utils/contexts/factories/connector': {
                      connection: connection
                    }
                  }
                });
                callback(connection);
              } else {
                alert('No authentication ticket has been received.');
              }
            } else {
              alert('Unsupported content type received: ' + contentType);
            }
          } else {
            alert('Unsuccessful status received: ' + request.status + ' ' +
                request.statusText);
          }
        }
      };
      console.info('Authenticating against ' + cgiUrl + ' as ' +
          username + '...');
      request.open('POST', restApuUrl + '/auth', true);
      request.setRequestHeader('Accept', 'application/json');
      request.setRequestHeader('Content-Type',
          'application/x-www-form-urlencoded');
      request.send('username=' + encodeURIComponent(username) + '&' +
                   'password=' + encodeURIComponent(password));
    }
  
    return {
      initialize: initialize,
      authenticate: authenticate
    };
  
  }());