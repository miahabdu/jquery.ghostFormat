Text Input Formatting Plugin for jQuery
========================

jquery.ghostFormat is a lightweight text field input foramatter plugin for jQuery. It allows for customizing input formats for numbers without changing the values that are saved to the database.

Requirements
------------
* [jQuery](http://jquery.com/) (>= 1.7)

Usage
-----

```javascript
$('.example_input').ghostFormat();
```

The above code will intialize ghostFormat on the selected inputs with default options. The default format converts the inputed values to currency (dollars).

You can customize which format you want returned by passing in options as parameters.

```javascript
$('.example_input').ghostFormat(options);
```

```options``` parameters are detailed below.


Options
-------

- **type**  
Specifies the format type returned by ghostFormat. The plugin currently accepts the following types passed in as a string: ```"money"``` ```"phone"``` ```"ssn"``` 
*default: "money"*

- **inputClass**  
Allows for passing in custom classes to the formatted text field input;
Accepts string containing all classes:  ```"form-control input-sm"```
*default: ""*

Help
----

Submit a [GitHub Issue request](https://github.com/miahabdu/jquery.ghostFormat/issues/new).


- - -

This software is made available under the open source MIT License. &copy; 2014 Abdul Miah and [contributors](https://github.com/miahabdu/jquery.ghostFormat/graphs/contributors)