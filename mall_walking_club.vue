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
                    <form id="walking_club" class="form-horizontal padding_top_20 js-cm-form" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
                        <div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('first_name')}">
								<label class="label" for="first_name">First Name <span class="req_star"> *</span></label>
								<input v-model="form_data.first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="guardian's first name">
								<span v-show="errors.has('first_name')" class="form-control-feedback">{{ errors.first('first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('last_name')}">
								<label class="label" for="last_name">Last Name <span class="req_star"> *</span></label>
								<input v-model="form_data.last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="guardian's last name">
								<span v-show="errors.has('last_name')" class="form-control-feedback">{{ errors.first('last_name') }}</span>
							</div>
							<div>
								<input class="form-control" name="cm-name" type="hidden" :value="form_data.first_name + ' ' + form_data.last_name">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Email <span class="req_star"> *</span></label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control js-cm-email-input" :class="{'input': true}" name="cm-ziuddl-ziuddl" type="email" placeholder="Email" data-vv-delay="500" data-vv-as="email">
								<span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}" >
								<label class="label" for="phone">Phone Number <span class="req_star"> *</span></label>
								<input v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-attkhk" type="text" placeholder="Phone number" data-vv-delay="500" data-vv-as="phone">
								<span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('mailing_address')}"  style="padding-top: 20px;">
								<label class="label" for="mailing_address">Mailing Address <span class="req_star"> *</span></label>
								<input v-model="form_data.mailing_address" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-attkhu" type="text" placeholder="Mailing Address" data-vv-delay="500" data-vv-as="mailing address">
								<span v-show="errors.has('mailing_address')" class="form-control-feedback">{{ errors.first('mailing_address') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('postal')}"  style="padding-top: 20px;">
								<label class="label" for="postal">Postal Code <span class="req_star"> *</span></label>
								<input v-model="form_data.postal_code" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-attkkj" type="text" placeholder="Postal Code" data-vv-delay="500" data-vv-as="postal code">
								<span v-show="errors.has('postal')" class="form-control-feedback">{{ errors.first('postal') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('age')}"  style="padding-top: 20px;">
								<label class="label" for="age">Age <span class="req_star"> *</span></label>
								<input v-model="form_data.age" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-attkkt" type="text" placeholder="Age" data-vv-delay="500" data-vv-as="age">
								<span v-show="errors.has('postal')" class="form-control-feedback">{{ errors.first('postal') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('gender')}"  style="padding-top: 20px;">
                				<label class="label" for="gender">Gender <span class="req_star"> *</span></label>
                				<radio name="cm-f-attkki" value="male" v-model="form_data.gender">Male</radio>
                                <radio name="cm-f-attkki" value="female" v-model="form_data.gender">Female</radio>
                                <span v-if="genderError" class="form-control-feedback">Please choose a gender</span>
                			</div>
						</div>
						<div class="form-group">
						    <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('howd_you_hear')}"  style="padding-top: 20px;">
                				<label class="label" for="howd_you_hear">How did you hear about the Walking Club? <span class="req_star"> *</span></label>
                				<radio name="cm-f-attkkd" value="male" v-model="form_data.howd_you_hear">Advertising</radio>
                                <radio name="cm-f-attkkd" value="female" v-model="form_data.howd_you_hear">Brochure</radio>
                                <radio name="cm-f-attkkd" value="female" v-model="form_data.howd_you_hear">Friends</radio>
                                <radio name="cm-f-attkkd" value="female" v-model="form_data.howd_you_hear">Other</radio>
                                <span v-if="heardError" class="form-control-feedback">Please choose an option</span>
                			</div>
						    <div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('doc_approval')}"  style="padding-top: 20px;">
                				<label class="label" for="doc_approval">Have you checked with your physician about walking at the centre?<span class="req_star"> *</span></label>
                				<radio name="cm-f-attkkh" value="male" v-model="form_data.doc_approval">Yes</radio>
                                <radio name="cm-f-attkkh" value="female" v-model="form_data.doc_approval">No</radio>
                                <span v-if="docError" class="form-control-feedback ">Please choose an option</span>
                                <p>* Pine Centre advises all registrants to please check with their family physician to ensure walking at Pine Centre is right for you.</p>
                			</div>
                			
                			<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('num_walks')}"  style="padding-top: 20px;">
								<label class="label" for="num_walks">How many times per week do you plan to walk at the centre?<span class="req_star"> *</span></label>
								<input v-model="form_data.num_walks" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-attkkk" type="text" placeholder="Times Per Week" data-vv-delay="500" data-vv-as="postal code">
								<span v-show="errors.has('num_walks')" class="form-control-feedback">{{ errors.first('num_walks') }}</span>
							</div>
						</div>
						<p>
						    RISK OF INJURY:  Persons entering upon the premises of the Centre for the purpose of being a registered walker and member of the Pine Centre Walking Club, do so at their own risk.  Neither the Centre, nor any of its owners, their beneficiaries, merchants or agents shall have any liability for injury. We advise all registered walkers to check with their physician to see if walking at Pine Centre Mall is right for you.
						</p>
						<div class="form-group account-btn text-left m-t-10 agreement">
						    <div class="col-xs-12">
						        <label class="checkbox">
                                    <input name="agree_terms" required type="checkbox" >
                                    By signing this document I acknowledge that I have read this document and Risk of Injury sections and agree with the above.
                                </label>
                                <label class=""> <a href="https://www.morguard.com/privacy/"> Read our Privacy Policy here</a></label> 
						    </div>
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
        return Vue.component("mall_walking_club", {
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
                    docError: false,
                    heardError : false,
                    currentPage : null
                }
            },
            created() {
                this.loadData().then(response => {
                    this.currentPage = response[0].data;
                    this.currentContest = this.findContestBySlug('pinecentre-walking-club');
                    // /pages/pinecentre-stroller-s-n-boots
                    var temp_repo = this.findRepoByName('Programs Banner');
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
                    if(this.form_data.doc_approval == null || this.form_data.doc_approval == undefined || this.form_data.doc_approval.length == 0){
                        this.docError = true;
                    }
                    if(this.form_data.howd_you_hear == null || this.form_data.howd_you_hear == undefined || this.form_data.howd_you_hear.length == 0){
                        this.heardError = true;
                    }
                    this.$validator.validateAll().then((result) => {
                        let errors = this.errors;
                        console.log("errors",errors);
                        if(errors && errors.items.length == 0){
                            //format contests data for MM
                            var contact_form = {};
                            contact_form.subject = "Mall Walking Club Form Submission";
                            contact_form.full_name = this.form_data.first_name + " " + this.form_data.last_name;
                            contact_form.email = this.form_data.email;
                            contact_form.phone = this.form_data.phone;
                            contact_form.mailing_address = this.form_data.mailing_address;
                            contact_form.postal_code = this.form_data.postal_code ;
                            contact_form.age = this.form_data.age ;
                            contact_form.gender = this.form_data.gender ;
                            contact_form["How did you hear about the Walking Club"] = this.form_data.howd_you_hear ;
                            contact_form["Have you checked with your physician about walking at the centre?"] = this.form_data.doc_approval ;
                            contact_form.postal_code = this.form_data.postal_code ;
                            contact_form.message = " ";
                            
                            send_data = {};
                            send_data.form_data = JSON.stringify(Utility.serializeObject(contact_form));
                            this.$store.dispatch("CONTACT_US", send_data).then(res => {
                               
                                this.campaignMonitorCall($('#walking_club'), '92D4C54F0FEC16E5ADC2B1904DE9ED1A283BF1E3C2E61D583B605E13F21FF0FF32C7715BAF2BA07E11A65475E7F27713134C2662AA252AA55B4872C0D7BA96E2');
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
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "	/pages/pinecentre-walking-club.json"}), this.$store.dispatch("getData", "contests"),this.$store.dispatch("getData", "repos")]);
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