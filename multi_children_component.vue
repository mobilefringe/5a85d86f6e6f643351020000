<template>
    <div class="page_container" id="contact_us_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div v-if="pageBanner" class="page_header" v-bind:style="{ backgroundImage: 'url(' + pageBanner.image_url + ')' }">
			<!--http://via.placeholder.com/1920x300-->
			<div class="site_container">
				<div class="header_content">
					<h1>Kids PinE-Club</h1>
				</div>
			</div>
		</div>
        <div class="site_container">
            <div class="row text-center">
                <div class="col-sm-12">
                    <div v-if="currentContest" v-html="currentContest.rich_description"></div>
                </div>
            </div> 
            <div class="row"> 
                <div class="col-sm-12 contest_contents">
                    <form class="form-horizontal padding_top_20" action="form-submit" v-on:submit.prevent="validateBeforeSubmit">
						<div class="form-group " id="child_container">
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('child_first_name')}">
								<label class="label" for="child_first_name">Child's First Name <span class="req_star"> *</span></label>
								<input v-model="form_data.child_first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="child_first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="child's first name">
								<span v-show="errors.has('child_first_name')" class="form-control-feedback">{{ errors.first('child_first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('child_last_name')}">
								<label class="label" for="child_last_name">Child's Last Name <span class="req_star"> *</span></label>
								<input v-model="form_data.child_last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="child_last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="child's last name">
								<span v-show="errors.has('child_last_name')" class="form-control-feedback">{{ errors.first('child_last_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('birthday')}"   style="padding-top: 20px;">
								<label class="label" for="birthday">Birthday <span class="req_star"> *</span></label>
								<input v-model="form_data.birthday" class="form-control" v-validate="'required|date_format:MM/DD/YYYY'" :class="{'input': true}" name="birthday" type="text" placeholder="mm/dd/yyyy" data-vv-delay="500" data-vv-as="birthday">
								<span v-show="errors.has('birthday')" class="form-control-feedback">{{ errors.first('birthday') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('gender')}"  style="padding-top: 20px;">
								<label class="label" for="gender">Gender <span class="req_star"> *</span></label>
								<radio name="gender" value="male" v-model="form_data.gender">Male</radio>
                                <radio name="gender" value="female" v-model="form_data.gender">Female</radio>
                                <span v-if="genderError" class="form-control-feedback">Please choosed a gender</span>
							</div>
						</div>
						<a @click="incrementChildren()"> Add Another Child</a>
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
							<div class="col-sm-6 col-xs-12"  :class="{'has-error': errors.has('city')}" style="padding-top: 20px;">
								<label class="label" for="city"> City <span class="req_star"> *</span></label>
								<input v-model="form_data.city" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="city" type="text" placeholder="Town/City" data-vv-delay="500" data-vv-as="city">
								<span v-show="errors.has('city')" class="form-control-feedback">{{ errors.first('city') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12 " :class="{'has-error': errors.has('postal')}"  style="padding-top: 20px;">
								<label class="label" for="postal">Postal Code <span class="req_star"> *</span></label>
								<input v-model="form_data.postal_code" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="postal" type="text" placeholder="Postal Code" data-vv-delay="500" data-vv-as="postal code">
								<span v-show="errors.has('postal')" class="form-control-feedback">{{ errors.first('postal') }}</span>
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
    define(["Vue", "vuex", "axios", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate', "v-calendar", 'utility', 'vue-checkbox-radio'], function(Vue, Vuex,axios, moment, tz, VueMoment, Meta, VeeValidate, VCalendar, Utility, CheckboxRadio) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        Vue.use(VCalendar.default);
        Vue.use(CheckboxRadio.default);
        return Vue.component("kids-club-component", {
            template: template, // the variable template will be injected
            props:['locale'],
            data: function() {
                return {
                    child_form_data: {},
                }
            },
            created() {
                
            },
            methods: {
            }
        });
    });
</script>