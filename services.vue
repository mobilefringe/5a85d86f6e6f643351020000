<template>
    <div v-if="currentPage">
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1 v-if="locale=='en-ca'">{{currentPage.title}}</h1>
					<h1 v-else>{{currentPage.title_2}}</h1>
					<h2 style="display:none;">Scroll to read details</h2>
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
        return Vue.component("services-component", {
            template: template, // the variable template will be injected,
            data: function() {
                return {
                    success_subscribe: false,
                    currentPage: null,
                    pageBanner : null,
                    services : []
//                     [
//                         {
//                             title: "Strollers, Wheelchairs and Power Scooters",
//                             text: " For your shopping convenience, Toddler Strollers are available at Guest Services for FREE.   Some strollers can accommodate two children.    There is no charge to use the strollers but current photo ID is required as a deposit. Do you need some assistance getting around? Then visit the Guest Services for FREE use of a wheelchair or power scooter during your visit to Pine Centre.*you will need to leave a piece of photo identification with customer service until you return the wheelchairs and/or strollers.",
//                             is_visible : true,
//                             id: "accordion_1"
//                         },
//                         {
//                             title: "Locker Storage",
//                             text: ` For your shopping convenience, coin operated lockers are now available and located down the hallway with the pay phones near Guest Services. They are available for a small fee of $2 per use.
// Please review the Locker Usage Rules & Regulations located below and on the inside door of each locker.

// 1. Lockers are available to our shoppers for their convenience while at Pine Centre.
// 2. There is a $2.00 fee per use (noting once you open your locker, you will be required to insert an additional $2.00 to re-use).
// 3. Lockers are available during Pine Centre shopping hours only and will be emptied daily at closing times.
// 4. Please ensure that you collect all of your belongings at the end of your visit.
// 5. Any items left at the end of the day will be considered ‘lost’ and recorded and handled as per our ‘Lost and Found Policy’.
// 6. Lockers are meant to store jackets, shopping bags and other personal items that cannot be managed while shopping.
// 7. Pine Centre Mall is NOT responsible for any lost or stolen items.
// 8. Any misuse of lockers including vandalism, storage of illegal items, or storage of items that are ‘perishable’ in nature or otherwise unsuitable for storage, may result in legal action.
// 9. It is important to note that this area is under video surveillance and activities may be recorded.
// 10. Please see the Guest Services to claim any items left behind, report damaged lockers or request additional information about our Lost & Found Policy or Video Surveillance Policy or call 250 563 3681.
// 11. There is a $10 replacement fee for lost keys.`,
//                             is_visible : false,
//                             id: "accordion_2"
//                         }, 
//                         {
//                             title: "Community Booking",
//                             text: `Would you like to promote your charity or non-profit at Pine Centre? Contact Shelley Sivell at 250 563 3681 ext. 22 at to book a table or event or to display your brochure at Guest Services.  Download the <a href="//www.mallmaverick.com/system/site_images/photos/000/036/937/original/jan2016Pine-Centre-Use-of-Premises-Application.pdf?1519147526">Use of Premises Booking Form here.</a>`,
//                             is_visible : false,
//                             id: "accordion_3"
//                         },
//                          {
//                             title: "Lost and Found",
//                             text: `If you have lost or found an item during your visit to Pine Centre, please contact Guest Services immediately. Lost and found items will be held for a maximum of thirty (30) days. If you have lost something, please be sure to leave your name and phone number with our Guest Service Representatives so that we can contact you if your item(s) are found. We cannot guarantee the safe return of your item(s), but will do our best!`,
//                             is_visible : false,
//                             id: "accordion_4"
//                         },
//                         {
//                             title: "Wifi Access and Wifi Terms and Conditions",
//                             text: `FREE Wifi is available in select areas of the main mall. The strongest signals can be found in the following locations:
// Toddler Play Area / Guest Services
// Food Court / Centre Court
// South Entrance Junction
// Use is limited to a thirty (30) minute session, thereby, the user would need to sign-in again for further use. Users must agree to the Terms and Conditions. <a href="//www.mallmaverick.com/system/site_images/photos/000/036/937/original/jan2016Pine-Centre-Use-of-Premises-Application.pdf?1519147526">Use of Premises Booking Form here.</a>`,
//                             is_visible : false,
//                             id: "accordion_5"
//                         }
//                         ]
                }
            },
            props:['id', 'locale'],
            beforeRouteUpdate(to, from, next) {
                this.loadData().then(response => {
                    this.currentPage = response[0].data;
                    var temp_repo = this.findRepoByName('Services Banner');
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
                    var temp_repo = this.findRepoByName('Services Banner');
                    if(temp_repo) {
                        this.pageBanner = temp_repo.images[0];
                    }
                    this.pageBanner = this.pageBanner;
                });
                console.log("services", this.services)
            },
            watch: {
                currentPage () {
                    // _.forEach(this.currentPage.subpages, function(val, key) {
                    //     val.is_visible = false;
                    //     if(key == 0) {
                    //       val.is_visible = true;
                    //     }
                    //     val.accord_id = "accord_"+val.id;
                    // });
                    // this.services = this.currentPage.subpages;
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
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/pinecentre-services-available.json"}),this.$store.dispatch("getData", "repos")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
            }
        });
    });
</script>