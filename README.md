chromeSmoothScroll
==================

Smooth scrolling for chrome browser

usage
=====

```
<script src="path/to/chromeSmoothScroll.js"></script>
<script>
	jQuery(document).ready(function($) {
		chromeSmoothScroll.init();
	});
</script>
```

demo
====
http://habibhadi.com/demo/chromeSmoothScroll/


Tips
====
For macosx chrome browser scrolls smoothly by default. But if you run this function in macosx it will not work. To detect 
OS you can use following code - 

```javascript
var OS = {
    isWindows: function(){ return navigator.appVersion.indexOf("Win")!=-1 },
    isMac: function(){ return navigator.appVersion.indexOf("Mac")!=-1 },
    isUnix: function(){ return navigator.appVersion.indexOf("X11")!=-1 },
    isLinux: function(){ return navigator.appVersion.indexOf("Linux")!=-1 },
    name: function(){
        var name = '';
        if(OS.isWindows()) name = "windows";
        else if(OS.isMac()) name = "macosx";
        else if(OS.isUnix()) name = "unix";
        else if(OS.isLinux()) name = "linux";
        return name;
    }
};


if( OS.name() == 'windows' ) chromeSmoothScroll.init();
```

This plugin/ function is made for Chrome windows only!
