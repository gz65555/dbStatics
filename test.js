
var romanToInt = function(s) {
    var romanMap = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    };
    var getIndexValue = function (index) {
        var letter = s[index];
        return romanMap[letter];
    };
    var value = 0;
    for(var i = 0; i < s.length; i++) {
        var v1 = getIndexValue(i);
        var v2 = getIndexValue(i + 1);
        if(v2 == null) {
            value += v1;
            break;
        }
        if(v1 < v2) {
            value = value + v2 - v1;
            i++;
        } else {
            value += v1;
        }
    }
    return value;
};

console.log(romanToInt('MMMCCCXXXIII'));
