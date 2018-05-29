<template>
	<div id="find_us_container">
	    <div  v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')', marginBottom:'0px'}">
			<div class="site_container">
				<div class="header_content">
					<h1>Find Us</h1>
				</div>
			</div>
		</div>  
		<!-- for some reason if you do not put an outer container div this component template will not render -->
		<div class="site_container page_content">
			<div class="row text-center">
			    <div class="col-md-12">
			        <div class="padding_tb_30" v-if="currentPage" v-html="currentPage.body"></div>    
			    </div>
				<iframe title="Map" width="100%" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"  :src="'https://maps.google.nl/maps?q='+full_address  +'&amp;hl=en&amp;ie=UTF8&amp;t=v&amp;hnear='+full_address  +'&amp;z=17&amp;output=embed'"></iframe>
			</div>
			<div class="padding_top_40"></div>
		</div>
	</div>
</template>

<script>
    define(["Vue", "vuex", "vue-meta"], function(Vue, Vuex, Meta) {
        Vue.use(Meta);
        return Vue.component("find-us-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    success_subscribe: false,
                    currentPage: null,
                    pageBanner: null
                }
            },
            created(){
                this.loadData().then(response => {
                    var temp_repo = this.findRepoByName('Find Us Banner');
                    if(temp_repo) {
                        this.pageBanner = temp_repo.images[0];
                    }
                    this.currentPage = response[0].data;
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'findRepoByName'
                ]),
                full_address() {
                    var address = this.property.address1 +','+this.property.city +','+ this.property.country +','+this.property.province_state +','+this.property.province_state;
                    return address.replace(/ /g,"+");
                }
            },
            methods: {
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/pinecentre-find-us.json"}),this.$store.dispatch("getData", "repos")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                }
            }
        });
    });
</script>