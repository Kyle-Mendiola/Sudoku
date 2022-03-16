function isDisplayNone(element){
    return window.getComputedStyle(element).display === "none";
}

function removeArrayDuplicates(arr){
    return [...new Set(arr)];
}

const sampleBuild = [
    {value:1, row:1, col:1},
    {value:2, row:2, col:2},
    {value:3, row:3, col:3},
    {value:4, row:4, col:4}
];

function prr(sumtin){
    console.log(sumtin);
}
