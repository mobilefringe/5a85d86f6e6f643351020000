<template>
	<div v-if="dataloaded">
	    <div class="page_header" v-if="pageBanner" :style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<!--http://via.placeholder.com/1920x300-->
			<div class="site_container">
				<div class="header_content">
					<h1>{{$t("stores_page.map")}}</h1>
				</div>
			</div>
		</div>
		<div class="site_container">
			<div class="col-sm-4   padding_top_20">
                <div class="map_directory text-center hidden_phone">
<h2 style="display:none;" class="map_title caps">{{$t("stores_page.find_store")}}</h2>
                    <h3 class="map_title caps">{{$t("stores_page.find_store")}}</h3>
                    <div id="stores_container" class="directory_list text-left">
                        <li v-for="store in filteredStores" class="pointer">
							<p class="directory_store_name caps" v-on:click="dropPin(store)">{{store.name}}</p>
						</li>
                    </div>
                </div>
                <div class="visible_phone">
                    <p class="text_left">Find Store :</p>
					<div class="alphabet-dd visible_phone" >
					    <v-select :options="allStores" label="name" :searchable="false" :on-change="dropPin" id="mobile_alpha_list" :placeholder="$t('stores_page.select_a_store')"></v-select>
				    </div>
                </div>
            </div>
            <div class="col-sm-8">
            <div class=" map light_border">
				<!--<png-map ref="pngmap_ref" :png-map-url="getPNGurl" :initial-position="'1250 1250'" @updateMap="updatePNGMap"></png-map>-->
				<mapplic-png-map ref="pngmap_ref" :height="600" :hovertip="true" :storelist="allStores" :floorlist="floorList" :bindLocationOpened="true" :svgWidth="property.map_image_width" :svgHeight="property.map_image_height" :showPin="true"></mapplic-png-map>
			</div>
            </div>
		</div>
	</div>
</template>
<style>
	#png_map{
	    width:2501px;
		height: 2500px;
		min-width:2501px;
		min-height: 2500px;
	}
</style>
<script>
    define(["Vue", "vuex", "vue-select", "vue!search-component", "vue!mapplic-png-map"], function(Vue, Vuex, VueSelect, SearchComponent, MapplicComponent) {
        return Vue.component("map-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    filteredStores: null,
                    dataloaded: false,
                    storeBanner : null
                }
            },
            created (){
                this.loadData().then(response => {
                    this.dataloaded = true;
                    this.filteredStores = this.allStores;
                    
                    var temp_repo = this.findRepoByName('Stores Banner');
                    if(temp_repo) {
                        this.pageBanner = temp_repo.images[0];
                    }
                });
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'processedStores',
                    'processedCategories',
                    'storesByAlphaIndex',
                    'storesByCategoryName',
                    'findCategoryById',
                    'findCategoryByName',
                    'findRepoByName'

                ]),
                allStores() {
                    this.processedStores.map(function(store){
                        store.zoom = 1;
                    })
                    return this.processedStores;
                },
                getPNGurl() {
                    return "https://www.mallmaverick.com" + this.property.map_url;
                },
                pngMapRef() {
                    return this.$refs.pngmap_ref;
                },
                filterStores() {
                    letter = this.selectedAlpha;
                    if (letter == "All") {
                        this.filteredStores = this.allStores;
                    } else {
                        var filtered = _.filter(this.allStores, function(o, i) {
                            return _.lowerCase(o.name)[0] == _.lowerCase(letter);
                        });
                        this.filteredStores = filtered;
                    }
                },
                floorList () {
                    var floor_list = [];
                    
                    var floor_1 = {};
                    floor_1.id = "first-floor";
                    floor_1.title = "Floor 1";
                    floor_1.map = this.getPNGurl;
                    floor_1.z_index = 1;
                    floor_1.show = true;
                    
                    floor_list.push(floor_1);
                    return floor_list;
                }
                
            },
            methods: {
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData", "categories"), this.$store.dispatch("getData", "repos")]);
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                dropPin(store) {
                    this.pngMapRef.showLocation(store.id);
                }
            }
        });
    });
</script>