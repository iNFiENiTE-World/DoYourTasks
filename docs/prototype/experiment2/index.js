// Naturally get the data variable from data.js script because scripts integrate with each other

// Display the data (onload)
function display(){
    document.getElementById('data').innerHTML = data.task1 + "-" + data.task2 + "-" + data.task3;
}