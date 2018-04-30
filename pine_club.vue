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
                    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Thank you for subscribing to PinE-club!
                    </div>
                    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your request. Please try again later.
                    </div>
                    <form class="form-horizontal js-cm-form" id="subForm" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('first_name')}">
								<label class="label" for="first_name">First Name <span class="req_star"> *</span></label>
								<input v-model="form_data.name" name="cm-name" type="hidden" id="fieldName">
								<input v-model="form_data.first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="first name" required>
								<span v-show="errors.has('first_name')" class="form-control-feedback">{{ errors.first('first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('last_name')}">
								<label class="label" for="last_name">Last Name <span class="req_star"> *</span></label>
								<input v-model="form_data.last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="last name" required>
								<span v-show="errors.has('last_name')" class="form-control-feedback">{{ errors.first('last_name') }}</span>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('cm-zlyluu-zlyluu')}">
								<label class="label" for="cm-zlyluu-zlyluu">Email <span class="req_star"> *</span></label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control js-cm-email-input" :class="{'input': true}" name="cm-zlyluu-zlyluu" type="email" placeholder="Email" data-vv-delay="500" data-vv-as="email" id="newsletter_email">
								<span v-show="errors.has('cm-zlyluu-zlyluu')" class="form-control-feedback">{{ errors.first('cm-zlyluu-zlyluu') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('cm-f-qhdikl')}">
								<label class="label" for="cm-f-qhdikl">Postal Code <span class="req_star"> *</span></label>
								<input v-model="form_data.postal_code" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-qhdikl" type="text" placeholder="Postal Code" data-vv-delay="500" data-vv-as="postal code" required>
								<span v-show="errors.has('cm-f-qhdikl')" class="form-control-feedback">{{ errors.first('cm-f-qhdikl') }}</span>
							</div>
							
						</div>
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('cm-f-qhdikk')}" >
								<label class="label" for="cm-f-qhdikk">Birthday <span class="req_star"> *</span></label>
								<input v-model="form_data.birthday" class="form-control" v-validate="'required|date_format:DD/MM/YYYY'" :class="{'input': true}" name="cm-f-qhdikk" type="text" placeholder="dd/mm/yyyy" data-vv-delay="500" data-vv-as="birthday" required>
								<span v-show="errors.has('cm-f-qhdikk')" class="form-control-feedback">{{ errors.first('cm-f-qhdikk') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('cm-f-qhdikh')}">
								<label class="label" for="cm-f-qhdikh">Gender <span class="req_star"> *</span></label>
								<radio name="cm-f-qhdikh" value="male" v-model="form_data.gender" required>Male</radio>
                                <radio name="cm-f-qhdikh" value="female" v-model="form_data.gender" required>Female</radio>
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
                
                if(this.$route.query.success == 'success') {
                    this.formSuccess = true;
                    this.$router.replace('/pine_club');
                }
            },
            watch : {
                $route () {
                    this.form_data.email = this.$route.query.email;
                    $("#newsletter_email").val(this.form_data.email);
                    
                    if(this.$route.query.success == 'success') {
                        this.formSuccess = true;
                    }
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
                validateBeforeSubmit(form) {
                    this.$validator.validateAll().then((result) => {
                        let errors = this.errors;
                        if(errors && errors.items.length == 0){ 
                            if(errors.length > 0) {
                                console.log("Error");
                                this.formError = true;
                                form.preventDefault();
                                form.target.action = "";
                            }
                            else {
                                // $("#fieldName").val(this.form_data.first_name + " " + this.form_data.last_name);
                                // form.preventDefault();
                                // console.log("No Error", form);
                                // var vm = this;
                                // $.getJSON(
                                //     form.target.action ,
                                //     $(form.target).serialize(),
                                //     function (data) {
                                //     if (data.Status === 400) {
                                //       vm.formError = true;
                                //         console.log("ERROR");
                                //     } else { // 200
                                //         vm.formSuccess = true;
                                //         console.log("SUCCESS");
                                //     }
                                // });
                                this.campaignMonitorCall($('#subForm'), '92D4C54F0FEC16E5ADC2B1904DE9ED1A2424A7FAF2895AE27BC1E6B945831C3A814668D6DF314C6CFD5AD436FBA4357E38F8203633B221924D53F47AEFF534B1');
                                form.preventDefault();
                            }
                        }
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
                campaignMonitorCall(form, form_data_id) {
                    // Get e-mail value.
                    var vm = this;
                    email = $('input[type=email]', form).val();
        
                    // Build request data for tokenRequest.
                    request_data = "email=" + encodeURIComponent(email) + "&data=" + form_data_id;
        
                    // Prepare tokenRequest.
                    tokenRequest = new XMLHttpRequest();
                    tokenRequest.open('POST', 'https://createsend.com//t/getsecuresubscribelink', true);
                    tokenRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    tokenRequest.send(request_data);
        
                    // Ready state.
                    tokenRequest.onreadystatechange = function() {
                        if (this.readyState === 4) {
                            if (this.status === 200) {
                                // Having token and new submit url we can create new request to subscribe a user.
                                subscribeRequest = new XMLHttpRequest();
                                subscribeRequest.open('POST', this.responseText, true);
                                subscribeRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                subscribeRequest.send(form.serialize());
                                // On ready state call response function.
                                subscribeRequest.onreadystatechange = function() {
                                    if (subscribeRequest.readyState === 4) {
                                        if (_.includes(subscribeRequest.response, 'Thank You')) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                }
                            } else {
                                return false;
                            }
                        }
                    }
                }
            }
        });
    });
</script>