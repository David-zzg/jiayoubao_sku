<template>
  <div id="app">
    <SkuSelect :attrs="attrs" :skus="skus"></SkuSelect>
  </div>
</template>

<script>
import SkuSelect from './components/SkuSelect'
export default {
  name: 'app',
  components: {
    SkuSelect
  },
  data(){
    return {
      attrs:[{
          'attr':['447','448', '449']
      },{
          'attr':['450','451','452']
      },{
          'attr':['453','454']
      }],
      skus:{
        '447|450|454': 120,
        '447|451|453': 10,
        '447|451|454': 28,
        '447|452|453': 220,
        '449|451|454': 130,
        '449|452|453': 120,
        '449|452|454': 120  
      }
    }
  }
}
</script>


