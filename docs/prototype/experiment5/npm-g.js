/*
1. AIM
✓ Determine whether npm module is available inside E: drive when downloaded globally


2. PROBLEM
I have downloaded a module node-windows using npm by typing 'npm install -g node-windows'. I did that while
the current directory is in my C: drive. Doesthe module enabled globally means that it can be accessed 
throughout my whole computer (all drives) or just that specific drive?


3. SOLUTION
Try running node-wondows by requiring the module in a .js script. Then, run the script using node. If
error appears, try installing node-windows and repeat running it. If it works, then install -g only downloads
in specified directory. If doesn't, there must be other factors affecting the unusable node-windows module.


4. Prototype
~1st Prototype
See code below
*/
try {
    var nw = require('node-windows');    
} catch (error) {
    console.log('Module doesn\'t exist. Error: ' + error)
}

/*
5. RESULT
It seems like install -g does install it globally, though if it is accessible to all drive or just one is
unknown because the experiment turned out that node-windows module will only work when linked to this root
of project when installed globally. So, I had downloaded the module in my when I'm in the E: drive because
the without it doesn't work, and then it turned out with it also don't work. Thus, I have to actually link
it but when I did that the module is already downloaded throughm y E: drive and I can't confirm whether 
the module linked is from my C: or E: or just from globally.


6. CONCLUSION
Thus, result shows that when I want to use node-windows module, I must download it in the drive (if it hasn't)
and link it to my project root to make it functional.



END OF EXPERIMENT
*/