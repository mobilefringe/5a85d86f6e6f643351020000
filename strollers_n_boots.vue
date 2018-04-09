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
                    <form class="form-horizontal padding_top_20" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
                        <div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('first_name')}">
								<label class="label" for="first_name">First Name <span class="req_star"> *</span></label>
								<input v-model="form_data.parent_first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="first name">
								<span v-show="errors.has('first_name')" class="form-control-feedback">{{ errors.first('first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('last_name')}">
								<label class="label" for="last_name">Last Name <span class="req_star"> *</span></label>
								<input v-model="form_data.parent_last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="last name">
								<span v-show="errors.has('last_name')" class="form-control-feedback">{{ errors.first('last_name') }}</span>
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Email <span class="req_star"> *</span></label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="500" data-vv-as="email">
								<span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}" >
								<label class="label" for="phone">Phone Number <span class="req_star"> *</span></label>
								<input v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="phone" type="text" placeholder="Phone number" data-vv-delay="500" data-vv-as="phone">
								<span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
							</div>
						</div>
						<div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('emerg_name')}">
								<label class="label" for="emerg_name"> Emergency Contact Name <span class="req_star"> *</span></label>
								<input v-model="form_data.emergency_first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="emerg_name" type="text" placeholder="Emergency Contact Ful Name" data-vv-delay="500" data-vv-as="emergency contact name">
								<span v-show="errors.has('emerg_name')" class="form-control-feedback">{{ errors.first('emerg_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('emergency_')}" >
								<label class="label" for="emergency_">Emergency Contact Number <span class="req_star"> *</span></label>
								<input v-model="form_data.emergency_phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="phone" type="text" placeholder="Phone number" data-vv-delay="500" data-vv-as="emergency contact phone">
								<span v-show="errors.has('emergency_')" class="form-control-feedback">{{ errors.first('emergency_') }}</span>
							</div>
						</div>
						
						
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
    define(["Vue", "vuex", "axios", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate', "v-calendar", 'utility', 'vue-checkbox-radio'], function(Vue, Vuex,axios, moment, tz, VueMoment, Meta, VeeValidate, VCalendar, Utility, CheckboxRadio) {
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
                    var temp_repo = this.findRepoByName('Kids Club Banner');
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
                            // if(this.form_data.agree_newsletter ) {
                            //     $.getJSON("//mobilefringe.createsend.com/t/d/s/irudui/?callback=?",
                            //     "cm-name=" + this.form_data.first_name + this.form_data.last_name +
                            //     "&cm-irudui-irudui=" + this.form_data.email +
                            //     "&cm-f-jtukyu=" + this.form_data.city+
                            //     "&cm-f-jtukjr=" + this.form_data.phone +
                            //     "&cm-f-jtukjy=" + this.form_data.mailing_address +
                            //     "&cm-f-jtukjj=" + this.form_data.postal_code +
                            //     "&cm-f-jtukjt=" + this.form_data.birthday,
                            //         function (data) {
                            //         if (data.Status === 400) {
                            //             e.preventDefault();
                            //             console.error("Please try again later.");
                            //         } else { // 200
                            //             console.log("Newsletter submission successful.");
                            //         }
                            //     });  
                            // }
                            //format contests data for MM
                            // this.form_data.notes = this.form_data.child_first_name + " " + this.form_data.child_last_name;
                            this.form_data.message = " " + this.parent_first_name + /n";
                            
                            send_data = {};
                            send_data.form_data = JSON.stringify(Utility.serializeObject(this.form_data));
                            this.$store.dispatch("CONTACT_US", send_data).then(res => {
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
                            })
                        
                            // var contest_entry = {};
                            // contest_entry.json = this.form_data;
                            // var vm = this;
                            // host_name = this.property.mm_host.replace("http:", "");
                            // var url = host_name + "/contests/" + this.currentContest.slug + "/json_entry";//"/create_js_entry";
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
                        }
                    })
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
            }
        });
    });
</script>