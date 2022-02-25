"""
PY-JS JSON DATA INTEGRATION EXPERIMENT

1. AIM
✓ Experiment a way to integrate JSON data from Python to Javascript (JS)


2. PROBLEM
Python
{
"Pros":["can access file system", "can open and write file", "can receive user input and write to JSON file"]'
"Cons":["need server to run in browser"]
}

JS
{
    Pros:['can run in browser without server', 'can integrate with HTML to display data', 'can receive user input only'],
    Cons:['can't access file system without Node.js, which needs server to run', 'can't write to JSON file']
}


3. SOLUTION
a) Use Python to write a JS file
Since Python can access the file system, it will be used to receive the user inputs and store them in JSON file. But if
the data is stored in JSON file, JS can't directly access it and need help from backend language/framework which will
require a server to be run. We don't want that, because to run a server, we need to manually do it and the layer of
abstraction becomes low and requires more processes. Instead, write the data in JS file. For example:


data.js
------------------------------------------------------------------------------------------------------------------------
const data = {data1:value1, data2:value2, data3:value3, ... }

------------------------------------------------------------------------------------------------------------------------
END OF FILE

In the example, the data is stored in JSON string and the JSON string is stored in a variable. This method just adds a
sprinkle of JS syntax and saved as a JS file. Then, the data in data.js can be shared with other JS scripts for further
use.


4. PROTOTYPE
~ 1st Prototype
See the code below:
"""
import json # json module for Python

f = open('E:\iNFiENiTE\PROJEK\Sendiri\JSPY\DoYourTask\prototype\experiment1\data.js', 'w') # Open specified file
                         # If does not exist, create it
                         # Overwrite the content of the entire file


# Sample data (type 'dictionary')
# User input data goes here

user_inputs = {'task1':'do homework','task2':'do the laundry','task3':'learn JS'}



# Write into JS file (type 'dictionary' => 'JSON string')
f.write(f'const data = {json.dumps(user_inputs)}')

# Close file
f.close()

"""
1st Prototype is successful. Syntax of JS is written and Python dictionary containing the data
is successfully turned into JSON strings which can be interpreted by JS language to be further
benefitted.


5. CONCLUSION
Integrationg JSON data from Python to JS is achievable without running a server.



END OF EXPERIMENT
"""