#7digital gen

This module is a wrapper around the 7digital-api module using es6 generators.
It enables you to perform asynchronous api calls while using sychronous control
flow mechanisms like `try catch` and `for`. See the examples directory for usage examples.

Note, you will need to run node with the `--harmony` flag when running node, to enable the use of es6 features.
Another option is to compile the module to es5 using a transpiler (eg. babel) and then run node normally.
