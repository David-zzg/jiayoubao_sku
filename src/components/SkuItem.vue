<template>
    <button :disabled="data.disabled" class="sku-btn" :class="data.status" @click="click(data)">{{data.sku}}</button >
</template>
<script>
export default{
    props:['data','click']
}
</script>
