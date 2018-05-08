<template>
    <div class="page_container" id="contact_us_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<!--http://via.placeholder.com/1920x300-->
			<div class="site_container">
				<div class="header_content">
					<!--<h1>Kids PinE-Club</h1>-->
					<h1 v-if="locale=='en-ca'">{{currentPage.title}}</h1>
					<h1 v-else>{{currentPage.title_2}}</h1>
				</div>
			</div>
		</div>
        <div class="site_container">
            <div class="row text-left">
                <div class="col-sm-12">
                    <div v-if="currentPage" v-html="currentPage.body"></div>
                </div>
            </div> 
            <div class="row"> 
                <div class="col-sm-12 contest_contents">
                    <form id="strollers_n_boots" class="form-horizontal padding_top_20 js-cm-form" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
                        <div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('first_name')}">
								<label class="label" for="first_name">First Name <span class="req_star"> *</span></label>
								<input v-model="form_data.first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="first name" id="first_name">
								<span v-show="errors.has('first_name')" class="form-control-feedback">{{ errors.first('first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('last_name')}">
								<label class="label" for="last_name">Last Name <span class="req_star"> *</span></label>
								<input v-model="form_data.last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="last name" id="last_name">
								<span v-show="errors.has('last_name')" class="form-control-feedback">{{ errors.first('last_name') }}</span>
							</div>
							<div>
							    <label class="label" for="cm-name" style="display:none;">Full Name</label>
								<input class="form-control" name="cm-name" type="hidden" :value="form_data.first_name + ' ' + form_data.last_name" id="cm-name">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Email <span class="req_star"> *</span></label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control js-cm-email-input" :class="{'input': true}" name="cm-ziyirj-ziyirj" type="email" placeholder="Email" data-vv-delay="500" data-vv-as="email" id="email">
								<span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}" >
								<label class="label" for="phone">Phone Number <span class="req_star"> *</span></label>
								<input v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-ajhhyi" type="text" placeholder="Phone number" data-vv-delay="500" data-vv-as="phone" id="phone">
								<span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
							</div>
						</div>
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('emerg_name')}">
								<label class="label" for="emerg_name"> Emergency Contact Name <span class="req_star"> *</span></label>
								<input v-model="form_data.emergency_full_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-ajhhyd" type="text" placeholder="Emergency Contact Ful Name" data-vv-delay="500" data-vv-as="emergency contact name" id="emerg_name">
								<span v-show="errors.has('emerg_name')" class="form-control-feedback">{{ errors.first('emerg_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('emergency_phone')}" >
								<label class="label" for="emergency_phone">Emergency Contact Number <span class="req_star"> *</span></label>
								<input v-model="form_data.emergency_phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-ajhhyh" type="text" placeholder="Phone number" data-vv-delay="500" data-vv-as="emergency contact phone">
								<span v-show="errors.has('emergency_phone')" class="form-control-feedback">{{ errors.first('emergency_phone') }}</span>
							</div>
						</div>
						<p>RISK OF INJURY: Persons entering upon the premises of the Centre for the purpose of being a registered member of the Pine Centre Strollers n’ Booties Club, do so at their own risk. Neither the Centre, nor any of its owners, their beneficiaries, merchants or agents shall have any liability for injury. We advise all registered walkers to check with their physician to see if walking at Pine Centre Mall is right for you.</p>
						
						<div class="form-group account-btn text-left m-t-10 agreement">
						    
							<div class="col-xs-12" style="margin-top: 20px;">
								<button class="contest_btn" type="submit" :disabled="formSuccess">Submit</button>
							</div>
						</div>
					</form>
                    
                    <div id="send_contact_success" class="alert alert-success text-left" role="alert" v-show="formSuccess" style="margin-top: 20px;">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Thank you for contacting us. A member from our team will contact you shortly.
                    </div>
                    <div id="send_contact_error" class="alert alert-danger text-left" role="alert" v-show="formError" style="margin-top: 20px;">
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


<script>
    define(["Vue", "vuex", "axios", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate', "v-calendar", 'utility', 'vue-checkbox-radio', 'jquery'], function(Vue, Vuex,axios, moment, tz, VueMoment, Meta, VeeValidate, VCalendar, Utility, CheckboxRadio, $) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        Vue.use(VCalendar.default);
        Vue.use(CheckboxRadio.default);
        return Vue.component("strollers_n_boots", {
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
                    currentPage : null
                }
            },
            created() {
                this.loadData().then(response => {
                    this.currentPage = response[0].data;
                    this.currentContest = this.findContestBySlug('pinecentre-kids-pine-club');
                    // /pages/pinecentre-stroller-s-n-boots
                    var temp_repo = this.findRepoByName('Strollers N Booties Banner');
                    if(temp_repo) {
                        this.pageBanner = temp_repo.images[0];
                    }
                    this.pageBanner = this.pageBanner;
                });
            },
            mounted() {
                //creating random validation num 
                this.correctValNum = Utility.rannumber();
                
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
                        console.log("errors",errors);
                        if(errors && errors.items.length == 0){
                            //format contests data for MM
                            var contact_form = {};
                            contact_form.subject = "STROLLER'S N BOOTS Form Submission";
                            contact_form.full_name = this.form_data.first_name + " " + this.form_data.last_name;
                            contact_form.email = this.form_data.email;
                            contact_form.phone = this.form_data.phone;
                            contact_form.emergency_contact_full_name = this.form_data.emergency_full_name;
                            contact_form.emergency_contact_number = this.form_data.emergency_phone ;
                            contact_form.message = " ";
                            
                            send_data = {};
                            send_data.form_data = JSON.stringify(Utility.serializeObject(contact_form));
                            this.$store.dispatch("CONTACT_US", send_data).then(res => {
                               
                                this.campaignMonitorCall($('#strollers_n_boots'), '92D4C54F0FEC16E5ADC2B1904DE9ED1AAD1392F316DD491929CA23AF594D72E33CFB0988479D66DB68BB2A82FE91D516A54BE4EDF9C6ED9A7CBF308B5551F864', $('#send_contact_success'), this.form_data);
                                this.formSuccess = true;
                                
                            }).catch(error => {
                                try {
                                    if (error.response.status == 401) {
                                        console.log("Data load error: " + error.message);
                                        this.formError = true;
                                    } 
                                    else {
                                        console.log("Data load error: " + error.message);
                                        this.formError = true;
                                    }
                                } 
                                catch (e) {
                                    console.log("Data load error: " + error.message);
                                    this.formError = true;
                                }
                            });
                        }
                    });
                },
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "	/pages/pinecentre-stroller-s-n-boots.json"}), this.$store.dispatch("getData", "contests"),this.$store.dispatch("getData", "repos")]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                campaignMonitorCall(form, form_data_id, successMessage, cm_form_dets) {
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
                                    vm.campaignResponse(subscribeRequest, successMessage);
                                }
                            } else {
                                vm.campaignResponse(tokenRequest, successMessage);
                            }
                        }
                    }
                },
                campaignResponse (request, successMessage) {
                    if (request.readyState === 4) {
                        if (_.includes(request.response, 'Thank You')) {
                            successMessage.show('slow');
                        } else {
                            form.prepend('<p class="error">' + config.errorMessage + '</p>');
                        }
                    }
                }
            }
        });
    });
</script>