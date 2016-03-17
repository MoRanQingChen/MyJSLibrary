var moran={
    parse:function(str){
        if(JSON in window){
            return JSON.parse(str)
        }else {
            return eval("("+str+")")
        }
    }
}