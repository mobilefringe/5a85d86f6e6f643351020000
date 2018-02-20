<template>
    <div v-if="currentPage">
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<!--http://via.placeholder.com/1920x300-->
			<div class="site_container">
				<div class="header_content">
					<h1 v-if="locale=='en-ca'">{{currentPage.title}}</h1>
					<h1 v-else>{{currentPage.title_2}}</h1>
				</div>
			</div>
		</div>
		<div class="site_container inside_page_content">
            <div class="" >
                <div class="page_body description_text text_left" v-if="locale=='en-ca'" v-html="currentPage.body"></div>
                <div class="page_body description_text text_left" v-else v-html="currentPage.body_2"></div>
            </div>
            <div role="tablist">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion1 variant="info">Strollers, Wheelchairs and Power Scooters</b-btn>
                    </b-card-header>
                    <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <p class="card-text">
                                I start opened because <code>visible</code> is <code>true</code>
                            </p>
                            <p class="card-text">
                                For your shopping convenience, Toddler Strollers are available at Guest Services for FREE.   Some strollers can accommodate two children.    There is no charge to use the strollers but current photo ID is required as a deposit.
Do you need some assistance getting around? Then visit the Guest Services for FREE use of a wheelchair or power scooter during your visit to Pine Centre.

*you will need to leave a piece of photo identification with customer service until you return the wheelchairs and/or strollers.
                            </p>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion2 variant="info">Locker Storage</b-btn>
                    </b-card-header>
                    <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <p class="card-text">
                              For your shopping convenience, coin operated lockers are now available and located down the hallway with the pay phones near Guest Services. They are available for a small fee of $2 per use.
Please review the Locker Usage Rules & Regulations located below and on the inside door of each locker.

1. Lockers are available to our shoppers for their convenience while at Pine Centre.
2. There is a $2.00 fee per use (noting once you open your locker, you will be required to insert an additional $2.00 to re-use).
3. Lockers are available during Pine Centre shopping hours only and will be emptied daily at closing times.
4. Please ensure that you collect all of your belongings at the end of your visit.
5. Any items left at the end of the day will be considered ‘lost’ and recorded and handled as per our ‘Lost and Found Policy’.
6. Lockers are meant to store jackets, shopping bags and other personal items that cannot be managed while shopping.
7. Pine Centre Mall is NOT responsible for any lost or stolen items.
8. Any misuse of lockers including vandalism, storage of illegal items, or storage of items that are ‘perishable’ in nature or otherwise unsuitable for storage, may result in legal action.
9. It is important to note that this area is under video surveillance and activities may be recorded.
10. Please see the Guest Services to claim any items left behind, report damaged lockers or request additional information about our Lost & Found Policy or Video Surveillance Policy or call 250 563 3681.
11. There is a $10 replacement fee for lost keys.
                            </p>
                        </b-card-body>
                    </b-collapse>
                </b-card>
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-btn block href="#" v-b-toggle.accordion3 variant="info">Accordion 3</b-btn>
                    </b-card-header>
                    <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <p class="card-text">
                               Would you like to promote your charity or non-profit at Pine Centre? Contact Shelley Sivell at 250 563 3681 ext. 22 at to book a table or event or to display your brochure at Guest Services.  Download the <a href="//www.mallmaverick.com/system/site_images/photos/000/036/937/original/jan2016Pine-Centre-Use-of-Premises-Application.pdf?1519147526">Use of Premises Booking Form here.</a>
                            </p>
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
                    text: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore VHS.",
                    services : []
                }
            },
            props:['id', 'locale'],
            beforeRouteUpdate(to, from, next) {
                this.loadData().then(response => {
                    this.currentPage = response[0].data;
                    var temp_repo = this.findRepoByName('Pages Banner');
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
                    var temp_repo = this.findRepoByName('Pages Banner');
                    if(temp_repo) {
                        this.pageBanner = temp_repo.images[0];
                    }
                    this.pageBanner = this.pageBanner;
                });
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