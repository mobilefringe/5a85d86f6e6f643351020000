<template>
    <div>
        <iframe src='https://www.timetap.com/emb/214918' frameborder='0' width='840' height='500'></iframe>
    </div>
</template>
<script>
    define(["Vue", "vuex", "lightbox"], function(Vue, Vuex, Lightbox) {
        Vue.use(Lightbox);
        return Vue.component("social-links", {
            template: template, // the variable template will be injected,
        });
    });
</script>