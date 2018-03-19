<template>
    <div class="page_container" id="contact_us_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<!--http://via.placeholder.com/1920x300-->
			<div class="site_container">
				<div class="header_content">
					<h1>PinE-Club</h1>
				</div>
			</div>
		</div>
        <div class="site_container">
            <div class="row text-center">
                </div> 
            <div class="row"> 
                <div class="col-sm-12 contest_contents">
                    <div class="description_text text_left" style="padding-top:40px;padding-bottom: 20px;">
                       Get connected.. by joining the PinE-CLUB you receive exclusive offers and contests direct to your inbox.  As a member, you will receive PinE-CLUB Newsletters with upcoming events, contests and promotions that you will not want to miss!  We give away concert tickets, Gift Cards and more to our members – all you have to do is sign up!
                    </div>
                    <form class="form-horizontal js-cm-form" id="subForm" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="92D4C54F0FEC16E5ADC2B1904DE9ED1A6C853307DE1968F369EC40BE733D4D5F8458A5E09D247F6F2E7016EB4DAFD16534D29AAD20BB67ACEC9E0FEFEEEEA5A2" @submit.prevent="validateBeforeSubmit">
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('first_name')}">
								<label class="label" for="first_name">First Name <span class="req_star"> *</span></label>
								<input v-model="form_data.first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="first name">
								<span v-show="errors.has('first_name')" class="form-control-feedback">{{ errors.first('first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('last_name')}">
								<label class="label" for="last_name">Last Name <span class="req_star"> *</span></label>
								<input v-model="form_data.last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="last name">
								<span v-show="errors.has('last_name')" class="form-control-feedback">{{ errors.first('last_name') }}</span>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Email <span class="req_star"> *</span></label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="500" data-vv-as="email" id="newsletter_email">
								<span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('postal')}">
								<label class="label" for="postal">Postal Code <span class="req_star"> *</span></label>
								<input v-model="form_data.postal_code" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="postal" type="text" placeholder="Postal Code" data-vv-delay="500" data-vv-as="postal code">
								<span v-show="errors.has('postal')" class="form-control-feedback">{{ errors.first('postal') }}</span>
							</div>
							
						</div>
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('birthday')}" >
								<label class="label" for="birthday">Birthday <span class="req_star"> *</span></label>
								<input v-model="form_data.birthday" class="form-control" v-validate="'required|date_format:DD/MM/YYYY'" :class="{'input': true}" name="birthday" type="text" placeholder="dd/mm/yyyy" data-vv-delay="500" data-vv-as="birthday">
								<span v-show="errors.has('birthday')" class="form-control-feedback">{{ errors.first('birthday') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('gender')}">
								<label class="label" for="gender">Gender <span class="req_star"> *</span></label>
								<radio name="gender" value="male" v-model="form_data.gender">Male</radio>
                                <radio name="gender" value="female" v-model="form_data.gender">Female</radio>
                                <span v-if="genderError" class="form-control-feedback">Please choosed a gender</span>
							</div>
						</div>
						<div class="form-group account-btn text-left m-t-10 agreement">
						    <div class="col-xs-12">
						        <label class="checkbox">
                                    <input name="agree_terms" required type="checkbox" >
                                     Yes, I would like to receive ongoing news related to events, promotions and special announcements from {{property.name}}
                                </label>
						    </div>
							<div class="col-xs-12" style="margin-top: 20px;">
								<button class="contest_btn" type="submit" :disabled="formSuccess">Submit</button>
							</div>
						</div>
					</form>
                    
                    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Thank you for subscribing to Kids PinE-club!
                    </div>
                    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your request. Please try again later.
                    </div>
                    
                </div>
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>

<style>
    #contact_us_container .row{
        margin-left:inherit;
    }
    .contest_contents {
        min-height: 700px;
    }
    /*.form-group [class*="col-"] {*/
    /*    padding-top:0;    */
    /*}*/
    .form-group .form-control-feedback{
        font-size: 12px;
        /*top:60px;*/
        color: #F44336;
        top: initial;
        bottom: -27px;
    }
    .popover-container input {
        margin-top: 10px;
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    }
    .agreement.form-group {
        margin:0;   
    }
    .checkbox {
        font-weight: normal;
    }
    .radio-component>input+label>.input-box {
        width: 15px!important;
        height: 15px!important;
        vertical-align: initial!important;
    }
</style>

<script>
    define(["Vue", "vuex", "axios", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate', "v-calendar", 'utility', 'vue-checkbox-radio'], function(Vue, Vuex,axios, moment, tz, VueMoment, Meta, VeeValidate, VCalendar, Utility, CheckboxRadio) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        Vue.use(VCalendar.default);
        Vue.use(CheckboxRadio.default);
        return Vue.component("pine-club-component", {
            template: template, // the variable template will be injected
            props:['locale'],
            data: function() {
                return {
                    form_data: {},
                    formSuccess: false,
                    formError: false,
                    validaNum: '',
                    correctValNum: null,
                    validNumError: false,
                    currentContest: null,
                    pageBanner: null,
                    genderError : false,
                }
            },
            created() {
                this.loadData().then(response => {
                    this.currentContest = this.findContestBySlug('pinecentre-kids-pine-club');
                    var temp_repo = this.findRepoByName('Pine Club Banner');
                    if(temp_repo) {
                        this.pageBanner = temp_repo.images[0];
                    }
                    this.pageBanner = this.pageBanner;
                });
            },
            mounted () {
                this.form_data.email = this.$route.query.email;
                $("#newsletter_email").val(this.form_data.email);
            },
            watch : {
                $route () {
                    this.form_data.email = this.$route.query.email;
                    $("#newsletter_email").val(this.form_data.email);
                }
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                    'findContestBySlug',
                    'findRepoByName'
                ]),
            },
            methods: {
                validateBeforeSubmit() {
                    if(this.form_data.gender == null || this.form_data.gender == undefined || this.form_data.gender.length == 0){
                        this.genderError = true;
                    }
                    this.$validator.validateAll().then((result) => {
                        let errors = this.errors;
                        if(this.form_data.agree_newsletter ) {
                            $.getJSON("//mobilefringe.createsend.com/t/d/s/zlyluu/?callback=?",
                            "cm-name=" + this.form_data.first_name + this.form_data.last_name +
                            "&cm-zlyluu-zlyluu=" + this.form_data.email +
                            "&cm-f-jtukyu=" + this.form_data.city+
                            "&cm-f-jtukjr=" + this.form_data.phone +
                            "&cm-f-jtukjy=" + this.form_data.mailing_address +
                            "&cm-f-jtukjj=" + this.form_data.postal_code +
                            "&cm-f-jtukjt=" + this.form_data.birthday,
                                function (data) {
                                if (data.Status === 400) {
                                    e.preventDefault();
                                    console.error("Please try again later.");
                                } else { // 200
                                    console.log("Newsletter submission successful.");
                                }
                            });  
                        }
                        //format contests data for MM
                        // var contest_entry = {};
                        // contest_entry.contest = this.form_data;
                        // var vm = this;
                        // host_name = this.property.mm_host.replace("http:", "");
                        // var url = host_name + "/contests/" + this.currentContest.slug + "/create_js_entry";
                        // $.ajax({
                        //     url: url,
                        //     type: "POST",
                        //     data: contest_entry,
                        //     success: function(data) {
                        //         vm.formSuccess = true;
                        //     },
                        //     error: function(data){
                        //         vm.formError = true;
                        //     }
                        // });
                    })
                },
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch("getData", "contests"),this.$store.dispatch("getData", "repos")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
            }
        });
    });
</script>