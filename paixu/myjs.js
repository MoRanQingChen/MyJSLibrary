function getInfo() {
    document.getElementsByTagName("input")[0].style.display="none";
    var xhr=new XMLHttpRequest();
    var data=[];
    xhr.onreadystatechange= function () {
        if(xhr.readyState==4&&/^2\d\d$/.test(xhr.status)){
            data=moran.parse(xhr.responseText)
        }
    }
    xhr.open("get","data.txt",false);
    xhr.send(null);

    var fag=document.createDocumentFragment();
    for(var i=0;i<data.length;i++){
        var oTr=document.createElement("tr");
        data[i].sex=data[i].sex==1?"男":"女";
        oTr.innerHTML="<td>"+data[i].name+"</td><td>"+data[i].age+"</td><td>"+data[i].val+"</td><td>"+data[i].sex+"</td>"
        fag.appendChild(oTr);
    }
    var oTb=document.getElementsByTagName("tbody")[0];
    oTb.appendChild(fag);
    var oTh=document.getElementsByTagName("th");
    oTr=document.getElementsByTagName("tr");
    oTr=[].slice.call(oTr);
    oTr.shift();
    for(var j=0;j<oTh.length;j++){
        oTh[j].count=j;
        oTh[j].flag=-1;
        oTh[j].onclick= function () {
            var _this=this;
            for(var i=0;i<oTh.length;i++){
                i!=_this.count?(oTh[i].flag=-1):(oTh[i].flag*=-1);
            }
            oTr.sort(function (a,b) {
                var pre= a.childNodes[_this.count].innerHTML;
                var aft= b.childNodes[_this.count].innerHTML;
                if(Number(pre)){
                    return _this.flag*(pre-aft);
                }else {
                    return _this.flag*(pre.localeCompare(aft));
                }
            });
            for(var i=0;i<oTr.length;i++){
                oTb.appendChild(oTr[i]);
            }
        }
    }

};

