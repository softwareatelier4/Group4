module.exports = {
  "src_folders" : ["./test/test2"],
  "output_folder" : "./test/nightwatch-reports",
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "globals_path" : "",
  
  "selenium" : {
    "start_process" : true,
    "server_path" : "./selenium-server-standalone-2.48.2.jar",
    "log_path" : "./log",
    "host" : "127.0.0.1",
    "port" : 4444
  },
  
  "test_settings" : {
    "default" : {
      "launch_url" : require('./config').url,
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": true,
      "screenshots" : {
        "enabled" : false,
        "path" : ""
      },
      "desiredCapabilities": {
        "browserName": "phantomjs",
        "javascriptEnabled": true,
        "acceptSslCerts": true,
        "phantomjs.binary.path": "node_modules/phantomjs/bin/phantomjs"
      }
    },
    
    "firefox" : {
      "desiredCapabilities": {
        "browserName": "firefox",
        "javascriptEnabled": true,
        "acceptSslCerts": true
      }
    }
  }
}