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
								<input v-model="child_form_data.child_first_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="child_first_name" type="text" placeholder="First Name" data-vv-delay="500" data-vv-as="child's first name">
								<span v-show="errors.has('child_first_name')" class="form-control-feedback">{{ errors.first('child_first_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('child_last_name')}">
								<label class="label" for="child_last_name">Child's Last Name <span class="req_star"> *</span></label>
								<input v-model="child_form_data.child_last_name" v-validate="'required:true'" class="form-control" :class="{'input': true}" name="child_last_name" type="text" placeholder="Last Name" data-vv-delay="500" data-vv-as="child's last name">
								<span v-show="errors.has('child_last_name')" class="form-control-feedback">{{ errors.first('child_last_name') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('birthday')}"   style="padding-top: 20px;">
								<label class="label" for="birthday">Birthday <span class="req_star"> *</span></label>
								<input v-model="child_form_data.birthday" class="form-control" v-validate="'required|date_format:MM/DD/YYYY'" :class="{'input': true}" name="birthday" type="text" placeholder="mm/dd/yyyy" data-vv-delay="500" data-vv-as="birthday">
								<span v-show="errors.has('birthday')" class="form-control-feedback">{{ errors.first('birthday') }}</span>
							</div>
							<div class="col-sm-6 col-xs-12" :class="{'has-error': errors.has('gender')}"  style="padding-top: 20px;">
								<label class="label" for="gender">Gender <span class="req_star"> *</span></label>
								<radio name="gender" value="male" v-model="child_form_data.gender">Male</radio>
                                <radio name="gender" value="female" v-model="child_form_data.gender">Female</radio>
                                <span v-if="genderError" class="form-control-feedback">Please choosed a gender</span>
							</div>
						</div>
					</form>
                    
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
        return Vue.component("multi-children-component", {
            template: template, // the variable template will be injected
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