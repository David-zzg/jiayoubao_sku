<template>
    <div>
        <ul v-for="item in list" class="sku-list">
            <li v-for="subitem in item['attr']" >
                <SkuItem :data="subitem" :click="skuClick"></SkuItem>
            </li>
        </ul>
    </div>
</template>
<script>
import SKUCreator from "../lib/sku-vue"
import SkuItem from "./SkuItem"

export default {
    props:['attrs','skus'],
    data(){
        var attrs = this.attrs
        var skus = this.skus
        this.skuObj = new SKUCreator(attrs,skus)//初始化
        return {
            matchList:[]
        }
    },
    computed:{
        list:function(){
            return this.skuObj.getRenderList(this.matchList)
        }
    },
    components: {
        SkuItem
    },
    methods:{
        skuClick(item){
            //是否可点击
            if(this.skuObj.isClickable(item)){
                var i = this.matchList.indexOf(item.sku)
                //判断是否已经点击，已经点击则取消
                if(i===-1){
                    this.matchList.push(item.sku)
                }else{
                    this.matchList.splice(i,1)
                }
            }
        }
    }
}
</script>
<style lang="less">
    .sku-list{
        padding:0px;
        margin:0px;
        list-style:none;
        li{
            display:inline-block;
        }
    }
    .sku-btn{
        background:white;
        margin:10px 5px;
        outline:none;
    }
    .clickable{
        border:1px solid #7d7d7d;
    }
    .click{
        border:1px solid #c53131;
    }
    .unclickable{
        border:1px solid #afadad;
        border-style:dashed;
        opacity:0.8;
    }
</style>