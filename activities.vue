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
            <div role="tablist" class="accordion">
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
                    text: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore VHS.",
                    services : [
                        {
                            title: "About Mall Walking",
                            text:   `Registration is FREE at the Guest Services Centre – it’s easy, safe and you can enjoy Pine Centre Mall all year round!
Mall Walking Hours and Access

Monday to Saturday – South Entrance open at 7:00am; remaining doors at 8:30am.Sunday – South Entrance open at 9am; remaining doors at 10:30 am.`,
                            is_visible : true,
                            id: "accordion_1"
                        },
                        {
                            title: "About Pine for Play - Toddlers Play Area",
                            text: `Pine for Play

Take off your shoes and relax with your child at our popular soft play area, located near the North Entrance/Guest Services.

The Toddler Play Area will be closed every day from 2:00pm – 2:30pm for scheduled cleaning. 

Why must my child wear socks in the Play Area?
Health regulations require that everyone in the Play Area must wear socks. Wearing socks is sanitary and prohibits the spread of foot diseases such as Athlete’s Foot and Plantar warts.  Socks also offer the safest method of play for the design and material of the play area.

Be prepared to play! Download (view or print) the Parent Acknowledgement and Rules & Regulations for your next visit! A blank window will open, which is normal. Closing the window will cancel the download.

The colourful Toddler Play Area has been themed to reflect our wildlife and recreational lifestyles and incorporates the communities of Prince George, Vanderhoof, Quesnel and Mackenzie (a map of this region has been included in the carpet layout). It complements our tribute to ‘Celebrate Northern Living’ and further enhances our strong ties to the families and residents of Prince George and the surrounding area.

Children under six years of age (and or under 42” in height) who are accompanied by a parent or guardian are invited to enjoy the play area. Children MUST be supervised at ALL times – no exceptions!

Caregiver groups (eg. child care providers, pre-school groups) please ask for ‘guidelines for caregiver groups’.

(Pine Centre Mall Youth & Children’s Policies are in full effect noting children twelve and under are NOT permitted in the mall OR the play area without a parent or legal guardian within arm’s reach at ALL times.)   

Pine Centre follows the age guidelines as set by the Canadian Child Welfare Research Group.

The following Rules and Regulations apply:

Parent or guardian MUST SIGN-IN at the Customer Service Centre prior to entering.
Playtime periods may be limited to thirty minutes during peak times.
Adults, guardians and children MUST remove footwear. NO bare feet or shoes allowed. Socks in two different sizes are available in a nearby dispenser for $1 per pair.
NO food or drinks are allowed in the toddler play area – exceptions are made for breastfeeding and baby-held bottle feeding. Should any leaks or spills occur please notify Customer Service immediately. This rule does NOT allow for young children to walk around with a bottle or lidded cup in the play area.
Play safely. NO running, jumping, hitting, pushing or ANY other unsafe play.
Child(ren) MUST NOT stand on the outer edge seating at any time.
NO yelling, screaming or swearing. Use of profanities WILL NOT be tolerated.    Children are asked to use their “inside voice” in consideration of the other parents and children and the retailers located close by.
The number of visitors at any particular time may be limited to twenty– for safety and comfort reasons.
Any child(ren) exhibiting cold or flu-like symptoms (or any other ‘contagious’ condition(s)) may be refused access to the play area.
NO changing of diapers in the play area. Change tables are provided in the Family Room in the Food Court or in either of the Women’s Washrooms.
Child(ren) MUST BE closely supervised by an adult at all times while in the Toddler Play Area. DO NOT leave child(ren) unattended at ANY time for ANY reason. Parents and or guardians are fully responsible for supervising the child(ren) they have signed in and acknowledge that they play at their own risk.
While every consideration has been given for safety and convenience, Pine Centre is not responsible for injuries or lost articles.
Pine Centre reserves the right to refuse access to the play area if these rules are not observed.
For rule details or assistance please see the Customer Service Centre.

Please follow the rules to ensure that everyone can have a great time!`,
                            is_visible : false,
                            id: "accordion_2"
                        }
                        ]
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