<template>
    <div class="mainBox">
        <input type="text" v-model="userName">
        <input type="password" v-model="password">
        <button @click="register">注册</button>
        <input type="text" v-model="userName">
        <input type="password" v-model="password">
        <button @click="login">登录</button>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    
</style>
<script>
import axios from 'axios'
export default {
    data() {
       return {
            userName:'',
            password:'',
        }
    },
//	创建实例时就会触发
    created() {
        
    },
    mounted() {
        
    },
//	检测视图值变化触发，有改变就会触发
    computed:{
        
    },
    methods:{
        register(){
            let url ='http://localhost:3000/user/register';
            let data={
                username:this.userName,
                password:this.password 
            }
            // this.$axios.post(url,data).then(res => {
            //     console.log(res);
                
            // })
            axios({
                url:url,
                method: 'post',
                data:{
                    userName:this.userName,
                    password:this.password
                }
            }).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    console.log('注册成功');
                    
                }else{
                    this.openLoading=false
                }
            })
        },
        login(){
            let url = 'http://localhost:3000/user/login';
            this.$axios.post(url,data).then(res=>{
                if(res.data.code==200){
                    console.log('login success');
                    
                }else{
                    console.log('login fail');
                    
                }
            })
        }
    },
    components: {
        
    },
}
</script>