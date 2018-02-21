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
        return Vue.component("activities-component", {
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
                            text: `
<p><strong>Pine for Play</strong></p>

<p>Take off your shoes and relax with your child at our&nbsp;popular&nbsp;soft play area, located near the North Entrance/Guest Services.</p>

<p><em>The Toddler Play Area will be closed every day from 2:00pm &ndash; 2:30pm for&nbsp;scheduled&nbsp;cleaning.&nbsp;</em></p>

<p><strong>Why must my child wear socks in the Play Area?</strong><br />
Health regulations require that everyone in the Play Area must wear socks. Wearing socks is sanitary and prohibits the spread of foot diseases such as Athlete&rsquo;s Foot and Plantar warts. &nbsp;Socks also offer the safest method of play for the design and material of the play area.</p>

<p>Be prepared to play!&nbsp;<a href="http://pinecentre.com/wp-content/uploads/Childrens-Play-Area-Rules-Regulations-8-24-13-Revised.pdf" style="color: rgb(94, 94, 94); font-weight: bold; text-decoration-line: none;" target="_blank"><span>Download&nbsp;</span></a>(view or print) the Parent Acknowledgement and Rules &amp; Regulations for your next visit!&nbsp;<em>A blank window will open, which is normal. Closing the window will cancel the download.</em></p>

<p>The colourful Toddler Play Area has been themed to reflect our wildlife and recreational lifestyles and incorporates the communities of Prince George, Vanderhoof, Quesnel and Mackenzie (a map of this region has been included in the carpet layout). It complements our tribute to &lsquo;Celebrate Northern Living&rsquo; and further enhances our strong ties to the families and residents of Prince George and the surrounding area.</p>

<p>Children under&nbsp;six years of age (and or under 42&rdquo; in height) who are accompanied by a parent or guardian are invited to enjoy the&nbsp;play area. Children MUST be supervised at ALL times &ndash; no exceptions!</p>

<p>Caregiver groups (eg. child care providers, pre-school groups) please ask for &lsquo;guidelines for caregiver groups&rsquo;.</p>

<p><em>(Pine Centre Mall Youth &amp; Children&rsquo;s Policies are in full effect noting children twelve and under&nbsp;are NOT permitted in the mall OR the play area without a parent or legal guardian within arm&rsquo;s reach at ALL times.)&nbsp;&nbsp;&nbsp;</em></p>

<p><em>Pine Centre follows the age guidelines as set by the&nbsp;<a href="http://www.cwrp.ca/" style="color: rgb(94, 94, 94); font-weight: bold; text-decoration-line: none;" target="_blank">Canadian Child Welfare Research Group.</a></em></p>

<p><strong>The following Rules and Regulations apply</strong>:</p>

<ul>
	<li>Parent or guardian&nbsp;<strong>MUST SIGN-IN</strong>&nbsp;at the Customer Service Centre prior to entering.</li>
	<li>Playtime periods may be limited to thirty&nbsp;minutes during peak times.</li>
	<li>Adults, guardians and children&nbsp;<strong>MUST</strong>&nbsp;remove footwear.&nbsp;<strong>NO</strong>&nbsp;bare feet or shoes allowed.&nbsp;<em>Socks in two different sizes are available in a nearby dispenser for $1 per pair.</em></li>
	<li><strong>NO&nbsp;</strong>food or drinks are allowed in the toddler play area &ndash; exceptions are made for breastfeeding and baby-held bottle feeding. Should any leaks or spills occur please notify Customer Service immediately. This rule does&nbsp;<strong>NOT&nbsp;</strong>allow for young children to walk around with a bottle or lidded cup in the play area.</li>
	<li>Play safely.&nbsp;<strong>NO</strong>&nbsp;running, jumping, hitting, pushing or ANY other unsafe play.</li>
	<li>Child(ren)&nbsp;<strong>MUST NOT</strong>&nbsp;stand on the outer edge seating at any time.</li>
	<li><strong>NO</strong>&nbsp;yelling, screaming or swearing. Use of profanities&nbsp;<strong>WILL NOT</strong>&nbsp;be tolerated.&nbsp;&nbsp;&nbsp; Children are asked to&nbsp;use their&nbsp;&ldquo;inside voice&rdquo; in consideration of the other parents and children and the&nbsp;retailers located close by.</li>
	<li>The number of visitors at any particular time may be limited to twenty&ndash; for safety and comfort reasons.</li>
	<li>Any child(ren) exhibiting cold or flu-like symptoms (or any other &lsquo;contagious&rsquo; condition(s)) may be refused access to the play area.</li>
	<li><strong>NO</strong>&nbsp;changing of diapers in the play area. Change tables are provided in the Family Room in the Food Court or&nbsp;in either&nbsp;of the Women&rsquo;s Washrooms.</li>
	<li>Child(ren)&nbsp;<strong>MUST BE</strong>&nbsp;closely supervised by an adult at all times while in the Toddler Play Area.&nbsp;<strong>DO NOT</strong>&nbsp;leave child(ren) unattended at ANY time for ANY reason. Parents and or guardians are fully responsible for supervising the child(ren) they have signed in and acknowledge that they play at their own risk.</li>
	<li>While every consideration has been given for safety and convenience, Pine Centre is not responsible for injuries or lost articles.</li>
	<li>Pine Centre reserves the right to refuse access to the play area if these rules are not observed.</li>
</ul>

<p>For rule details or assistance please see the Customer Service Centre.</p>

<p>Please follow the rules to ensure that everyone can have a great time!</p>`,
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