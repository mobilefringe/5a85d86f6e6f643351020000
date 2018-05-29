<template>
    <div v-if="currentPage">
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1 v-if="locale=='en-ca'">{{currentPage.title}}</h1>
					<h1 v-else>{{currentPage.title_2}}</h1>
				</div>
			</div>
		</div>
		<div class="site_container inside_page_content">
            <div class="margin_side_20" >
                <div class="page_body description_text text_left" v-if="locale=='en-ca'" v-html="currentPage.body"></div>
                <div class="page_body description_text text_left" v-else v-html="currentPage.body_2"></div>
            </div>
            <div role="tablist" class="accordion" v-if="services.length > 0">
                <b-card no-body class="mb-1" v-for = "service in services">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block @click="service.is_visible = !service.is_visible" :class="service.is_visible ? 'collapsed' : null" :aria-controls="service.id" :aria-expanded="service.is_visible ? 'true' : 'false'">
                            <i v-if="service.is_visible"  class="fa fa-caret-down"></i>
                            <i v-else  class="fa fa-caret-right"></i>
                            {{service.title}}
                        </b-btn>
                    </b-card-header>
                    <b-collapse v-model="service.is_visible" :id="service.id" :visible="service.is_visible" :accordion="service.id" role="tabpanel" class="accordion_body">
                        <b-card-body>
                            <p class="card-text" v-html="service.text"></p>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </div>
        </div>
        <div style="padding:20px 0;"></div>
    </div>
    <!--Pages Banner-->
</template>
<style>
    .page_title {
        /*border-top:1px solid #aea99e;*/
        border-bottom:1px solid #aea99e;
        height: 35px;
        line-height: 35px;
    }
    #pages_container img{
        width: 100%;
        height: auto;
    }
</style>
<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "bootstrap-vue"], function(Vue, Vuex, moment, tz, VueMoment, BootstrapVue) {
        Vue.use(BootstrapVue);
        return Vue.component("activities-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    success_subscribe: false,
                    currentPage: null,
                    pageBanner : null,
                    services : []
                }
            },
            props:['id', 'locale'],
            beforeRouteUpdate(to, from, next) {
                this.loadData().then(response => {
                    this.currentPage = response[0].data;
                    var temp_repo = this.findRepoByName('Toddler Play Area Banner');
                    if(temp_repo) {
                        this.pageBanner = temp_repo.images[0];
                    }
                    this.pageBanner = this.pageBanner;
                });
                next();
            },
            created(){
                this.loadData().then(response => {
                    this.currentPage = response[0].data;
                    var temp_repo = this.findRepoByName('Toddler Play Area Banner');
                    if(temp_repo) {
                        this.pageBanner = temp_repo.images[0];
                    }
                    this.pageBanner = this.pageBanner;
                });
            },
            watch: {
                currentPage () {
                    var temp_service = [];
                    _.forEach(this.currentPage.subpages, function(val, key) {
                        console.log("key", key)
                       var temp_val = {};
                       temp_val.title = val.title;
                       temp_val.text  = val.body;
                       temp_val.is_visible = false;
                       if(key == 0) {
                           temp_val.is_visible = true;
                       }
                       temp_val.id = "accord_"+ (key+1);
                       temp_service.push(temp_val);
                       
                    });
                    this.services = temp_service;
               }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findRepoByName'
                ])
            },
            methods: {
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/pinecentre-activity-programs.json"}),this.$store.dispatch("getData", "repos")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
            }
        });
    });
</script>