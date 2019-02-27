<template>
    <div class="page_container" id="contact_us_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<div class="site_container">
				<div class="header_content">
					<h1>March Break Campaign</h1>
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
                    <form class="form-horizontal padding_top_20 js-cm-form" v-on:submit.prevent="validateBeforeSubmit" id="kids_pine_club" method="post">
                        <div class="form-group ">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('first_name')}">
								<label class="label" for="first_name">Guardian's First Name <span class="req_star"> *</span></label>
								<input v-model="form_data.parent_first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="guardian's first name">
								<span v-show="errors.has('first_name')" class="form-control-feedback">{{ errors.first('first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('last_name')}">
								<label class="label" for="last_name">Guardian's Last Name <span class="req_star"> *</span></label>
								<input v-model="form_data.parent_last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="guardian's last name">
								<span v-show="errors.has('last_name')" class="form-control-feedback">{{ errors.first('last_name') }}</span>
							</div>
							<div>
								<input class="form-control" name="cm-name" type="hidden" :value="form_data.parent_first_name + ' ' + form_data.parent_last_name">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('email')}">
								<label class="label" for="email">Email <span class="req_star"> *</span></label>
								<input v-model="form_data.email" v-validate="'required|email'" class="form-control js-cm-email-input" :class="{'input': true}" name="cm-ziknd-ziknd" type="email" placeholder="Email" data-vv-delay="500" data-vv-as="email">
								<span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('phone')}" >
								<label class="label" for="phone">Phone Number <span class="req_star"> *</span></label>
								<input v-model="form_data.phone" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="cm-f-atyjri" type="text" placeholder="Phone number" data-vv-delay="500" data-vv-as="phone">
								<span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
							</div>
						</div>
						<multi-children-component @childUpdated="updateChild" key="1" :id_num="1" :campaign="true"></multi-children-component>
						<multi-children-component v-show="showChild2" @childUpdated="updateChild" key="2" :id_num="2" :campaign="true"></multi-children-component>
						<multi-children-component v-show="showChild3" @childUpdated="updateChild" key="3" :id_num="3" :campaign="true"></multi-children-component>
						<multi-children-component v-show="showChild4" @childUpdated="updateChild" key="4" :id_num="4" :campaign="true"></multi-children-component>
						<a @click="incrementChildren()" v-show="!noMoreChildren" style="margin: 10px auto 30px;display: inline-block;"> <i class="fa fa-plus"></i>Add Another Child</a>
						<div class="form-group">
    						<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('timeslot1')}">
                				<v-select :options="timeslots" label="name" :searchable="false" :on-change="timeSlotOneSelected()" id="timeslot1" placeholder="Select first choice" v-validate="'required:true'" class="form-control" :class="{'input': true}" data-vv-delay="500" data-vv-as="timeslot 1" name="timeslot1"></v-select>
                				<span v-show="errors.has('timeslot1')" class="form-control-feedback">{{ errors.first('timeslot1') }}</span>
                			</div>
                			
						</div>
						<div class="form-group account-btn text-left m-t-10 agreement">
						    <div class="col-xs-12">
						        <label class="checkbox">
                                    <input name="agree_terms" required type="checkbox" >
                                    I understand by checking the box, I acknowledge that I have read, understood, and accept the <a href="/pages/pinecentre-pine-kid-s-club-disclaimer-and-the-code-of-conduct" target="_blank">Disclaimer and the Code of Conduct</a>
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
    define(["Vue", "vuex", "axios", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate', 'utility', 'vue-checkbox-radio', 'vue!multi_children_component.vue'], function(Vue, Vuex,axios, moment, tz, VueMoment, Meta, VeeValidate, Utility, CheckboxRadio, MultiChildrenComponent) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        Vue.use(CheckboxRadio.default);
        return Vue.component("march-break-campaign-component", {
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
                    numberOfChildren: 1,
                    showChild2 : false,
                    showChild3 : false,
                    showChild4: false,
                    noMoreChildren : false,
                    currentPage: null,
                    
                }
            },
            created() {
                this.loadData().then(response => {
                    this.currentContest = this.findContestBySlug('pinecentre-march-break-campaign');
                    this.currentPage =  response[0].data;
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
                timeslots(){
                    return timeslots;
                }
            },
            methods: {
                validateBeforeSubmit(form) {
                    if(this.form_data.gender == null || this.form_data.gender == undefined || this.form_data.gender.length == 0){
                        this.genderError = true;
                    }
                    this.$validator.validateAll().then((result) => {
                        let errors = this.errors;
                        let mm_success = false;
                        if(errors && errors.items.length == 0){
                            //format contests data for MM
                            
                            var json_data = {};
                            json_data.guardian_name = this.form_data.parent_first_name + " " + this.form_data.parent_first_name;
                            json_data.email = this.form_data.email;
                            json_data.phone = this.form_data.phone;
                            var vm = this;
                            
                            //email contact data
                            var contact_form = {};
                            contact_form.send_to = "sankavy@mobilefringe.com";
                            contact_form.subject = "March Break Form Submission";
                            contact_form.guardian_name = vm.form_data.parent_first_name + " " + vm.form_data.parent_first_name;
                            contact_form.email = vm.form_data.email;
                            contact_form.phone = vm.form_data.phone;
                            //cycling through children to send separete entries
                            _.times(this.numberOfChildren, function(key) {
                                json_data.child_name = vm.form_data["child_"+(key+1)].child_first_name + " "  +  vm.form_data["child_"+(key+1)].child_last_name;
                                json_data.child_age= vm.form_data["child_"+(key+1)].age;
                                
                                var contest_entry = {};
                                contest_entry.json = json_data;
                                host_name = vm.property.mm_host.replace("http:", "");
                                var url = host_name + "/contests/" + vm.currentContest.slug + "/json_entry";
                                $.ajax({
                                    url: url,
                                    type: "POST",
                                    data: contest_entry,
                                    async: false,
                                    success: function(data) {
                                      console.log("mm post successful");
                                    },
                                    error: function(data){
                                        console.log("error data:" , data);
                                        mm_success = false;
                                    }
                                });
                                
                                contact_form["child"+(key+1)+"_name"] = vm.form_data["child_"+(key+1)].child_first_name + " "  +  vm.form_data["child_"+(key+1)].child_last_name;
                                contact_form["child"+(key+1)+"_age"] = vm.form_data["child_"+(key+1)].age;
                                
                                
                            });
                            //sending email
                            send_data = {};
                            send_data.url = "https://www.mallmaverick.com/send_contact_email";
                            send_data.form_data = JSON.stringify(Utility.serializeObject(contact_form));
                            // vm.$store.dispatch("CONTACT_US", send_data).then(res => {
                            //     console.log("submission email sent to guest services");
                            // }).catch(error => {
                            //     console.log("Data load error: " + error.message);
                            //     vm.formError = true;
                            // });
                            $.ajax({
                                url : send_data.url,
                                type: "POST",
                                data : contact_form,
                                success: function(data, textStatus, jqXHR){
                                    vm.formSuccess = true;
                                },
                                error: function (jqXHR, textStatus, errorThrown){
                                  console.log("Data load error: " + error.message);
                                  vm.formError = true;
                                }
                            });
                        }
                    })
                },
                loadData: async function() {
                    try {
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "/pages/pinecentre-march-break-campaign.json"}),this.$store.dispatch("getData", "contests"),this.$store.dispatch("getData", "repos")]);
                        // /pages/pinecentre-kids-pine-club
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
                incrementChildren () {
                    this.numberOfChildren = this.numberOfChildren + 1;
                    if (this.numberOfChildren == 2) {
                        this.showChild2 = true;
                    }
                    else if (this.numberOfChildren == 3) {
                        this.showChild3 = true;
                        // this.noMoreChildren = true;
                    }
                    else if (this.numberOfChildren == 4) {
                        this.showChild4 = true;
                        this.noMoreChildren = true;
                    }
                },
                updateChild (data) {
                    if(data.id_num == 1) {
                        this.form_data.child_1 = data;
                    }
                    else if(data.id_num == 2) {
                        this.form_data.child_2 = data;
                    } 
                    else if (data.id_num == 3) {
                        this.form_data.child_3 = data;
                    }
                    else {
                        this.form_data.child_4 = data;
                    }
                },
                timeSlotOneSelected(val){
                    console.log(val);
                }
            }
        });
    });
</script>