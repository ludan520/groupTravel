<template>
    <div>
        旅游攻略首页
        <!-- postSearch旅游搜索框 -->
        <PostSearch/>
        <!-- postContent旅游正文内容 -->
        <PostContent/>
        <!-- postAside侧边栏 -->
        <PostAside/>
    </div>
</template>

<script>
import PostSearch from '@/components/post/postSearch.vue';
import PostContent from '@/components/post/postContent.vue';
import PostAside from '@/components/post/postAside.vue';
export default {
   components: {
       //注册组件
       PostSearch,
       PostContent,
       PostAside
   }
}
</script>

<style>

</style>