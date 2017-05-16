import SkuCreator from "./sku"
//按钮三种状态,可点击、点击、不可点击
const status = {
    CLICKABLE:"clickable",
    CLICK:"click",
    UNCLICKABLE:"unclickable"
}
export default class VueSkuCreator extends SkuCreator{
    constructor(attrs,skus){
        super(attrs,skus)
    }
    //获取用于渲染的结果list
    getRenderList(matchList=[]){
        var resultList = this.getList(matchList)
        var list = []
        var attrs = this.attrs
        attrs.forEach(item=>{
            list.push({
                attr:item.attr.map(sku=>{
                    switch (true) {
                        case matchList.indexOf(sku)!==-1:
                            return {sku:sku,status:status.CLICK,disabled:false}
                        case resultList.indexOf(sku)!==-1:
                            return {sku:sku,status:status.CLICKABLE,disabled:false}
                        case resultList.indexOf(sku)===-1:
                            return {sku:sku,status:status.UNCLICKABLE,disabled:true}
                        default:
                            return {sku:sku,status:"error"}
                    }
                })
            })
        })
        return list
    }
    //判断是否可以点击
    isClickable(data){
        return data.status!==status.UNCLICKABLE
    }
}
