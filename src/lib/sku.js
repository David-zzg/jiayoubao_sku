export default class SKUCreator{
    constructor(attrs,skus){
        this.attrs = attrs
        this.skus = skus
        this.cache = {}//缓存对象
    }
    //初始化匹配list，进行排序和转换成字符串
    initMatchList(matchList){
        matchList.sort((a,b)=>a<b?-1:1)
        matchList = matchList.map(item=>(item+""))
        return matchList        
    }
    //获取匹配list对应的key
    getKey(matchList){
        return matchList.join("|")
    }
    //通过正则匹配，获取每一条匹配的规则，并将规则内的sku都放进匹配结果中
    getListByArr(matchList,key){
        var skuObj = this.skus
        for(var i=0,l=matchList.length;i<l;i++){
            var pattern = matchList[i]
            var temObj = {}//临时对象
            for(var str in skuObj){
                var reg = new RegExp(pattern)
                if(reg.test(str)){
                    temObj[str] = skuObj[str]
                }
            }
            skuObj = temObj//每一次匹配后把匹配成功的规则替换成下次的匹配目标
        }
        return this.toArray(skuObj,matchList,key)
    }
    //获取匹配的列表
    getList(matchList){
        matchList = this.initMatchList(matchList)
        var key = this.getKey(matchList)
        return this.cache[key]||this.getListByArr(matchList,key)
    }
    toArray(skuObj,exclude=[],key){
        exclude = []
        var list = []
        for(var i in skuObj){
            var arr = i.split("|")
            arr.forEach(item=>{
                if(list.indexOf(item)===-1&&exclude.indexOf(item)===-1){
                    list.push(item)
                }
            })
        }
        this.cache[key] = list//存返到缓存对象中
        return list
    }

}
